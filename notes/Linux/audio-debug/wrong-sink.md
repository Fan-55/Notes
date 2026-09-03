Here's a summary of the wrong-default-sink issue and how we traced it.

## What we observed

After fixing the profile issue (switching off "Pro Audio" to "Analog Stereo"), there was still **no sound at all** — not even via a direct `paplay` test, which ruled out any specific app being misconfigured.

The breakthrough came from looking at the full `wpctl status` output rather than just checking the Xiaomi device in isolation:

```
Sinks:
*   49. HDA Intel PCH Digital Stereo (HDMI) [vol: 0.46]
    58. Xiaomi Desktop Speaker-3415 Digital Stereo (IEC958) [vol: 0.40]
```

The `*` marks the **default sink** — and it was pointing at the **HDMI output on the motherboard's HDA Intel PCH card**, not the Xiaomi speaker at all. Confirmation came from the bottom of the same output:

```
Settings → Default Configured Node Names:
    0. Audio/Sink    alsa_output.pci-0000_80_1f.3.hdmi-stereo
```

This explicitly showed WirePlumber's stored default sink was the HDMI device.

## Why this happened

WirePlumber maintains its own persistent record of which sink should be treated as the system default, independent of which devices exist or which one you most recently interacted with in alsamixer. In your case, this default was apparently set to HDMI at some point — likely because an HDMI-connected monitor (the `ASUS VG289` visible elsewhere in the stream list) has audio-capable HDMI output, and WirePlumber had picked or retained that as the preferred target.

Switching the Xiaomi card's *profile* (Pro Audio → Analog Stereo) changed what that device exposed, but it had no effect on *which device PipeWire was actually sending audio to*. Profile and default-sink-selection are two completely separate layers: one controls a device's capabilities, the other controls routing. Audio was correctly formatted and ready to send to the Xiaomi sink, but PipeWire was sending it to HDMI instead — likely to a display with no speakers connected or active, so it effectively went nowhere audible.

## How we fixed it

Set the Xiaomi speaker as the default output explicitly, via:

**GNOME Settings → Sound → Output** → selecting "Xiaomi Desktop Speaker-3415" directly

This overwrote WirePlumber's stored default-node preference. After this, `wpctl status` showed the `*` correctly next to the Xiaomi sink, and sound started working (modulo the separate non-linear volume issue we tackled afterward).

**Equivalent CLI approach**, for the record:
```bash
wpctl set-default <sink_id>
```
using whatever sink ID corresponds to the Xiaomi analog-stereo output at the time.

## Key lesson

Profile selection (what mode a device operates in) and default sink selection (which device receives audio) are independent settings in PipeWire/WirePlumber. Fixing one doesn't fix the other — both need to be correct for sound to actually come out, and `wpctl status`'s `*` marker is the fastest way to check which sink is actually receiving audio at any given time.