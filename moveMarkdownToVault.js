#!/usr/bin/env node

const chokidar = require('chokidar');
const fs = require('fs-extra');
const path = require('path');

// ✅ Replace this with the actual path to your Obsidian vault folder
const vaultDir = path.join(
  '/Users',
  'donaliai',
  'workspaces',
  'Obsidian',
  'maccasworld',
  '2-AREAS',
  'Obsidian-HOLS',
  'Holiday Reviews from Chat'
);

const downloadsDir = path.join(require('os').homedir(), 'Downloads');

// Log Debug Options
console.log('📁 Watching folder:', downloadsDir);
console.log('📁 Moving files to:', vaultDir);

chokidar
  .watch(`${downloadsDir}`, { persistent: true, ignoreInitial: false })
  .on('add', async (filePath, event, pathSeen) => {
    if (!filePath.endsWith('.md')) return;
    console.log(`📡 ${event} — ${pathSeen}`);
    try {
      const fileName = path.basename(filePath);
      const destPath = path.join(vaultDir, fileName);

      console.log(`📥 Detected: ${fileName} — Moving to Vault...`);

      await fs.move(filePath, destPath, { overwrite: false });

      console.log(`✅ Success: ${fileName} moved to ${destPath}`);
    } catch (err) {
      console.error(`❌ Error:`, err);
    }
  });

console.log(`👀 Watching Downloads folder for .md files...`);
