const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'content', 'blog', '2026-best-airports.mdx');
let content = fs.readFileSync(filePath, 'utf-8');

const mapping = {
  '光速云': 'guangsuyun',
  '飞猫云': 'feimaoyun',
  '唯兔云': 'weitu',
  '全球云': 'quanqiuyun',
  '二猫云': 'ermaoyun',
  '极连云': 'jilianyun',
  '光年梯': 'guangnianti',
  '可信云': 'kexinyun',
  '星岛梦': 'xingdaomeng',
  'u1s1': 'u1s1',
  '一翻云': 'yifanyun',
  '宇宙云': 'yuzhouyun',
  '边缘节点': 'bianyuanjiedian',
  '快狸': 'kuaili',
  'SOGO狗云': 'sogogouyun',
  '速界': 'sujie'
};

for (const [name, id] of Object.entries(mapping)) {
  const tableRegex = new RegExp(`(## \\d+\\. ${name}[\\s\\S]*?\\n\\|.*?\\n\\|.*?\\n(?:\\|.*?\\n)*)`, 'g');
  content = content.replace(tableRegex, `$1\n👉 [阅读深度的 ${name} 2026 评测报告](/blog/${id}-review)\n\n`);
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Successfully updated the main post with links to the 16 deep review articles!');
