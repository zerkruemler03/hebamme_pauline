<script lang="ts">
  interface Slide {
    src: string;
    alt: string;
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
  let timer: ReturnType<typeof setInterval> | undefined;

  function go(index: number) {
    current = (index + slides.length) % slides.length;
  }

  function next() {
    go(current + 1);
  }

  function prev() {
    go(current - 1);
  }

  function startTimer() {
    stopTimer();
    // Reduzierte Bewegung respektieren: dann kein Auto-Wechsel.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || slides.length <= 1) return;
    timer = setInterval(next, interval);
  }

  function stopTimer() {
    if (timer) clearInterval(timer);
    timer = undefined;
  }

  $effect(() => {
    startTimer();
    return stopTimer;
  });
</script>

<div
  class="slider"
  role="region"
  aria-roledescription="carousel"
  aria-label="Bildergalerie"
  onmouseenter={stopTimer}
  onmouseleave={startTimer}
  onfocusin={stopTimer}
  onfocusout={startTimer}
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
      />
    {/each}
  </div>

  {#if slides.length > 1}
    <button type="button" class="arrow arrow-left" onclick={prev} aria-label={labelPrev}>
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="m15 18-6-6 6-6" />
      </svg>
    </button>
    <button type="button" class="arrow arrow-right" onclick={next} aria-label={labelNext}>
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="m9 18 6-6-6-6" />
      </svg>
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
