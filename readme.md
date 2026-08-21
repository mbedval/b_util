# Collage Applications

This repository contains two interactive collage applications for displaying animations and videos in an artistic, interactive layout.

## Getting Started & How to Use

To make resources load dynamically when they are added or changed in the asset folders, we use a lightweight local server and directory watcher.

### Option 1: Using the Local Server (Recommended)
This runs a watcher that updates your asset lists automatically as you add/remove files:
1. Ensure you have **Node.js** installed.
2. In the project directory, install dependencies:
   ```bash
   npm install
   ```
3. Start the server and watcher:
   ```bash
   npm start
   ```
4. Open **`http://localhost:3000`** in your browser.
5. Add, remove, or rename files inside `assets/animation`, `assets/videos`, or `assets/wallpapers`. The watcher will automatically update the file list (`files.js`) in real-time.

### Option 2: Running Static (Without Web Server)
If you prefer to run files using the `file://` protocol (double-clicking the `.html` files directly):
1. Install dependencies once: `npm install`
2. Whenever you modify files in the `assets/` folders, run the generator script once:
   ```bash
   npm run generate
   ```
3. Open `index.html` (or any app page) directly in your browser. It will use the generated list from `files.js`.

---

## Applications

### 🎨 Animation Collage (animation.html)

An interactive collage displaying GIF and WebP animations with artistic layout and interactive features.

**Features:**
- **Artistic Layout**: 8 images displayed in varied shapes (squares, rectangles, circles) with different sizes and rotations
- **Click to Focus**: Click any image to bring it to center, straighten it, and change frame shape to rounded rectangle
- **Magnetic Repulsion**: Other images push away from center when one is focused (similar to magnetic poles)
- **Dimming Effect**: Non-focused images become dimmed and blurred
- **Scroll to Shuffle**: Use mouse wheel to shuffle through different animations
- **Auto-detection**: Attempts to detect additional animation files in the folder
- **Animated Border**: Progress-style gradient border animation around the container
- **Responsive Design**: Adapts to mobile screens

**How to Use:**
1. Open `animation.html` in a browser
2. Click any image to focus it (centers and straightens)
3. Click the focused image again or click background to return to normal
4. Scroll mouse wheel to shuffle through different animations
5. Hover over images for subtle zoom effect

**File Structure:**
- Reads files from `animation/` folder
- Supports `.gif` and `.webp` formats
- Currently displays 8 animation files

### 🎬 Video Collage (video.html)

A video collage application with full-screen playback and interactive controls.

**Features:**
- **Artistic Layout**: Same varied shapes and sizes as animation collage
- **Full-Screen Playback**: Click video to expand to full browser viewport
- **Play/Pause Control**: 
  - First click: expands to full screen and plays
  - Second click: pauses video (stays in full screen)
  - Click × button: returns to collage view
- **Close Button**: Dedicated × button appears in corner when video is focused
- **State Preservation**: Maintains play/pause state when shuffling through videos
- **Scroll to Shuffle**: Mouse wheel shuffles through 66 video files
- **Animated Border**: Progress-style gradient border animation
- **Complete Library**: Includes all 66 video files from the videos folder

**How to Use:**
1. Open `video.html` in a browser
2. Click any video thumbnail to expand to full screen and play
3. Click video again to pause playback
4. Click × button (top-right corner) to return to collage view
5. Scroll mouse wheel to shuffle through different videos
6. Play/pause state is preserved when shuffling

**File Structure:**
- Reads files from `videos/` folder
- Supports `.mp4`, `.webm`, `.ogg`, `.mov`, `.avi`, `.mkv` formats
- Currently includes 66 video files

### 📹 CCTV Control Center (CCTV.html)

A security control room dashboard that showcases active video streams from the `assets/videos` folder as multiple security camera feeds.

