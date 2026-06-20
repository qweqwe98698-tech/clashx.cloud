// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkWikiLink from 'remark-wiki-link';

// https://astro.build/config
export default defineConfig({
  site: 'https://my-blog.local',
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [
      [remarkWikiLink, {
        pageResolver: (name) => [name.replace(/ /g, '-').toLowerCase()],
        hrefTemplate: (permalink) => `/notes/${permalink}`
      }]
    ]
  }
});