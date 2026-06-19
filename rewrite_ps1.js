const fs = require('fs');

const path = 'c:\\Users\\user\\OneDrive\\Desktop\\convert.ps1';
if (fs.existsSync(path)) {
    let content = fs.readFileSync(path, 'utf8');
    
    // Replace case-insensitively for the CSV path
    content = content.replace(
        /c:\\Users\\user\\OneDrive\\Desktop\\clashx\.cloud博客\\aff_data\.csv/gi,
        'c:\\Users\\user\\OneDrive\\Desktop\\aff_data.csv'
    );
    
    fs.writeFileSync(path, content, 'utf8');
    console.log("Updated Desktop convert.ps1 successfully. Contents:\n" + content);
} else {
    console.error("Desktop convert.ps1 not found!");
}
