const express = require('express');
const fs = require('fs');
const path = require('path');
const { getFilesForFolder, generateFilesJs, FOLDERS, BASE_DIR } = require('./generate');

// LiveReload Setup
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");

const liveReloadServer = livereload.createServer({
  exts: ['html', 'css', 'js', 'json', 'jpg', 'png', 'gif', 'svg']
});
liveReloadServer.watch([
  __dirname,
  path.join(__dirname, 'assets')
]);

const app = express();
const PORT = 3000;

// Connect LiveReload middleware (injects script tag dynamically into served pages)
app.use(connectLiveReload());

// Generate files.js on startup
console.log('[Server] Initializing files.js...');
generateFilesJs();

// Setup folder watching (only watching our designated active asset folders)
let watchTimeout;
FOLDERS.forEach(folder => {
  const dirPath = path.join(BASE_DIR, folder);
  if (fs.existsSync(dirPath)) {
    console.log(`[Server] Watching folder: assets/${folder}`);
    fs.watch(dirPath, (eventType, filename) => {
      // Ignore backup files/folders changed in the watcher
      if (filename && filename.toLowerCase().includes('backup')) {
        return;
      }
      
      clearTimeout(watchTimeout);
      watchTimeout = setTimeout(() => {
        try {
          console.log(`[Watcher] Change detected in assets/${folder}. Regenerating files.js...`);
          generateFilesJs();
          // Notify clients to refresh
          setTimeout(() => {
            liveReloadServer.refresh("/");
          }, 150);
        } catch (e) {
          console.error('[Watcher] Error in change handler:', e);
        }
      }, 300);
    });
  }
});

// API endpoint to get files dynamically from any assets/ subfolder
app.get('/api/files', (req, res) => {
  const folder = req.query.folder;
  if (!folder) {
    return res.status(400).json({ error: 'folder query parameter is required' });
  }

  // Resolve the requested folder inside assets/ and guard against path traversal
  const assetsDir = path.join(__dirname, 'assets');
  const resolvedDir = path.resolve(assetsDir, folder);
  if (!resolvedDir.startsWith(assetsDir)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  if (!fs.existsSync(resolvedDir)) {
    return res.status(404).json({ error: `Folder not found: assets/${folder}` });
  }

  const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
  const VIDEO_EXTS = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];
  const ALL_EXTS = [...IMAGE_EXTS, ...VIDEO_EXTS];

  try {
    const files = fs.readdirSync(resolvedDir)
      .filter(file => {
        if (file.toLowerCase().includes('backup')) return false;
        try {
          const stat = fs.statSync(path.join(resolvedDir, file));
          if (!stat.isFile()) return false;
          return ALL_EXTS.includes(path.extname(file).toLowerCase());
        } catch (e) { return false; }
      })
      .map(file => `assets/${folder}/${file}`);

    res.json(files);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Serve static files from the root directory
app.use(express.static(__dirname));

// Start server
app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`🚀 Collage Server running at http://localhost:${PORT}`);
  console.log(`Watching folders: assets/${FOLDERS.join(', assets/')}`);
  console.log(`Ignoring any backup* folders`);
  console.log(`==================================================\n`);
});
