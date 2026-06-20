const fs = require('fs');
const path = require('path');

const srcDir = 'C:/Users/user/.gemini/antigravity/brain/e3f9ef0f-41a3-452a-8414-4926bbb2c483/';
const blogDir = 'c:/Users/user/OneDrive/Desktop/clashx.cloud博客/';
const imgDir = path.join(blogDir, 'images');

if (!fs.existsSync(imgDir)) {
    fs.mkdirSync(imgDir);
}

// Map the generated image names
const files = fs.readdirSync(srcDir);
const dlImg = files.find(f => f.startsWith('download_install_') && f.endsWith('.png'));
const copyImg = files.find(f => f.startsWith('copy_link_') && f.endsWith('.png'));
const nodeImg = files.find(f => f.startsWith('select_node_') && f.endsWith('.png'));

// Copy to blog/images
if (dlImg) fs.copyFileSync(path.join(srcDir, dlImg), path.join(imgDir, 'step1.png'));
if (copyImg) fs.copyFileSync(path.join(srcDir, copyImg), path.join(imgDir, 'step2.png'));
if (nodeImg) fs.copyFileSync(path.join(srcDir, nodeImg), path.join(imgDir, 'step3.png'));

// Update HTML files
const tutorialDir = path.join(blogDir, 'tutorial');
const htmlFiles = fs.readdirSync(tutorialDir).filter(f => f.endsWith('.html'));

const placeholder1 = '<div class="img-placeholder">\n                    <span>🖼️</span>\n                    [在这里插入您的截图：展示如何下载和安装客户端]\n                </div>';
const placeholder1_verge = '<div class="img-placeholder">\n                    <span>🖼️</span>\n                    [在这里插入您的截图：展示安装成功后打开软件的主界面]\n                </div>';
const placeholder2 = '<div class="img-placeholder">\n                    <span>🖼️</span>\n                    [在这里插入您的截图：展示在机场后台复制订阅链接并在客户端中导入的操作]\n                </div>';
const placeholder2_verge1 = '<div class="img-placeholder">\n                    <span>🖼️</span>\n                    [在这里插入您的截图：展示在机场后台复制订阅链接的位置]\n                </div>';
const placeholder2_verge2 = '<div class="img-placeholder">\n                    <span>🖼️</span>\n                    [在这里插入您的截图：展示在 Clash Verge Rev 中粘贴链接并导入的界面]\n                </div>';
const placeholder3 = '<div class="img-placeholder">\n                    <span>🖼️</span>\n                    [在这里插入您的截图：展示选择节点和最终开启系统代理/连接开关的位置]\n                </div>';
const placeholder3_verge1 = '<div class="img-placeholder">\n                    <span>🖼️</span>\n                    [在这里插入您的截图：展示代理界面，红框圈出“规则”模式和“选择的节点”]\n                </div>';
const placeholder3_verge2 = '<div class="img-placeholder">\n                    <span>🖼️</span>\n                    [在这里插入您的截图：展示设置界面开启“系统代理”的开关位置]\n                </div>';


const imgTag1 = '<img src="../images/step1.png" alt="下载安装" style="width:100%; max-width:500px; border-radius:10px; display:block; margin: 1.5rem auto; box-shadow: 4px 4px 0 rgba(0,0,0,0.1);">';
const imgTag2 = '<img src="../images/step2.png" alt="导入配置" style="width:100%; max-width:500px; border-radius:10px; display:block; margin: 1.5rem auto; box-shadow: 4px 4px 0 rgba(0,0,0,0.1);">';
const imgTag3 = '<img src="../images/step3.png" alt="选择节点开启代理" style="width:100%; max-width:500px; border-radius:10px; display:block; margin: 1.5rem auto; box-shadow: 4px 4px 0 rgba(0,0,0,0.1);">';

htmlFiles.forEach(file => {
    const filePath = path.join(tutorialDir, file);
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Replace in verge
    if (file === 'clash-verge-rev.html') {
        html = html.replace(placeholder1_verge, imgTag1);
        html = html.replace(placeholder2_verge1, imgTag2);
        html = html.replace(placeholder2_verge2, '');
        html = html.replace(placeholder3_verge1, imgTag3);
        html = html.replace(placeholder3_verge2, '');
    } else {
        html = html.replace(placeholder1, imgTag1);
        html = html.replace(placeholder2, imgTag2);
        html = html.replace(placeholder3, imgTag3);
    }
    
    fs.writeFileSync(filePath, html);
    console.log(`Updated ${file}`);
});
