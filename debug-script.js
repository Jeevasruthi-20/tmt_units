const { execSync } = require('child_process');
const fs = require('fs');

try {
  let gitOut = execSync('git status', { cwd: 'c:\\tailoring' }).toString();
  fs.writeFileSync('c:\\tailoring\\git-status-dump.txt', gitOut);
} catch (e) {
  fs.writeFileSync('c:\\tailoring\\git-status-dump.txt', e.stdout ? e.stdout.toString() : e.message);
}

try {
  let lintOut = execSync('npx eslint .', { cwd: 'c:\\tailoring\\frontend' }).toString();
  fs.writeFileSync('c:\\tailoring\\lint-dump.txt', lintOut);
} catch (e) {
  fs.writeFileSync('c:\\tailoring\\lint-dump.txt', e.stdout ? e.stdout.toString() : e.message);
}

try {
  let buildOut = execSync('npm run build', { cwd: 'c:\\tailoring\\frontend' }).toString();
  fs.writeFileSync('c:\\tailoring\\build-dump.txt', buildOut);
} catch (e) {
  fs.writeFileSync('c:\\tailoring\\build-dump.txt', e.stdout ? e.stdout.toString() : e.message);
}
