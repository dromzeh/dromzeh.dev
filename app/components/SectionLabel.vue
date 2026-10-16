<script setup lang="ts">
withDefaults(defineProps<{ count: number; as?: string }>(), { as: "span" });
</script>

<template>
  <component :is="as" class="section-label">
    <slot />
    <span>({{ count }})</span>
  </component>
</template>
