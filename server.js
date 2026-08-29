const express = require('express');
const fs = require('fs');
const path = require('path');
const { getFilesForFolder, generateFilesJs, FOLDERS, FOLDER_MAP } = require('./generate');

// LiveReload Setup
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");

const liveReloadServer = livereload.createServer({
  exts: ['html', 'css', 'js', 'json', 'jpg', 'png', 'gif', 'svg']
});
liveReloadServer.watch([
  __dirname,
  path.join(__dirname, 'assets'),
  path.join(__dirname, 'input')
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
  const parentDir = FOLDER_MAP[folder];
  const dirPath = path.join(__dirname, parentDir, folder);
  if (fs.existsSync(dirPath)) {
    console.log(`[Server] Watching folder: ${parentDir}/${folder}`);
    fs.watch(dirPath, (eventType, filename) => {
      // Ignore backup files/folders changed in the watcher
      if (filename && filename.toLowerCase().includes('backup')) {
        return;
      }
      
      clearTimeout(watchTimeout);
      watchTimeout = setTimeout(() => {
        try {
          console.log(`[Watcher] Change detected in ${parentDir}/${folder}. Regenerating files.js...`);
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

// API endpoint to get files dynamically from any subfolder
app.get('/api/files', (req, res) => {
  const folder = req.query.folder;
  if (!folder || !FOLDER_MAP[folder]) {
    return res.status(400).json({ error: 'invalid or missing folder query parameter' });
  }

  const parentDir = FOLDER_MAP[folder];
  const resolvedDir = path.join(__dirname, parentDir, folder);

  if (!fs.existsSync(resolvedDir)) {
    return res.status(404).json({ error: `Folder not found: ${parentDir}/${folder}` });
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
      .map(file => `${parentDir}/${folder}/${file}`);

    res.json(files);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// API endpoint to scan ANY relative folder path (used by CCTV path settings)
app.get('/api/files/scan', (req, res) => {
  const relPath = req.query.path;
  if (!relPath) {
    return res.status(400).json({ error: 'Missing ?path= parameter' });
  }

  // Safety: resolve and confirm it stays inside the project root
  const resolved = path.resolve(__dirname, relPath);
  if (!resolved.startsWith(__dirname)) {
    return res.status(403).json({ error: 'Path outside project root is not allowed' });
  }

  if (!fs.existsSync(resolved)) {
    return res.status(404).json({ error: `Folder not found: ${relPath}` });
  }

  const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'];
  const VIDEO_EXTS = ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv'];
  const ALL_EXTS = [...IMAGE_EXTS, ...VIDEO_EXTS];

  try {
    const files = fs.readdirSync(resolved)
      .filter(file => {
        if (file.toLowerCase().includes('backup')) return false;
        try {
          const stat = fs.statSync(path.join(resolved, file));
          return stat.isFile() && ALL_EXTS.includes(path.extname(file).toLowerCase());
        } catch (e) { return false; }
      })
      .map(file => relPath.replace(/\/+$/, '') + '/' + file);

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
  console.log(`🚀 Bindsol.util Server running at http://localhost:${PORT}`);
  console.log(`Watching folders: assets/${FOLDERS.join(', assets/')}`);
  console.log(`Ignoring any backup* folders`);
  console.log(`==================================================\n`);
});
