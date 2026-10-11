<script lang="ts" module>
  import chevronLeft from '../assets/icons/chevron-left.svg?raw';
  import chevronRight from '../assets/icons/chevron-right.svg?raw';
  import sun from '../assets/icons/sun.svg?raw';
  import moon from '../assets/icons/moon.svg?raw';

  const icons = {
    'chevron-left': chevronLeft,
    'chevron-right': chevronRight,
    sun: sun,
    moon: moon,
  } as const;

  export type SvgIconName = keyof typeof icons;
</script>

<script lang="ts">
  interface Props {
    name: SvgIconName;
  }

  const { name }: Props = $props();
</script>

{@html icons[name]}
