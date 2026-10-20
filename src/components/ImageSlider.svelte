<script lang="ts">
  import SvgIcon from './SvgIcon.svelte';

  interface Slide {
    src: string;
    alt: string;
    position?: string;
  }

  interface Props {
    slides: Slide[];
    labelPrev?: string;
    labelNext?: string;
    interval?: number;
  }

  const {
    slides,
    labelPrev = 'Previous image',
    labelNext = 'Next image',
    interval = 5000,
  }: Props = $props();

  let current = $state(0);
  let paused = $state(false);

  function go(index: number) {
    current = (index + slides.length) % slides.length;
  }

  function next() {
    go(current + 1);
  }

  function prev() {
    go(current - 1);
  }

  $effect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (paused || reduce || slides.length <= 1) return;

    const id = setInterval(next, interval);
    return () => clearInterval(id);
  });
</script>

<div
  class="slider"
  role="region"
  aria-roledescription="carousel"
  aria-label="Bildergalerie"
  onmouseenter={() => (paused = true)}
  onmouseleave={() => (paused = false)}
>
  <div class="slider-track">
    {#each slides as slide, i (slide.src)}
      <img
        src={slide.src}
        alt={slide.alt}
        class="slide"
        class:active={i === current}
        loading={i === 0 ? 'eager' : 'lazy'}
        aria-hidden={i === current ? 'false' : 'true'}
        style={slide.position ? `object-position: ${slide.position}` : undefined}
      />
    {/each}
  </div>

  {#if slides.length > 1}
    <button type="button" class="arrow arrow-left" onclick={prev} aria-label={labelPrev}>
      <SvgIcon name="chevron-left" />
    </button>
    <button type="button" class="arrow arrow-right" onclick={next} aria-label={labelNext}>
      <SvgIcon name="chevron-right" />
    </button>

    <div class="dots">
      {#each slides as _, i (i)}
        <button
          type="button"
          class="dot"
          class:active={i === current}
          onclick={() => go(i)}
          aria-label={`Bild ${i + 1}`}
          aria-current={i === current ? 'true' : undefined}
        ></button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .slider {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    border-radius: var(--radius-2xl);
    box-shadow: var(--shadow-lg);
    background: var(--color-bg-secondary);
  }

  .slider-track {
    position: absolute;
    inset: 0;
  }

  .slide {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0;
    transition: opacity 800ms ease;
  }

  .slide.active {
    opacity: 1;
  }

  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    border: none;
    border-radius: var(--radius-full);
    background: oklch(100% 0 0 / 0.8);
    color: #4a2f26;
    cursor: pointer;
    transition:
      background-color var(--transition-fast),
      transform var(--transition-fast);
  }

  .arrow:hover {
    background: oklch(100% 0 0 / 0.95);
    transform: translateY(-50%) scale(1.08);
  }

  .arrow-left {
    left: 0.75rem;
  }

  .arrow-right {
    right: 0.75rem;
  }

  .dots {
    position: absolute;
    bottom: 0.9rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.5rem;
  }

  .dot {
    width: 0.7rem;
    height: 0.7rem;
    padding: 0;
    border: none;
    border-radius: var(--radius-full);
    background: oklch(100% 0 0 / 0.55);
    cursor: pointer;
    transition:
      background-color var(--transition-fast),
      transform var(--transition-fast);
  }

  .dot.active {
    background: #ffffff;
    transform: scale(1.25);
  }
</style>
