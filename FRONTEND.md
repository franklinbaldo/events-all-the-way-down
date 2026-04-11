# Frontend Architecture

A philosophical blog about process ontology deserves a frontend that practices what it preaches: no unnecessary substance, only what is actively in use. This document records the stack decisions and their rationale so future contributors understand *why* before they change *what*.

---

## Stack

| Layer | Tool | Why |
|---|---|---|
| Meta-framework | **Astro 6** | Zero-JS by default; content collections are first-class; static output maps to GitHub Pages without ceremony |
| Components | **Astro components only** | No Svelte, React, or Vue — the entire site renders to HTML at build time; adding a reactive framework would be adding unused substance |
| Styling | **Vanilla CSS with custom properties** | Design tokens in `:root` give all the composability of a CSS-in-JS system with zero runtime cost |
| Typography | **EB Garamond via @fontsource** | Self-hosted instead of Google Fonts — no third-party request on page load, no privacy trade-off |
| Search | **Pagefind** | Post-build static index; search that works without a server, without JavaScript bundles shipped up front |
| Rich content | **@astrojs/mdx** | Enables Astro components inside Markdown when needed (callouts, diagrams, interactive footnotes) without surrendering the prose-first authoring model |
| RSS | **@astrojs/rss** | Already in use; keep it |
| Deployment | **GitHub Pages (static)** | Zero infrastructure; `astro build` output committed via CI |

### What is deliberately absent

- **No UI framework** (React, Svelte, Vue, Solid). There are no interactive data dashboards, no complex client state, no real-time feeds. Adding a framework here would be premature substance — a thing masquerading as process.
- **No TanStack Query / SWR**. There are no runtime data fetches. Content is resolved at build time.
- **No Tailwind**. The existing `global.css` with design tokens is 83 lines and covers everything. Utility-class frameworks impose a secondary vocabulary on top of CSS; the vocabulary here is already minimal.
- **No client-side routing (SPA)**. The site is a collection of essays, not an application. Full page navigations are fine and preserve browser history without JavaScript overhead.

---

## Philosophy

> *What we call "things" are really events — metastable processes that maintain themselves long enough to be named.*

This applies to frontend architecture too. Pages are not static artifacts sitting inertly on a server — they are the output of a build process (Astro), delivered through a transport process (HTTP), rendered through a parsing process (the browser), and read through a cognitive process (the reader). Each layer should do its work and hand off cleanly.

**Practical implications:**

1. **HTML first.** Every page should be fully readable with CSS disabled and JavaScript blocked. The prose is the product.
2. **CSS second.** Layout, typography, and colour exist to serve legibility, not brand. The warm earth-tone palette (`#faf8f4` → `#1c1917`) was chosen for long-form reading, not for visual novelty.
3. **JavaScript last — and only if irreplaceable.** Pagefind requires a small script tag. A dark-mode toggle requires a handful of lines. These are acceptable. A 40 kB framework for rendering a list of blog posts is not.

---

## Content Architecture

```
src/
├── content/
│   ├── blog/          ← Markdown/MDX files; one file = one post
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

Posts are validated via Zod in `src/content.config.ts`. Required frontmatter:

```yaml
---
title: "Post Title"
date: 2026-04-11        # ISO 8601
description: "One sentence."
tags: ["process", "philosophy"]
---
```

`draft: true` is supported — drafts are excluded from production builds and the RSS feed.

### Slug convention

Slugs derive from filenames. Use kebab-case. The date prefix is optional but helps with ordering during local development:

```
2026-04-11-the-landscape-that-walks.md   → /blog/2026-04-11-the-landscape-that-walks
the-landscape-that-walks.md              → /blog/the-landscape-that-walks
```

Prefer the un-prefixed form for timeless pieces, the date-prefixed form for time-sensitive commentary.

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
3. **Images use the Astro `<Image />` component** for automatic format conversion and responsive sizing. Do not use raw `<img>` tags for content images.
4. **Pagefind runs post-build** (`pagefind --site dist`). Do not ship a search bundle that loads before user intent.
5. **`<head>` stays lean.** No analytics, no tracking pixels, no social SDKs. RSS and canonical `<link>` tags are sufficient.

---

## Enhancements Roadmap

These are not planned; they are *available* if the site's needs grow. Add them only when the absence is actively felt.

### Dark mode toggle
A `<ThemeToggle>` Astro component that sets `document.documentElement.dataset.theme` and persists to `localStorage`. Inject a tiny inline `<script>` in `<head>` (before first paint) to restore the saved preference without flash.

### Estimated reading time
Compute at build time from word count in the content collection loader. Expose as `post.data.readingTime` and display in post metadata. Zero runtime cost.

### Table of contents
For manifesto-length posts, extract `## ` headings at build time and render a sticky `<aside>` with jump links. Astro's `remarkPlugins` can produce the heading list during Markdown processing.

### Static search (Pagefind)
```bash
npm install --save-dev pagefind
# Add to build script: astro build && pagefind --site dist
```

Add a `<Search />` component that loads the Pagefind UI only after the user clicks a search icon (`client:visible`). The index is built once at deploy time; no server needed.

### MDX support
```bash
npx astro add mdx
```

Enables importing Astro components into `.mdx` posts. Useful for interactive diagrams, pull quotes with custom styling, or footnote components. Use sparingly — the prose should not depend on components to be understood.

### Open Graph / Social cards
Generate `og:image` cards at build time using Astro's `@astrojs/og` or a custom endpoint rendering an Astro template to PNG via Satori. One card per post, derived from title and description frontmatter.

---

## Adding a New Page

1. Create `src/pages/your-page.astro`.
2. Import the shared layout (once one exists) or compose `<head>`, `.site-header`, and `.site-footer` directly.
3. Use only Astro components. If you reach for `client:load`, write down why in a comment.
4. Run `astro build` locally and check the `dist/` output size before committing.

## Adding a New Blog Post

1. Create `src/content/blog/your-slug.md` (or `.mdx`).
2. Add required frontmatter (`title`, `date`, `description`, `tags`).
3. Write. The build handles slug, routing, RSS, and the post listing automatically.
4. To preview: `npm run dev`.
