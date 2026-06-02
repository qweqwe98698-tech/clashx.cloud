const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// Find the start of airports-main
const mainStart = html.indexOf('<div class="airports-main">');
const mainEnd = html.indexOf('        <aside class="airports-sidebar">');

if (mainStart === -1 || mainEnd === -1) {
    console.log("Could not find boundaries.");
    process.exit(1);
}

// Find the precise closing div of airports-main which is just before the aside
let beforeAside = html.substring(0, mainEnd);
const lastDivIndex = beforeAside.lastIndexOf('</div>');
const prefix = html.substring(0, mainStart + '<div class="airports-main">\n'.length);
const suffix = html.substring(lastDivIndex); // from the closing </div> of airports-main to the end

let content = html.substring(mainStart + '<div class="airports-main">\n'.length, lastDivIndex);

// Now `content` contains all airport cards.
// Each card starts with `<div id="airport-`
const cards = content.split(/(?=\s*<div id="airport-)/);

let newContent = '';

cards.forEach(card => {
    if (!card.trim()) return;

    // Convert wrapper to details
    let c = card.replace(/<div id="airport-([^"]+)" class="journal-card airport-card"(.*?)>/, '<details id="airport-$1" class="journal-card airport-card details-card"$2>');
    
    // Replace <div class="airport-header"> with <summary>
    c = c.replace(/<div class="airport-header"(.*?)>/, '<summary class="airport-header"$1>');
    
    // Find the closing </div> of the header. It usually comes right after the </a>
    // Wait, let's use a regex that matches </a> followed by </div>.
    c = c.replace(/(<\/a>\s*)<\/div>/, '$1</summary>\n<div class="airport-body">');

    // Add a marker span to the h3 inside summary
    c = c.replace(/(<h3>)(.*?)(<\/h3>)/, '$1<span class="toggle-icon">▶</span> $2$3');

    // Replace the very last </div> of the card with </div></details>
    // Because `card` string ends with the closing </div> of the card.
    const lastDiv = c.lastIndexOf('</div>');
    if (lastDiv !== -1) {
        c = c.substring(0, lastDiv) + '</div>\n</details>' + c.substring(lastDiv + 6);
    }

    newContent += c;
});

// Update index.html
fs.writeFileSync('index.html', prefix + newContent + suffix);
console.log("Updated index.html to use details/summary for airport cards.");
