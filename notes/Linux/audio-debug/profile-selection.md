## List the sound cards

```
cat /proc/asound/cards
```

Here's the profile section updated with that detail.

## What is a "profile" in PipeWire/ALSA?

A **profile** describes how an audio device's physical capabilities get exposed to the operating system — essentially, "what mode is this hardware operating in, and which inputs/outputs does that activate."

Most audio hardware (especially USB devices) supports multiple operating modes because the same physical chip can be wired up several different ways depending on use case. A profile is how PipeWire (via ACP — the Audio Configuration Profiles library it inherited from PulseAudio) picks one of those modes and exposes the corresponding sinks/sources to the rest of the system.

For your Xiaomi speaker, `pactl list cards` showed profiles like:
- `output:analog-stereo` — standard 2-channel stereo output only
- `output:analog-stereo+input:analog-stereo` — **"Analog Stereo Duplex"** — stereo output *and* microphone input together
- `output:iec958-stereo` — digital S/PDIF output
- `pro-audio` — the "Pro Audio" profile

Only one profile can be active on a card at a time, and switching profiles changes which sinks/sources appear in `wpctl status` / your sound settings.

## How the profile was actually changed

The switch was made through **PulseAudio Volume Control (`pavucontrol`)**, in the **Configuration tab** — this tab lists each detected sound card and lets you pick which profile is active for it via a dropdown. This is the GUI-equivalent of the `pactl set-card-profile` command, but easier to browse since it shows all available profile names and descriptions for the card at once, rather than requiring you to already know the exact profile string.

The profile selected was **"Analog Stereo Duplex"** — the human-readable label for `output:analog-stereo+input:analog-stereo` — which activates standard stereo playback *and* exposes the speaker's built-in microphone as an input source simultaneously. This was chosen over the plain "Analog Stereo Output" option since it kept the microphone available for use as well, not just playback.

## What is "Pro Audio" profile, specifically?

"Pro Audio" is a special profile designed for **professional audio workflows** — music production, recording studios, JACK-based routing, multi-channel mixing consoles, etc. When active, it:

- Exposes **raw, unprocessed channels** directly, often labeled generically (you saw `AUX0`, `AUX1` instead of the normal `FL`, `FR` — Front-Left/Front-Right)
- **Bypasses the normal consumer audio processing chain** — no automatic channel mapping, no standard stereo conventions, no `pipewire-pulse` compatibility assumptions
- Is meant to be used with software that explicitly understands raw channel routing (like JACK, Ardour, or PipeWire's own low-level graph tools), where the user manually wires inputs to outputs

## Why it broke regular playback

Normal desktop applications (browsers, Spotify, system sounds, etc.) send audio assuming a **standard stereo layout**: "this is the left channel, this is the right channel" (`FL`/`FR`). They expect PipeWire's default policy graph to automatically connect that stereo stream to whatever the default output device is, using standard channel conventions.

Under "Pro Audio" profile, the device exposed `AUX0`/`AUX1` instead — generic, unmapped channels with no automatic `FL`→`AUX0`, `FR`→`AUX1` connection rule built into typical desktop playback policy. So:

- The device existed and reported a valid volume
- Software *could* select it as a destination
- But the actual audio stream never got automatically wired into the right raw channels for sound to come out, since "Pro Audio" expects manual/explicit routing rather than the automatic policy-based routing consumer apps rely on

This is why the symptom was exactly "no errors, volume slider works, nothing comes out" — the routing layer was simply never connected end-to-end, because Pro Audio profile doesn't make the connections desktop apps assume will be made automatically.

## What profile should you choose instead?

For a normal desktop use case — music, video, system sounds, browser audio, voice calls — you want the **plain consumer/analog profile**:

```
output:analog-stereo
```

or, if you also want the microphone available (as was the case here):

```
output:analog-stereo+input:analog-stereo   ("Analog Stereo Duplex")
```

**General rule of thumb:** unless you're specifically doing music production, JACK routing, multi-channel pro audio mixing, or working with specialized audio software that explicitly expects raw channel access, always pick the `analog-stereo` (or duplex) profile over `pro-audio` for any consumer device. "Pro Audio" is a power-user/specialist mode, not a "higher quality" or "better" setting — it's a different *purpose*, not a better version of the same purpose.