<script>
  import { onMount } from 'svelte';

  onMount(() => {
    document.querySelectorAll('article pre').forEach(pre => {
      if (pre.querySelector('.copy-btn')) return; // already enhanced

      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.textContent = 'Copy';
      btn.setAttribute('aria-label', 'Copy code to clipboard');

      btn.addEventListener('click', async () => {
        const code = pre.querySelector('code')?.textContent ?? pre.textContent ?? '';
        await navigator.clipboard.writeText(code);
        btn.textContent = 'Copied!';
        btn.setAttribute('aria-label', 'Copied!');
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.setAttribute('aria-label', 'Copy code to clipboard');
        }, 2000);
      });

      pre.style.position = 'relative';
      pre.appendChild(btn);
    });
  });
</script>

<!-- No rendered output — this component only enhances existing <pre> elements -->
