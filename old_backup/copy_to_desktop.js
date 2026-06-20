const fs = require('fs');

const src = 'c:\\Users\\user\\OneDrive\\Desktop\\AFF资料.xls';
const dest = 'c:\\Users\\user\\OneDrive\\Desktop\\aff_data.xls';

if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log("Successfully copied to " + dest);
} else {
    console.error("Source not found: " + src);
}
