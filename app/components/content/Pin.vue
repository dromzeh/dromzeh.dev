<script setup lang="ts">
defineProps<{ scene: string; step: number | string }>();
</script>

<template>
  <span :data-pin="scene" :data-step="step" aria-hidden="true" />
</template>
