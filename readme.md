# Collage Applications

This repository contains two interactive collage applications for displaying animations and videos in an artistic, interactive layout.

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
├── readme.md          # This documentation file
├── animation/         # Folder for GIF/WebP files
│   └── (8 animation files)
└── videos/            # Folder for video files
    └── (66 MP4 files)
```

## Getting Started

1. Clone or download this repository
2. Open `index.html` in a web browser
3. Click on either app card to launch the desired application
4. Alternatively, open `animation.html` or `video.html` directly

## Customization

To add your own files:
- **Animations**: Place GIF/WebP files in the `animation/` folder
- **Videos**: Place video files in the `videos/` folder
- Update the file arrays in the HTML if needed for hardcoded paths

## Performance Notes

- Videos are preloaded with metadata only for faster initial load
- Full video loading occurs when clicked
- Shuffling pauses all videos during transition
- State is preserved across shuffles for seamless experience
