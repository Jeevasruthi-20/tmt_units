const fs = require('fs');

function diagAndRemove(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    console.log(`--- Diagnostics for ${filePath} ---`);
    console.log(`Content length: ${content.length}`);
    
    // Find "Status" and look at surrounding characters
    const statusIndex = content.indexOf('Status');
    if (statusIndex !== -1) {
        console.log(`Found "Status" at index ${statusIndex}`);
        console.log(`Snippet: [${content.substring(statusIndex - 50, statusIndex + 50)}]`);
        
        // Let's look at the char codes around it to see if there are hidden chars
        let snippetCodes = [];
        for (let i = statusIndex - 10; i < statusIndex + 10; i++) {
            snippetCodes.push(`${content[i]}:${content.charCodeAt(i)}`);
        }
        console.log(`Char codes: ${snippetCodes.join(', ')}`);
    } else {
        console.log('Could not find "Status" in file');
    }

    // Try a very broad replacement
    // We want to remove the <th>Status</th>
    // Since there are multiple "Status" occurrences (e.g. state names), we need to be careful
    // But for Class Enrollments, it's specific.
    
    // Looking at my previous view_file:
    // 166:                                             <th className="px-4 py-3">Status</th>
    
    // Let's try splitting by lines and filtering out the target lines
    const lines = content.split(/\r?\n/);
    console.log(`Total lines: ${lines.length}`);
    
    let newLines = [];
    let insideSelect = false;
    let removedHeader = false;
    let removedCell = false;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        
        // Remove the header line (looking for exact match after trim)
        if (!removedHeader && line.trim() === '<th className="px-4 py-3">Status</th>') {
            console.log(`Removing header at line ${i+1}`);
            removedHeader = true;
            continue;
        }
        
        // Remove the cell and Select block
        if (line.includes('<td className="px-4 py-3">') && lines[i+1] && lines[i+1].includes('<Select')) {
            // Check if it's the enrollment status select (not measurement)
            // By looking forward a bit
            let foundEnrollmentStatus = false;
            for (let j = i; j < i + 5; j++) {
                if (lines[j] && lines[j].includes('enrollment.status')) {
                    foundEnrollmentStatus = true;
                    break;
                }
            }
            
            if (foundEnrollmentStatus) {
                console.log(`Starting Select block removal at line ${i+1}`);
                insideSelect = true;
                removedCell = true;
            }
        }
        
        if (insideSelect) {
            if (line.includes('</td>')) {
                insideSelect = false;
            }
            continue;
        }
        
        newLines.push(line);
    }
    
    fs.writeFileSync(filePath, newLines.join('\n'));
    console.log(`Finished processing ${filePath}. Header removed: ${removedHeader}, Cell removed: ${removedCell}`);
}

const dashboardPath = 'c:\\tailoring\\frontend\\src\\pages\\AdminDashboard.jsx';
const completedPath = 'c:\\tailoring\\frontend\\src\\pages\\AdminCompleted.jsx';

try {
    diagAndRemove(dashboardPath);
    diagAndRemove(completedPath);
} catch (err) {
    console.error(`Error: ${err.message}`);
}
