const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const articlesDir = path.join(rootDir, 'articles');
const tutorialDir = path.join(rootDir, 'tutorial');

function updateHtmlFiles(dir, isSubdir = false) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file.endsWith('.html') && file !== 'free-id.html') {
            const filePath = path.join(dir, file);
            let content = fs.readFileSync(filePath, 'utf-8');
            
            // Check if already updated
            if (content.includes('免费ID共享</a>')) {
                continue;
            }

            const prefix = isSubdir ? '../' : '';
            const searchStr1 = `<a href="${prefix}nav.html" class="active">网址导航</a>`;
            const searchStr2 = `<a href="${prefix}nav.html">网址导航</a>`;
            const searchStr3 = `<a href="nav.html">网址导航</a>`; // Catch all
            
            if (content.includes(searchStr1)) {
                content = content.replace(searchStr1, `${searchStr1}\n                <a href="${prefix}free-id.html">免费ID共享</a>`);
                fs.writeFileSync(filePath, content, 'utf-8');
            } else if (content.includes(searchStr2)) {
                content = content.replace(searchStr2, `${searchStr2}\n                <a href="${prefix}free-id.html">免费ID共享</a>`);
                fs.writeFileSync(filePath, content, 'utf-8');
            } else if (content.includes(searchStr3) && isSubdir) {
                // Sometime subdirs use absolute or wrong relative paths
                content = content.replace(searchStr3, `${searchStr3}\n                <a href="${prefix}free-id.html">免费ID共享</a>`);
                fs.writeFileSync(filePath, content, 'utf-8');
            } else {
                 console.log(`Could not find nav link in ${filePath}`);
            }
        }
    }
}

updateHtmlFiles(rootDir, false);
updateHtmlFiles(articlesDir, true);
updateHtmlFiles(tutorialDir, true);

// Update JS files
function updateJsFiles(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file.endsWith('.js') && file !== 'update_nav_script.js' && file !== 'update_nav_script2.js' && file !== 'fix.js') {
            const filePath = path.join(dir, file);
            let content = fs.readFileSync(filePath, 'utf-8');
            
            if (content.includes('免费ID共享</a>')) {
                continue;
            }

            const searchStr1 = `<a href="../nav.html">网址导航</a>`;
            const searchStr2 = `<a href="nav.html">网址导航</a>`;
            
            let changed = false;
            if (content.includes(searchStr1)) {
                content = content.replace(new RegExp(searchStr1.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), `${searchStr1}\\n                <a href="../free-id.html">免费ID共享</a>`);
                changed = true;
            } else if (content.includes(searchStr2)) {
                content = content.replace(new RegExp(searchStr2.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), `${searchStr2}\\n                <a href="free-id.html">免费ID共享</a>`);
                changed = true;
            }
            
            if (changed) {
                fs.writeFileSync(filePath, content, 'utf-8');
                console.log(`Updated JS template in ${file}`);
            }
        }
    }
}
updateJsFiles(rootDir);
