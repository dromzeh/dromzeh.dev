<script setup lang="ts">
import type { StCell, StRow } from "./StateTable.vue";

const root = ref<HTMLElement | null>(null);

interface Asset {
  id: string;
  name: string;
  caption: string;
  cos: number;
}

const ASSETS: Asset[] = [
  { id: "sword", name: "sword_final_v2_FINAL.png", caption: "a longsword with a blue hilt on white", cos: 0.16 },
  { id: "img4471", name: "IMG_4471.png", caption: "a girl with blue hair in a red jacket, holding a sword", cos: 0.39 },
  { id: "chr0192", name: "CHR_0192_hair.png", caption: "a girl with blue hair, bust, close-up", cos: 0.33 },
  { id: "export", name: "export_000381.png", caption: "a red jacket on a mannequin", cos: 0.26 },
  { id: "swamp", name: "swamp_tile_03.png", caption: "a green swamp floor tile", cos: 0.11 },
  { id: "gloom", name: "dr_gloomsworth_sword.png", caption: "a tired doctor in a red coat holding a sword like a clipboard", cos: 0.27 },
  { id: "a3f9", name: "a3f9c2e1.png", caption: "a blue haired girl in a red jacket, back view", cos: 0.41 },
  { id: "lobby", name: "bg_hospital_lobby.png", caption: "an empty hospital lobby at night", cos: 0.19 },
];

const STEPS = [
  { query: "sword", shown: "LIKE '%sword%'", lane: "Filename lane" },
  { query: "sword", shown: "name ILIKE '%sword%'", lane: "Filename lane" },
  { query: "sw", shown: "name ILIKE '%sw%'", lane: "Filename lane" },
  { query: "sw_rd", shown: "name ILIKE '%sw\_rd%'", lane: "Filename lane" },
  { query: "blue hair, red jacket", shown: "search @@ 'blue & hair & red & jacket' · dot(q, v) over 768 floats", lane: "Caption lane · vector lane" },
  { query: "blue hair, red jacket", shown: "Captions first, then the vectors", lane: "Blended results" },
];

const { step, local } = useScene(root, "search", STEPS.length);
const current = computed(() => STEPS[step.value]!);

const likeHit = (a: Asset, term: string) => a.name.includes(term);
const captionHit = (a: Asset) => a.caption.includes("blue hair") && a.caption.includes("red jacket");
const captioned = ASSETS.filter(captionHit);
const vectorOnly = [...ASSETS].sort((a, b) => b.cos - a.cos).filter((a) => !captionHit(a));
const rank = (a: Asset) => (captionHit(a) ? captioned.indexOf(a) : captioned.length + vectorOnly.indexOf(a)) + 1;

const columns = computed(() => {
  const s = step.value;
  if (s <= 3) return ["File", "Read", "Match"];
  if (s === 4) return ["File", "Caption", "Cosine"];
  return ["File", "Lane", "Cosine", "Rank"];
});
const cols = computed(() => (step.value === 5 ? "minmax(0, 1fr) max-content max-content max-content" : "minmax(0, 1fr) max-content max-content"));

const READS = [8, 2, 8, 0, 8, 8];
const prevReads = computed(() => READS[Math.max(0, step.value - 1)]!);
const roll = computed(() => {
  const x = Math.min(1, Math.max(0, local.value / 0.42));
  return `translateY(${-x * x * (3 - 2 * x) * 100}%)`;
});

const rows = computed<StRow[]>(() => {
  const s = step.value;
  return ASSETS.map((a): StRow => {
    const cells: StCell[] = [a.name];
    if (s === 0 || s === 2) {
      const hit = likeHit(a, STEPS[s]!.query);
      return { id: a.id, cells: [...cells, { sw: true }, { sw: hit, ok: hit }], inactive: !hit, lit: hit };
    }
    if (s === 1) {
      const hit = a.name.toLowerCase().includes("sword");
      return { id: a.id, cells: [...cells, { sw: hit }, { sw: hit, ok: hit }], inactive: !hit, lit: hit };
    }
    if (s === 3) {
      return { id: a.id, cells: [...cells, { sw: false }, { sw: false }], inactive: true };
    }
    if (s === 4) {
      const hit = captionHit(a);
      return { id: a.id, cells: [...cells, { sw: hit, ok: hit }, { text: a.cos.toFixed(2), align: "end" }], lit: hit, inactive: !hit && a.cos < 0.3 };
    }
    const hit = captionHit(a);
    const r = rank(a);
    return {
      id: a.id,
      cells: [...cells, { text: hit ? "caption" : "vector", align: "end" }, { text: a.cos.toFixed(2), align: "end" }, { text: `#${r}`, align: "end" }],
      lit: hit,
      inactive: r > 5,
    };
  });
});
</script>

<template>
  <figure ref="root">
    <div class="dg">
      <div style="min-height: 360px">
        <div class="dg-query">
          <span class="k">Query</span>
          <Transition name="swap" mode="out-in"><span :key="current.query" class="q">{{ current.query }}</span></Transition>
          <Transition name="swap" mode="out-in"><span :key="current.shown" class="sql">{{ current.shown }}</span></Transition>
        </div>
        <div class="dg-lane">
          <Transition name="swap" mode="out-in"><span :key="current.lane">{{ current.lane }}</span></Transition>
          <span class="r">
            <span class="roll"><u :style="{ transform: roll }">{{ prevReads }}</u><u :style="{ transform: roll }">{{ READS[step] }}</u></span>
            rows read
          </span>
        </div>
        <div class="dg-panel">
          <StateTable :columns="columns" :rows="rows" :cols="cols" />
        </div>
      </div>
    </div>
    <figcaption><slot /></figcaption>
  </figure>
</template>
