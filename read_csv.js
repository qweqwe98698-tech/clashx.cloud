const fs = require('fs');

const path = 'c:\\Users\\user\\OneDrive\\Desktop\\aff_data.csv';
if (fs.existsSync(path)) {
    const csvContent = fs.readFileSync(path, 'utf8');
    const lines = csvContent.split('\n');
    console.log(`Total lines in CSV: ${lines.length}`);
    
    // Print the first 50 lines
    console.log("First 50 lines in CSV:\n");
    console.log(lines.slice(0, 50).join('\n'));
    
    // Save to the workspace for persistence
    fs.writeFileSync('aff_data_workspace.csv', csvContent, 'utf8');
} else {
    console.error("CSV file not found!");
}
