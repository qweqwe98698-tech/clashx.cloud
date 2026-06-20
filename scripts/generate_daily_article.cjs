const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Configuration
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || '';
const API_URL = 'https://api.deepseek.com/v1/chat/completions';
const historyPath = path.join(__dirname, 'history_topics.json');
const rawTextPath = path.join(__dirname, 'raw_airports.txt');
const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');

// predefined topics
const motherTopics = [
  "Netflix 与 Disney+ 原生解锁与防封锁指南",
  "解决 ChatGPT 频繁封号与 Access Denied 的顶级原生 IP",
  "TikTok 跨境电商 0 播放破局与纯净节点推荐",
  "外贸企业高速专线与稳定办公方案",
  "主机游戏加速（Switch/PS5）与超低延迟线路解析",
  "软路由 OpenWrt 透明代理大流量机场评测",
  "留学生高性价比查资料与学术加速方案",
  "应对敏感时期 GFW 封锁的防失联终极指南",
  "YouTube 4K 秒开且无缓冲的顶级测速报告",
  "保护个人隐私：防止 DNS 泄露与无日志记录代理推荐",
  "Midjourney 与 AI 绘画工具无缝连接网络设置",
  "Telegram 电报极速下载与代理配置教程",
  "企业级 IPLC/IEPL 专线深度对比报告",
  "低延迟 BGP 中转机场的选购防坑指南",
  "2026年还值得买吗？百元内便宜机场横评"
];

let history = [];
if (fs.existsSync(historyPath)) {
  history = JSON.parse(fs.readFileSync(historyPath, 'utf-8'));
}

const today = new Date();
const yearMonth = `${today.getFullYear()}年${today.getMonth() + 1}月`;
const dateStr = today.toISOString().split('T')[0];

let selectedMotherTopic = motherTopics.find(t => !history.includes(t));
if (!selectedMotherTopic) {
  // If all are used, reset history or pick random and append a suffix
  selectedMotherTopic = motherTopics[Math.floor(Math.random() * motherTopics.length)];
  selectedMotherTopic += ` (深度复盘 ${dateStr})`;
}

const articleTitle = `${yearMonth}最新：${selectedMotherTopic}及实测推荐`;

let airports = [];
if (fs.existsSync(rawTextPath)) {
  const rawText = fs.readFileSync(rawTextPath, 'utf-8');
  const blocks = rawText.split(/\n\s*\n/);
  blocks.forEach((block) => {
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length < 2) return;
    const name = lines[0].replace('官网注册', '').trim();
    const desc = lines.slice(1).join('\n').replace(/官网注册/g, '').trim();
    if (name) airports.push({ name, desc, price: desc.includes('性价比') ? '15' : '25' });
  });
}
if (airports.length === 0) {
  airports = [{name: "光速云", desc: "性价比高", price: "15"}, {name: "极连云", desc: "大流量", price: "18"}, {name: "速界", desc: "高端", price: "25"}];
}

const selectedAirports = airports.sort(() => 0.5 - Math.random()).slice(0, 3);
const airportNames = selectedAirports.map(a => a.name).join('、');

const systemPrompt = `你是一个拥有10年经验的黑帽SEO专家和科学上网代理评测博主。请根据提供的主题，撰写一篇至少2000字的深度评测文章。
要求：
1. 语言风格：专业、硬核、且具有极强的带货煽动性和情绪价值。使用如 BGP、IPLC、SLA、QoS、原生IP 等术语。
2. 结构清晰：分为 导语、痛点深度剖析、3个机场的深度点评、总结。请务必让每个章节都内容充实，总字数必须突破 2000 字。
3. 输出纯 Markdown 格式的正文（不要输出标题和frontmatter，只需要正文）。不要使用 Markdown 代码块包裹，直接输出文本。
4. 在点评这三个机场（${airportNames}）时，结合主题进行包装，说明为什么它们最适合解决当前痛点。请结合它们各自的描述合理脑补出详细的测速数据。`;

const userPrompt = `今天的主题是：《${articleTitle}》。请围绕这个主题，对【${airportNames}】这三家机场进行长达2000字的深度剖析与评测。注意：绝对不要输出任何前置元数据（frontmatter），直接从正文的第一段导语开始写！`;

async function main() {
  console.log(`Starting generation for: ${articleTitle}`);
  
  if (!DEEPSEEK_API_KEY) {
    console.error("No DEEPSEEK_API_KEY found! Exiting.");
    process.exit(1);
  }

  console.log("Calling DeepSeek API...");
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${DEEPSEEK_API_KEY}`
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      max_tokens: 4000,
      temperature: 0.8
    })
  });

  const data = await response.json();
  if (!data.choices || !data.choices[0]) {
    console.error("DeepSeek API error:", data);
    process.exit(1);
  }

  let aiContent = data.choices[0].message.content;
  // Remove markdown code block fences if AI accidentally adds them
  aiContent = aiContent.replace(/^```markdown\n/, '').replace(/\n```$/, '');

  console.log("AI Content Generated. Building SEO Spider Web...");
  
  let allFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'));
  let randomFiles = allFiles.sort(() => 0.5 - Math.random()).slice(0, 5);
  const spiderLinks = randomFiles.map(f => {
    const contentStr = fs.readFileSync(path.join(blogDir, f), 'utf-8');
    const titleMatch = contentStr.match(/title:\s*"(.*?)"/);
    const title = titleMatch ? titleMatch[1] : f;
    return `- 👉 [相关阅读：${title}](/blog/${f.replace('.mdx', '')})`;
  }).join('\n');

  const frontmatter = `---
title: "${articleTitle}"
description: "本文深度解析了 ${selectedMotherTopic}，并独家评测了 ${airportNames} 这三款顶级测速节点，为您提供最硬核的选购指南与防封锁策略。"
pubDate: ${dateStr}
author: "Orbit AI Engine"
tags: ["每日最新", "深度实测"]
---

import AirportCard from '../../components/AirportCard.astro';

`;

  const cardsCode = selectedAirports.map(a => `
<AirportCard 
  name="${a.name}" 
  price="${a.price}" 
  tags={['每日热搜', '高速通道', '防封锁']} 
  affLink="#" 
  isRecommend={true}
/>
`).join('\n');

  const finalContent = frontmatter + cardsCode + '\n\n' + aiContent + '\n\n## 🕸️ 更多引流关联阅读\n\n' + spiderLinks + '\n';

  const filename = `${dateStr}-${crypto.createHash('md5').update(selectedMotherTopic).digest('hex').substring(0,6)}.mdx`;
  fs.writeFileSync(path.join(blogDir, filename), finalContent, 'utf-8');

  history.push(selectedMotherTopic);
  fs.writeFileSync(historyPath, JSON.stringify(history, null, 2), 'utf-8');

  console.log(`✅ Successfully generated daily article: ${filename}`);
}

main().catch(console.error);
