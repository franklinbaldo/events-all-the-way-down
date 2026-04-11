<script>
  let { title, url } = $props();

  let state = $state('idle'); // 'idle' | 'copied'

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // User cancelled or share failed — fall through to clipboard
      }
    }
    await navigator.clipboard.writeText(url);
    state = 'copied';
    setTimeout(() => state = 'idle', 2000);
  }
</script>

<button onclick={share} class="share-btn" aria-label="Share this post">
  {#if state === 'copied'}
    Link copied ✓
  {:else}
    Share ↗
  {/if}
</button>

<style>
  .share-btn {
    background: none;
    border: 1px solid var(--color-border);
    border-radius: 4px;
    padding: 0.25rem 0.75rem;
    font-size: 0.8rem;
    font-family: ui-monospace, monospace;
    color: var(--color-muted);
    cursor: pointer;
    transition: all 0.1s;
  }

  .share-btn:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }
</style>
