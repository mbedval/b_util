const fs = require('fs');
const path = require('path');

const BASE_DIR = path.join(__dirname, 'assets');
const FOLDERS = ['animation', 'wallpapers', 'videos'];

const EXTENSIONS = {
  animation: ['.gif', '.webp', '.jpg', '.jpeg', '.png', '.bmp', '.svg'],
  wallpapers: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg'],
  videos: ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv']
};

function getFilesForFolder(folder) {
  const dirPath = path.join(BASE_DIR, folder);
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  
  // Explicitly ignore any folder/path containing "backup"
  if (folder.toLowerCase().includes('backup') || dirPath.toLowerCase().includes('backup')) {
    console.log(`[Generator] Ignoring backup folder: ${folder}`);
    return [];
  }
  
  try {
    const files = fs.readdirSync(dirPath);
    const exts = EXTENSIONS[folder] || [];
    
    return files
      .filter(file => {
        // Ignore backup files/folders
        if (file.toLowerCase().includes('backup')) {
          return false;
        }
        
        try {
          const fullPath = path.join(dirPath, file);
          const stat = fs.statSync(fullPath);
          if (!stat.isFile()) return false;
          
          const ext = path.extname(file).toLowerCase();
          return exts.includes(ext);
        } catch (e) {
          return false;
        }
      })
      .map(file => `assets/${folder}/${file}`);
  } catch (error) {
    console.error(`[Generator] Error reading folder ${folder}:`, error);
    return [];
  }
}

function generateFilesJs() {
  const collageFiles = {};
  FOLDERS.forEach(folder => {
    collageFiles[folder] = getFilesForFolder(folder);
  });
  
  const content = `// This file is auto-generated. Do not edit manually.\nwindow.collageFiles = ${JSON.stringify(collageFiles, null, 2)};\n`;
  fs.writeFileSync(path.join(__dirname, 'files.js'), content, 'utf-8');
  console.log(`Generated files.js with:\n - ${collageFiles.animation.length} animations\n - ${collageFiles.wallpapers.length} wallpapers\n - ${collageFiles.videos.length} videos`);
}

if (require.main === module) {
  generateFilesJs();
}

module.exports = { getFilesForFolder, generateFilesJs, FOLDERS, BASE_DIR };
