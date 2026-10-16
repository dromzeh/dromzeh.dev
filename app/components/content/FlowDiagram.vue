<script setup lang="ts">
import { backRoute, columnRoute, railRoute, socketMask, startPulses, type Port } from "~/utils/wires";
import { ICONS } from "~/utils/icons";

interface FlowNode {
  id: string;
  title: string;
  sub?: string;
  em?: boolean;
  icon?: string;
}
interface FlowEdge {
  from: string;
  to: string;
  label?: string;
}

const props = defineProps<{ columns: FlowNode[][]; edges: FlowEdge[] }>();

const stage = ref<HTMLElement | null>(null);
const svg = ref<SVGSVGElement | null>(null);
const dots = ref<SVGSVGElement | null>(null);
const uid = "fd" + useId().replace(/[^a-zA-Z0-9]/g, "");
const col = (id: string) => props.columns.findIndex((c) => c.some((n) => n.id === id));
const hasBack = computed(() => props.edges.some((e) => col(e.to) < col(e.from)));

let anims: Animation[] = [];
let visible = false;

const narrow = ref(false);

function draw() {
  const el = stage.value;
  const s = svg.value;
  if (!el || !s) return;
  const b = el.getBoundingClientRect();
  const w = Math.round(b.width);
  const h = Math.round(b.height);
  const rect = (id: string) => {
    const c = el.querySelector<HTMLElement>(`[data-node="${CSS.escape(id)}"]`);
    if (!c) return null;
    const r = c.getBoundingClientRect();
    const f = (c.querySelector<HTMLElement>(".dg-face") ?? c).getBoundingClientRect();
    return { l: r.left - b.left, r: r.right - b.left, t: r.top - b.top, bm: r.bottom - b.top, cx: r.left - b.left + r.width / 2, cy: f.top - b.top + f.height / 2 };
  };

  const outCount = new Map<string, number>();
  const inCount = new Map<string, number>();
  for (const e of props.edges) {
    outCount.set(e.from, (outCount.get(e.from) ?? 0) + 1);
    inCount.set(e.to, (inCount.get(e.to) ?? 0) + 1);
  }
  const outSeen = new Map<string, number>();
  const inSeen = new Map<string, number>();
  const fan = (seen: Map<string, number>, count: Map<string, number>, id: string) => {
    const i = seen.get(id) ?? 0;
    seen.set(id, i + 1);
    return (i - ((count.get(id) ?? 1) - 1) / 2) * 13;
  };

  const ports: Port[] = [];
  const wires: string[] = [];
  const floorY = h + 22;

  for (const e of props.edges) {
    const a = rect(e.from);
    const z = rect(e.to);
    if (!a || !z) continue;
    if (col(e.to) < col(e.from)) {
      const src = { x: a.r, y: a.cy + fan(outSeen, outCount, e.from) };
      const dst = { x: z.cx, y: z.bm };
      ports.push(src, dst);
      wires.push(backRoute(src, dst, floorY, { stub: 22 }));
      continue;
    }
    if (narrow.value) {
      const inIdx = inSeen.get(e.to) ?? 0;
      const src = { x: a.r, y: a.cy + fan(outSeen, outCount, e.from) * 0.5 };
      const dst = { x: z.cx + fan(inSeen, inCount, e.to), y: z.t };
      const turnY = z.t - 10 - inIdx * 4;
      ports.push(src, dst);
      wires.push(railRoute(src, dst, w - 8, turnY, { radius: 8 }));
      continue;
    }
    const src = { x: a.r, y: a.cy + fan(outSeen, outCount, e.from) };
    const dst = { x: z.l, y: z.cy + fan(inSeen, inCount, e.to) };
    if (Math.abs(dst.y - src.y) <= 8) dst.y = src.y;
    const trunkX = (src.x + dst.x) / 2;
    ports.push(src, dst);
    wires.push(columnRoute(src, dst, trunkX, { stub: 22 }));
  }

  s.setAttribute("viewBox", `0 0 ${w} ${h}`);
  s.innerHTML =
    `<defs>${socketMask(ports, { id: uid + "m", width: w, height: h })}</defs>` +
    `<g mask="url(#${uid}m)">${wires.map((d) => `<path class="wire" d="${d}"/>`).join("")}</g>` +
    `<g mask="url(#${uid}m)">${wires.map((d) => `<path class="p" d="${d}"/>`).join("")}</g>`;
  if (dots.value) {
    dots.value.setAttribute("viewBox", `0 0 ${w} ${h}`);
    dots.value.innerHTML = `<g>${ports.map((p) => `<circle class="dot" cx="${p.x}" cy="${p.y}" r="3.5"/>`).join("")}</g>`;
  }
  pulse();
}

