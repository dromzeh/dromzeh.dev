<script setup lang="ts">
import type { StRow } from "./StateTable.vue";

const root = ref<HTMLElement | null>(null);

const REQUESTS = [
  { path: "asset/7f3a91-preview.webp", verdict: "serve", tone: "ok", r2: "read once, then cached" },
  { path: "asset/7f3a91-thumb.webp", verdict: "serve", tone: "ok", r2: "cache hit" },
  { path: "asset/7f3a91.png", verdict: "301 → preview", tone: "em", r2: "untouched" },
  { path: "limbo/c19e04.png", verdict: "404", tone: "bad", r2: "untouched" },
  { path: "trash/b20d57-preview.webp", verdict: "404", tone: "bad", r2: "untouched" },
] as const;

const { step } = useScene(root, "decide", REQUESTS.length);

const rows = computed<StRow[]>(() =>
  REQUESTS.map((r, i) => ({
    id: r.path,
    lit: i === step.value,
    inactive: i > step.value,
    cells: [
      { path: r.path },
      i <= step.value ? { tag: r.verdict, tone: r.tone } : "",
      { text: i <= step.value ? r.r2 : "", align: "end", dim: i !== step.value || r.r2 === "untouched" },
    ],
  })),
);
</script>

<template>
  <figure ref="root">
    <div class="dg">
      <div class="dg-panel">
        <StateTable :columns="['Request', 'decide()', 'R2']" :rows="rows" cols="minmax(0, 1fr) minmax(0, 120px) minmax(0, 160px)" />
      </div>
    </div>
    <figcaption><slot /></figcaption>
  </figure>
</template>
