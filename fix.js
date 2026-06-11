const fs = require('fs');
const path = require('path');

function clean(dir, isSub) {
    if(!fs.existsSync(dir)) return;
    for(let f of fs.readdirSync(dir)) {
        if(f.endsWith('.html')) {
            let p = path.join(dir, f);
            let c = fs.readFileSync(p, 'utf8');
            let changed = false;
            
            // Remove duplicates for nav.html or ../nav.html
            let search = isSub ? '../nav.html' : 'nav.html';
            
            // Look for <a href="nav.html" class="active">网址导航</a> followed by <a href="nav.html">网址导航</a>
            let reg1 = new RegExp(`<a href="${search}" class="active">网址导航</a>\\s*<a href="${search}">网址导航</a>`, 'g');
            if (reg1.test(c)) {
                c = c.replace(reg1, `<a href="${search}" class="active">网址导航</a>`);
                changed = true;
            }
            
            // Look for <a href="nav.html">网址导航</a> followed by <a href="nav.html">网址导航</a>
            let reg2 = new RegExp(`<a href="${search}">网址导航</a>\\s*<a href="${search}">网址导航</a>`, 'g');
            if (reg2.test(c)) {
                c = c.replace(reg2, `<a href="${search}">网址导航</a>`);
                changed = true;
            }

            // Also fix index.html just in case there are duplicates
            let idxSearch = isSub ? '../index.html' : 'index.html';
            let reg3 = new RegExp(`<a href="${idxSearch}">首页导航</a>\\s*<a href="${idxSearch}">首页导航</a>`, 'g');
            if (reg3.test(c)) {
                c = c.replace(reg3, `<a href="${idxSearch}">首页导航</a>`);
                changed = true;
            }

            if (changed) {
                fs.writeFileSync(p, c, 'utf8');
                console.log('Cleaned ' + p);
            }
        }
    }
}

clean(__dirname, false);
clean(path.join(__dirname, 'articles'), true);
clean(path.join(__dirname, 'tutorial'), true);
