import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: "Fan's Workspace",
  tagline: 'Welcome to my workspace',
  favicon: 'img/logo.svg',
  url: 'https://fan-55.github.io/',
  baseUrl: '/',
  organizationName: 'Fan-55',
  projectName: 'Fan-55.github.io',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-TW'],
  },
  presets: [
    [
      'classic',
      {
        docs: false,
        blog: false,
        // blog: {
        //   showReadingTime: true,
        // },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: "Fan's Workspace",
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'notes',
          position: 'left',
          label: 'Notes',
        },
        // {
        //   to: '/blog',
        //   position: 'left',
        //   label: 'Blog',
        // },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/Fan-55',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} Fan's Workspace, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.vsDark,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
