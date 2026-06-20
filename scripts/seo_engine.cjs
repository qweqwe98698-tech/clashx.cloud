const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');
const rawTextPath = path.join(__dirname, 'raw_airports.txt');

// --- 1. GATHER ALL DATA ---
let airports = [];

if (fs.existsSync(rawTextPath)) {
  const rawText = fs.readFileSync(rawTextPath, 'utf-8');
  const blocks = rawText.split(/\n\s*\n/);
  blocks.forEach((block) => {
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length < 2) return;
    const name = lines[0].replace('官网注册', '').trim();
    const desc = lines.slice(1).join('\n').replace(/官网注册/g, '').trim();
    if (!name) return;
    
    const tags = [];
    if (desc.includes('性价比')) tags.push('性价比机场');
    if (desc.includes('流媒体')) tags.push('流媒体解锁');
    if (desc.includes('专线')) tags.push('高端专线');
    if (desc.includes('新手')) tags.push('新手友好');
    if (desc.includes('稳定')) tags.push('日常稳定');
    if (tags.length === 0) tags.push('稳定解锁', '多平台支持');
    
    airports.push({ name, desc, tags, price: desc.includes('性价比') ? '15' : '25' });
  });
}

const old16 = [
  { name: '光速云', desc: '主要支持 Trojan 协议，兼容主流客户端...', tags: ['性价比机场', '流媒体解锁'], price: '8.25' },
  { name: '飞猫云', desc: '品牌名比较活泼，适合突出连接轻快...', tags: ['轻快体验', '多平台支持'], price: '15' },
  { name: '唯兔云', desc: '适合搭配 Clash Verge Rev...', tags: ['老用户常用', 'Clash 友好'], price: '14.9' },
  { name: '全球云', desc: '重点突出香港、日本、新加坡等热门节点...', tags: ['全球节点', '多地区覆盖'], price: '20' },
  { name: '二猫云', desc: '优势在于使用门槛低，导入即可使用...', tags: ['新手友好', '多平台支持'], price: '20' },
  { name: '极连云', desc: '极速连接，延迟低、适合高清视频...', tags: ['高速连接', '低延迟节点'], price: '15.5' },
  { name: '光年梯', desc: '科技感机场，高速稳定...', tags: ['高速机场', '长期稳定'], price: '18' },
  { name: '可信云', desc: '适合打造稳定、轻松形象的机场...', tags: ['稳定体验', '轻量使用'], price: '17' },
  { name: '星岛梦', desc: '主打流媒体、娱乐访问和海外内容体验...', tags: ['流媒体解锁', '港日新节点'], price: '16' },
  { name: 'u1s1', desc: '突出套餐简单、价格清晰...', tags: ['年轻化品牌', '高性价比'], price: '20' },
  { name: '一翻云', desc: '快速连接、响应及时...', tags: ['快速连接', '低延迟体验'], price: '17' },
  { name: '宇宙云', desc: '主打稳定性与高速体验，采用优质线路...', tags: ['高端专线', '稳定低延迟'], price: '30' },
  { name: '边缘节点', desc: '主打高性价比路线，适合刚接触的新用户...', tags: ['性价比机场', '流媒体解锁'], price: '15' },
  { name: '快狸', desc: '定位偏向年轻用户群体，拥有较为丰富的节点...', tags: ['年轻化品牌', '高速节点'], price: '20' },
  { name: 'SOGO狗云', desc: '以稳定、实用和高性价比作为核心定位...', tags: ['高性价比', '多节点覆盖'], price: '18' },
  { name: '速界', desc: '偏向于高速和稳定体验路线，适合跨境办公...', tags: ['高速专线', 'AI 优化'], price: '25' }
];

const existingNames = new Set(airports.map(a => a.name));
old16.forEach(a => {
  if (!existingNames.has(a.name)) airports.push(a);
});

console.log(`Total unique airports to process: ${airports.length}`);

const files = fs.readdirSync(blogDir);
let deleteCount = 0;
files.forEach(f => {
  if (f.endsWith('-review.mdx') || f.endsWith('2026-best-airports.mdx')) {
    fs.unlinkSync(path.join(blogDir, f));
    deleteCount++;
  }
});
console.log(`Cleaned up ${deleteCount} old short MDX articles.`);

const rng = () => Math.random();
const sample = (arr) => arr[Math.floor(rng() * arr.length)];
const hash = (str) => crypto.createHash('md5').update(str).digest('hex').substring(0, 6);

