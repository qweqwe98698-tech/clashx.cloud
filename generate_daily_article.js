const fs = require('fs');
const path = require('path');
const API_KEY = process.env.GEMINI_API_KEY;

// 动态探测账号支持的模型
async function getBestModel() {
    console.log("🔍 正在探测可用的 Gemini 模型...");
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
    const data = await response.json();
    const availableModels = data.models
        .filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent') && m.name.includes('gemini'))
        .map(m => m.name.replace('models/', ''));
        
    let bestModel = availableModels.find(m => m.includes('flash'));
    if (!bestModel) bestModel = availableModels.find(m => m.includes('pro'));
    if (!bestModel) bestModel = availableModels[0];
    
    console.log(`✅ 自动选择最优模型: ${bestModel}`);
    return bestModel;
}

async function callAI(systemPrompt, userPrompt, modelName) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents: [{ role: "user", parts: [{ text: userPrompt }] }],
            generationConfig: { temperature: 0.7 }
        })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(JSON.stringify(data));
    return data.candidates[0].content.parts[0].text.trim();
}

const topics = [
    // 解决报错与痛点类 (高转化长尾词)
    "Netflix 提示使用代理怎么办？2026年最新解锁流媒体指南",
    "ChatGPT 报 Oops 无法登录？如何选择纯净原生 IP 节点",
    "晚高峰机场节点突然变慢卡顿？排查本地网络与节点限速技巧",
    "Clash 订阅更新失败、超时怎么解决？快速恢复网络连接",
    "YouTube 4K 视频一直缓冲？如何辨别真假 IPLC 专线",
    // 新手教程与下载类 (小白流量)
    "2026年苹果 iOS 没有美区 ID 怎么下载 Shadowrocket 小火箭？",
    "Clash Verge Rev 汉化版最新下载与图文导入教程",
    "Mac 电脑科学上网最佳实践：ClashX 与 Verge Rev 对比",
    "Android 手机 v2rayNG 与 Clash for Android 哪个更好用？",
    // 宏观科普与避坑类
    "外贸人必备的海外网络加速器挑选指南",
    "跨境电商独立站卖家如何选择稳定的代理节点",
    "2026年还在用免费梯子？深度解析免费VPN的隐私陷阱",
    "游戏玩家该买机场还是加速器？全面对比与分析",
    "什么是双端加密隧道？中转机场为什么比直连更安全",
    "机场经常被墙？了解 BGP 与 IPLC 线路的底层逻辑",
    "一元机场、年付几十块的机场靠谱吗？深度揭秘跑路套路"
];

const today = new Date();
const dateStr = today.toISOString().split('T')[0];

