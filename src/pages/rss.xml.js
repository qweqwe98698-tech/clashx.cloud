import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog');
  return rss({
    title: 'My Blog - 原创空间',
    description: '告别过去，拥抱极简的全新原创博客',
    site: context.site || 'https://my-blog.local',
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id}/`,
    })),
    customData: `<language>zh-cn</language>`,
  });
}
