const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');

// Match all airport cards
// Since some are complex and some are simple, we will match from `<div id="airport-` to the end of the card.
// A card usually ends before the next `<div id="airport-` or `</div>\n        <aside class="airports-sidebar">`.
const mainStart = indexHtml.indexOf('<div class="airports-main">');
const mainEnd = indexHtml.indexOf('        <aside class="airports-sidebar">');

if (mainStart === -1 || mainEnd === -1) {
    console.error("Could not find airports-main.");
    process.exit(1);
}

let beforeAside = indexHtml.substring(0, mainEnd);
const lastDivIndex = beforeAside.lastIndexOf('</div>');
const content = indexHtml.substring(mainStart + '<div class="airports-main">\n'.length, lastDivIndex);

const cards = content.split(/(?=\s*<div id="airport-)/);

const navTemplate = `    <header class="navbar">
        <div class="nav-container">
            <div class="logo">
                <a href="index.html">✨ ClashX 总控 Prompt</a>
            </div>
            <nav class="nav-links" id="nav-links">
                <a href="index.html">首页导航</a>
                <a href="nav.html">网址导航</a>
                <a href="free-id.html">免费ID共享</a>
                <div class="dropdown">
                    <a href="javascript:void(0)" class="dropbtn">机场评测 ▾</a>
                    <div class="dropdown-content">
                        <a href="review-guangsu.html">光速云评测</a>
                        <a href="review-飞猫云.html">飞猫云评测</a>
                        <a href="review-全球云.html">全球云评测</a>
                        <a href="review-唯兔云.html">唯兔云评测</a>
                        <a href="review-ermao.html">二猫云评测</a>
                        <a href="review-极连云.html">极连云评测</a>
                        <a href="review-光年梯.html">光年梯评测</a>
                        <a href="review-山水云.html">山水云评测</a>
                        <a href="review-星岛梦.html">星岛梦评测</a>
                        <a href="review-u1s1.html">u1s1评测</a>
                        <a href="all-reviews.html" style="border-top: 1px dashed var(--main-color); margin-top: 0.5rem; color: #EA580C; font-weight: bold;">查看所有评测</a>
                    </div>
                </div>
                <a href="articles.html">最新文章</a>
                <a href="tutorials.html">使用教程</a>
                <a href="index.html#faq">常见问题</a>
                <a href="index.html#about">关于我</a>
            </nav>
            <div class="hamburger" id="hamburger" aria-label="Menu">
                <span></span><span></span><span></span>
            </div>
        </div>
    </header>`;

let allReviewsLinks = '';

cards.forEach(card => {
    if (!card.trim()) return;

    // Extract name
    const match = card.match(/<h3>(.*?)<\/h3>/);
    if (!match) return;
    const name = match[1].trim();

    // Skip Guangsu and Ermao as they have manual reviews
    if (name === '光速云' || name === '二猫云') {
        allReviewsLinks += `<a href="review-${name === '光速云' ? 'guangsu' : 'ermao'}.html" class="review-grid-item">${name}评测</a>\n`;
        return;
    }

    // Generate a simple filename
    const safeName = name.replace(/[\\/:*?"<>| ]/g, '-');
    const filename = `review-${safeName}.html`;

    // Extract URL
    let url = '#';
    const urlMatch = card.match(/<a href="([^"]+)" target="_blank" class="btn-primary/);
    if (urlMatch) {
        url = urlMatch[1];
    } else {
        const urlMatch2 = card.match(/<a href="([^"]+)" target="_blank" class="btn-secondary/);
        if (urlMatch2) url = urlMatch2[1];
    }

    // Extract intro
    let intro = '';
    const introMatches = [...card.matchAll(/<p class="airport-intro">(.*?)<\/p>/g)];
    introMatches.forEach(m => {
        intro += `<p>${m[1]}</p>\n`;
    });

    // Extract tags
    let tagsHtml = '';
    const tagMatch = card.match(/<div class="airport-tags">([\s\S]*?)<\/div>/);
    if (tagMatch) {
        tagsHtml = `<div class="airport-tags" style="justify-content: center; margin-top: 1rem;">${tagMatch[1]}</div>`;
    }

    const template = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name}机场评测与详情介绍｜ClashX 总控</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <canvas id="bg-canvas"></canvas>
${navTemplate}
    <main class="section-container" style="margin-top: 8rem; max-width: 800px;">
        <article class="journal-card" style="padding: 3rem; text-align: center;">
            <div class="pin" style="left: 50%; transform: translateX(-50%);"></div>
            <h1 style="margin-bottom: 1rem; font-size: 2.2rem; color: var(--text-color);">${name}评测报告</h1>
            ${tagsHtml}
            <div style="margin: 2rem 0; padding: 2rem; background: rgba(255,255,255,0.5); border: 2px dashed var(--border-color); border-radius: 10px; text-align: left;">
                ${intro || '<p>目前关于该机场的详细介绍仍在整理中，敬请期待更新。</p>'}
            </div>
            
            <a href="${url}" target="_blank" class="btn-primary" style="font-size: 1.2rem; padding: 1rem 3rem; margin-top: 1rem;">🚀 前往 ${name} 官网</a>
        </article>
    </main>
    <script src="script.js"></script>
</body>
</html>`;

    fs.writeFileSync(filename, template);
    
    allReviewsLinks += `<a href="${filename}" class="review-grid-item">${name}评测</a>\n`;
});

// Generate all-reviews.html
const allReviewsTemplate = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>所有机场评测目录｜ClashX 总控</title>
    <link rel="stylesheet" href="style.css">
    <style>
        .review-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1rem;
            margin-top: 2rem;
        }
        .review-grid-item {
            background: white;
            padding: 1rem;
            border-radius: 8px;
            border: 1px dashed var(--border-color);
            text-align: center;
            text-decoration: none;
            color: var(--text-color);
            font-weight: bold;
            transition: all 0.2s;
        }
        .review-grid-item:hover {
            border-color: var(--main-color);
            color: var(--main-color);
            background: rgba(249, 115, 22, 0.05);
            transform: translateY(-2px);
        }
    </style>
</head>
<body>
    <canvas id="bg-canvas"></canvas>
${navTemplate}
    <main class="section-container" style="margin-top: 8rem; max-width: 1000px;">
        <article class="journal-card" style="padding: 3rem;">
            <div class="pin" style="left: 50%; transform: translateX(-50%);"></div>
            <h1 style="text-align: center; margin-bottom: 1rem;">✈️ 机场评测大全</h1>
            <p style="text-align: center; color: #666;">这里收录了本站所有的机场评测和介绍内容，点击即可查看详情。</p>
            
            <div class="review-grid">
                ${allReviewsLinks}
            </div>
        </article>
    </main>
    <script src="script.js"></script>
</body>
</html>`;

fs.writeFileSync('all-reviews.html', allReviewsTemplate);
console.log("Generated all review pages and all-reviews.html");
