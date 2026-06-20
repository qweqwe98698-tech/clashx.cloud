const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Reverse details to div
html = html.replace(/<details id="airport-([^"]+)" class="journal-card airport-card details-card"(.*?)>/g, '<div id="airport-$1" class="journal-card airport-card"$2>');

// Reverse summary to div
html = html.replace(/<summary class="airport-header"(.*?)>/g, '<div class="airport-header"$1>');

// Remove the end of summary and start of body
html = html.replace(/<\/summary>\n<div class="airport-body">/g, '</div>');
html = html.replace(/<\/summary>\s*<div class="airport-body">/g, '</div>');

// Remove toggle icon
html = html.replace(/<span class="toggle-icon">▶<\/span> /g, '');

// Reverse the closing details tag
html = html.replace(/<\/div>\n<\/details>/g, '</div>');
html = html.replace(/<\/div>\s*<\/details>/g, '</div>');

// Remove the [📖 查看评测详情] button block we added
const badBlockRegex = /<div>\s*<a href="review-guangsu\.html" target="_blank" class="btn-secondary btn-sm" style="margin-right: 0\.5rem; display: inline-block;">📖 查看评测详情<\/a>\s*<a href="([^"]+)" target="_blank" class="btn-primary btn-sm" style="display: inline-block;">🚀 官网注册<\/a>\s*<\/div>/g;
html = html.replace(badBlockRegex, '<a href="$1" target="_blank" class="btn-primary btn-sm">🚀 官网注册</a>');

fs.writeFileSync('index.html', html);
console.log('Unwrapped!');
