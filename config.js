// Bindsol.util Global Configuration
// Edit this file to change which folders each application reads from.
// All custom folders should be placed in the "input" directory.

const config = {
    apps: {
        "cctv": {
            folder: "videos",
            parent: "input",
            type: "video"
        },
        "videoViewer": {
            folder: "videos",
            parent: "input",
            type: "video"
        },
        "retroTV": {
            folder: "videos",
            parent: "input",
            type: "video"
        },
        "mobileSimulator": {
            folder: "mobilevideos",
            parent: "input",
            type: "video"
        },
        "animationGallery": {
            folder: "animation",
            parent: "input",
            type: "image"
        },
        "presentation": {
            folder: "wallpapers",
            parent: "input",
            type: "image"
        },
        "styleMorph": {
            folder: "gif2video",
            parent: "input",
            type: "image"
        },
        "stockCall": {
            folder: "stockcall",
            parent: "assets",
            type: "image"
        },
        "chatStory": {
            folder: "chatstory",
            parent: "input",
            type: "json"
        }
    },
    extensions: {
        video: ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'],
        image: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'],
        json: ['.json']
    }
};

// Export for Node.js Backend
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
}
// Attach to window for Browser Frontend
if (typeof window !== 'undefined') {
    window.BindsolConfig = config;
}
