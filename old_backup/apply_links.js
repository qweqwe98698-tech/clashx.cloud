const fs = require('fs');
const path = require('path');

const dataPath = path.join(process.cwd(), 'all_matched_unfiltered_links.json');
const missingPath = path.join(process.cwd(), 'missing_airports.json');

const data = require(dataPath);
const missing = require(missingPath);

let foundCount = 0;
const mapping = {};

missing.forEach(name => {
    // Try to find in data
    let exactMatch = data[name];
    if (!exactMatch) {
        // try without spaces or something
        const simpleName = name.split(' ')[0];
        exactMatch = data[simpleName];
    }
    
    if (exactMatch && exactMatch.length > 0) {
        mapping[name] = exactMatch[0].url;
        foundCount++;
    }
});

console.log(`Found ${foundCount} links from all_matched_unfiltered_links.json`);
fs.writeFileSync('resolved_links_from_cache.json', JSON.stringify(mapping, null, 2));

// Now apply to index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');

for (const [name, url] of Object.entries(mapping)) {
    const regex = new RegExp(`(<div id="airport-[^"]+">\\s*<div class="airport-card">\\s*<div class="airport-header">\\s*<div class="airport-title">\\s*<div class="airport-icon">[^<]+</div>\\s*<h3>${name}</h3>[\\s\\S]*?<div class="airport-action">\\s*<a href=")#[^"]*(" target="_blank" class="btn-primary">)`);
    
    indexHtml = indexHtml.replace(regex, `$1${url}$2`);
}

fs.writeFileSync('index.html', indexHtml);
console.log('Applied links to index.html');

// We should also apply to the respective review HTMLs
for (const [name, url] of Object.entries(mapping)) {
    const safeName = name.replace(/[\\/:*?"<>| ]/g, '-');
    const reviewFile = `review-${safeName}.html`;
    if (fs.existsSync(reviewFile)) {
        let reviewHtml = fs.readFileSync(reviewFile, 'utf8');
        reviewHtml = reviewHtml.replace(/<a href="#" target="_blank" class="btn-primary"/g, `<a href="${url}" target="_blank" class="btn-primary"`);
        fs.writeFileSync(reviewFile, reviewHtml);
    }
}
console.log('Applied links to review pages');
