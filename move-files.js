const fs = require('fs');
const path = require('path');

const srcDir = 'c:\\tailoring\\frontend';
const destDir = 'c:\\tailoring';

function moveFiles(src, dest) {
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  const items = fs.readdirSync(src);
  items.forEach(item => {
    const s = path.join(src, item);
    const d = path.join(dest, item);

    if (fs.statSync(s).isDirectory()) {
      if (item === 'node_modules' || item === 'dist') {
        console.log(`Skipping large directory: ${item}`);
        return;
      }
      moveFiles(s, d);
    } else {
      console.log(`Moving ${s} to ${d}`);
      try {
        fs.renameSync(s, d);
      } catch (e) {
        console.log(`Rename failed for ${item}, trying copy+unlink: ${e.message}`);
        fs.copyFileSync(s, d);
        fs.unlinkSync(s);
      }
    }
  });
}

// Move specific files from frontend root to root
const rootFiles = [
  'package.json',
  'vite.config.js',
  'tailwind.config.ts',
  'postcss.config.js',
  'components.json',
  'tsconfig.json',
  'tsconfig.app.json',
  'tsconfig.node.json',
  'eslint.config.js',
  '.env'
];

rootFiles.forEach(file => {
  const s = path.join(srcDir, file);
  const d = path.join(destDir, file);
  if (fs.existsSync(s)) {
    console.log(`Moving root file ${s} to ${d}`);
    try {
      fs.renameSync(s, d);
    } catch (e) {
      fs.copyFileSync(s, d);
      fs.unlinkSync(s);
    }
  }
});

// Move src and public directories
moveFiles(path.join(srcDir, 'src'), path.join(destDir, 'src'));
moveFiles(path.join(srcDir, 'public'), path.join(destDir, 'public'));

console.log('Move script finished');
