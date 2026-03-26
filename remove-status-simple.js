const fs = require('fs');

function clean(p) {
    let c = fs.readFileSync(p, 'utf8');
    // Remove the th
    c = c.replace(/<th[^>]*>\s*Status\s*<\/th>/g, '');
    // Remove the td with Select
    c = c.replace(/<td[^>]*>[\s\S]*?enrollment\.status[\s\S]*?<\/td>/g, '');
    fs.writeFileSync(p, c);
}

clean('c:\\tailoring\\frontend\\src\\pages\\AdminDashboard.jsx');
clean('c:\\tailoring\\frontend\\src\\pages\\AdminCompleted.jsx');
console.log('done');
