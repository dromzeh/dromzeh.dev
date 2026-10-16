<script setup lang="ts">
import { isVideo, type CraftPiece } from "~/data/craft";

defineProps<{ piece: CraftPiece }>();

const video = ref<HTMLVideoElement | null>(null);

let io: IntersectionObserver | undefined;
onMounted(() => {
  const el = video.value;
  if (!el || reducedMotion()) return;
  io = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        if (!el.src) el.src = el.dataset.src ?? "";
        void el.play().catch(() => {});
      } else {
        el.pause();
      }
    },
    { rootMargin: "200px 0px" },
  );
  io.observe(el);
});
onUnmounted(() => io?.disconnect());
</script>

<template>
  <figure class="mb-10 flex flex-col gap-2">
    <video
      v-if="isVideo(piece)"
      ref="video"
      :data-src="piece.src"
      :poster="piece.poster"
      preload="none"
      loop
      muted
      playsinline
      :aria-label="piece.title"
      :style="piece.aspect ? { aspectRatio: piece.aspect } : undefined"
      class="w-full rounded-[2px] bg-surface"
    />
    <img
      v-else
      :src="piece.src"
      :alt="piece.title"
      loading="lazy"
      :style="piece.aspect ? { aspectRatio: piece.aspect } : undefined"
      class="w-full rounded-[2px] bg-surface object-cover"
    />
    <figcaption class="flex items-baseline justify-between gap-4 text-[15px] leading-6">
      <span class="text-text">{{ piece.title }}</span>
      <span v-if="piece.note" class="whitespace-nowrap text-muted">{{ piece.note }}</span>
    </figcaption>
  </figure>
</template>
