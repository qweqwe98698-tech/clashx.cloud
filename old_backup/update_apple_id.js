const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'free-id.html');
if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    for (let i = 1; i <= 6; i++) {
        // 生成随机合规的密码 (包含大小写字母、数字、特殊符号)
        // 使用 ClashX 开头，后面加随机4位数字和随机特殊符号，保证合规且具有辨识度
        const specials = '!@#*^';
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const randomSpecial = specials[Math.floor(Math.random() * specials.length)];
        const customPwd = `ClashX${randomNum}${randomSpecial}`;
        
        // 替换 free-id.html 中的密码
        const regex = new RegExp(`(<span id="pwd${i}">)[^<]+(</span>)`);
        content = content.replace(regex, `$1${customPwd}$2`);
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Successfully updated Apple ID passwords in free-id.html');
} else {
    console.log('free-id.html not found!');
}
