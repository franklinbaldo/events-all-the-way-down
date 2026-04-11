<script>
  import { onMount } from 'svelte';

  let headings = $state([]);
  let activeId = $state('');
  let detailsEl = $state();

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

    // Auto-open on desktop, closed on mobile
    function syncOpen() {
      if (detailsEl) detailsEl.open = window.matchMedia('(min-width: 1024px)').matches;
    }
    const mq = window.matchMedia('(min-width: 1024px)');
    mq.addEventListener('change', syncOpen);
    syncOpen();

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
    return () => {
      mq.removeEventListener('change', syncOpen);
      observer.disconnect();
    };
  });
</script>

{#if headings.length > 0}
<nav class="toc" aria-label="Table of contents">
  <details bind:this={detailsEl} class="toc-details">
    <summary class="toc-summary">
      <span>Contents</span>
      <span class="toc-arrow" aria-hidden="true">›</span>
    </summary>
    <ol>
      {#each headings as { id, text, level }}
      <li class:indent={level === 3}>
        <a href={`#${id}`} class:active={activeId === id} onclick={() => activeId = id}>
          {text}
        </a>
      </li>
      {/each}
    </ol>
  </details>
</nav>
{/if}

<style>
  .toc {
    font-size: 0.875rem;
    line-height: 1.5;
  }

  @media (min-width: 1024px) {
    .toc {
      position: sticky;
      top: 5rem;
      max-height: calc(100vh - 8rem);
      overflow-y: auto;
    }
  }

  /* Mobile: card-style collapsible */
  .toc-details {
    border: 1px solid var(--color-border);
    border-radius: 4px;
    padding: 0.75rem 1rem;
  }

  /* Desktop: invisible wrapper, always open */
  @media (min-width: 1024px) {
    .toc-details {
      border: none;
      border-radius: 0;
      padding: 0;
    }
  }

  .toc-summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    list-style: none;
    cursor: pointer;
    font-family: ui-monospace, monospace;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-muted);
    -webkit-tap-highlight-color: transparent;
    padding: 0.25rem 0;
  }

  .toc-summary::marker,
  .toc-summary::-webkit-details-marker { display: none; }

  @media (min-width: 1024px) {
    .toc-summary {
      cursor: default;
      pointer-events: none;
      padding: 0 0 0.75rem 0;
    }
  }

  .toc-arrow {
    font-size: 1.1rem;
    line-height: 1;
    transition: transform 0.15s;
    color: var(--color-muted);
  }

  .toc-details[open] .toc-arrow { transform: rotate(90deg); }

  @media (min-width: 1024px) {
    .toc-arrow { display: none; }
  }

  ol {
    list-style: none;
    padding: 0;
    margin: 0.75rem 0 0;
  }

  @media (min-width: 1024px) {
    ol { margin-top: 0; }
  }

  li { margin-bottom: 0.35rem; }
  li.indent { padding-left: 0.875rem; }

  a {
    color: var(--color-muted);
    text-decoration: none;
    border-bottom: none;
    display: block;
    padding: 0.2rem 0;
    transition: color 0.1s;
  }

  a:hover, a.active {
    color: var(--color-accent);
    border-bottom: none;
  }
</style>
