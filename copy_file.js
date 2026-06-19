const fs = require('fs');
const path = require('path');

const src = 'c:\\Users\\user\\OneDrive\\Desktop\\AFF资料.xls';
const dest = path.join(__dirname, 'aff_data.xls');

if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log("Successfully copied AFF资料.xls to aff_data.xls");
} else {
    console.error("Source file not found at " + src);
}
