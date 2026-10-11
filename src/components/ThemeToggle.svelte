<script lang="ts">
  import SvgIcon from './SvgIcon.svelte';

  interface Props {
    labelDark?: string;
    labelLight?: string;
  }

  const { labelDark = 'Switch to dark mode', labelLight = 'Switch to light mode' }: Props =
    $props();

  let isDark = $state(false);

  $effect(() => {
    isDark = document.documentElement.classList.contains('dark');
  });

  function toggle() {
    isDark = !isDark;
    document.documentElement.classList.toggle('dark', isDark);
    const theme = isDark ? 'dark' : 'light';

    document.cookie = `theme=${theme}; path=/; max-age=31536000; SameSite=Lax`;
    try {
      localStorage.setItem('theme', theme);
    } catch {
    }
  }
</script>

<button
  onclick={toggle}
  class="theme-toggle"
  type="button"
  aria-label={isDark ? labelLight : labelDark}
  title={isDark ? labelLight : labelDark}
>
  {#if isDark}
    <SvgIcon name="sun" />
  {:else}
    <SvgIcon name="moon" />
  {/if}
</button>

<style>
  .theme-toggle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-full);
    background: transparent;
    color: var(--color-text);
    cursor: pointer;
    transition:
      background-color var(--transition-fast),
      border-color var(--transition-fast),
      color var(--transition-fast);
  }

  .theme-toggle:hover {
    background: var(--color-accent-soft);
    border-color: var(--color-accent);
    color: var(--color-accent);
  }
</style>
