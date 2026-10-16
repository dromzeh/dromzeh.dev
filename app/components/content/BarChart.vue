<script setup lang="ts">
import { formatValue, type FormatPreset } from "~/utils/format";

const props = withDefaults(
  defineProps<{
    data: { label: string; sublabel?: string; value: number; em?: boolean; display?: string }[];
    max?: number;
    format?: FormatPreset;
    axis?: boolean;
  }>(),
  { format: "raw", axis: false },
);

function tickStep(top: number): number {
  const raw = top / 4;
  const mag = 10 ** Math.floor(Math.log10(raw));
  for (const m of [1, 2, 5, 10]) if (raw <= m * mag) return m * mag;
  return 10 * mag;
}

const root = ref<HTMLElement | null>(null);
const rows = ref<HTMLElement | null>(null);
const seen = ref(false);
const band = ref({ left: 0, width: 0 });

const view = computed(() => {
  const top = props.max ?? Math.max(...props.data.map((d) => d.value));
  if (!props.axis) return { ceiling: top, ticks: [] };
  const step = tickStep(top);
  const ceiling = props.max ?? Math.ceil(top / step) * step;
  const ticks: number[] = [];
  for (let t = 0; t <= ceiling + 1e-9; t += step) ticks.push(+t.toFixed(6));
  return { ceiling, ticks };
});
const shown = (d: (typeof props.data)[number]) => d.display ?? formatValue(d.value, props.format);
const cols = computed(() => {
  const widest = Math.max(...props.data.map((d) => shown(d).length));
  return `minmax(0, 1fr) minmax(0, 1.6fr) calc(${widest}ch + 2px)`;
});
const dimmed = computed(() => props.data.some((d) => d.em));

function measure() {
  const r = rows.value;
  const bar = r?.querySelector<HTMLElement>(".dg-bar");
  if (!r || !bar) return;
  const a = r.getBoundingClientRect();
  const b = bar.getBoundingClientRect();
  band.value = { left: b.left - a.left, width: b.width };
}

onMounted(() => {
  const io = new IntersectionObserver(
    ([e]) => {
      if (e?.isIntersecting) {
        seen.value = true;
        io.disconnect();
      }
    },
    { threshold: 0.4 },
  );
  if (root.value) io.observe(root.value);
  let ro: ResizeObserver | undefined;
  if (props.axis && rows.value) {
    measure();
    ro = new ResizeObserver(measure);
    ro.observe(rows.value);
  }
  onBeforeUnmount(() => {
    io.disconnect();
    ro?.disconnect();
  });
});
</script>

<template>
  <div ref="root" class="dg dg-panel" :data-in="seen ? 'true' : 'false'" :style="{ '--st-cols': cols }">
    <div class="dg-head"><span>Measure</span><span /><span>Value</span></div>
    <div ref="rows" class="dg-rows">
      <div v-if="axis" class="dg-ticks" :style="{ left: band.left + 'px', width: band.width + 'px', right: 'auto' }">
        <u v-for="t in view.ticks" :key="t" :style="{ left: (t / view.ceiling) * 100 + '%' }" />
      </div>
      <div v-for="(d, i) in data" :key="d.label" class="dg-row" :data-lit="d.em || undefined" :data-off="dimmed && !d.em ? '' : undefined">
        <span>{{ d.label }}<span v-if="d.sublabel" class="val"> · {{ d.sublabel }}</span></span>
        <span class="dg-bar" :data-lit="d.em || undefined">
          <i :style="{ width: `max(2px, ${(d.value / view.ceiling) * 100}%)`, '--delay': i * 60 + 'ms' }" />
        </span>
        <span class="val" data-align="end">{{ shown(d) }}</span>
      </div>
      <div v-if="axis" class="dg-axis" :style="{ marginLeft: band.left + 'px', width: band.width + 'px' }">
        <span v-for="t in view.ticks" :key="t" :style="{ left: (t / view.ceiling) * 100 + '%' }">{{ formatValue(t, format) }}</span>
      </div>
    </div>
  </div>
</template>