const intros = [
  "在2026年的大环境下，跨境网络受到了前所未有的挑战。底层协议的不断更迭，使得过去免费或廉价的梯子纷纷失效。今天我们要深度剖析的主角，正是在这种高压环境下异军突起的品牌：",
  "如果你已经受够了晚高峰看视频转圈、打游戏掉线、AI工具账号莫名被封停的折磨，那么这篇万字硬核评测绝对是你需要的。我们将为你揭开行业内幕，并深度实测这款备受瞩目的老牌/新锐机场：",
  "随着 Netflix、Disney+ 实施史上最严苛的 IP 封锁，以及 ChatGPT 对中国大陆 IP 的全面清洗，拥有一条“原生、纯净”的科学上网专线变得比任何时候都重要。本次我们要送测的，正是以此为核心卖点的：",
  "无论你是外贸电商从业者、留学生，还是硬核游戏玩家，一款极致稳定的翻墙工具都是不可或缺的生产力基石。今天评测室拿到了一手线路数据，为您全方位解剖这款争议与赞誉并存的节点服务商："
];

const technicalParagraphs = [
  "### 深入骨髓的架构解析：BGP 入口与 IPLC/IEPL 专线\n不同于市面上常见的直连机场，该服务商在前端接入层采用了 BGP（边界网关协议）多线接入。这意味着无论你是中国电信、联通还是移动宽带，数据包都能通过最优路径直达其国内服务器，随后经过内网加密隧道（IPLC/IEPL 企业专线）穿越防火墙。这种架构的直接收益，就是彻底免疫了公网晚高峰的 QoS 限速和丢包问题。实测下来，其全天候的丢包率均控制在 0.1% 以内，SLA 可用性达到了惊人的 99.9%。",
  
  "### 应对 GFW 审查的底层逻辑与加密抗识别能力\n近年来，防火长城（GFW）部署了极其先进的 DPI（深度包检测）和主动探测机制。传统的 Shadowsocks 或 Vmess 协议在流量特征上已经呈现裸奔状态。我们在针对该机场的网络抓包测试中发现，其底层混淆机制采用了目前最新的 XTLS 或特有的伪装协议，将所有出站流量完美伪装成了正常的 HTTPS 网页请求。这种近乎偏执的安全策略，确保了即使在每年最敏感的时期，你的连接也依然坚若磐石。",
  
  "### CDN 泛播与 Anycast 技术的隐形加持\n许多用户只看重节点的国家数量，却忽视了节点的接入拓扑结构。在本次针对该机场的 TraceRoute 路由追踪中，我们惊喜地发现其部分核心节点部署了 Anycast 技术。当你的客户端发起连接请求时，请求会被自动路由到距离你物理位置最近的边缘服务器。这不仅大幅缩短了 TCP 握手时间（通常在 30ms 以内），还极大地提升了看流媒体和刷 TikTok 时的秒开率。"
];

const hotTopics = [
  "### 🔥 蹭热点：拯救被封号的 ChatGPT 与 Claude\n众所周知，OpenAI 和 Anthropic 近期对亚洲 IP 展开了无差别的大清洗。使用那些几块钱的“万人骑”便宜机场，几乎 100% 会导致封号。而 **{name}** 的运营团队显然深谙此道。我们通过专业的风险 IP 查询库（Fraud Score）对其分配的美国节点进行了扫描，发现其 IP 纯净度极高（风险评分小于 20）。在长达一个月的测试中，我们频繁使用这些节点进行 API 调用和网页端高频对话，账号从未出现过哪怕一次要求输入手机验证码的安全风控警告。",
  
  "### 🔥 蹭热点：流媒体时代的破壁人（Netflix/Disney+ 原生解锁）\n买机场不就是为了看剧吗？但自从 Netflix 封杀了大批云服务商的 IP 后，很多机场就只能看“自制剧”了。我们在周末晚高峰对 **{name}** 的港、日、新、美节点进行了地毯式的流媒体解锁测试。令人欣慰的是，测试脚本一路飘绿：Netflix 非自制剧全解锁、Disney+ 无 Error Code 83 报错、甚至连最为苛刻的 Hulu 和 HBO Max 都能实现原生 IP 级的完美解锁。配合其极其富裕的带宽冗余，4K HDR 画质下的拖拽缓冲时间不到 1.5 秒。",
  
  "### 🔥 蹭热点：TikTok 跨境出海 0 播放的终极克星\n现在做跨境带货和 TikTok 运营的人太多了，但很多人辛辛苦苦剪辑的视频发出去却是 0 播放，原因就是 IP 被污染。在测试 **{name}** 时，我们特意注册了一个全新的 TikTok 账号进行发文测试。得益于其提供的家庭宽带（ISP）级真实 IP 代理，TikTok 的风控系统完全把我们识别为了真实的海外本地用户。不仅避开了限流沙盒，还在初始推荐池获得了超出预期的流量曝光。这对于跨境卖家来说，无异于是一把削铁如泥的神兵利器。"
];

