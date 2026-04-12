<script>
  import { onMount } from 'svelte';

  const STEPS = [0.85, 1, 1.15, 1.3];
  const DEFAULT = 1;

  let scale = $state(DEFAULT);

  onMount(() => {
    const saved = parseFloat(localStorage.getItem('fontSizeScale') ?? '');
    if (STEPS.includes(saved)) {
      scale = saved;
    } else {
      localStorage.removeItem('fontSizeScale');
      document.documentElement.style.setProperty('--font-size-scale', String(DEFAULT));
    }
  });

  function setScale(s) {
    scale = s;
    document.documentElement.style.setProperty('--font-size-scale', String(s));
    localStorage.setItem('fontSizeScale', String(s));
  }

  function decrease() {
    const idx = STEPS.indexOf(scale);
    if (idx > 0) setScale(STEPS[idx - 1]);
  }

  function increase() {
    const idx = STEPS.indexOf(scale);
    if (idx < STEPS.length - 1) setScale(STEPS[idx + 1]);
  }
</script>

<div class="font-size-control" aria-label="Font size">
  <button
    onclick={decrease}
    disabled={scale === STEPS[0]}
    aria-label="Decrease font size"
    title="Decrease font size"
  >A−</button>
  <button
    onclick={increase}
    disabled={scale === STEPS[STEPS.length - 1]}
    aria-label="Increase font size"
    title="Increase font size"
  >A+</button>
</div>

<style>
  .font-size-control {
    display: flex;
    gap: 0.15rem;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 0.8rem;
    font-family: ui-monospace, monospace;
    color: var(--color-muted);
    padding: 0.4rem 0.45rem;
    min-width: 32px;
    min-height: 36px;
    border-radius: 3px;
    transition: color 0.1s;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-tap-highlight-color: transparent;
  }

  button:hover:not(:disabled) {
    color: var(--color-text);
  }

  button:disabled {
    opacity: 0.3;
    cursor: default;
  }
</style>
