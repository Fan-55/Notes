## Final solution: `module-loopback` virtual sink

Since both WirePlumber configuration rules (`api.alsa.soft-mixer` and `node.linear-volume`) silently failed to apply, the working fix bypassed WirePlumber's rule engine entirely by creating a **virtual sink using PipeWire's loopback module** — a mechanism that doesn't depend on WirePlumber honoring any property.

### How it works (mechanism)

Normally, there's a **direct, one-to-one relationship** between a sink's software volume and the ALSA hardware mixer register underneath it: WirePlumber's ALSA backend is specifically designed to keep these in sync, translating the sink's volume into a raw value and writing it straight to hardware via the (broken, cubic) curve. That direct coupling was the root of the problem — one property driving another through a bad mapping.

The loopback module breaks this coupling by introducing **two separate, independently-controlled audio nodes** instead of one:

1. **The virtual sink** (`xiaomi_fixed_volume`) — what your slider, GNOME Settings, and `wpctl` actually control
2. **The real hardware sink** (`alsa_output...analog-stereo`) — the actual ALSA device

These two are connected only by an internal **audio stream/link**, not by a shared or derived volume property. The loopback's playback side behaves just like any other PipeWire client stream feeding into the real sink — conceptually no different from Spotify or a browser tab playing audio. Client streams don't have authority to push their own volume into the hardware mixer; only the sink's own backend does that.

So when you move the slider:
- WirePlumber adjusts the **virtual sink's** software volume — a gain multiplier applied to audio samples in software, entirely linear
- That already-attenuated audio is sent downstream to the real hardware sink as a normal playback stream
- The real hardware sink's own volume property still technically exists, but nothing is wiring "virtual sink volume" to it anymore — they're just two independent objects now, one feeding the other

This is why the companion piece below — the systemd service pinning ALSA to 100% — is a required part of the fix, not a separate leftover from earlier troubleshooting: the real hardware sink can still independently drift to whatever value WirePlumber's normal startup behavior applies to it, *unrelated* to anything the loopback does. If that floor isn't pinned at 100%, you'd get the loopback's linear gain multiplied by an arbitrary leftover hardware attenuation underneath it — reintroducing the same kind of unpredictable, non-1:1 behavior the fix was meant to escape.

### Part 1 — Pin the ALSA hardware floor at 100%

**File:** `~/.config/systemd/user/fix-xiaomi-volume.service`

```ini
[Unit]
Description=Fix Xiaomi speaker ALSA volume after WirePlumber starts
After=wireplumber.service
Requires=wireplumber.service

[Service]
Type=oneshot
ExecStartPre=/bin/sleep 3
ExecStart=/usr/bin/amixer -c 1 sset PCM 100%

[Install]
WantedBy=default.target
```

**What it does:** Runs once per login session, a few seconds after WirePlumber starts (the `sleep 3` gives WirePlumber time to finish its own startup and any volume writes it might do), and forces the raw ALSA `PCM` control on card 1 (the Xiaomi speaker) to 100%/4096.

**Enabled with:**
```bash
mkdir -p ~/.config/systemd/user
systemctl --user daemon-reload
systemctl --user enable --now fix-xiaomi-volume.service
```

**Verify it's active:**
```bash
systemctl --user status fix-xiaomi-volume.service
amixer -c 1 sget PCM    # should show 4096 [100%] after boot/login
```

### Part 2 — Loopback virtual sink with linear software volume

**File:** `~/.config/pipewire/pipewire.conf.d/99-xiaomi-remap.conf`

```
context.modules = [
    {   name = libpipewire-module-loopback
        args = {
            node.description = "Xiaomi Speaker (Fixed Volume)"
            capture.props = {
                media.class = "Audio/Sink"
                node.name = "xiaomi_fixed_volume"
                audio.position = [ FL FR ]
            }
            playback.props = {
                node.name = "xiaomi_fixed_volume_playback"
                target.object = "alsa_output.usb-MV-SILICON_Xiaomi_Desktop_Speaker-3415_20190808-00.analog-stereo"
                audio.position = [ FL FR ]
                node.passive = true
            }
        }
    }
]
```

**Applied with:**
```bash
systemctl --user restart pipewire pipewire-pulse wireplumber
```

**Selected as output:** Settings → Sound → Output → **"Xiaomi Speaker (Fixed Volume)"**

### Verification

Two tests confirmed the fix:

**ALSA stays pinned regardless of slider position:**
```bash
amixer -c 1 sget PCM
```
→ stayed at `4096 [100%] [16.00dB]` at every tested slider position (0–100%), confirming the hardware mixer was no longer being driven by the sink volume.

**Loopback sink volume tracks the slider linearly:**
```bash
wpctl get-volume <loopback_sink_id>
```
→ returned 0.10, 0.25, 0.49, 0.50, 0.60, 0.75, 1.00 for the corresponding slider percentages — a clean 1:1 linear match, with no rounding to zero anywhere.

### Why this approach (and not the WirePlumber rules)

`soft-mixer` and `linear-volume` are WirePlumber *properties* that the session manager has to read and act on — and on this setup (WirePlumber 1.0.5, ACP-managed device), they were silently ignored with no errors. The loopback module instead works by **creating an actual new audio object in the PipeWire graph** that structurally decouples the controllable volume from the hardware register — it's not a property someone has to honor, it's a real architectural separation, which is why it worked reliably where the rules didn't.

### Removing this fix completely (for future reference)

Both pieces need to be removed together — removing only one leaves an inconsistent half-fixed state:

```bash
# Remove the ALSA-pinning service
systemctl --user disable --now fix-xiaomi-volume.service
rm ~/.config/systemd/user/fix-xiaomi-volume.service
systemctl --user daemon-reload

# Remove the loopback sink config
rm ~/.config/pipewire/pipewire.conf.d/99-xiaomi-remap.conf
systemctl --user restart pipewire pipewire-pulse wireplumber
```