**Features:**
- **Adjustable Monitor Layouts**: Toggles between Grid 2x2 (4 streams), Grid 3x3 (9 streams), Grid 4x4 (16 streams), or Split 1+5 (1 large primary monitor + 5 sidebar monitors).
- **Security-Themed Visual Filters**: Features RAW COLOR, B&W MONO, NIGHT VISION (phosphor green tint), and AMBER CRT presets.
- **CRT Effects Toggle**: Optional retro CRT scanlines and noise animations.
- **Auto-Cycle Streams**: Toggles automatic feed rotation/shuffling.
- **Dynamic Security Logs**: Features a real-time event logging console terminal that displays system messages, motion trigger notifications, and simulation alarms.
- **Interactive Audio & Fullscreen**: Hovering un-dims videos, single-clicking selects a camera (plays audio/unmutes), and double-clicking zooms into client fullscreen mode with full HUD.
- **Simulated Alarm System**: Interactively triggers high-alert flashing overlays and distress events.

**How to Use:**
1. Open `CCTV.html` in a browser.
2. Select your desired grid layout and filter preset from the Control Board.
3. Click on a monitor to listen to its audio feed.
4. Double-click any monitor to view it in full screen. Double-click again or click the close (×) button to exit.
5. Use the mouse scroll wheel to shuffle and rotate camera feeds in real time.

**File Structure:**
- Reads files from `videos/` folder.
- Supports `.mp4`, `.webm`, `.ogg`, `.mov`, `.avi`, `.mkv` formats.

### 📺 Retro CRT Television (Television.html)

A simulated vintage wood-cabinet CRT television that starts with a classic SMPTE "No Signal" color bars pattern and synthesised white noise, switching into a modern Android TV smart launcher.

**Features:**
- **No-Signal Simulator**: Plays visual static overlays and generates real synthesised white noise audio using the Web Audio API.
- **Booting Sequence**: A retro boot loader screen animation before accessing smart controls.
- **Android TV Launcher**: An interactive smart TV dashboard displaying a scrolling grid of animations and videos.
- **D-Pad Keyboard Navigation**: Fully navigates up/down/left/right through thumbnail rows using keyboard arrow keys and Enter to play.
- **Analog TV Dials**: Functional physical knobs (rotary dials) on the TV cabinet to change channels or volume.
- **Tuner Static Glitch**: Simulates brief tuner static distortion when switching channels or changing streams.
- **Retro Screen Filters**: Adjusts display filters (Raw Color, B&W Mono, Sepia CRT) on the active video player.
- **Remote Control HUD**: Floating remote control panel to manage d-pad navigation, input selectors, muting, and power.

**How to Use:**
1. Open `Television.html` in a browser.
2. Click the Red **POWER** button (or press `Spacebar`) to turn on the TV.
3. Click the rotary **CHANNEL** dial or click **INPUT** on the remote to tune past the color bars.
4. Use your keyboard Arrow keys or remote control D-pad to navigate the launcher.
5. Highlight an item and press `Enter` (or click `OK` on remote) to play it.
6. Press `Backspace` / `Escape` (or `Return` on remote) to return to the Android TV dashboard.

**File Structure:**
- Reads files from `videos/` and `animation/` folders.

### 📱 Mobile Media Simulator (mobile.html)

A premium hybrid smartphone simulator (blending styling from iOS and Android) that houses a smart lock screen, home apps launcher, media photos gallery grid, and an interactive TikTok/Reels-style vertical video swiper.

**Features:**
- **Lock Screen & Notifications**: Displays battery status, wifi signal, digital clock, and mock alert notifications. Can be unlocked by tapping the lock screen or clicking the physical side power button.
- **Dynamic Island**: Displays context messages at the top of the phone frame that expands or collapses dynamically (e.g. boot status, locks, active loops).
- **Auto-Onboarding Tutorial**: Displays a virtual finger pointer that automatically slides over and clicks/taps the **Videos** app icon on the home screen upon unlock.
- **Photos Gallery**: Inside the app, video items from the videos assets folder are shown in a modern grid (similar to Apple/Google Photos). Single-clicking focus-plays a preview, and double-clicking launches fullscreen play mode.
- **TikTok/Reels Player**: Zooms the video into vertical viewport mode. Supported overlays include:
  - Spinning vinyl soundtrack disc.
  - Sidebar action metrics (like count, comment count, share).
  - Floating bubble heart animations.
  - Heart Pop double-tap interaction: double-clicking or pressing `L` spawns a large red heart at the tap coordinates.
  - Slide navigation: swipe or use `Arrow Up` / `Arrow Down` keys to scroll vertically between videos.
  - Bottom seekbar progress indicators.

