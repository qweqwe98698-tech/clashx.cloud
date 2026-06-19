const fs = require('fs');
const path = require('path');

// --- 防止重复生成逻辑 ---
{
    const _now = new Date();
    const _beijingTime = new Date(_now.getTime() + 8 * 60 * 60 * 1000);
    const _today = _beijingTime.toISOString().split('T')[0];
    const _marker = path.join(__dirname, '.daily_run_date');
    if (fs.existsSync(_marker)) {
        const _last = fs.readFileSync(_marker, 'utf8');
        if (_last === _today) {
            console.log("检测到今日已生成过文章，跳过生成以防重复！");
            process.exit(0);
        }
    }
    fs.writeFileSync(_marker, _today, 'utf8');
}
// ------------------------

const API_KEY = process.env.DEEPSEEK_API_KEY || process.env.GEMINI_API_KEY; 

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

// 核心长尾流量词库（不再抓取泛科技新闻，专注强相关需求）
const topics = [
    "ChatGPT 报 Access denied 无法登录？如何选择防封的原生 IP 节点",
    "Netflix 代理检测报错（M7111-5059）怎么办？2026年最新解锁流媒体指南",
    "跨境电商独立站卖家如何选择稳定且伪装度高的海外代理节点",
    "游戏玩家该买机场还是游戏加速器？延迟与丢包率全面对比分析",
    "TikTok 运营总是被限流零播放？解析原生 IP 节点与家宽代理的区别",
    "晚高峰看 YouTube 4K 视频一直缓冲？如何辨别并选购物超所值的 IPLC 专线",
    "Clash 订阅更新失败、节点全部超时怎么解决？手把手排障指南",
    "外贸人必备：安全稳定收发 Gmail 与访问 WhatsApp 的网络配置心得",
    "Midjourney / Claude 频频封号？教你如何通过纯净 IP 规避风控",
    "2026年苹果 iOS 没有美区 ID 怎么下载使用 Shadowrocket 小火箭？",
    "Android 手机 v2rayNG 与 Clash Meta for Android 哪个更省电好用？",
    "什么是双端加密隧道？中转机场为什么比直连更稳定安全",
    "一元机场、年付十几块的极低价机场靠谱吗？深度揭秘行业跑路套路",
    "机场经常被墙导致失联？带你深入了解 BGP 与 IPLC 线路的底层逻辑"
];

const today = new Date();
const beijingTime = new Date(today.getTime() + 8 * 60 * 60 * 1000);
const dateStr = beijingTime.toISOString().split('T')[0];

