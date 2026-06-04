const fs = require('fs');
const path = require('path');
const API_KEY = process.env.DEEPSEEK_API_KEY || process.env.GEMINI_API_KEY; // 兼容旧变量名防止忘记改

async function callAI(systemPrompt, userPrompt) {
    console.log("🤖 正在调用 DeepSeek API...");
    const url = 'https://api.deepseek.com/chat/completions';
    const response = await fetch(url, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userPrompt }
            ],
            temperature: 0.7
        })
    });
    const responseTextRaw = await response.text();
    let data;
    try {
        data = JSON.parse(responseTextRaw);
    } catch (e) {
        throw new Error(`DeepSeek API returned non-JSON response. HTTP Status: ${response.status}. Raw Response: ${responseTextRaw}`);
    }
    if (!response.ok) throw new Error(JSON.stringify(data));
    return data.choices[0].message.content.trim();
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

async function getRealTimeHotTopic() {
    try {
        console.log("🔍 正在抓取今日科技热点...");
        // Fetch IT Home RSS for real-time tech news
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        const response = await fetch("https://www.ithome.com/rss/", { signal: controller.signal });
        clearTimeout(timeoutId);
        
        const xml = await response.text();
        const matches = [...xml.matchAll(/<title>(.*?)<\/title>/g)];
        const titles = matches.map(m => m[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1')).filter(t => t && !t.includes("IT之家") && t.length > 10);
        
        if (titles.length > 0) {
            // Pick a random hot topic from the top 5
            return titles[Math.floor(Math.random() * Math.min(5, titles.length))];
        }
    } catch (e) {
        console.log("⚠️ 抓取实时热点失败，使用后备静态选题...");
    }
    return null;
}

async function generateArticle() {
    let baseTopic = topics[Math.floor(Math.random() * topics.length)];
    const hotNews = await getRealTimeHotTopic();
    
    let promptTopic = baseTopic;
    if (hotNews) {
        promptTopic = `今天的全网突发科技热点是：【${hotNews}】。请巧妙地结合这个热点事件作为引子（比如分析该事件对网络、隐私或开发者的影响），顺理成章地引出“为什么我们需要一个高速稳定的海外网络节点（机场）”，并给出一篇高质量的避坑与选购指南。`;
        console.log(`🔥 成功截流热点: ${hotNews}`);
    } else {
        console.log(`Starting generation for static topic: ${baseTopic}`);
    }
    
    const prompt = `你是一个专业的网络优化与科学上网博客作者，同时也是个“蹭热点”的高手。
    请根据以下主题要求，写一篇字数约 1000 字的顶级 SEO 引流文章：
    主题要求：${promptTopic}
    
    核心要求：
    1. 语气专业、客观，采用“手账风”的亲切口吻，制造焦虑并给出解决方案。
    2. 文章排版为 HTML 格式（只输出内部结构，不用 <html><body>）。使用 <h2> 作为主标题，<h3> 作为小标题，<p> 段落，<ul> 列表，重点词汇用 <strong> 加粗。
    3. **强力转化引导 (CTA)**：在文章的正文中间或第一段之后，强制插入以下转化代码：
       <div style="background: linear-gradient(135deg, var(--main-color) 0%, #ff8a00 100%); padding: 1.5rem; border-radius: 12px; text-align: center; margin: 2rem 0; box-shadow: 0 4px 15px rgba(234, 88, 12, 0.2); color: white;">
           <h3 style="color: white; margin-top: 0;">🚀 寻找稳定不卡的科学上网方案？</h3>
           <p style="color: rgba(255,255,255,0.9); margin-bottom: 1.5rem;">查看博主每日测速、晚高峰稳定 4K 的 2026 最新精选榜单</p>
           <a href="../index.html" style="background-color: white; color: var(--main-color); padding: 0.8rem 2rem; border-radius: 30px; font-weight: bold; text-decoration: none; display: inline-block; transition: transform 0.3s;">点击查看高性价比机场推荐榜单</a>
       </div>
    4. **智能内链**：在正文中自然提及“光速云”、“二猫云”、“唯兔云”等测评时，加上超链接：<a href="../review-guangsu.html" style="color: var(--main-color); text-decoration: underline;">光速云</a>。
    5. **FAQ模块**：文章末尾必须包含一个 <h2>常见问题解答 (FAQ)</h2> 模块，自问自答 3 个强相关问题。
    6. **返回格式（极其重要）**：必须分为三部分，用 ||| 分隔。
       第一部分：一个极具吸引力的“震惊体”或“悬念体”文章标题（25字以内）。
       第二部分：80 字以内的纯文本简介。
       第三部分：正文 HTML 代码（首段用 <div class="intro"...>💡 导语：...</div> 包裹）。绝对不要返回 markdown 代码块标记！
    
    返回示例：
    震惊！ChatGPT大规模封号，你的节点安全吗？
    |||
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
        const responseText = await callAI(
            "你是一个极其擅长蹭热点的 SEO 营销写手。严格按照请求返回三个由 ||| 分隔的部分。",
            prompt
        );
        
        const parts = responseText.split('|||');
        if (parts.length !== 3) throw new Error("Invalid response format from AI: " + responseText);
        
        let [articleTitle, description, content] = parts;
        articleTitle = articleTitle.trim().replace(/[#*\n]/g, '');
        description = description.trim().replace(/```/g, '');
        content = content.trim().replace(/^```html/g, '').replace(/```$/g, '').trim();

        // 确保文件名合法
        const safeTitle = articleTitle.replace(/[\/\s：？！，|\\*?"<>]/g, '-').substring(0, 30);
        const filename = `${dateStr}-${safeTitle}.html`;

        // Template string
        const template = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${articleTitle} - ClashX 总控</title>
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
            <h1 style="border-bottom: 2px dashed var(--main-color); padding-bottom: 1rem; margin-bottom: 2rem;">${articleTitle}</h1>
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
                    <h3><span style="color:var(--main-color);">[最新]</span> ${articleTitle}</h3>
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
                keyLocation: `https://${host}/${key}.txt`,
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
        console.log(`\n--- 准备生成今天第 ${i + 1} 篇文章 ---`);
        const filename = await generateArticle();
        if (filename) {
            generatedUrls.push(`https://clashx.cloud/articles/${filename}`);
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
