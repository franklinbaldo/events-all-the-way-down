<script>
  import { onMount } from 'svelte';

  let theme = $state('light');

  onMount(() => {
    theme = localStorage.getItem('theme') ??
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  function toggle() {
    theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }
</script>

<button
  onclick={toggle}
  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
  title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
>
  {#if theme === 'dark'}
    ☀
  {:else}
    ☾
  {/if}
</button>

<style>
  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    color: var(--color-muted);
    padding: 0.25rem 0.5rem;
    border-radius: 3px;
    transition: color 0.1s;
    line-height: 1;
    margin-left: auto;
  }

  button:hover {
    color: var(--color-text);
  }
</style>
