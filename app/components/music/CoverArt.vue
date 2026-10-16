<script setup lang="ts">
const props = defineProps<{
  src?: string;
  seed: string;
  alt?: string;
  glitch?: boolean;
}>();

const broken = ref(false);
watch(() => props.src, () => (broken.value = false));

function hashSeed(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (Math.imul(h, 31) + seed.charCodeAt(i)) | 0;
  return h;
}

const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
const h = computed(() => hashSeed(props.seed));
const hue = computed(() => Math.abs(h.value) % 360);
const turbSeed = computed(() => Math.abs(h.value) % 100);
const bars = computed(() =>
  Array.from({ length: 3 }, (_, i) => {
    const r = Math.abs(Math.imul(h.value ^ ((i + 1) * 0x9e3779b1), 0x85ebca6b));
    return { y: r % 88, height: 1.5 + ((r >> 6) % 7), shift: ((r >> 12) % 24) - 12 };
  }),
);
const gradient = computed(
  () =>
    `linear-gradient(135deg, hsl(${hue.value} 38% 32%), hsl(${(hue.value + 35) % 360} 42% 18%))`,
);
</script>

<template>
  <img v-if="src && !broken" :src="src" :alt="alt ?? ''" draggable="false" @error="broken = true" />
  <div v-else-if="glitch" aria-hidden class="overflow-hidden">
    <svg class="size-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient :id="`${uid}g`" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" :stop-color="`hsl(${hue} 45% 28%)`" />
          <stop offset="100%" :stop-color="`hsl(${(hue + 45) % 360} 55% 12%)`" />
        </linearGradient>
        <filter :id="`${uid}n`">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" :seed="turbSeed" result="n" />
          <feColorMatrix in="n" type="saturate" values="0" />
        </filter>
        <pattern :id="`${uid}s`" width="100" height="2.5" patternUnits="userSpaceOnUse">
          <rect width="100" height="1" fill="#000" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100" height="100" :fill="`url(#${uid}g)`" />
      <rect width="100" height="100" :filter="`url(#${uid}n)`" opacity="0.22" style="mix-blend-mode: overlay" />
      <g v-for="(b, i) in bars" :key="i" style="mix-blend-mode: screen">
        <rect :x="b.shift" :y="b.y" width="100" :height="b.height" :fill="`hsl(${(hue + 170) % 360} 90% 60%)`" opacity="0.55" />
        <rect :x="-b.shift" :y="b.y + 0.8" width="100" :height="b.height" :fill="`hsl(${hue} 95% 62%)`" opacity="0.45" />
      </g>
      <rect width="100" height="100" :fill="`url(#${uid}s)`" />
    </svg>
  </div>
  <div v-else aria-hidden :style="{ backgroundImage: gradient }" />
</template>
