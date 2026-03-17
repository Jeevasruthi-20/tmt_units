const fs = require('fs');
const path = require('path');

const source = "C:\\Users\\jeeva\\.gemini\\antigravity\\brain\\63d6c44f-12f8-49f9-a36e-378584263341\\lehenga_guide_premium_1773685827285.png";
const dest = "c:\\tailoring\\frontend\\public\\images\\lehenga-guide-premium.png";

try {
    fs.copyFileSync(source, dest);
    console.log(`Successfully copied ${source} to ${dest}`);
    const stats = fs.statSync(dest);
    console.log(`File size: ${stats.size} bytes`);
} catch (err) {
    console.error(`Error copying file: ${err.message}`);
    process.exit(1);
}