async function generateArticle() {
    // 随机抽取一个核心话题
    const promptTopic = topics[Math.floor(Math.random() * topics.length)];
    console.log(`📌 本次生成主题: ${promptTopic}`);
    
    const prompt = `你是一个非常专业、资深的网络工程师和科学上网技术博主。
    请根据以下主题，写一篇字数必须在 2000 字以上的高质量、极其硬核、内容极其丰富且对读者有极高实用价值的深度长文科普指南。
    主题：${promptTopic}
    
    核心要求：
    1. **坚决杜绝标题党与废话**：标题和正文严禁使用“震惊”、“曝光”等低端词汇。文章不能有任何 AI 味的客套话或水字数废话。
    2. **极其丰富、专业、详细**：分析原因时必须深入到底层网络协议层面（例如详细解释 TCP/UDP, BGP路由, IPLC物理专线原理, DNS污染机制等）；给出解决方案时，必须提供详尽的 Step-by-Step 步骤、多场景排错方法。
    3. 文章排版为 HTML 格式（只输出内部结构，不用 <html><body>）。使用 <h2> 作为主标题，<h3> 作为小标题，<p> 段落，<ul> 列表，重点词汇用 <strong> 加粗，必要时使用 <blockquote> 或 <code> 增加排版层次感。
    4. **强力转化引导 (CTA)**：在文章的正文中间或第一部分之后，强制插入以下转化代码（直接输出这段 HTML 即可，不用修改）：
       <div style="background: linear-gradient(135deg, var(--main-color) 0%, #ff8a00 100%); padding: 1.5rem; border-radius: 12px; text-align: center; margin: 2rem 0; box-shadow: 0 4px 15px rgba(234, 88, 12, 0.2); color: white;">
           <h3 style="color: white; margin-top: 0;">🚀 寻找稳定不卡的科学上网方案？</h3>
           <p style="color: rgba(255,255,255,0.9); margin-bottom: 1.5rem;">查看博主每日测速、晚高峰稳定 4K 的 2026 最新精选榜单</p>
           <a href="../index.html" style="background-color: white; color: var(--main-color); padding: 0.8rem 2rem; border-radius: 30px; font-weight: bold; text-decoration: none; display: inline-block; transition: transform 0.3s;">点击查看高性价比机场推荐榜单</a>
       </div>
    5. **智能内链**：在正文中自然提及“光速云”、“唯兔云”、“飞猫云”等评测机场时，加上超链接：<a href="../review-guangsu.html" style="color: var(--main-color); text-decoration: underline;">光速云</a>。
    6. **FAQ模块**：文章末尾必须包含一个 <h2>常见问题解答 (FAQ)</h2> 模块，自问自答 3 个强相关问题。
    7. **返回格式（极其重要）**：必须分为三部分，用 ||| 分隔。
       第一部分：一个专业且具吸引力的 SEO 文章标题（25字以内，不要带标点）。
       第二部分：80 字以内的纯文本简介（Meta Description）。
       第三部分：正文 HTML 代码（首段用 <div class="intro"...>💡 导语：...</div> 包裹）。绝对不要返回 markdown 代码块标记！
    
    返回示例：
    ChatGPT 报错 Access denied？2026 原生 IP 节点防封指南
    |||
    这是纯文本简介...
    |||
    <div class="intro" style="background-color: var(--secondary-color); padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem; border-left: 4px solid var(--main-color);"><strong>💡 导语：</strong>...</div>
    <h2>一、为什么会被封号或拦截？</h2>
    <p>正文内容...</p>
    [这里插入上述的 CTA 转化引导块]
    <h2>二、原生 IP 与广播 IP 的区别</h2>...
    <h2>常见问题解答 (FAQ)</h2>...
    `;

    let responseText = "";
    let parts = [];
    try {
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                responseText = await callAI(
                    "你是一个资深的 SEO 技术写手。严格按照请求返回三个由 ||| 分隔的部分（标题|||简介|||正文HTML）。不要输出任何多余的解释。",
                    prompt
                );
                parts = responseText.split('|||');
                if (parts.length >= 3) {
                    if (parts.length > 3) {
                        const extra = parts.splice(2);
                        parts.push(extra.join('|||'));
                    }
                    break;
                }
                console.warn(`Attempt ${attempt} failed: Invalid format. Retrying...`);
            } catch (err) {
                console.error(`Attempt ${attempt} API error:`, err.message);
            }
            if (attempt === 3) throw new Error("Invalid response format from AI after 3 attempts.");
        }
        
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
    <!-- Open Graph Tags -->
    <meta property="og:title" content="${articleTitle}">
    <meta property="og:description" content="${description}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://clashx.cloud/articles/${filename}">
    <meta property="og:image" content="https://image.pollinations.ai/prompt/${encodeURIComponent(articleTitle + ' Cyberpunk tech network Japanese manga style, high quality')}?width=1200&height=600&nologo=true">
    <link rel="stylesheet" href="../style.css">
    <link rel="manifest" href="../manifest.json">
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
                <a href="../nav.html">网址导航</a>
                <a href="../free-id.html">免费ID共享</a>
                <div class="dropdown">
                    <a href="javascript:void(0)" class="dropbtn">机场评测 ▾</a>
                    <div class="dropdown-content">
                        <a href="../review-guangsu.html">光速云评测</a>
                        <a href="../review-飞猫云.html">飞猫云评测</a>
                        <a href="../review-全球云.html">全球云评测</a>
                        <a href="../review-唯兔云.html">唯兔云评测</a>
                        <a href="../review-ermao.html">二猫云评测</a>
                        <a href="../review-极连云.html">极连云评测</a>
                        <a href="../review-光年梯.html">光年梯评测</a>
                        <a href="../review-山水云.html">山水云评测</a>
                        <a href="../review-星岛梦.html">星岛梦评测</a>
                        <a href="../review-u1s1.html">u1s1评测</a>
                        <a href="../all-reviews.html" style="border-top: 1px dashed var(--main-color); margin-top: 0.5rem; color: #EA580C; font-weight: bold;">查看所有评测</a>
                    </div>
                </div>
                <a href="../articles.html" class="active">最新文章</a>
                <a href="../tutorials.html">使用教程</a>
                <a href="../index.html#faq">常见问题</a>
                <a href="../index.html#about">关于我</a>
            </nav>
            <div class="hamburger" id="hamburger" aria-label="Menu">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </header>

    <main class="section-container" style="background-color: white; padding: 3rem; border: 2px solid var(--border-color); border-radius: var(--border-handdrawn); box-shadow: 4px 4px 0px rgba(68, 64, 60, 0.1); margin-top: 8rem; max-width: 900px;">
        
        <nav aria-label="breadcrumb" class="breadcrumb">
            <a href="../index.html">首页</a> &gt; <a href="../articles.html">最新文章</a> &gt; ${articleTitle}
        </nav>
        <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "首页导航",
            "item": "https://clashx.cloud/"
          },{
            "@type": "ListItem",
            "position": 2,
            "name": "最新文章",
            "item": "https://clashx.cloud/articles.html"
          },{
            "@type": "ListItem",
            "position": 3,
            "name": "${articleTitle}"
          }]
        }
        </script>
        <article>
            <img src="https://image.pollinations.ai/prompt/${encodeURIComponent(articleTitle + ' Cyberpunk tech network Japanese manga style, high quality')}?width=1200&height=600&nologo=true" alt="${articleTitle}" style="width:100%; border-radius:12px; box-shadow: 0 8px 24px rgba(0,0,0,0.15); margin-bottom: 2rem; display:block;">
            <h1 style="border-bottom: 2px dashed var(--main-color); padding-bottom: 1rem; margin-bottom: 2rem;">${articleTitle}</h1>
            <div class="content" style="line-height: 1.8; font-size: 1.1rem; color: #333;">
                ${content}
            </div>
        </article>
        
        <div style="margin-top: 3rem; text-align: center;">
            <a href="../articles.html" class="btn-primary">← 返回最新文章列表</a>
        </div>
    </main>
    <script src="../script.js"></script>

    <!-- Mobile Sticky CTA -->
    <div class="mobile-sticky-cta">
        <a href="../#airports" class="cta-text">🔥 限时特惠：获取 2026 最新稳定高速机场 🚀</a>
        <a href="../#airports" class="cta-btn">立即查看</a>
    </div>

    <!-- WeChat/QQ Mask -->
    <div id="wechat-mask" class="wechat-mask">
        <div class="mask-content">
            <span class="arrow">↗</span>
            <p>为了获得最佳体验与正常访问</p>
            <p>请点击右上角选择在<strong>浏览器</strong>中打开</p>
        </div>
    </div>

