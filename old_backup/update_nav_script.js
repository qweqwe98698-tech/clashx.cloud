const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const articlesDir = path.join(rootDir, 'articles');
const tutorialDir = path.join(rootDir, 'tutorial');

function updateHtmlFiles(dir, isSubdir = false) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file.endsWith('.html') && file !== 'nav.html') {
            const filePath = path.join(dir, file);
            let content = fs.readFileSync(filePath, 'utf-8');
            
            // Check if already updated
            if (content.includes('网址导航</a>')) {
                continue;
            }

            const prefix = isSubdir ? '../' : '';
            const searchStr = `<a href="${prefix}index.html">首页导航</a>`;
            const searchStr2 = `<a href="index.html">首页导航</a>`;
            
            if (content.includes(searchStr)) {
                content = content.replace(searchStr, `${searchStr}\n                <a href="${prefix}nav.html">网址导航</a>`);
                fs.writeFileSync(filePath, content, 'utf-8');
            } else if (content.includes(searchStr2) && isSubdir) {
                // Sometime subdirs use absolute or wrong relative paths. Let's fix them if needed
                content = content.replace(searchStr2, `${searchStr2}\n                <a href="${prefix}nav.html">网址导航</a>`);
                fs.writeFileSync(filePath, content, 'utf-8');
            } else {
                 console.log(`Could not find nav link in ${filePath}`);
            }
        }
    }
}

updateHtmlFiles(rootDir, false);
updateHtmlFiles(articlesDir, true);
updateHtmlFiles(tutorialDir, true);

// Create nav.html based on articles.html
const templatePath = path.join(rootDir, 'articles.html');
let template = fs.readFileSync(templatePath, 'utf-8');

// Replace title and description
template = template.replace('<title>最新文章与避坑指南｜ClashX 总控</title>', '<title>网址导航｜ClashX 总控</title>');
template = template.replace('<h1 class="section-title">📝 最新文章与避坑指南</h1>', '<h1 class="section-title">🌐 网址导航</h1>');

// Ensure nav.html has active state if needed, though simple hrefs are fine.

