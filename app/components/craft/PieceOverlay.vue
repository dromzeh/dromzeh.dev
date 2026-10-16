<script setup lang="ts">
import { isVideo, pieceLabel, type CraftPiece } from "~/data/craft";

const COMMIT_FRACTION = 0.18;
const GLIDE_MS = 400;
const GAP = 24;

const props = defineProps<{
  pieces: CraftPiece[];
  piece: CraftPiece;
}>();

const router = useRouter();
const route = useRoute();
const stage = ref<HTMLDivElement | null>(null);

const N = computed(() => props.pieces.length);
const wrap = (i: number) => ((i % N.value) + N.value) % N.value;
const at = (i: number) => props.pieces[wrap(i)]!;

function setSearch(slug: string | null, replace: boolean) {
  const nav = { path: route.path, query: slug ? { piece: slug } : {} };
  return replace ? router.replace(nav) : router.push(nav);
}

const index = ref(Math.max(0, props.pieces.findIndex((p) => p.slug === props.piece.slug)));
const dragX = ref(0);
const dragging = ref(false);
const glide = ref(0);
const gliding = ref(false);

const current = computed(() => at(index.value));
const position = computed(() => wrap(index.value) + 1);
const videos: Record<string, HTMLVideoElement | null> = {};
function setVideo(slug: string, el: unknown) {
  videos[slug] = (el as HTMLVideoElement | null) ?? null;
}

function close() {
  tick(-5);
  void setSearch(null, false);
}

watch(
  () => current.value.slug,
  (slug) => {
    if (slug !== props.piece.slug) void setSearch(slug, true);
  },
);

const stageWidth = () => (stage.value?.clientWidth ?? 1) + GAP;

let landing: ReturnType<typeof setTimeout> | null = null;
let inFlight = false;
function step(delta: number) {
  if (inFlight) return;
  inFlight = true;
  tick(delta > 0 ? 2 : 0);
  const ms = reducedMotion() ? 0 : GLIDE_MS;
  gliding.value = true;
  glide.value = -delta * stageWidth();
  landing = setTimeout(() => {
    inFlight = false;
    gliding.value = false;
    glide.value = 0;
    index.value += delta;
  }, ms);
}

let pending: Array<[HTMLVideoElement, () => void]> = [];
function syncPlayback() {
  pending.forEach(([el, fn]) => el.removeEventListener("canplay", fn));
  pending = [];

  for (const [slug, el] of Object.entries(videos)) {
    if (!el) continue;
    if (slug === current.value.slug) {
      const tryPlay = () => void el.play().catch(() => {});
      tryPlay();
      el.addEventListener("canplay", tryPlay, { once: true });
      pending.push([el, tryPlay]);
    } else {
      el.pause();
    }
  }
}
watch(() => current.value.slug, () => nextTick(syncPlayback));

let start = 0;
let active = false;
let offset = 0;

function onPointerDown(e: PointerEvent) {
  if (inFlight) return;
  start = e.clientX;
  active = true;
  dragging.value = true;
  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
}
function onPointerMove(e: PointerEvent) {
  if (!active) return;
  offset = e.clientX - start;
  dragX.value = offset;
}
function onPointerUp() {
  if (!active) return;
  active = false;
  dragging.value = false;
  const travelled = offset / (stage.value?.clientWidth ?? 1);
  offset = 0;
  dragX.value = 0;
  if (travelled <= -COMMIT_FRACTION) step(1);
  else if (travelled >= COMMIT_FRACTION) step(-1);
}

function onKey(e: KeyboardEvent) {
  if (e.key === "Escape") close();
  if (e.key === "ArrowLeft") step(-1);
  if (e.key === "ArrowRight") step(1);
}
let prevOverflow = "";
onMounted(() => {
  prevOverflow = document.documentElement.style.overflow;
  document.documentElement.style.overflow = "hidden";
  window.addEventListener("keydown", onKey);
  syncPlayback();
});
onUnmounted(() => {
  document.documentElement.style.overflow = prevOverflow;
  window.removeEventListener("keydown", onKey);
  if (landing) clearTimeout(landing);
  pending.forEach(([el, fn]) => el.removeEventListener("canplay", fn));
});

