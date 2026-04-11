<script>
  import { onMount } from 'svelte';

  // Configure these via giscus.app — enter your repo and copy the IDs.
  // Steps: https://giscus.app → select franklinbaldo/events-all-the-way-down
  //        → copy data-repo-id and data-category-id below.
  const REPO = 'franklinbaldo/events-all-the-way-down';
  const REPO_ID = 'REPLACE_WITH_REPO_ID';       // from giscus.app
  const CATEGORY = 'Announcements';
  const CATEGORY_ID = 'REPLACE_WITH_CATEGORY_ID'; // from giscus.app

  let { term = '' } = $props();
  let container = $state();
  let currentTheme = $state('light');

  onMount(() => {
    currentTheme = localStorage.getItem('theme') ??
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', REPO);
    script.setAttribute('data-repo-id', REPO_ID);
    script.setAttribute('data-category', CATEGORY);
    script.setAttribute('data-category-id', CATEGORY_ID);
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '1');
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'bottom');
    script.setAttribute('data-theme', currentTheme === 'dark' ? 'dark_dimmed' : 'light');
    script.setAttribute('data-lang', 'en');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;
    container.appendChild(script);

    // Keep Giscus theme in sync with the site theme toggle.
    const observer = new MutationObserver(() => {
      const theme = document.documentElement.dataset.theme ?? 'light';
      const iframe = document.querySelector('iframe.giscus-frame');
      if (iframe) {
        iframe.contentWindow?.postMessage(
          { giscus: { setConfig: { theme: theme === 'dark' ? 'dark_dimmed' : 'light' } } },
          'https://giscus.app'
        );
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    return () => observer.disconnect();
  });
</script>

<section class="comments" aria-label="Comments">
  <div bind:this={container}></div>
</section>

<style>
  .comments {
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 1px solid var(--color-border);
  }
</style>
