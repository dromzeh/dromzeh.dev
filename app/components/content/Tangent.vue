<script setup lang="ts">
withDefaults(defineProps<{ label?: string }>(), { label: "Aside" });
</script>

<template>
  <aside class="aside">
    <div class="aside-label">{{ label }}</div>
    <div class="aside-plate"><slot /></div>
  </aside>
</template>
