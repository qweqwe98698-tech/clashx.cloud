const fs = require('fs');

const src = 'c:\\Users\\user\\OneDrive\\Desktop\\clashx.cloud博客\\convert.ps1';
const dest = 'c:\\Users\\user\\OneDrive\\Desktop\\convert.ps1';

if (fs.existsSync(src)) {
    // Let's also read the content of convert.ps1 and ensure the output path is set to Desktop
    let content = fs.readFileSync(src, 'utf8');
    content = content.replace(
        'c:\\Users\\user\\OneDrive\\Desktop\\clashx.cloud博客\\aff_data.csv',
        'c:\\Users\\user\\OneDrive\\Desktop\\aff_data.csv'
    );
    fs.writeFileSync(dest, content, 'utf8');
    console.log("Successfully copied and updated convert.ps1 to " + dest);
} else {
    console.error("Source convert.ps1 not found!");
}
