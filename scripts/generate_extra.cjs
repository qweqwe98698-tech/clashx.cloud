const fs = require('fs');
const path = require('path');

const notesDir = path.join(__dirname, '..', 'src', 'content', 'notes');
const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');

if (!fs.existsSync(notesDir)) fs.mkdirSync(notesDir, { recursive: true });
if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });

const articles = [
  {
    dir: notesDir,
    filename: 'gaming-console-guide.mdx',
    content: `---
title: "Switch / PS5 / Xbox 主机翻墙加速指南：告别联机掉线"
updatedDate: 2026-06-20
---

import AirportCard from '../../components/AirportCard.astro';

对于主机玩家来说，玩《斯普拉遁》、《使命召唤》或《GTA5》外服时，最让人崩溃的就是 NAT 类型为 D 或者疯狂掉线。虽然市面上有很多内置加速盒，但对于懂得科学上网的玩家来说，利用代理节点为游戏主机加速才是终极且最具性价比的解决方案。

> [!TIP]
> **游戏加速的核心：IPLC 企业专线**
> 游戏加速对带宽要求不高，但对**延迟 (Ping)** 和**丢包率**的要求极其苛刻。普通的公网中转节点极易在晚高峰卡顿。站长强烈推荐这款全链路 IPLC 专线优化的高端机场“速界”，延迟稳定如老狗。

<AirportCard 
  name="速界" 
  price="25" 
  tags={['高速专线', '企业办公', '游戏加速']} 
  affLink="https://guangs.speedworldaff.cc/#/register?code=xgXzEfZB" 
  isRecommend={true} 
/>

## 方案一：通过电脑开启局域网共享 (最简单)

如果你手头有一台随时开机的电脑（Windows 或 Mac），这是零成本的方案。

1. 在电脑上打开你的客户端（例如 Clash Verge Rev 或 ClashX Pro）。
2. 在设置中找到 **「允许局域网连接 (Allow LAN)」** 并将其开启。
3. 记录下你电脑的局域网 IP 地址（例如 \`192.168.1.100\`）以及 Clash 的 HTTP/Socks5 端口号（通常是 \`7890\`）。
4. 打开你的 Switch 或 PS5 的网络设置，将代理服务器设置为刚刚记录的 IP 和端口。
5. 连接测试！你的 NAT 类型通常会瞬间飙升到 A 或 B。

## 方案二：路由器透明代理 (最一劳永逸)

如果你不想每次打游戏都开着电脑，那么刷了 OpenWrt 或梅林固件的路由器是最佳选择。
只需在路由器层面配置好代理插件（如 OpenClash 或 PassWall），将需要打游戏的主机 IP 设为全局代理，从此全家设备无感翻墙。

> [!IMPORTANT]
> **关于主机游戏的节点选择**
> 玩日服游戏（如任天堂系列），请务必手动在客户端中锁定**日本节点**；玩欧美服，请锁定**美国节点**。千万不要开启“自动测速选择节点”功能，因为游戏中途 IP 突然飘移会导致立刻掉线！
> 如果你专门玩日服/港服，可以试试专攻亚太节点优化的“星岛梦”：

<AirportCard 
  name="星岛梦" 
  price="16" 
  tags={['港日新节点', '高颜值品牌', '流媒体解锁']} 
  affLink="https://guangs.xingdaomeng.com/#/?code=1TynBYnR" 
/>
`
  },
  {
    dir: notesDir,
    filename: 'tiktok-dropshipping-guide.mdx',
    content: `---
title: "2026 最新版 TikTok (抖音国际版) 免拔卡注册与 0 播放破局指南"
updatedDate: 2026-06-20
---

import AirportCard from '../../components/AirportCard.astro';

无论你是想看海外小姐姐，还是想做跨境电商带货，TikTok 都是必争之地。然而，TikTok 官方对中国大陆用户的风控极高，不仅限制了国内 SIM 卡，更会对被污染的“万人骑”机场 IP 进行降权，导致视频“0播放”。

> [!TIP]
> **破局核心：原生高纯净 IP**
> 做 TikTok 运营，千万不要用那些几块钱的便宜机场，它们的 IP 早就上了黑名单。你需要的是提供**原生 IP (Native IP)** 的高质代理。推荐全球节点覆盖极广且 IP 干净的“全球云”：

<AirportCard 
  name="全球云" 
  price="20" 
  tags={['全球节点', '商务访问', '多地区覆盖']} 
  affLink="https://guangs.gcvipaff.com/#/?code=Ov2nvU9C" 
  isRecommend={true} 
/>

## 破局第一步：彻底伪装手机环境

很多教程教你拔掉 SIM 卡，但这对于主力机来说太不方便了。在 2026 年，我们推荐以下免拔卡方案：
1. **iOS 用户（推荐）**：使用 Shadowrocket 的重写规则（Rewrite）配合特定模块，可以绕过 TikTok 的地区检测。直接在美区 App Store 下载官方版 TikTok 即可正常刷视频。
2. **Android 用户**：不要去 Google Play 下载官方原版。请去 GitHub 或相关技术论坛下载经过修改的 **TikTok Mod 版本**（去除了 SIM 卡锁区限制，支持自定义地区）。

## 破局第二步：固定你的运营 IP

这是无数新手踩坑的地方。今天连美国节点发视频，明天连日本节点发视频，TikTok 风控系统会立刻判定你的账号异常，实施限流。
**铁律：如果你要做美区带货，那么请永远锁定你机场里的那条美国专线！**

## 破局第三步：避免 DNS 泄露

确保你的代理软件开启了真实的全局模式，关闭手机的 GPS 定位，并将系统语言和时区切换为目标国家。这样能最大程度地防止“0 播放”悲剧。

<AirportCard 
  name="可信云" 
  price="17" 
  tags={['日常办公', '轻量使用', '稳定体验']} 
  affLink="https://guangs.kosingaff.com/#/register?code=UYDtNlCY" 
/>
`
  },
  {
    dir: notesDir,
    filename: 'openwrt-router-guide.mdx',
    content: `---
title: "OpenWrt 软路由透明代理全攻略：让全家设备一键出国"
updatedDate: 2026-06-20
---

import AirportCard from '../../components/AirportCard.astro';

当你家里拥有了 Apple TV、智能电视、多台电脑和无数部手机时，给每台设备单独安装科学上网软件将成为一场灾难。此时，**软路由（透明代理）** 是极客们的终极解法。

> [!TIP]
> **软路由极客首选：大流量管家**
> 全家设备共享一个网关，流量消耗是非常恐怖的。如果你家有重度观影需求，你需要的是一款不限速且流量极其充足的大管家。推荐“极连云”：

<AirportCard 
  name="极连云" 
  price="15.5" 
  tags={['高速连接', '大流量无忧', '游戏加速']} 
  affLink="https://guangs.jlyvipaff.com/#/?code=VM1rKGUu" 
  isRecommend={true} 
/>

## 什么是透明代理？

透明代理意味着翻墙动作发生在“路由器”这一层。对于连接到 WiFi 的设备（手机、电视）来说，翻墙是完全“透明（无感知）”的。它们甚至不需要安装任何代理 App，连上 WiFi 就能直接打开 YouTube。

## 主流插件：OpenClash vs PassWall

在 OpenWrt 软路由系统中，目前有两大主流科学上网插件：

1. **OpenClash**：基于强大的 Clash 内核，分流规则极其细致。适合重度折腾玩家，可以精细控制哪个设备走什么节点。
2. **PassWall**：以轻量、速度快著称，支持 Xray、Trojan 等极简协议。适合追求极致速度且懒得折腾规则的用户。

## 配置核心要点

1. **订阅链接自动更新**：在插件中填入机场的订阅链接后，务必设置一个“每日自动更新”的定时任务。因为机场的节点 IP 会不定期变动。
2. **DNS 劫持配置**：软路由翻墙最容易翻车的地方就是 DNS 污染。请确保插件开启了“Fake-IP 模式”或配置了正确的国内外 DNS 分流，否则国内网站打开会极慢。

如果你家里人多，且有 4K 观影需求，这家长周期的“光年梯”也是极佳的选择：

<AirportCard 
  name="光年梯" 
  price="18" 
  tags={['高速机场', '长期稳定', 'AI 工具访问']} 
  affLink="https://guangs.gntaff.com/#/?code=X1FoxjGE" 
/>
`
  },
  {
    dir: notesDir,
    filename: 'dns-leak-security-guide.mdx',
    content: `---
title: "安全避险指南：什么是 DNS 泄露？如何彻底隐藏你的真实 IP"
updatedDate: 2026-06-20
---

import AirportCard from '../../components/AirportCard.astro';

很多人认为，只要代理软件显示“已连接”，自己就是绝对安全的了。实际上，大部分小白的电脑无时无刻不在“裸奔”，真实 IP 早就暴露无遗。这背后的罪魁祸首，通常是 **DNS 泄露 (DNS Leak)** 和 **WebRTC 泄露**。

> [!TIP]
> **绝对的隐私：无日志机场**
> 技术上的防泄露只是第一步，最底层的安全保障是你的服务商绝对不记录你的访问日志。极客们通常更偏爱低调、稳定、纯粹的老牌技术向机场：

<AirportCard 
  name="SOGO狗云" 
  price="18" 
  tags={['长期使用', '高性价比', '多节点覆盖']} 
  affLink="https://guangs.sogoyunaff.cc/#/dashboard" 
  isRecommend={true} 
/>

## 什么是 DNS 泄露？

当你在浏览器输入 \`google.com\` 时，电脑需要先向 DNS 服务器查询这个域名的 IP。
如果你开了代理，但查询域名的请求却没有走代理隧道，而是发给了国内的运营商（如中国电信），那么运营商就会立刻知道：你在尝试访问 Google。这就是 DNS 泄露。

**如何测试？**
打开浏览器访问 \`ipleak.net\`。如果在页面中看到了你真实宽带所在地的 IP 或中国运营商的旗帜，说明你已经严重泄露！

**如何修复？**
在 Clash 中，确保 \`Fake-IP\` 模式开启，并在配置文件的 \`dns\` 字段中，将 \`nameserver\` 设置为 \`1.1.1.1\` 等海外加密 DNS。

## 什么是 WebRTC 泄露？

这是一种浏览器底层技术，常用于网页端视频通话（如 Google Meet）。它会直接绕过很多代理插件，强行获取你的本地真实 IP。
**修复方法**：在 Chrome 或 Edge 中安装如 \`WebRTC Network Limiter\` 等插件，将其设置为强行通过代理路由。

隐私保护是一条长远的道路。唯兔云也是不少注重隐私的老用户的选择：

<AirportCard 
  name="唯兔云" 
  price="14.9" 
  tags={['老用户常用', '稳定节点', '多设备使用']} 
  affLink="https://guangs.v2yunvipaff.com/#/?code=xIutqOBA" 
/>
`
  },
  {
    dir: blogDir,
    filename: 'budget-student-guide.mdx',
    content: `---
title: "每月预算不到 20 元？2026 高性价比学生党查资料机场推荐"
description: "预算有限也能畅游互联网！专门为学生党、考研党和轻度查资料用户整理的百元内平价优质机场合集。"
pubDate: 2026-06-20
author: "Orbit"
tags: ["机场推荐", "高性价比"]
---

import AirportCard from '../../components/AirportCard.astro';

对于广大的学生党、考研党或者只是偶尔需要上一下维基百科、Github 查资料的用户来说，那些动辄大几十块一个月的高端企业专线显得过于昂贵且性能过剩了。

本期专栏，站长专门为大家整理了市面上那些**价格极其便宜（月付甚至不到 20 块钱），但日常使用绝对稳定**的“真香型”平价机场。

## 1. 边缘节点（极致入门）

如果你真的预算极度吃紧，边缘节点是你的不二之选。它没有那些花里胡哨的功能，就是纯粹的低价走量路线。用来写论文查阅谷歌学术完全足够。

<AirportCard 
  name="边缘节点" 
  price="15" 
  tags={['性价比机场', '新手友好', '日常使用']} 
  affLink="#" 
  isRecommend={true} 
/>

## 2. u1s1 机场（年轻化平价品牌）

u1s1 的套餐规划非常清晰，且完全没有隐藏套路。20 块钱就能买到 120GB 的流量，平时刷刷外网视频、上上社交网络毫无压力。

<AirportCard 
  name="u1s1" 
  price="20" 
  tags={['年轻化品牌', '高性价比', '新手机场']} 
  affLink="https://guangs.vipaff.cc/#/?code=xhX5X22f" 
/>

## 3. 光速云（最具性价比的中庸之道）

虽然起步价同样非常便宜，但光速云在后端的节点稳定性上做了很多优化。它甚至能兼顾一部分 Netflix 等流媒体的解锁需求，属于这个价位段里的全能型选手。

<AirportCard 
  name="光速云" 
  price="8.25" 
  tags={['性价比机场', 'Trojan 协议', '流媒体解锁']} 
  affLink="https://qwerty.gsyaff.com/#/?code=keqgvT5Y" 
/>

---
**站长寄语**：
便宜不代表没好货，但便宜的机场在晚高峰时期（晚上 8 点 - 11 点）的测速数据确实无法和昂贵的企业专线媲美。如果你能接受晚高峰看 1080P 而不是 4K，那么这些平价机场绝对是你的省钱首选！
`
  }
];

articles.forEach(article => {
  fs.writeFileSync(path.join(article.dir, article.filename), article.content, 'utf-8');
});

console.log('Successfully generated 5 extra highly converting articles!');