function pulse() {
  anims.forEach((a) => a.cancel());
  anims = [];
  const s = svg.value;
  if (!s) return;
  const paths = [...s.querySelectorAll<SVGPathElement>(".p")];
  if (!visible) {
    paths.forEach((p) => (p.style.opacity = "0"));
    return;
  }
  paths.forEach((p) => (p.style.opacity = "1"));
  anims = startPulses(paths);
}

onMounted(() => {
  const mq = matchMedia("(width <= 760px)");
  narrow.value = mq.matches;
  const onMq = (e: MediaQueryListEvent) => {
    narrow.value = e.matches;
    nextTick(redraw);
  };
  let queued = 0;
  const redraw = () => {
    cancelAnimationFrame(queued);
    queued = requestAnimationFrame(draw);
  };
  mq.addEventListener("change", onMq);
  const ro = new ResizeObserver(redraw);
  if (stage.value) ro.observe(stage.value);
  const io = new IntersectionObserver(
    ([e]) => {
      visible = !!e?.isIntersecting;
      pulse();
    },
    { threshold: 0.3 },
  );
  if (stage.value) io.observe(stage.value);
  document.fonts?.ready.then(redraw);
  onBeforeUnmount(() => {
    cancelAnimationFrame(queued);
    mq.removeEventListener("change", onMq);
    ro.disconnect();
    io.disconnect();
    anims.forEach((a) => a.cancel());
  });
});

const titleOf = (id: string) => props.columns.flat().find((n) => n.id === id)?.title ?? id;
</script>

<template>
  <div class="dg">
    <div
      ref="stage"
      class="dg-stage"
      :style="{
        gridTemplateColumns: narrow ? 'minmax(0, 1fr)' : `repeat(${columns.length}, minmax(0, 1fr))`,
        columnGap: narrow ? '0px' : columns.length >= 4 ? '52px' : '84px',
        rowGap: narrow ? '30px' : undefined,
        paddingBottom: hasBack && !narrow ? '36px' : undefined,
        paddingRight: narrow ? '26px' : undefined,
      }"
    >
      <div v-for="(col, ci) in columns" :key="ci" class="dg-stack">
        <div v-for="n in col" :key="n.id" class="dg-card" :data-node="n.id" :data-lit="n.em || undefined">
          <div class="dg-face">
            <svg v-if="n.icon && ICONS[n.icon]" class="ico" :viewBox="ICONS[n.icon]!.viewBox" aria-hidden="true" v-html="ICONS[n.icon]!.body" />
            <span class="name">{{ n.title }}</span>
          </div>
          <span v-if="n.sub" class="sub">{{ n.sub }}</span>
        </div>
      </div>
      <svg ref="svg" class="dg-signals" aria-hidden="true" />
      <svg ref="dots" class="dg-sockets" aria-hidden="true" />
    </div>
    <ul class="sr-only">
      <li v-for="e in edges" :key="`${e.from}-${e.to}`">{{ titleOf(e.from) }} to {{ titleOf(e.to) }}<template v-if="e.label">: {{ e.label }}</template></li>
    </ul>
  </div>
</template>