// Build nav content
const navContent = `
<style>
.nav-category { margin-top: 2rem; }
.nav-category h2 { font-size: 1.5rem; margin-bottom: 1rem; color: var(--main-color); border-bottom: 2px solid var(--card-bg); padding-bottom: 0.5rem; }
.nav-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
.nav-item { background: var(--card-bg); border: 1px solid var(--border-color); border-radius: 12px; padding: 1.5rem; display: flex; align-items: flex-start; gap: 1rem; transition: transform 0.3s, box-shadow 0.3s; text-decoration: none; color: var(--text-color); }
.nav-item:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.2); border-color: var(--main-color); }
.nav-icon { width: 48px; height: 48px; border-radius: 8px; object-fit: cover; background: white; padding: 4px; }
.nav-info { flex: 1; }
.nav-info h3 { margin: 0 0 0.5rem 0; font-size: 1.1rem; color: var(--text-color); font-weight: bold; }
.nav-info p { margin: 0; font-size: 0.9rem; color: var(--text-muted, #888); line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
</style>

<div class="nav-category">
    <h2>🤖 AI</h2>
    <div class="nav-grid">
        <a href="https://chatgpt.com/" target="_blank" class="nav-item">
            <div class="nav-info">
                <h3>ChatGPT</h3>
                <p>OpenAI 的人工智能聊天机器人程序。</p>
            </div>
        </a>
        <a href="https://chat.deepseek.com/" target="_blank" class="nav-item">
            <div class="nav-info">
                <h3>DeepSeek</h3>
                <p>深度求索的人工智能大型语言模型。</p>
            </div>
        </a>
        <a href="https://gemini.google.com/" target="_blank" class="nav-item">
            <div class="nav-info">
                <h3>Gemini</h3>
                <p>Google 的生成式人工智能聊天机器人。</p>
            </div>
        </a>
        <a href="https://grok.com/" target="_blank" class="nav-item">
            <div class="nav-info">
                <h3>Grok</h3>
                <p>xAI 的生成式人工智能聊天机器人。</p>
            </div>
        </a>
        <a href="https://claude.ai/" target="_blank" class="nav-item">
            <div class="nav-info">
                <h3>Claude</h3>
                <p>Anthropic 的大型语言模型。</p>
            </div>
        </a>
    </div>
</div>

<div class="nav-category">
    <h2>🎬 流媒体</h2>
    <div class="nav-grid">
        <a href="https://www.youtube.com/" target="_blank" class="nav-item">
            <div class="nav-info">
                <h3>YouTube</h3>
                <p>全球最大的视频搜索和分享平台。</p>
            </div>
        </a>
        <a href="https://www.netflix.com/" target="_blank" class="nav-item">
            <div class="nav-info">
                <h3>Netflix</h3>
                <p>网络视频点播的 OTT 服务网站。</p>
            </div>
        </a>
        <a href="https://www.disneyplus.com/" target="_blank" class="nav-item">
            <div class="nav-info">
                <h3>Disney+</h3>
                <p>迪士尼的在线流媒体视频点播平台。</p>
            </div>
        </a>
        <a href="https://www.primevideo.com/" target="_blank" class="nav-item">
            <div class="nav-info">
                <h3>Prime Video</h3>
                <p>亚马逊的互联网视频点播服务。</p>
            </div>
        </a>
        <a href="https://www.hulu.com/" target="_blank" class="nav-item">
            <div class="nav-info">
                <h3>Hulu</h3>
                <p>网络付费随选流影片及影视节目的 OTT 服务网站。</p>
            </div>
        </a>
    </div>
</div>

<div class="nav-category">
    <h2>💬 社交媒体</h2>
    <div class="nav-grid">
        <a href="https://www.instagram.com/" target="_blank" class="nav-item">
            <div class="nav-info">
                <h3>Instagram</h3>
                <p>在线图片及视频分享的社群应用程序。</p>
            </div>
        </a>
        <a href="https://x.com/" target="_blank" class="nav-item">
            <div class="nav-info">
                <h3>X</h3>
                <p>全球顶尖的社交媒体平台之一。</p>
            </div>
        </a>
        <a href="https://www.reddit.com/" target="_blank" class="nav-item">
            <div class="nav-info">
                <h3>Reddit</h3>
                <p>娱乐、社交及新闻网站。</p>
            </div>
        </a>
        <a href="https://web.telegram.org/" target="_blank" class="nav-item">
            <div class="nav-info">
                <h3>Telegram</h3>
                <p>跨平台的即时通信软件。</p>
            </div>
        </a>
    </div>
</div>

<div class="nav-category">
    <h2>📧 电子邮件</h2>
    <div class="nav-grid">
        <a href="https://outlook.live.com/" target="_blank" class="nav-item">
            <div class="nav-info">
                <h3>Outlook</h3>
                <p>微软的免费互联网收发电子邮件服务。</p>
            </div>
        </a>
        <a href="https://gmail.google.com/" target="_blank" class="nav-item">
            <div class="nav-info">
                <h3>Gmail</h3>
                <p>Google 的免费电子邮件服务。</p>
            </div>
        </a>
        <a href="https://mail.proton.me/" target="_blank" class="nav-item">
            <div class="nav-info">
                <h3>Proton Mail</h3>
                <p>端到端加密的电子邮件服务。</p>
            </div>
        </a>
        <a href="https://temp-mail.org/zh/" target="_blank" class="nav-item">
            <div class="nav-info">
                <h3>Temp Mail</h3>
                <p>匿名的一次性电子邮件。</p>
            </div>
        </a>
    </div>
</div>

<div class="nav-category">
    <h2>🛠️ 在线工具</h2>
    <div class="nav-grid">
        <a href="https://telegra.ph/" target="_blank" class="nav-item">
            <div class="nav-info">
                <h3>Telegraph</h3>
                <p>Telegram 的内容发布网站。</p>
            </div>
        </a>
        <a href="https://reurl.cc/main/cn" target="_blank" class="nav-item">
            <div class="nav-info">
                <h3>Reurl</h3>
                <p>短链接在线生成。</p>
            </div>
        </a>
        <a href="https://sub-web.netlify.app/" target="_blank" class="nav-item">
            <div class="nav-info">
                <h3>Subscription Converter</h3>
                <p>各种订阅链接生成。</p>
            </div>
        </a>
    </div>
</div>

<div class="nav-category">
    <h2>📡 网络监控</h2>
    <div class="nav-grid">
        <a href="https://fast.com/" target="_blank" class="nav-item">
            <div class="nav-info">
                <h3>Fast</h3>
                <p>奈飞的简单网速测试。</p>
            </div>
        </a>
        <a href="https://whoer.net/zh" target="_blank" class="nav-item">
            <div class="nav-info">
                <h3>Whoer</h3>
                <p>IP 伪装度检测。</p>
            </div>
        </a>
        <a href="https://ping0.cc/" target="_blank" class="nav-item">
            <div class="nav-info">
                <h3>PING0</h3>
                <p>IP 纯净度检测。</p>
            </div>
        </a>
        <a href="https://browserleaks.com/dns" target="_blank" class="nav-item">
            <div class="nav-info">
                <h3>BrowserLeaks</h3>
                <p>DNS 泄露检测。</p>
            </div>
        </a>
        <a href="https://ipcheck.ing/" target="_blank" class="nav-item">
            <div class="nav-info">
                <h3>IPCheck</h3>
                <p>好用和开源的全能 IP 工具箱。</p>
            </div>
        </a>
    </div>
</div>
<div style="margin-bottom: 4rem;"></div>
`;

