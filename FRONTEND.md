# Frontend Architecture

A philosophical blog about process ontology deserves a frontend that practices what it preaches: no unnecessary substance, only what is actively in use. This document records the stack decisions and their rationale so future contributors understand *why* before they change *what*.

---

## Stack

| Layer | Tool | Why |
|---|---|---|
| Meta-framework | **Astro 6** | Zero-JS by default; content collections are first-class; static output maps to GitHub Pages without ceremony |
| Interactive components | **Svelte 5** | Runes-based reactivity compiles away to minimal JS; islands architecture means Svelte only ships where it is explicitly used |
| Styling | **Vanilla CSS with custom properties** | Design tokens in `:root` give all the composability of a CSS-in-JS system with zero runtime cost |
| Typography | **EB Garamond via @fontsource** | Self-hosted instead of Google Fonts — no third-party request on page load, no privacy trade-off |
| Search | **Pagefind** | Post-build static index; search that works without a server, without JavaScript bundles shipped up front |
| Rich content | **@astrojs/mdx** | Enables Astro and Svelte components inside `.mdx` posts for callouts, diagrams, and interactive footnotes without surrendering the prose-first authoring model |
| RSS | **@astrojs/rss** | Already in use; keep it |
| Deployment | **GitHub Pages (static)** | Zero infrastructure; `astro build` output committed via CI |

### What is deliberately absent

- **No React, Vue, or Solid.** Svelte is sufficient for interactive islands; adding a second framework would be pure overhead.
- **No TanStack Query / SWR.** There are no runtime data fetches. Content is resolved at build time.
- **No Tailwind.** The existing `global.css` with design tokens covers everything. Utility-class frameworks impose a secondary vocabulary on top of CSS; the vocabulary here is already minimal.
- **No client-side routing (SPA).** The site is a collection of essays, not an application. Full page navigations are fine and preserve browser history without JavaScript overhead.

---

## Philosophy

> *What we call "things" are really events — metastable processes that maintain themselves long enough to be named.*

This applies to frontend architecture too. Pages are not static artifacts sitting inertly on a server — they are the output of a build process (Astro), delivered through a transport process (HTTP), rendered through a parsing process (the browser), and read through a cognitive process (the reader). Each layer should do its work and hand off cleanly.

**Practical implications:**

1. **HTML first.** Every page should be fully readable with CSS disabled and JavaScript blocked. The prose is the product.
2. **CSS second.** Layout, typography, and colour exist to serve legibility, not brand. The warm earth-tone palette (`#faf8f4` → `#1c1917`) was chosen for long-form reading, not for visual novelty.
3. **JavaScript last — and only if irreplaceable.** Svelte components load only where needed (`client:visible`, `client:idle`). A dark-mode toggle or search UI is an acceptable use. A 40 kB framework for rendering a list of blog posts is not.

---

## Content Architecture

```
src/
├── content/
│   ├── blog/          ← Markdown and MDX files; one file = one post
│   └── manifesto.md   ← The primary long-form work
├── pages/
│   ├── index.astro    ← Home: manifesto excerpt + 5 latest posts
│   ├── blog.astro     ← Full post listing
│   └── blog/
│       └── [slug].astro  ← Static paths generated from content collection
└── styles/
    └── global.css     ← All styles; no CSS modules, no scoped styles
```

### Content collection schema

Posts are validated via Zod in `src/content.config.ts`. Frontmatter fields:

```yaml
---
title: "Post Title"          # required
date: 2026-04-11             # required — ISO 8601
description: "One sentence." # optional — shown in post list and <meta>
tags: ["process", "philosophy"] # optional
draft: true                  # optional — excludes post from all listings and routes
---
```

`draft: true` posts are excluded from every `getCollection('blog')` call and will never appear in the generated site or RSS feed.

### Slug convention

Slugs derive from filenames. Use kebab-case. The date prefix is optional but helps with ordering during local development:

```
2026-04-11-the-landscape-that-walks.md   → /blog/2026-04-11-the-landscape-that-walks
the-landscape-that-walks.md              → /blog/the-landscape-that-walks
```

Prefer the un-prefixed form for timeless pieces, the date-prefixed form for time-sensitive commentary.

---

## Svelte Islands

Svelte is available for interactive components but must not be used where plain HTML and CSS suffice.

### Hydration directives

| Directive | When to use |
|---|---|
| `client:visible` | Component only needed when scrolled into view (e.g. search) |
| `client:idle` | Non-critical enhancement after page load (e.g. theme toggle) |
| `client:load` | Required immediately on load — justify in a comment |
| `client:only="svelte"` | Component has no meaningful server-rendered HTML |

### State management

