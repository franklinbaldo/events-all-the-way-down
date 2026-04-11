<script>
  /** @typedef {{ id: string; title: string; date: string; description: string | null; tags: string[] }} Post */

  /** @type {{ posts: Post[], base: string }} */
  let { posts, base = '/' } = $props();

  let activeTag = $state(null);

  let allTags = $derived(
    [...new Set(posts.flatMap(p => p.tags))].sort()
  );

  let filtered = $derived(
    activeTag ? posts.filter(p => p.tags.includes(activeTag)) : posts
  );

  function formatDate(iso) {
    const d = new Date(iso);
    return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
  }

  function toggle(tag) {
    activeTag = activeTag === tag ? null : tag;
  }
</script>

{#if allTags.length > 0}
<div class="tag-filters" role="group" aria-label="Filter by tag">
  {#each allTags as tag}
  <button
    class:active={activeTag === tag}
    onclick={() => toggle(tag)}
    aria-pressed={activeTag === tag}
  >{tag}</button>
  {/each}
</div>
{/if}

<ul class="post-list">
  {#each filtered as post (post.id)}
  <li>
    <a href={`${base}blog/${post.id}`} class="post-title">{post.title}</a>
    <div class="post-date">{formatDate(post.date)}</div>
    {#if post.description}
    <p class="post-desc">{post.description}</p>
    {/if}
  </li>
  {/each}
</ul>

{#if filtered.length === 0}
<p style="color: var(--color-muted); margin-top: 1rem;">No posts with this tag.</p>
{/if}

<style>
  .tag-filters {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  button {
    background: none;
    border: 1px solid var(--color-border);
    border-radius: 2rem;
    padding: 0.2rem 0.75rem;
    font-size: 0.8rem;
    font-family: ui-monospace, monospace;
    color: var(--color-muted);
    cursor: pointer;
    transition: all 0.1s;
  }

  button:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }

  button.active {
    background: var(--color-accent);
    border-color: var(--color-accent);
    color: #fff;
  }
</style>
