<script>
  import { onMount } from 'svelte';

  let progress = $state(0);

  onMount(() => {
    function update() {
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      progress = scrollable > 0 ? (el.scrollTop / scrollable) * 100 : 0;
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  });
</script>

<div
  class="reading-progress"
  style={`width: ${progress}%`}
  role="progressbar"
  aria-valuenow={Math.round(progress)}
  aria-valuemin={0}
  aria-valuemax={100}
  aria-label="Reading progress"
></div>

<style>
  .reading-progress {
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    background: var(--color-accent);
    z-index: 200;
    transition: width 80ms linear;
    pointer-events: none;
  }
</style>
