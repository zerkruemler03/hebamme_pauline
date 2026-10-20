import { getImage } from 'astro:assets';

export interface Slide {
  src: string;
  alt: string;
}

/**
 * new image in /slides with number
 */
const slideModules = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/slides/*.{jpg,jpeg,png}',
  { eager: true }
);

export async function loadSlides(altFor: (index: number) => string): Promise<Slide[]> {
  const paths = Object.keys(slideModules).sort();

  return Promise.all(
    paths.map(async (path, i) => {
      const optimized = await getImage({
        src: slideModules[path].default,
        width: 1600,
        format: 'webp',
        quality: 72,
      });
      return {
        src: optimized.src,
        alt: altFor(i),
      };
    })
  );
}
