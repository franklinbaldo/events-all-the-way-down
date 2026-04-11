<script>
  import { onMount } from 'svelte';

  let headings = $state([]);
  let activeId = $state('');

  onMount(() => {
    const article = document.querySelector('article');
    if (!article) return;

    // Collect headings; generate id from text if missing (fallback)
    headings = Array.from(article.querySelectorAll('h2, h3')).map((h, i) => {
      if (!h.id) {
        h.id = h.textContent?.trim()
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-') ?? `heading-${i}`;
      }
      return { id: h.id, text: h.textContent?.trim() ?? '', level: parseInt(h.tagName[1]) };
    });

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeId = entry.target.id;
            break;
          }
        }
      },
      { rootMargin: '-10% 0px -75% 0px', threshold: 0 }
    );

    article.querySelectorAll('h2, h3').forEach(h => observer.observe(h));
    return () => observer.disconnect();
  });
</script>

{#if headings.length > 0}
<nav class="toc" aria-label="Table of contents">
  <p class="toc-label">Contents</p>
  <ol>
    {#each headings as { id, text, level }}
    <li class:indent={level === 3}>
      <a href={`#${id}`} class:active={activeId === id} onclick={() => activeId = id}>
        {text}
      </a>
    </li>
    {/each}
  </ol>
</nav>
{/if}

<style>
  .toc {
    position: sticky;
    top: 5rem;
    max-height: calc(100vh - 8rem);
    overflow-y: auto;
    font-size: 0.875rem;
    line-height: 1.5;
  }

  .toc-label {
    font-family: ui-monospace, monospace;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-muted);
    margin-bottom: 0.75rem;
  }

  ol {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li { margin-bottom: 0.35rem; }
  li.indent { padding-left: 0.875rem; }

  a {
    color: var(--color-muted);
    text-decoration: none;
    border-bottom: none;
    display: block;
    padding: 0.1rem 0;
    transition: color 0.1s;
  }

  a:hover, a.active {
    color: var(--color-accent);
    border-bottom: none;
  }
</style>
