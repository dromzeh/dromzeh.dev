<script setup lang="ts">
defineProps<{ src: string; poster?: string; caption?: string }>();
</script>

<template>
  <figure>
    <video
      :src="src"
      :poster="poster"
      controls
      playsinline
      preload="metadata"
      class="aspect-video w-full rounded-sm border border-line bg-black object-contain"
    />
    <figcaption v-if="caption">
      {{ caption }}
    </figcaption>
  </figure>
</template>
