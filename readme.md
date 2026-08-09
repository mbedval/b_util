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
    └── wallpapers/     # Slideshow and wallpaper image files
```


## Customization

To add your own files:
- **Animations**: Place GIF/WebP/images in `assets/animation/`
- **Videos**: Place MP4/WebM/videos in `assets/videos/`
- **Wallpapers**: Place JPEG/PNG/images in `assets/wallpapers/`
- *Note:* Files are indexed automatically on server start or folder change. You do not need to edit any HTML files.

## Performance Notes

- Videos are preloaded with metadata only for faster initial load.
- Full video loading occurs when clicked.
- Shuffling pauses all videos during transition.
- State is preserved across shuffles for a seamless experience.

