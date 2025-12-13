# BoboQ Website

A modern React + Vite + TypeScript web app for BoboQ premium bubble tea supplies.

## Quick Start

```bash
npm install
npm run dev
# build & preview
npm run build
npm run preview
```

## Screenshots

- Home (Hero + Categories): shows hero banner, B2B intro, and category grid.
- Shop (Filters + Grid): responsive filters and equal-height product cards.
- Product Detail: readable descriptions, highlights, gallery.
- Cart Preview: hover preview with quantities and totals.
- Dark Mode: cohesive darker header/footer and adaptive backgrounds.

## Features

- Internationalization: 4 languages (German, English, Vietnamese, Chinese) via `LanguageContext` with `t()` UI keys and `tp()` product name transliteration.
- Auto-transliteration: 120+ German → EN/VI/ZH term map; three-tier lookup (explicit translations → auto map → fallback).
- Product catalog: 200+ products across 10 categories with images, prices, descriptions, and detail pages.
- Product filters: Category chips, search, and responsive grid with equal-height cards.
- Cart system: Add/remove items, quantity editing, live totals, and hover cart preview.
- Responsive design: Desktop, tablet, mobile breakpoints with layout, spacing, and touch target optimization.
- Mobile optimizations: iPhone-focused breakpoints (≤480px, ≥820px height), larger buttons, compact header, 44px touch targets.
- Header UX: Fixed header, WhatsApp link, main navigation, compact mobile layout (search + cart + theme/lang toggles), improved spacing.
- Footer UX: Brand logo, imprint link, social icons; tuned dark-mode styling for contrast.
- Dark mode: Global theme with CSS variables; readable ProductDetail sections, adaptive backgrounds using `var(--bg-white)`.
- Theming: Cream light background `#faf7f3`, safe-area-inset support for notches, consistent palette via CSS variables.
- Product Detail: Improved readability (font sizes, line height, highlights), gallery backgrounds, translations, and badges.
- Home page: Hero banner, B2B introduction section with translations, featured products badge, category grid.
- PWA: `manifest.json`, `service-worker.js` (cache-first/network-first mix), offline fallback, installable on mobile.
- Performance: Vite bundling, optimized image loading, minimal shadows and transitions.
- Accessibility: 44px touch targets, clear focus styles, ARIA labels on interactive elements (e.g., cart, language menu).
- Safe-area support: Uses `env(safe-area-inset-*)` to avoid notch collisions.
- Routing: `react-router` pages for Home, Shop, Product Detail, Cart, Contact, FAQ, Imprint.
- Code structure: Modular components, SCSS modules, TypeScript types, hooks for cart and navigation.

## Pages

- Home: Hero, B2B intro, category grid, featured products.
- Shop: Filters, search, product grid, responsive layout.
- Product Detail: Images, descriptions, highlights, translations.
- Cart: Item list, quantities, totals, checkout link.
- Contact: Contact form and details.
- FAQ: Common questions and answers.
- Imprint: Legal information.

## Tech Stack

- React, Vite, TypeScript
- SCSS with CSS variables for theming
- Service Worker + Web App Manifest (PWA)
- React Router

## Development

- Install dependencies: `npm install`
- Run dev server: `npm run dev`
- Build: `npm run build`
- Preview build: `npm run preview`

## Notes

- Dark mode is toggled via a button in the header and persisted in `localStorage`.
- Language selection is accessible in the header; translations live in `src/i18n/translations.ts`.
- Product name translation leverages the `LanguageContext` transliteration map.
