const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'src', 'content', 'notes');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const articles = [
  {
    filename: 'mac-clashx-tutorial.mdx',
    title: 'macOS 科学上网指南：ClashX Pro 与 Surge 极简配置教程',
    content: `---
title: "macOS 科学上网指南：ClashX Pro 与 Surge 极简配置教程"
updatedDate: 2026-06-20
---

import AirportCard from '../../components/AirportCard.astro';

对于 macOS 用户来说，得益于苹果生态的封闭与精致，优质的代理工具也同样具备极高的颜值和极简的交互。目前 Mac 平台上最主流的科学上网工具分别是免费开源的 **ClashX Pro** 和功能极其强大的付费软件 **Surge Mac**。

> [!TIP]
> **Mac 用户专属推荐**
> Mac 用户通常对网络质量和软件体验有极高的要求，尤其是外贸办公和跨国团队协作。站长强烈推荐搭配极其稳定的企业级专线“速界”，让你告别转圈和断流。

<AirportCard 
  name="速界" 
  price="25" 
  tags={['企业办公', '高速专线', '流媒体解锁']} 
  affLink="https://guangs.speedworldaff.cc/#/register?code=xgXzEfZB" 
  isRecommend={true} 
/>

## 一、 ClashX Pro 新手极简教程（免费推荐）

ClashX Pro 是目前绝大多数 Mac 用户的首选，轻量、稳定且完全免费。

1. **下载与安装**：前往 GitHub 搜索 ClashX Pro（注意不是普通的 ClashX），下载 \`.dmg\` 安装包并拖入应用程序文件夹。首次打开如遇系统拦截，请前往“系统设置 -> 隐私与安全性”中点击“仍要打开”。
2. **导入订阅**：打开你的机场后台，点击“一键导入 Clash”。此时浏览器会弹窗请求打开 ClashX Pro，允许即可。
3. **开启代理**：点击状态栏顶部的小猫咪图标，在“出站规则”中选择“规则 (Rule)”，然后勾选“设置为系统代理”。
4. **增强模式 (Enhanced Mode)**：这是 Pro 版本的核心功能！在状态栏菜单中开启“增强模式”，此时它将接管 Mac 的全局流量，终端 (Terminal) 和部分不走系统代理的 App 也能完美翻墙了。

*(此处应有状态栏小猫咪菜单的截图)*

## 二、 Surge Mac 进阶配置（极客首选）

如果你是网络工程师或者极客玩家，并且愿意支付高昂的授权费，Surge Mac 能为你提供抓包、模块化重写、网关路由等骨灰级功能。

1. **导入配置**：在机场后台复制“Surge 订阅托管链接”。
2. **下载配置**：打开 Surge，点击顶部“配置”，选择“从 URL 下载配置”。
3. **设为系统代理与接管**：勾选“系统代理”以及“增强模式 (Enhanced Mode)”。Surge 的增强模式基于虚拟网卡 (VIF)，极其稳定。

---

> [!IMPORTANT]
> **Mac 睡眠唤醒后断网？**
> 有些 Mac 设备在休眠唤醒后，代理工具可能会短暂卡死。此时只需在状态栏将工具退出并重新打开即可恢复。
> 如果你觉得速界稍微超出了预算，这款主打高端但价格稍亲民的“宇宙云”同样是 Mac 的好伴侣：

<AirportCard 
  name="宇宙云" 
  price="30" 
  tags={['高端专线', '稳定低延迟', '多地区节点']} 
  affLink="https://guangs.yuzoucloud.cc/#/register?code=yrThwMP1" 
/>
`
  },
  {
    filename: 'android-v2rayng-tutorial.mdx',
    title: 'Android 安卓系统翻墙指南：v2rayNG 与 Clash 傻瓜式上手',
    content: `---
title: "Android 安卓系统翻墙指南：v2rayNG 与 Clash 傻瓜式上手"
updatedDate: 2026-06-20
---

import AirportCard from '../../components/AirportCard.astro';

安卓系统的开放性让它拥有众多科学上网客户端。最主流、也是最推荐的两款软件是 **v2rayNG** 和 **Clash for Android (CFA)**。无论你用的是哪款手机，这篇教程都能让你在 3 分钟内成功翻墙。

> [!TIP]
> **性价比首选组合**
> 安卓手机的科学上网客户端完全免费，如果搭配一款超高性价比的机场，你就能以极低的成本畅游世界。站长推荐主打极致性价比的“光速云”：

<AirportCard 
  name="光速云" 
  price="8.25" 
  tags={['性价比机场', 'Trojan 协议', '流媒体解锁']} 
  affLink="https://qwerty.gsyaff.com/#/?code=keqgvT5Y" 
  isRecommend={true} 
/>

## 方案 A：v2rayNG 教程（极度轻量，新手推荐）

v2rayNG 的特点是体积小巧，省电，支持协议全面，极其适合新手。

1. **下载安装**：前往 GitHub 的 v2rayNG Releases 页面下载 \`.apk\` 文件并安装。
2. **获取订阅**：在你的机场后台，点击“复制 V2Ray 订阅链接”或“复制通用订阅”。
3. **导入节点**：
   - 打开 v2rayNG，点击左上角三条横线的菜单图标。
   - 选择 **「订阅设置」**，点击右上角的 \`+\` 号。
   - 备注随便填（如：光速云），将复制的链接粘贴到“地址（url）”栏，点击右上角 \`√\` 保存。
4. **更新与连接**：返回软件主界面，点击右上角三个点，选择 **「更新订阅」**。瞬间所有国家节点就出来了。点击右下角的 **「V字圆形按钮」**，同意创建 VPN 即可起飞！

*(此处应有 v2rayNG 主界面与更新订阅的截图)*

## 方案 B：Clash for Android 教程（强大分流功能）

如果你希望像电脑一样，实现“国内直连，国外代理”的智能分流，那么 Clash 是更好的选择。

1. **下载安装**：同样前往 GitHub 搜索 Clash for Android 并安装。
2. **一键导入**：登录机场后台，点击 **「一键导入到 Clash」**，手机会自动跳转至 CFA App。
3. **启动代理**：
   - 在 CFA 主界面，点击 **「配置」**，选中刚刚导入的配置文件。
   - 返回主界面，点击 **「已停止」** 那个大按钮，将其切换为运行状态。
   - 点击 **「代理」** 标签，你可以手动测速并选择一条绿色的低延迟节点。

---

> [!WARNING]
> **杀后台问题**
> 很多国产安卓手机（如小米、华为、OV）为了省电，会自动杀掉后台运行的代理软件导致断网。**务必前往系统设置 -> 电池管理中，将代理软件设置为“无限制”或“允许后台运行”！**

备用机场推荐：
<AirportCard 
  name="一翻云" 
  price="17" 
  tags={['快速连接', '低延迟体验', '高性价比']} 
  affLink="https://guangs.1flyunaff.cc/#/register?code=Yr7FhB7r" 
/>
`
  },
  {
    filename: 'streaming-netflix-guide.mdx',
    title: '2026 流媒体避坑指南：Netflix 与 Disney+ 低价合租与解锁方案',
    content: `---
title: "2026 流媒体避坑指南：Netflix 与 Disney+ 低价合租与解锁方案"
updatedDate: 2026-06-20
---

import AirportCard from '../../components/AirportCard.astro';

看剧是很多人科学上网的最大核心诉求。但是，Netflix（网飞）和 Disney+ 等国际流媒体平台不仅有严格的版权区域限制，还经常会封杀各种代理服务器的 IP（俗称“不解锁”或“仅限自制剧”）。

> [!TIP]
> **追剧人的终极神器**
> 并不是所有机场都能看网飞！你需要一个专门对流媒体 IP 纯净度进行优化的机场。站长墙裂推荐“星岛梦”，它的港日新美节点能完美解锁绝大多数流媒体的 4K 画质。

<AirportCard 
  name="星岛梦" 
  price="16" 
  tags={['流媒体解锁', '高颜值品牌', '港日新节点']} 
  affLink="https://guangs.xingdaomeng.com/#/?code=1TynBYnR" 
  isRecommend={true} 
/>

## 一、 如何获取极低价格的 Netflix 账号？

由于 Netflix 官方在不同国家的定价差异巨大，直接通过美区或港区官网购买非常昂贵（动辄上百元人民币/月）。目前主流的两种低成本方案：

1. **合租平台（最省心，推荐小白）**：
   你可以使用市面上靠谱的流媒体合租平台（如“蜜糖商店”、“银河录像局”等）。平台会将一个完整的 4K 家庭账号分为 5 个子账号（车位）出售给 5 个不同的用户。你只需要每月支付 15-20 元左右，即可拥有一个独立的观影档案，不用自己折腾绑卡和风控。

2. **跨区注册（土耳其 / 尼日利亚 / 埃及区）**：
   如果你有全币种信用卡（Visa/MasterCard），可以通过将代理节点切换到土耳其或尼日利亚，注册并绑定信用卡。这些地区的汇率暴跌导致订阅极其便宜。**注意：** 目前跨区支付风控极严，且常常限制本区 IP 观看（即买土区号必须用土区节点看）。不建议新手尝试。

## 二、 什么是“流媒体解锁”？

当你打开 Netflix 发现只能搜到“Netflix 自制剧”（比如《怪奇物语》），却搜不到《绝命毒师》等热门授权电影时，说明你的代理节点 IP **已被 Netflix 官方屏蔽**。

解决这个问题的唯一方法，就是购买像“星岛梦”这样提供 **“原生 IP”** 或具备 **“DNS 解锁”** 技术的优质机场。它们能够伪装你的访问来源，让你完美观看当地的全部流媒资源库。

## 三、 Disney+ 的锁区与错误代码排查

Disney+ 的风控比 Netflix 更加严格。如果你在网页端或 App 打开时遇到 \`Error Code 73\` 或 \`Error Code 83\`：
1. 请立即清理浏览器缓存或重置 App。
2. 在代理软件中切换到别的地区节点（推荐切换到**新加坡**或**台湾**，因为这两个地区的 Disney+ 包含大量中文字幕）。
3. 确保你的代理软件开启了全局路由或系统级接管。

---

> [!IMPORTANT]
> **画质与速度的平衡**
> 观看 4K 串流不仅需要解锁 IP，还需要极其稳定的高带宽。如果你家是千兆宽带，想要发挥电视大屏的极致画质，可以备用这款速度极佳的“极连云”：

<AirportCard 
  name="极连云" 
  price="15.5" 
  tags={['高速连接', '游戏加速', '低延迟节点']} 
  affLink="https://guangs.jlyvipaff.com/#/?code=VM1rKGUu" 
/>
`
  },
  {
    filename: 'ai-chatgpt-claude-guide.mdx',
    title: 'AI 工具进阶：ChatGPT Plus 升级与 Claude 防封号实战',
    content: `---
title: "AI 工具进阶：ChatGPT Plus 升级与 Claude 防封号实战"
updatedDate: 2026-06-20
---

import AirportCard from '../../components/AirportCard.astro';

在 2026 年的今天，能否熟练使用 ChatGPT 和 Claude 几乎决定了你的生产力上限。然而，这两家 AI 巨头对中国大陆用户的 IP 封锁与支付风控力度达到了史无前例的严格程度。

> [!TIP]
> **AI 生产力基石：纯净 IP**
> 导致 ChatGPT 封号或 Claude 注册失败的罪魁祸首，90% 都是因为使用了被滥用的“万人骑”机场 IP。你需要专门针对 AI 优化的专线！强烈推荐这款打通了 AI 专属通道的“快狸”：

<AirportCard 
  name="快狸" 
  price="20" 
  tags={['AI 工具优化', '年轻化品牌', '高速节点']} 
  affLink="https://guangs.kuailicloud.cc/#/register?code=AiqyM8oG" 
  isRecommend={true} 
/>

## 一、 ChatGPT Plus (GPT-4) 升级方案指南

目前国内银行发行的双币信用卡（哪怕带有 Visa/MasterCard 标志）基本上都会遭到 Stripe 支付网关的无情拒绝，提示“您的银行卡被拒绝”。

要成功开通 Plus 会员，目前的有效路径是**申请一张海外虚拟信用卡 (VCC)**：
1. **注册虚拟卡平台**：市面上有很多支持使用 USDT 加密货币或支付宝充值的海外虚拟卡发行商（如 Dupay、WildCard 等）。
2. **KYC 与充值**：按照平台要求完成实名认证，并将资金充值进虚拟卡中（确保余额大于 20 美元）。
3. **干净的环境与绑定**：将代理节点切换至美国原生 IP（推荐使用浏览器的无痕模式）。进入 ChatGPT 的付款页面，填写虚拟卡号。账单地址可以使用任意一个免税州的真实地址生成器生成。

## 二、 Claude 3 注册与极限防封号策略

Anthropic 公司旗下的 Claude 因其极其优秀的上下文理解能力备受推崇。但其风控之严格，堪称业界噩梦。**动辄毫无理由地永久封号。**

为了防止你的心血账号被封停，请务必遵守以下“铁律”：
1. **注册时必须使用 Gmail 等海外主流邮箱**。千万不要用 QQ 邮箱、163 邮箱，也尽量避免使用企业邮箱后缀。
2. **永远不要频繁切换不同国家的 IP 节点**。如果你第一次登录用的是美国节点，以后每次使用 Claude 时，都请**固定**使用同一家机场的同一个美国节点！IP 的短时间跨国漂移是触发秒封的最核心原因。
3. **短信接码陷阱**：注册时需要海外手机号接码。尽量避开网上烂大街的免费接码平台，花 1-2 美元去专业的付费接码平台（如 sms-activate）获取一次性号码。

## 三、 使用 API：程序员的终极解法

如果你受够了网页版的各种风控和验证码，最佳方案是直接调用 API 接口。
你可以利用第三方开源的客户端（例如 NextChat 或 Chatbox），只需填入 API Key 即可实现免翻墙直连使用，甚至不受地区限制，是重度开发者的不二之选。

---

> [!WARNING]
> **写给重度 AI 依赖者的建议**
> 对于靠 AI 吃饭的人来说，稳定访问比什么都重要。除了快狸，你还可以考虑备用这款同样在 AI 工具访问上表现优异的“唯兔云”，确保生产力永不掉线：

<AirportCard 
  name="唯兔云" 
  price="14.9" 
  tags={['AI 工具访问', 'Clash 友好', '多设备使用']} 
  affLink="https://guangs.v2yunvipaff.com/#/?code=xIutqOBA" 
/>
`
  }
];

articles.forEach(article => {
  fs.writeFileSync(path.join(outDir, article.filename), article.content, 'utf-8');
});

console.log('Successfully generated 4 highly converting Knowledge Base MDX articles!');
