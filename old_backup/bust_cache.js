const fs = require('fs');
const path = require('path');
function walk(dir) {
    fs.readdirSync(dir).forEach(f => {
        const p = path.join(dir, f);
        if (fs.statSync(p).isDirectory() && f !== '.git') {
            walk(p);
        } else if (p.endsWith('.html')) {
            let c = fs.readFileSync(p, 'utf8');
            let changed = false;
            if (c.includes('href="style.css"')) {
                c = c.replace(/href="style\.css"/g, 'href="style.css?v=2"');
                changed = true;
            }
            if (c.includes('href="../style.css"')) {
                c = c.replace(/href="\.\.\/style\.css"/g, 'href="../style.css?v=2"');
                changed = true;
            }
            if (changed) {
                fs.writeFileSync(p, c);
                console.log('Updated ' + p);
            }
        }
    });
}
walk('.');