const slots = computed(() => [
  { piece: at(index.value - 1), o: -1 },
  { piece: current.value, o: 0 },
  { piece: at(index.value + 1), o: 1 },
]);

const groupStyle = computed(() => ({
  transform: `translate3d(${dragX.value + glide.value}px, 0, 0)`,
  transition:
    dragging.value || (!gliding.value && glide.value === 0)
      ? "none"
      : `transform ${GLIDE_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
}));
</script>

<template>
  <div
    class="fixed inset-0 z-50 bg-bg/70 backdrop-blur-xl motion-safe:animate-[fadein_150ms_ease]"
    role="dialog"
    aria-modal="true"
    :aria-label="pieceLabel(current)"
    @click="close"
  >
    <div class="flex h-full w-full items-center justify-center">
      <div
        ref="stage"
        class="relative aspect-[16/10] w-[84vw] touch-pan-y lg:w-[min(54rem,60vw)]"
        :class="dragging ? 'cursor-grabbing' : 'cursor-grab'"
        @pointerdown.stop="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerUp"
        @click.stop
      >
        <div class="absolute inset-0" :style="groupStyle">
          <div
            v-for="s in slots"
            :key="s.piece.slug"
            class="absolute inset-0 transition-opacity duration-300"
            :class="s.o === 0 ? 'opacity-100' : 'cursor-pointer opacity-25 hover:opacity-40'"
            :style="{ transform: `translateX(calc(${s.o * 100}% + ${s.o * GAP}px))` }"
            @click="s.o !== 0 && step(s.o)"
          >
            <video
              v-if="isVideo(s.piece)"
              :ref="(el) => setVideo(s.piece.slug, el)"
              :src="s.piece.src"
              :poster="s.piece.poster"
              preload="metadata"
              loop
              muted
              playsinline
              draggable="false"
              :aria-hidden="s.o !== 0"
              class="pointer-events-none h-full w-full select-none rounded-[2px] object-contain"
            />
            <img
              v-else
              :src="s.piece.src"
              :alt="s.o === 0 ? s.piece.title : ''"
              draggable="false"
              :aria-hidden="s.o !== 0"
              class="pointer-events-none h-full w-full select-none rounded-[2px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>

    <div
      class="absolute right-8 bottom-8 left-8 flex h-36 flex-col justify-between text-[15px] leading-6 lg:right-14 lg:bottom-14 lg:left-auto lg:w-64"
      @pointerdown.stop
      @click.stop
    >
      <div class="flex flex-col gap-1.5">
        <div class="flex items-baseline justify-between gap-4 text-text">
          <span>{{ current.title }}</span>
          <span v-if="current.note" class="text-right">{{ current.note }}</span>
        </div>
        <div class="flex items-baseline justify-between gap-4">
          <span class="text-muted">
            <template v-if="current.facts?.length">{{ current.facts.join(" · ") }}</template>
            <span v-else aria-hidden>——</span>
          </span>
          <span class="text-right whitespace-nowrap">
            <a v-if="current.href" :href="current.href" target="_blank" rel="noopener noreferrer" class="quiet-link">
              Link ↗
            </a>
            <span v-else aria-hidden class="text-muted">——</span>
          </span>
        </div>
      </div>

      <div class="flex items-baseline justify-between gap-4 border-t border-line pt-2.5 text-body">
        <span class="flex gap-3">
          <button type="button" class="quiet-link" @click="step(-1)">Prev</button>
          <button type="button" class="quiet-link" @click="step(1)">Next</button>
        </span>
        <span class="flex gap-3">
          <span class="text-muted tabular-nums">{{ position }}/{{ N }}</span>
          <button type="button" class="quiet-link" @click="close">Close</button>
        </span>
      </div>
    </div>
  </div>
</template>
