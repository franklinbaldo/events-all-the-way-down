/**
 * Canonical font-size scale steps shared across FontSizeControl.svelte and
 * Layout.astro. The Layout.astro inline bootstrap script cannot import modules,
 * so it must hard-code the same values — keep both in sync when changing these.
 */
export const FONT_SIZE_STEPS = [0.85, 1, 1.15, 1.3] as const;
export const FONT_SIZE_DEFAULT = 1;
