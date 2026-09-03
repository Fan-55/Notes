Here's the same record, with the observations that motivated each attempt added in.

## What we observed before trying any rules

After fixing the "no sound" issue (wrong profile, wrong default sink), a new symptom appeared: **dragging the volume slider below ~50% produced no audible sound at all**, while above 50% it worked normally.

We confirmed this wasn't perception or a hardware knob issue by measuring it directly. Running a script that set the PipeWire sink volume to a series of percentages and reading back the raw ALSA `PCM` control after each one (`amixer -c 1 sget PCM`) gave us:

| PipeWire % | ALSA raw value | ALSA % | dB |
|---|---|---|---|
| 0–50% | 0 | 0% | 0.00 dB (silent) |
| 51% | 0 | 0% | still silent |
| 60% | 689 | 17% | 2.69 dB |
| 75% | 2176 | 53% | 8.50 dB |
| 100% | 4096 | 100% | 16.00 dB |

This showed the relationship between the slider and the actual hardware gain wasn't linear — it followed a **cubic curve** (roughly `gain = (slider%)³`), which is PipeWire's default volume mapping. The issue was that this device's hardware mixer only has a **16dB total range** (`dbmin 0` to `dbmax 1600` centibels) — much narrower than the 60dB+ range cubic scaling is generally designed around. Cubed against such a narrow range, anything below 50% rounds down to literally 0, producing true silence rather than just quietness.

We had also separately confirmed the ALSA *save/restore* mechanism wasn't the cause here — a systemd service we'd set up was successfully pinning the hardware to 100% after every boot, and the live `amixer` readings tracked the slider in real time as we moved it. So the hardware itself was responding correctly; it was specifically the **cubic curve compressing the bottom half of the range to zero** that was the problem.

This diagnosis — PipeWire's cubic curve + narrow hardware dB range — is what led to both rule attempts, each targeting a different way to stop that curve from being applied directly to the hardware mixer:

## Attempt 1: `api.alsa.soft-mixer`

**Goal:** Stop PipeWire from controlling the device's real hardware mixer at all, and instead have it do volume control purely in software — sidestepping the narrow 16dB hardware range entirely.

**How the device name was determined first:**

```bash
wpctl status
```
Under `Audio → Devices`, found the device object ID:
```
Devices:
     44. Xiaomi Desktop Speaker-3415         [alsa]
```

Then inspected that device object to get its exact name string:
```bash
wpctl inspect 44 | grep "device.name"
```
Returned:
```
* device.name = "alsa_card.usb-MV-SILICON_Xiaomi_Desktop_Speaker-3415_20190808-00"
```

This confirmed the exact string to match against in the rule.

**File:** `~/.config/wireplumber/wireplumber.conf.d/51-xiaomi-soft-mixer.conf`

```
monitor.alsa.rules = [
  {
    matches = [
      {
        device.name = "~alsa_card.usb-MV-SILICON_Xiaomi_Desktop_Speaker-3415.*"
      }
    ]
    actions = {
      update-props = {
        api.alsa.soft-mixer = true
      }
    }
  }
]
```

**Applied with:**
```bash
systemctl --user restart wireplumber
```

**Verified with:**
```bash
wpctl inspect 44
```

**Why this should work in theory:** `soft-mixer` is a documented PipeWire property that tells the ALSA backend to leave the hardware mixer untouched and do all volume/mute handling in software instead. This is the officially documented fix for exactly this class of problem.

**Why it failed:** After restarting WirePlumber, `wpctl inspect 44` showed no `api.alsa.soft-mixer` property at all — meaning the rule never applied. We re-checked the `device.name` match at this point too (`wpctl inspect 44 | grep "device.name"` again) and confirmed it was correct, ruling out a typo or pattern mismatch as the cause. The journal showed no errors either — it just silently didn't apply. This matched real-world bug reports we found of `update-props` rules being silently ignored on some WirePlumber versions/setups, where `wpctl inspect` sometimes shows the new value but behavior doesn't change, or — in our case — the property doesn't even show up.

