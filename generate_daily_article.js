const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const topics = [
    "外贸人必备的海外网络加速器挑选指南",
    "跨境电商独立站卖家如何选择稳定的代理节点",
    "2026年还在用免费梯子？深度解析免费VPN的隐私陷阱",
    "ChatGPT Plus 续费失败？可能和你的节点 IP 有关",
    "Mac 电脑科学上网最佳实践：ClashX 与 Verge Rev 对比",
    "留学生回国必备：如何在国内无缝衔接海外校园网",
    "设计工作者必看：Midjourney 经常断线如何通过更换机场解决",
    "游戏玩家该买机场还是加速器？全面对比与分析",
    "什么是双端加密隧道？中转机场为什么比直连更安全",
    "机场经常被墙？了解 BGP 与 IPLC 线路的底层逻辑"
];

const today = new Date();
const dateStr = today.toISOString().split('T')[0];
const randomTopic = topics[Math.floor(Math.random() * topics.length)];
const filename = `${dateStr}-${randomTopic.replace(/[\/\s]/g, '-')}.html`;

async function generateArticle() {
    console.log(`Starting generation for topic: ${randomTopic}`);
    
    const prompt = `你是一个专业的网络优化与科学上网博客作者。
    请以“${randomTopic}”为主题，写一篇字数约 800 字的 SEO 文章。
    要求：
    1. 语气专业、客观，适合小白用户阅读，采用“手账风”的亲切口吻。
    2. 文章必须包含引语（100字左右的简介），然后是 3-4 个二级标题（使用 <h2> 标签包裹）。
    3. 内容必须排版为 HTML 格式（不需要包含 <html> 或 <body> 标签，只输出内部结构）。使用 <p> 表示段落，<ul><li> 表示列表，重点词汇用 <strong> 加粗。
    4. 严禁返回 markdown 代码块的标记（如 \`\`\`html），直接返回纯净的 HTML 字符串！
    5. 返回的数据必须分为两部分，中间用 ||| 分隔：第一部分是 100 字以内的纯文本简介（用于文章列表展示），第二部分是完整的正文 HTML 代码。
    
    格式示例：
    这是用于展示在列表中的纯文本简介，不要有任何HTML标签，大约50-80字。
    |||
    <div class="intro" style="background-color: var(--secondary-color); padding: 1rem; border-radius: 10px; margin-bottom: 2rem; border: 1px solid var(--border-color);"><strong>💡 导语：</strong> 这里也是简介内容，作为文章开篇。</div>
    <h2>一、为什么会有这个问题？</h2>
    <p>正文内容...</p>
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = result.response.text();
        
        const parts = response.split('|||');
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
        
    } catch (e) {
        console.error("Error generating article:", e);
        process.exit(1);
    }
}

generateArticle();
