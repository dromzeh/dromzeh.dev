<script setup lang="ts">
defineProps<{ caption?: string }>();
</script>

<template>
  <figure>
    <slot />
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>
