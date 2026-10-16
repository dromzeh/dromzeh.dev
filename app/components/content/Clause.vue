<script setup lang="ts">
defineProps<{ n: number | string }>();
</script>

<template>
  <span class="clause" :data-ref="n"><slot /></span>
</template>