</body>
</html>`;

        // Write article file
        fs.writeFileSync(path.join(__dirname, 'articles', filename), template);
        console.log(`✅ Successfully generated article: ${filename}`);

        // Update articles.html list
        const articlesHtmlPath = path.join(__dirname, 'articles.html');
        let articlesHtml = fs.readFileSync(articlesHtmlPath, 'utf8');
        
        const newLinkHtml = `
                <a href="articles/${filename}" class="journal-card">
                    <h3><span style="color:var(--main-color);">[最新]</span> ${articleTitle}</h3>
                    <p>${description.substring(0, 50)}...</p>
                </a>`;
                
        // Insert right after <div class="grid-container">
        articlesHtml = articlesHtml.replace('<div class="grid-container">', `<div class="grid-container">\n${newLinkHtml}`);
        fs.writeFileSync(articlesHtmlPath, articlesHtml);
        
        console.log("✅ Successfully updated articles.html");
        return filename;
        
    } catch (e) {
        console.error("❌ Error generating article:", e);
        process.exit(1); // 强制报错退出，让 GitHub Action 标红
    }
    return null;
}

async function pushToGoogleAndBaidu(urls) {
    // 1. 强行 ping Google 提交 Sitemap
    try {
        console.log("🚀 正在向 Google 提交 Sitemap Ping...");
        const res = await fetch("https://www.google.com/ping?sitemap=https://clashx.cloud/sitemap.xml");
        if (res.ok) console.log("✅ 成功 Ping Google！");
    } catch (e) {
        console.error("❌ Google Ping 失败", e);
    }

    // 2. 百度秒收录 API (需在 GitHub Secrets 配置 BAIDU_TOKEN)
    const baiduToken = process.env.BAIDU_TOKEN;
    if (baiduToken) {
        try {
            console.log("🚀 正在向百度推送秒收录...");
            const res = await fetch(`http://data.zz.baidu.com/urls?site=https://clashx.cloud&token=${baiduToken}`, {
                method: 'POST',
                headers: { 'Content-Type': 'text/plain' },
                body: urls.join('\n')
            });
            const data = await res.json();
            console.log("✅ 百度推送结果：", data);
        } catch (e) {
            console.error("❌ 百度推送失败", e);
        }
    } else {
        console.log("⚠️ 未检测到 BAIDU_TOKEN 环境变量，跳过百度秒收录推送。");
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

function updateSitemap(urls) {
    const sitemapPath = path.join(__dirname, 'sitemap.xml');
    if (!fs.existsSync(sitemapPath)) return;
    
    let sitemap = fs.readFileSync(sitemapPath, 'utf8');
    const todayStr = new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    let newEntries = "";
    urls.forEach(url => {
        newEntries += `\n  <url>\n    <loc>${url}</loc>\n    <lastmod>${todayStr}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`;
    });
    
    sitemap = sitemap.replace('</urlset>', newEntries + '\n</urlset>');
    fs.writeFileSync(sitemapPath, sitemap, 'utf8');
    console.log("✅ 成功更新 sitemap.xml");
}

async function main() {
    const generatedUrls = [];
    // 每日生成 1 篇高质量文章即可，贵精不贵多
    console.log(`\n--- 开始生成高质量科普指南 ---`);
    const filename = await generateArticle();
    if (filename) {
        generatedUrls.push(`https://clashx.cloud/articles/${filename}`);
        updateSitemap(generatedUrls);
        await pushToIndexNow(generatedUrls);
        await pushToGoogleAndBaidu(generatedUrls);
    }
    console.log("✅ 今日优质文章生成完毕！");
}

main();