async function generateArticle() {
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    const filename = `${dateStr}-${randomTopic.replace(/[\/\s]/g, '-')}.html`;
    
    console.log(`Starting generation for topic: ${randomTopic}`);
    
    const prompt = `你是一个专业的网络优化与科学上网博客作者。
    请以“${randomTopic}”为主题，写一篇字数约 1000 字的顶级 SEO 文章。
    核心要求：
    1. 语气专业、客观，适合小白用户阅读，采用“手账风”的亲切口吻。
    2. 文章必须排版为 HTML 格式（只输出内部结构，不用 <html><body>）。使用 <h2> 作为主标题，<h3> 作为小标题，<p> 段落，<ul> 列表，重点词汇用 <strong> 加粗。
    3. **强力转化引导 (CTA)**：在文章的正文中间或第一段之后，强制插入一个吸睛的引导块，代码严格如下：
       <div style="background: linear-gradient(135deg, var(--main-color) 0%, #ff8a00 100%); padding: 1.5rem; border-radius: 12px; text-align: center; margin: 2rem 0; box-shadow: 0 4px 15px rgba(234, 88, 12, 0.2); color: white;">
           <h3 style="color: white; margin-top: 0;">🚀 寻找稳定不卡的科学上网方案？</h3>
           <p style="color: rgba(255,255,255,0.9); margin-bottom: 1.5rem;">查看博主每日测速、晚高峰稳定 4K 的 2026 最新精选榜单</p>
           <a href="../index.html" style="background-color: white; color: var(--main-color); padding: 0.8rem 2rem; border-radius: 30px; font-weight: bold; text-decoration: none; display: inline-block; transition: transform 0.3s;">点击查看高性价比机场推荐榜单</a>
       </div>
    4. **智能内链**：在正文中自然提及“光速云”、“二猫云”、“唯兔云”等测评时，给它们加上超链接，例如：<a href="../review-guangsu.html" style="color: var(--main-color); text-decoration: underline;">光速云</a>。
    5. **FAQ模块**：文章末尾必须包含一个 <h2>常见问题解答 (FAQ)</h2> 模块，自问自答 3 个与主题强相关的问题。
    6. **返回格式**：必须分为两部分，用 ||| 分隔。第一部分是 80 字以内的纯文本简介；第二部分是正文 HTML 代码（首段要用 <div class="intro"...>💡 导语：...</div> 包裹）。绝对不要返回 markdown 代码块标记！
    
    返回示例：
    这是纯文本简介...
    |||
    <div class="intro" style="background-color: var(--secondary-color); padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem; border-left: 4px solid var(--main-color);"><strong>💡 导语：</strong>...</div>
    <h2>一、核心原理解析</h2>
    <p>正文内容...</p>
    [这里插入上述的 CTA 转化引导块]
    <h2>二、进阶技巧</h2>...
    <h2>常见问题解答 (FAQ)</h2>...
    `;

    try {
        const modelName = await getBestModel();
        
        const responseText = await callAI(
            "你是一个专业的网络优化与科学上网博客作者。你只输出符合要求的文本内容，绝不返回markdown代码块。",
            prompt,
            modelName
        );
        
        const parts = responseText.split('|||');
        if (parts.length !== 2) throw new Error("Invalid response format from AI");
        
        let [description, content] = parts;
        description = description.trim().replace(/```/g, '');
        content = content.trim().replace(/^```html/g, '').replace(/```$/g, '').trim();

        // Template string
        const template = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${randomTopic} - ClashX 总控</title>
    <meta name="description" content="${description}">
    <link rel="stylesheet" href="../style.css">
</head>
<body>
    <canvas id="bg-canvas"></canvas>
    <header class="navbar">
        <div class="nav-container">
            <div class="logo">
                <a href="../index.html">✨ ClashX 总控 Prompt</a>
            </div>
            <nav class="nav-links" id="nav-links">
                <a href="../index.html">首页导航</a>
                <div class="dropdown">
                    <a href="javascript:void(0)" class="dropbtn">机场评测 ▾</a>
                    <div class="dropdown-content">
                        <a href="../review-guangsu.html">光速云评测</a>
                        <a href="../review-ermao.html">二猫云评测</a>
                        <a href="../review-唯兔云.html">唯兔云评测</a>
                        <a href="../review-极连云.html">极连云评测</a>
                        <a href="../review-全球云.html">全球云评测</a>
                        <a href="../review-光年梯.html">光年梯评测</a>
                        <a href="../review-山水云.html">山水云评测</a>
                        <a href="../review-星岛梦.html">星岛梦评测</a>
                        <a href="../review-u1s1.html">u1s1评测</a>
                        <a href="../review-飞猫云.html">飞猫云评测</a>
                        <a href="../all-reviews.html" style="border-top: 1px dashed var(--main-color); margin-top: 0.5rem; color: #EA580C; font-weight: bold;">查看所有评测</a>
                    </div>
                </div>
                <a href="../articles.html" style="color: var(--main-color);">最新文章</a>
                <a href="../tutorials.html">使用教程</a>
                <a href="../index.html#faq">常见问题</a>
            </nav>
        </div>
    </header>

    <main class="section-container" style="background-color: white; padding: 3rem; border: 2px solid var(--border-color); border-radius: var(--border-handdrawn); box-shadow: 4px 4px 0px rgba(68, 64, 60, 0.1); margin-top: 8rem;">
        <article>
            <h1 style="border-bottom: 2px dashed var(--main-color); padding-bottom: 1rem; margin-bottom: 2rem;">${randomTopic}</h1>
            <div class="content" style="line-height: 1.8; font-size: 1.1rem;">
                ${content}
            </div>
        </article>
        
        <div style="margin-top: 3rem; text-align: center;">
            <a href="../articles.html" class="btn-primary">← 返回最新文章列表</a>
        </div>
    </main>
    <script src="../script.js"></script>
</body>
</html>`;

        // Write article file
        fs.writeFileSync(path.join(__dirname, 'articles', filename), template);
        console.log(`Successfully generated article: ${filename}`);

        // Update articles.html list
        const articlesHtmlPath = path.join(__dirname, 'articles.html');
        let articlesHtml = fs.readFileSync(articlesHtmlPath, 'utf8');
        
        const newLinkHtml = `
                <a href="articles/${filename}" class="journal-card">
                    <h3><span style="color:var(--main-color);">[最新]</span> ${randomTopic}</h3>
                    <p>${description.substring(0, 50)}...</p>
                </a>`;
                
        // Insert right after <div class="grid-container">
        articlesHtml = articlesHtml.replace('<div class="grid-container">', `<div class="grid-container">${newLinkHtml}`);
        fs.writeFileSync(articlesHtmlPath, articlesHtml);
        
        console.log("Successfully updated articles.html");
        return filename;
        
    } catch (e) {
        console.error("Error generating article:", e);
        process.exit(1);
    }
}

async function pushToIndexNow(urls) {
    const key = "5a4b7c8d9e0f1a2b3c4d5e6f7a8b9c0d";
    const host = "clashx.cloud";
    console.log("🚀 正在向搜索引擎 (IndexNow) 提交秒收录请求...");
    
    try {
        const response = await fetch("https://api.indexnow.org/indexnow", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify({
                host: host,
                key: key,
                keyLocation: \`https://\${host}/\${key}.txt\`,
                urlList: urls
            })
        });
        if (response.ok) {
            console.log("✅ 成功推送至 IndexNow (Bing/Yandex 等引擎)！");
        } else {
            console.error("❌ IndexNow 推送失败:", response.status, await response.text());
        }
    } catch (err) {
        console.error("IndexNow error:", err);
    }
}

async function main() {
    const generatedUrls = [];
    for (let i = 0; i < 2; i++) {
        console.log(\`\\n--- 准备生成今天第 \${i + 1} 篇文章 ---\`);
        const filename = await generateArticle();
        if (filename) {
            generatedUrls.push(\`https://clashx.cloud/articles/\${filename}\`);
        }
        if (i < 1) {
            console.log("等待 5 秒防止 API 频率限制...");
            await new Promise(r => setTimeout(r, 5000));
        }
    }
    console.log("今日文章生成完毕！");
    
    if (generatedUrls.length > 0) {
        await pushToIndexNow(generatedUrls);
    }
}

main();