// Find the grid container in articles.html and replace it
const startTag = '<div class="grid-container">';
const endTag = '</section>';
const startIndex = template.indexOf(startTag);
const endIndex = template.indexOf(endTag, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
    let newTemplate = template.substring(0, startIndex) + navContent + "\n        " + template.substring(endIndex);
    
    // Add "网址导航" to its own navbar
    const searchStr = `<a href="index.html">首页导航</a>`;
    if (newTemplate.includes(searchStr)) {
        newTemplate = newTemplate.replace(searchStr, `${searchStr}\n                <a href="nav.html" class="active">网址导航</a>`);
    }

    fs.writeFileSync(path.join(rootDir, 'nav.html'), newTemplate, 'utf-8');
    console.log('nav.html created successfully.');
} else {
    console.log('Failed to create nav.html.');
}

// Ensure generate scripts also include nav.html in their template strings if they have them.
function updateJsFiles(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file.endsWith('.js') && file !== 'update_nav_script.js') {
            const filePath = path.join(dir, file);
            let content = fs.readFileSync(filePath, 'utf-8');
            const searchStr = `<a href="../index.html">首页导航</a>`;
            const searchStr2 = `<a href="index.html">首页导航</a>`;
            
            let changed = false;
            if (content.includes(searchStr) && !content.includes('nav.html')) {
                content = content.replace(new RegExp(searchStr.replace(/[.*+?^${}()|[\]\\\\]/g, '\\\\$&'), 'g'), `${searchStr}\\n                <a href="../nav.html">网址导航</a>`);
                changed = true;
            }
            if (content.includes(searchStr2) && !content.includes('nav.html')) {
                content = content.replace(new RegExp(searchStr2.replace(/[.*+?^${}()|[\]\\\\]/g, '\\\\$&'), 'g'), `${searchStr2}\\n                <a href="nav.html">网址导航</a>`);
                changed = true;
            }
            
            if (changed) {
                fs.writeFileSync(filePath, content, 'utf-8');
                console.log(`Updated JS template in ${file}`);
            }
        }
    }
}
updateJsFiles(rootDir);
