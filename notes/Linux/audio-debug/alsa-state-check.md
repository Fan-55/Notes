Here's how to check whether ALSA's mixer state is actually being persisted across reboots — the diagnostic sequence we used early on.

## Step 1: Check if the restore service exists and ran

```bash
systemctl status alsa-restore.service
```

Look for `Active: active (exited)` with `status=0/SUCCESS`. This confirms the service *ran* at boot — but it only tells you the restore mechanism is wired up, not that it actually restored anything meaningful. (This was the trap we fell into: the service was healthy, but that didn't mean the right values were being restored.)

## Step 2: Check what's actually saved in the state file

```bash
cat /var/lib/alsa/asound.state
```

Or, to jump straight to a specific card's block (replace `Speaker3415` with whatever your card's short name is, from `cat /proc/asound/cards`):

```bash
awk '/state.Speaker3415/,/^}/' /var/lib/alsa/asound.state
```

Look for the relevant mixer control — usually something like:
```
control.4 {
    iface MIXER
    name 'PCM Playback Volume'
    value.0 4096
    value.1 4096
    ...
}
```

This shows what was last **saved**, not necessarily what's currently loaded.

## Step 3: Compare the saved file against the live, current value

This is the critical step — the saved file and the live state can disagree, and that gap is exactly what tells you whether persistence is actually working at any given moment:

```bash
amixer -c 1 sget '<control name>'
```

(Use `amixer -c 1 scontrols` first if you're not sure of the exact control name — it might be `PCM`, `Master`, `Speaker`, etc. depending on the device.)

It may look like:

```
$ mixer -c 1 sget 'PCM'

Simple mixer control 'PCM',0
  Capabilities: pvolume pswitch pswitch-joined
  Playback channels: Front Left - Front Right
  Limits: Playback 0 - 4096
  Mono:
  Front Left: Playback 4096 [100%] [16.00dB] [on]
  Front Right: Playback 4096 [100%] [16.00dB] [on]
```

Compare this live reading to what the file says. If they match, persistence is working as expected. If they don't match — like in our case, where the file said 100% but the live value was 11% — something *after* boot is overwriting the ALSA value (in our case, that "something" turned out to be PipeWire/WirePlumber applying its own volume on top of it).

## Step 4: Test persistence directly, end to end

The most reliable test is just doing it live:

```bash
# Set the value you want
alsamixer    # or amixer -c 1 sset PCM 100%

# Save it explicitly
sudo alsactl store

# Reboot
sudo reboot

# After reboot, check immediately
amixer -c 1 sget PCM
```

If the value after reboot matches what you saved, persistence at the ALSA layer is confirmed working. If it doesn't, you know the gap exists, and the next question becomes *what's changing it* after boot — which is what led us to discover PipeWire's involvement in your case.

---

**Key lesson from this whole process:** a "successful" save/restore service and a correctly-populated state file don't guarantee the value stays put — modern desktop systems have PipeWire/WirePlumber sitting on top of ALSA, actively managing and overwriting hardware mixer values independently. So checking ALSA persistence in isolation isn't enough on a PipeWire-based system; you also have to check whether something at a higher layer is fighting it, which is what `wpctl status` and `wpctl inspect` are for.