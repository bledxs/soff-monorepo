import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Soff Date',
      description: 'Lightweight, tree-shakeable holiday calculator with algorithmic date computation',
      logo: {
        light: './src/assets/logo-light.svg',
        dark: './src/assets/logo-dark.svg',
        replacesTitle: true,
      },
      social: {
        github: 'https://github.com/bledxs/soff-date',
      },
      editLink: {
        baseUrl: 'https://github.com/bledxs/soff-date/edit/main/docs/',
      },
      customCss: ['./src/styles/custom.css'],
      defaultLocale: 'root',
      locales: {
        root: {
          label: 'English',
          lang: 'en',
        },
        es: {
          label: 'Español',
          lang: 'es',
        },
      },
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', slug: 'getting-started/introduction' },
            { label: 'Why Soff Date?', slug: 'getting-started/why' },
            { label: 'Installation', slug: 'getting-started/installation' },
            { label: 'Quick Start', slug: 'getting-started/quick-start' },
          ],
        },
        {
          label: 'Core Concepts',
          items: [
            { label: 'How it Works', slug: 'concepts/how-it-works' },
            { label: 'Holiday Rules', slug: 'concepts/holiday-rules' },
            { label: 'Shift Rules', slug: 'concepts/shift-rules' },
            { label: 'Business Days', slug: 'concepts/business-days' },
          ],
        },
        {
          label: 'API Reference',
          items: [
            { label: 'Overview', slug: 'api/overview' },
            { label: 'getHolidays()', slug: 'api/get-holidays' },
            { label: 'isHoliday()', slug: 'api/is-holiday' },
            { label: 'getNextHoliday()', slug: 'api/get-next-holiday' },
            { label: 'isBusinessDay()', slug: 'api/is-business-day' },
            { label: 'businessDays()', slug: 'api/business-days' },
          ],
        },
        {
          label: 'Locales',
          items: [
            { label: 'Overview', slug: 'locales/overview' },
            { label: '🇨🇴 Colombia', slug: 'locales/colombia' },
            { label: '🇺🇸 United States', slug: 'locales/united-states' },
            { label: '🇲🇽 México', slug: 'locales/mexico' },
            { label: '🇦🇷 Argentina', slug: 'locales/argentina' },
            { label: '🇧🇷 Brasil', slug: 'locales/brasil' },
          ],
        },
        {
          label: 'Internationalization',
          items: [
            { label: 'Available Languages', slug: 'i18n/languages' },
            { label: 'Custom Translations', slug: 'i18n/custom-translations' },
          ],
        },
        {
          label: 'Advanced Usage',
          items: [
            { label: 'Custom Locales', slug: 'advanced/custom-locales' },
            { label: 'Using Algorithms', slug: 'advanced/algorithms' },
            { label: 'Tree-shaking', slug: 'advanced/tree-shaking' },
          ],
        },
        {
          label: 'Examples',
          items: [
            { label: 'Common Use Cases', slug: 'examples/common-use-cases' },
            { label: 'Business Days Calculator', slug: 'examples/business-days' },
            { label: 'Multi-locale Apps', slug: 'examples/multi-locale' },
            { label: 'Holiday Calendar', slug: 'examples/calendar' },
          ],
        },
        {
          label: 'Resources',
          items: [
            { label: 'TypeScript Types', slug: 'resources/types' },
            { label: 'Bundle Size', slug: 'resources/bundle-size' },
            { label: 'Migration Guide', slug: 'resources/migration' },
            { label: 'Contributing', slug: 'resources/contributing' },
            { label: 'Changelog', slug: 'resources/changelog' },
          ],
        },
      ],
      components: {
        Head: './src/components/Head.astro',
      },
      head: [
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content: 'https://soff-date.dev/og-image.png',
          },
        },
      ],
    }),
  ],
});