## Attempt 2: `node.linear-volume`

**Goal:** Instead of disabling the hardware mixer entirely, just change the *shape* of the volume curve from cubic to linear, so percentages map proportionally to gain instead of being cubed — directly targeting the cubic-curve mechanism we'd measured.

**File:** `~/.config/wireplumber/wireplumber.conf.d/51-xiaomi-linear-volume.conf`

```
monitor.alsa.rules = [
  {
    matches = [
      {
        node.name = "~alsa_output.usb-MV-SILICON_Xiaomi_Desktop_Speaker-3415.*"
      }
    ]
    actions = {
      update-props = {
        node.linear-volume = true
      }
    }
  }
]
```

**Applied with:**
```bash
systemctl --user restart wireplumber
```

**Why we tried a node-level match this time:** `soft-mixer` is a *device*-level property; this one targets the *node* (the sink) instead. Since some bug reports suggested node-level rules were more reliable than device-level ones, this felt like a reasonable second angle.

**Verified with:**

Re-ran the volume curve test script (`test_volume_curve.sh`), which steps through `wpctl set-volume` at 0/10/25/49/50/51/60/75/100% and reads back the raw ALSA value at each step via `amixer -c 1 sget PCM`.

**Why it failed:** The numbers came back **identical** to before the change (0% raw ALSA value for everything ≤50%, jumping to 17%/53%/100% at 60/75/100%). This confirmed the rule had no effect whatsoever — same silent-failure pattern as attempt 1.

## What this told us

Both attempts followed documented, correct syntax, targeted the right object with confirmed-correct match patterns, and produced zero errors — yet neither one changed behavior at all. This pointed to a **WirePlumber rule-application bug or quirk specific to this setup** (version 1.0.5, ACP-managed device via `api.alsa.use-acp = true`), rather than a mistake in how the rules were written.

This is what led us to abandon the "configure WirePlumber to behave differently" approach entirely and instead use a **`module-loopback` virtual sink** — a mechanism that doesn't rely on WirePlumber honoring a property, since it works by creating an entirely separate software audio path that PipeWire/WirePlumber doesn't get a chance to override the same way.

## script

Here's the script we used to measure the volume curve (the one that produced the data showing the cubic-curve / dead-zone-below-50% behavior):

```bash
#!/bin/bash
# Tests how PipeWire's volume % maps to the raw ALSA PCM hardware value
# for the Xiaomi Desktop Speaker-3415 sink.

SINK_ID=53   # change this if `wpctl status` shows a different ID for the Xiaomi sink

echo "Using sink ID: $SINK_ID"
echo "(Run 'wpctl status' first if unsure this is still correct)"
echo

for pct in 0 10 25 49 50 51 60 75 100; do
    wpctl set-volume "$SINK_ID" "${pct}%"
    sleep 0.3   # brief pause to let WirePlumber apply the change before reading it back
    echo "---- PipeWire volume set to ${pct}% ----"
    amixer -c 1 sget PCM
    echo
done
```

**What it does:**
1. Steps through a fixed set of PipeWire volume percentages: 0, 10, 25, 49, 50, 51, 60, 75, 100
2. For each one, sets the sink's volume via `wpctl set-volume`
3. Waits briefly (0.3s) for WirePlumber to apply the change
4. Reads back the **raw ALSA hardware value** via `amixer -c 1 sget PCM`

**Why these specific percentages:** 49/50/51 were included deliberately to pin down exactly where the dead zone boundary sat, since you'd reported the cutoff was "around 50%" — this let us confirm it was a hard cliff right at 50%, not a gradual fade.

**Note:** `SINK_ID=53` is hardcoded at the top and needs to be updated to match whatever the current sink ID is each time, since it can shift across reboots or profile changes (we saw it go 33 → 82 → 36 at different points in this conversation) — that's why the script prints a reminder to check `wpctl status` first.