Follow the same four-tier pattern as [causaganha](https://github.com/franklinbaldo/causaganha):

1. **Build-time** — derived from content collection at `astro build`
2. **Component-local** — Svelte 5 runes (`$state`, `$derived`)
3. **Cross-island shared** — `.svelte.ts` store files
4. **Singleton lazy-loaders** — for heavy resources loaded once per session

---

## Styling System

All design decisions live in `src/styles/global.css`. No component-level styles, no CSS modules.

### Design tokens

```css
:root {
  /* Typography */
  --font-serif: "EB Garamond", Georgia, serif;
  --font-mono: ui-monospace, monospace;

  /* Colour — warm parchment palette */
  --color-bg:      #faf8f4;   /* page background */
  --color-surface: #f2efe9;   /* code blocks, raised surfaces */
  --color-border:  #d6d0c4;   /* dividers, rule lines */
  --color-text:    #1c1917;   /* body copy */
  --color-muted:   #78716c;   /* metadata, captions */
  --color-accent:  #92400e;   /* links, highlights — warm amber-brown */
}
```

Dark mode extends these tokens by overriding them under a `[data-theme="dark"]` attribute (not a `prefers-color-scheme` media query alone, so users can toggle manually):

```css
[data-theme="dark"] {
  --color-bg:      #1c1917;
  --color-surface: #292524;
  --color-border:  #44403c;
  --color-text:    #faf8f4;
  --color-muted:   #a8a29e;
  --color-accent:  #fb923c;
}
```

### Typography scale

| Element | Size | Notes |
|---|---|---|
| Body | `1.125rem` / `1.75` line-height | Optimised for long-form reading |
| `h1` | `2rem` | Page titles only |
| `h2` | `1.5rem` | Section headers; gains a border-bottom rule |
| `h3` | `1.2rem` | Subsection headers |
| `p`, `li` | `max-width: 68ch` | Hard measure cap; prevents excessively long lines |
| `.container` | `max-width: 44rem` | Column cap; centered |

Measure (`68ch`) and container (`44rem`) are set independently so code blocks and block elements can bleed slightly wider than prose while prose itself stays readable.

---

## Performance Rules

1. **No Google Fonts requests** — use `@fontsource/eb-garamond` (self-hosted, tree-shaken). Remove the `@import url(...)` from `global.css` after installing the package.
2. **No client-side JavaScript by default.** Every `.astro` page must render without `client:*` directives unless there is a documented reason.
3. **Svelte components are islands**, not the whole page. Never wrap an entire layout in a Svelte component.
4. **Images use the Astro `<Image />` component** for automatic format conversion and responsive sizing. Do not use raw `<img>` tags for content images.
5. **Pagefind runs post-build** (`pagefind --site dist`). Do not ship a search bundle that loads before user intent.
6. **`<head>` stays lean.** No analytics, no tracking pixels, no social SDKs. RSS and canonical `<link>` tags are sufficient.

---

## Enhancements Roadmap

These are not planned; they are *available* if the site's needs grow. Add them only when the absence is actively felt.

### Dark mode toggle
A `<ThemeToggle>` Svelte component (`client:idle`) that sets `document.documentElement.dataset.theme` and persists to `localStorage`. Inject a tiny inline `<script>` in `<head>` (before first paint) to restore the saved preference without flash.

### Estimated reading time
Compute at build time from word count in the content collection loader. Expose as `post.data.readingTime` and display in post metadata. Zero runtime cost.

### Table of contents
For manifesto-length posts, extract `## ` headings at build time and render a sticky `<aside>` with jump links. Astro's `remarkPlugins` can produce the heading list during Markdown processing.

### Static search (Pagefind)
```bash
npm install --save-dev pagefind
# Add to build script: astro build && pagefind --site dist
```

Add a `<Search />` Svelte component (`client:visible`) that loads the Pagefind UI only after the user focuses the search input. The index is built once at deploy time; no server needed.

### Open Graph / Social cards
Generate `og:image` cards at build time using a custom endpoint rendering an Astro template to PNG via Satori. One card per post, derived from title and description frontmatter.

---

## Adding a New Page

1. Create `src/pages/your-page.astro`.
2. Import the shared layout (once one exists) or compose `<head>`, `.site-header`, and `.site-footer` directly.
3. Prefer Astro components. Use Svelte only for interactive behaviour. If you reach for `client:load`, write down why in a comment.
4. Run `astro build` locally and check the `dist/` output size before committing.

## Adding a New Blog Post

1. Create `src/content/blog/your-slug.md` (or `your-slug.mdx` if you need Svelte/Astro components in the prose).
2. Add required frontmatter (`title`, `date`). All other fields are optional.
3. Write. The build handles slug, routing, RSS, and the post listing automatically.
4. To preview: `npm run dev`.
5. To keep a post out of production while drafting: add `draft: true` to the frontmatter.
