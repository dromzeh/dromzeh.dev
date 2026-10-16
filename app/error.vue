<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps<{ error: NuxtError }>();
</script>

<template>
  <main class="flex min-h-dvh items-center justify-center text-[15px]">
    <a href="/" class="plain-link">{{ error.statusCode }}</a>
  </main>
</template>
