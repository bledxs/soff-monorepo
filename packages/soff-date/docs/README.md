# Soff Date Documentation

This directory contains the documentation website for Soff Date, built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build/).

## Development

```bash
cd docs
npm install
npm run dev
```

Visit http://localhost:4321 to see the docs.

## Building

```bash
npm run build
```

## Structure

```
docs/
├── src/
│   ├── content/
│   │   └── docs/           # Documentation pages
│   ├── styles/
│   │   └── custom.css      # Custom styling
│   ├── assets/             # Images, logos
│   └── components/         # Custom Astro components
├── public/                 # Static files
├── astro.config.mjs        # Astro configuration
└── package.json
```

## Deployment

The documentation can be deployed to:
- GitHub Pages
- Vercel
- Netlify
- Cloudflare Pages

Simply point your deployment to the `docs` directory and run `npm run build`.