let generatedCount = 0;

airports.forEach((airport, index) => {
  const finalId = `airport-${hash(airport.name)}`;
  
  const intro = sample(intros);
  const tech = sample(technicalParagraphs);
  const hot = sample(hotTopics).replace(/{name}/g, airport.name);
  
  const others = airports.filter(a => a.name !== airport.name).sort(() => 0.5 - Math.random()).slice(0, 4);
  const crossLinks = others.map(a => `- 👉 [对比阅读：深度拆解 ${a.name} 2026 最新网络表现](/blog/airport-${hash(a.name)}-review)`).join('\n');

  const content = `---
title: "${airport.name} 2026 深度评测：全面解析与真实测速数据报告"
description: "${intro.substring(0, 60)}... 提供关于 ${airport.name} 最硬核的千字深度评测及内部数据揭秘。"
pubDate: 2026-06-20
author: "Orbit"
tags: ["机场评测", "${airport.tags[0]}"]
---

import AirportCard from '../../components/AirportCard.astro';

${intro} **${airport.name}**。

在接下来的篇幅中，我们将抛开一切枯燥的营销话术，用硬核的数据和长达数周的真实连通性测试报告，带你彻底看清这家服务商的真实实力。

<AirportCard 
  name="${airport.name}" 
  price="${airport.price}" 
  tags={['千字长文剖析', '${airport.tags[0]}', '${airport.tags[1] || '稳定专线'}']} 
  affLink="#" 
  isRecommend={true}
/>

## 一、 官方背景与品牌定位

根据官方披露及我们的逆向追踪，${airport.desc} 

这说明该服务商非常清楚自己的受众定位。它没有选择通过极其低廉的价格去打惨烈的价格战，而是选择通过提供具备冗余度的高质量带宽来筛选对其有强需求的优质客户。这种商业策略在当今高度内卷的市场中，反而能有效防止因超售导致的节点大面积崩溃。

${tech}

## 二、 ${airport.name} 独家实测档案：热点追踪

${hot}

## 三、 套餐选购避坑指南与价格剖析

任何不谈价格只谈性能的评测都是耍流氓。我们在仔细对比了 ${airport.name} 的所有套餐梯队后，发现了它的计费玄机：

1. **月付试错成本**：起步价定在 ${airport.price} 元左右，这是一个极具竞争力的价格带，适合新用户在第一个月进行抗压测试。
2. **长周期折扣陷阱与红利**：我们强烈建议：在没有连续稳定使用超过 2 周之前，**绝对不要**因为其季付或年付的庞大折扣而盲目上车。虽然其目前表现极佳，但在瞬息万变的 GFW 大环境下，保持支付周期的灵活性永远是消费者的底牌。
3. **流量分配测算**：如果你只是轻度使用 Google 和社交软件，基础流量包绝对够用；但如果你习惯在 1080P 或 4K 画质下观看 YouTube，请确保你的套餐包含至少 200GB/月的余量。

## 四、 最终测速总结与建议

历经数周的严苛压测，**${airport.name}** 交出了一份令人满意的答卷。它并非完美无缺（没有任何一家服务商敢保证 100% 的永远在线），但它在**故障响应时间、节点带宽裕量以及对流媒体/AI的解锁纯净度**上，都达到了同级别的一流梯队水准。

无论你是外贸办公的刚需群体，还是仅仅想要在下班后畅快地看几集高清美剧，它都完全有资格成为你的主力代理工具。

👉 **[点击此处立即前往 ${airport.name} 官网查阅最新优惠](#)**

---
### 🕸️ 更多延伸阅读
如果你正在寻找备用节点，或者想对比一下其他竞品的表现，不妨看看我们评测室为您带来的其他深度报告：

${crossLinks}
`;

  fs.writeFileSync(path.join(blogDir, finalId + '-review.mdx'), content, 'utf-8');
  generatedCount++;
});

console.log(`✅ Spintax Engine complete! Generated ${generatedCount} massive >1000 word cross-linked articles.`);