**How to Use:**
1. Open `mobile.html` in a browser.
2. Click the swipe prompt at the bottom of the lock screen (or click the physical side power key) to unlock.
3. Observe the automated onboarding finger animation as it selects and launches the Gallery app.
4. Use the arrow keys or mouse to explore the grid. Double-click any card to launch the Reels feed.
5. In Reels mode, press `Arrow Up/Down` to cycle loops. Double-click to like and launch floating hearts.
6. Click the back button `◀` in the corner to return to the Gallery grid.

**File Structure:**
- Reads files from `videos/` folder.

### 💬 Chat Story Simulator (Whatsapp.html)

A smartphone mockup simulation running a WhatsApp/Telegram-style chat app. It loads conversational scripts from a JSON configuration to replay chat histories with dynamic bubble animations, typing delay cues, and zoomable attachment lightboxes.

**Features:**
- **Dynamic Script Playback**: Reads `assets/chatstory/story.json` dynamically and scrolls through message bubbles sequentially, displaying custom typing indicators (e.g. *Bob is typing...*) beforehand.
- **Rich Bubble Layouts**: Supports outgoing right-aligned bubbles (Alice / User) and incoming left-aligned bubbles (Bob & Charlie) with colored user headers, timestamps, and blue read receipt checkmarks.
- **Rich Media Support**: Handles text dialogs and image attachments seamlessly. Clicking on an image bubble slides it into a full-screen zoomable lightbox view.
- **Notification Pings**: Synthesizes and plays classic double-pip audio alerts as messages land in the chat area.
- **Interactive Controls**: Users can type and send their own text messages inside the bottom text input. Sending a message triggers an immediate typing status cue and an automated smart chatbot reply from other group members.
- **Replay & Clear Dials**: Sidebar control panel buttons to clean the log or restart the scripted chat sequence.

**How to Use:**
1. Open `Whatsapp.html` in a browser.
2. Swipe or click to unlock the phone.
3. Observe the automated tap cursor as it highlights and opens the WhatsApp app.
4. Watch the scripted chat thread run. Click any image bubble to zoom into it.
5. Use the bottom keyboard input to type your own text, and press `Enter` (or click Send) to interact with group bots.
6. Click the sidebar buttons to Clear or Replay the conversation.

**File Structure:**
- Reads script from `assets/chatstory/story.json`.
- Displays images from `assets/chatstory/images/`.

### 🐦 Custom Post Generator (twitter.html)

An interactive dashboard mockup mimicking X/Twitter post cards, supporting real-time text style compilation for customized highlights, strikethroughs, and spoiler masks.

**Features:**
- **Mobile Mockup Frame**: Displays the output post inside a high-fidelity smartphone device screenshot container with dynamic mobile status bar indicators and a home swipe indicator.
- **Scrollable Feed context**: Renders a vertical scroll feed context with dummy posts from Bob and Charlie. These surrounding posts are styled with a privacy blur filter, keeping focus on the active editable card.
- **Tag User handle**: Renamed from general highlighter; formats handle names (like `@mbedva`) as interactive, blue bold user profiles.
- **Yellow Highlighter**: High-impact highlighter mapping that paints text in a bright yellow background and enlarges the font size to 1.5x of the body text flow.
- **Spoiler Mask (< 21%)**: Centers mathematical asterisk code masks strictly capped below 21% of the total string length, offering a dynamic click-to-reveal toggle.
- **Interactive Metrics**: Real-time reactive counters for comments, likes, reposts, and bookmarks.
- **Presets Panel**: Quick-fill buttons for test data.

**How to Use:**
1. Open `twitter.html` in a browser.
2. Edit the Name and Handle fields on the left.
3. Type a message in the textarea, or click one of the pre-fill preset buttons.
4. Input custom highlight, strike, and mask phrases.
5. Click on the blacked-out spoiler blocks inside the card preview to reveal the words.
6. Toggle theme buttons at the top right of the card to preview styling differences.

### 🎞️ Style Morph Animator (image2video.html)

A high-speed sequential image-to-video animator that plays a series of images (e.g. style-transfer frames) from the `assets/gif2video` folder in sequence, creating a smooth morphing animation.

