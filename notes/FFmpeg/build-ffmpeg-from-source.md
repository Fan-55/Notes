<div style={{ textAlign: 'justify' }}>
# Build FFmpeg From Source

This [Generic Compilation Guide](https://trac.ffmpeg.org/wiki/CompilationGuide/Generic) from FFmpeg's wiki gives us the flow on how to build ffmpeg from its source code. The flow is as follow:

Step1: Configuration

The configuration step allows the creation of the necessary files required by the compilation step. It is done by running a `configure` script.

Step2: Compilation

Running `make` to generates the required binaries and libraries.

Step3: Installation

Running `make install` to install the libraries in `/usr/local`.

The install prefix is used to specify the path to the components that are installed. Its provided through the configure option.

```
configure --prefix=PREFIX
```
PREFIX/bin
PREFIX/include
PREFIX/lib
PREFIX/share

```
./configure \
--prefix=/usr/local/ffmpeg \
--enable-gpl \
--enable-version3 \
--enable-nonfree \
--enable-static \
--enable-shared \
--enable-libass \             # Subtitles & Graphics (renderer for SSA/ASS subtitles)
--enable-libfreetype \        # Subtitles & Graphics (font rendering engine)
--enable-libfdk-aac \         # Audio Encoder: AAC (non-free)
--enable-libopus \            # Audio Encoder: Opus (modern gold standard)
--enable-libspeex \           # Audio Encoder: speex (speech-specific codec. Opus handles speech better now)
--enable-libvorbis \          # Audio Encoder: Vorbis (predecessor to Opus)
--enable-libopenjpeg \        # Video Encoder: JPEG 2000 (Not common)
--enable-libvpx \             # Video Encoder: VP8 and VP9
--enable-libx264 \            # Video Encoder: H.264
--enable-libx265 \            # Video Encoder: H.265
--enable-libtheora \          # Video Encoder: Theora (largely replaced by VP9 and AV1)
--enable-libxvid \            # Video Encoder: MPEG-4 Part 2 (for AVI format)
--enable-libmp3lame \         # Audio Encoder: LAME (for mp3 format)
--enable-libopencore-amrnb \  # Audio Encoder: AMR (narrow band nb: standard, Mobile phone voice recording formats)
--enable-openssl \            # Network (for streaming via HTTPS or RTMPs links)
--enable-libopencore-amrwb \  # Audio Encoder: AMR (wide band wb: HD, Mobile phone voice recording formats)
--extra-cflags="-I/opt/homebrew/Cellar/lame/3.100/include -I/opt/homebrew/Cellar/opencore-amr/0.1.6/include -I/opt/homebrew/Cellar/theora/1.1.1/include -I/opt/homebrew/Cellar/xvid/1.3.7/include -I/opt/homebrew/Cellar/libogg/1.3.5/include" \
--extra-ldflags="-L/opt/homebrew/Cellar/lame/3.100/lib -L/opt/homebrew/Cellar/opencore-amr/0.1.6/lib -L/opt/homebrew/Cellar/theora/1.1.1/lib -L/opt/homebrew/Cellar/xvid/1.3.7/lib -L/opt/homebrew/Cellar/libogg/1.3.5/lib"
```


Stripped version (subtracting rarely used external libraries)

```
./configure \
--prefix=/usr/local/ffmpeg \
--enable-gpl \
--enable-version3 \
--enable-nonfree \
--enable-static \
--enable-shared \
--enable-libx264 \
--enable-libx265 \
--enable-libvpx \
--enable-libmp3lame \
--enable-libfdk-aac \
--enable-libopus \
--enable-libass \
--enable-libfreetype \
--enable-openssl \
--extra-cflags="-I/opt/homebrew/Cellar/lame/3.100/include" \
--extra-ldflags="-L/opt/homebrew/Cellar/lame/3.100/lib"
```

https://trac.ffmpeg.org/wiki/CompilationGuide/macOS
</div>

## Troubleshooting

### Library not loaded error

```
./ffmpeg dyld[96308]: Library not loaded: /opt/homebrew/opt/theora/lib/libtheoraenc.1.dylib Referenced from: <2EC67925-8C67-3A81-8280-E322E85A1EAE> /usr/local/ffmpeg/bin/ffmpeg Reason: tried: '/opt/homebrew/opt/theora/lib/libtheoraenc.1.dylib' (no such file), '/System/Volumes/Preboot/Cryptexes/OS/opt/homebrew/opt/theora/lib/libtheoraenc.1.dylib' (no such file), '/opt/homebrew/opt/theora/lib/libtheoraenc.1.dylib' (no such file), '/opt/homebrew/Cellar/theora/1.2.0/lib/libtheoraenc.1.dylib' (no such file), '/System/Volumes/Preboot/Cryptexes/OS/opt/homebrew/Cellar/theora/1.2.0/lib/libtheoraenc.1.dylib' (no such file), '/opt/homebrew/Cellar/theora/1.2.0/lib/libtheoraenc.1.dylib' (no such file)
```


Even though the path to the dynamic library is told to the linker by specifying the `--extra-ldflags -L/opt/homebrew/Cellar/theora/1.1.1/lib`, the library `libtheoraenc.1.dylib` itself contains an **install name** that points to `/opt/homebrew/opt/theora/lib/libtheoraenc.1.dylib`.

This can be verify by:
```
otool -D /opt/homebrew/Cellar/theora/1.1.1/lib/libtheoraenc.1.dylib
```
The output would be

```
/opt/homebrew/opt/theora/lib/libtheoraenc.1.dylib
```


## Linux

https://trac.ffmpeg.org/wiki/CompilationGuide/Ubuntu

```
./configure \
--prefix=/usr/local/ffmpeg \
--enable-gpl \
--enable-version3 \
--enable-nonfree \
--enable-static \
--enable-shared \
--enable-libx264 \
--enable-libx265 \
--enable-libvpx \
--enable-libmp3lame \
--enable-libfdk-aac \
--enable-libopus \
--enable-libass \
--enable-libfreetype \
--enable-openssl \
--extra-cflags="-I/opt/homebrew/Cellar/lame/3.100/include" \
--extra-ldflags="-L/opt/homebrew/Cellar/lame/3.100/lib"
```