**Features:**
- **Zero-Flicker Playback**: Preloads and stacks all frames in the browser DOM to guarantee absolutely smooth, hardware-accelerated playback.
- **Loop Modes**: Support for Continuous Loop, Ping-Pong (Bounce ⇄), and Play Once.
- **Speed & Control**: Adjustable Frame Rate (FPS) slider from 1 FPS to 60 FPS, and timeline scrubbing slider.
- **Interactive Playlist**: Sidebar displaying thumbnails of all frames, allowing you to select/deselect specific frames to include in the animation, and reorder the sequence manually.
- **Multiple Themes & Backgrounds**: Customize page background styles (Dark, Light, Checkerboard) and themes (Warm Dark, Cyberpunk, Forest, Monochrome).
- **Keyboard Shortcuts**: Spacebar for play/pause, Arrow keys for navigation/speed, and Number keys 1-9 to jump directly to frames.

**How to Use:**
1. Open `image2video.html` in a browser.
2. Wait for the preloader to cache all images.
3. Use the control bar to adjust the FPS, timeline slider, or loop style.
4. Click on the viewport to play/pause.
5. In the sidebar, toggle checkboxes to exclude frames, or use up/down arrows to reorder.

**File Structure:**
- Reads files from `assets/gif2video/` folder
- Supported image formats: `.png`, `.jpg`, `.jpeg`, `.webp`, `.gif`, etc.

## Shared Features

Both applications include:
- **Dark gradient background** (#1a1a2e to #0f3460)
- **Smooth animations** and transitions
- **Hover effects** on images/videos
- **Magnetic repulsion** when items are focused
- **Progress-style animated border** around container
- **Responsive mobile design**
- **No title text** for clean aesthetic

## Technical Details

### Animation Collage
- Uses HTML5 `<img>` elements for GIF/WebP display
- CSS transforms for rotation and positioning
- JavaScript for click handling and shuffling
- Fisher-Yates shuffle algorithm for randomization

### Video Collage
- Uses HTML5 `<video>` elements with native browser controls
- `position: fixed` for full-screen playback
- JavaScript state tracking for play/pause preservation
- Preloads video metadata for better performance

## Browser Compatibility

- Modern browsers with HTML5 support
- Chrome, Firefox, Safari, Edge recommended
- Requires JavaScript enabled
- Video playback requires browser codec support

## File Organization

```
collage/
├── index.html          # Main landing page with app list
├── animation.html      # Animation collage application
├── video.html          # Video collage application
├── CCTV.html           # CCTV security control dashboard
├── Television.html     # Retro CRT television application
├── mobile.html         # Mobile layout simulator application
├── Whatsapp.html       # Chat story simulator application
├── twitter.html        # Custom post generator application
├── image2video.html    # Style morph animator application
├── presentation.html   # Presentation slideshow application
├── diagonal.html       # Diagonal split-screen application
├── readme.md           # This documentation file
├── package.json        # Node.js project configuration
├── generate.js         # Static assets list generator
├── server.js           # Local Web Server and Folder Watcher
├── files.js            # Auto-generated asset list (window.collageFiles)
└── assets/             # Active asset folder (ignores backup* folders)
    ├── animation/      # GIF and WebP animation files
    ├── videos/         # MP4 and WebM video files
    ├── wallpapers/     # Slideshow and wallpaper image files
    ├── gif2video/      # Sequence of style-transfer image files
    └── chatstory/      # JSON dialog file and message images
```


## Customization

To add your own files:
- **Animations**: Place GIF/WebP/images in `assets/animation/`
- **Videos**: Place MP4/WebM/videos in `assets/videos/`
- **Wallpapers**: Place JPEG/PNG/images in `assets/wallpapers/`
- **Gif2Video**: Place sequential images (style-transfer sequence) in `assets/gif2video/`
- *Note:* Files are indexed automatically on server start or folder change. You do not need to edit any HTML files.

## Performance Notes

- Videos are preloaded with metadata only for faster initial load.
- Full video loading occurs when clicked.
- Shuffling pauses all videos during transition.
- State is preserved across shuffles for a seamless experience.

