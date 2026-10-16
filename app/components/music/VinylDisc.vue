<script setup lang="ts">
const CRUISE_VELOCITY = 120;
const FRICTION = 0.9;
const FLICK_WINDOW_MS = 80;
const DRAG_THRESHOLD = 5;
const SETTLE_EPSILON = 5;
const REST_EPSILON = 0.5;
const LINGER_MS = 1000;

const AUDIO_VOLUME = 0.1;
const MIN_PLAYBACK_RATE = 0.0625;
const MAX_PLAYBACK_RATE = 4;

const props = defineProps<{
  spinning: boolean;
  albumArt: string;
  seed: string;
  previewUrl: string | null;
  audioActive: boolean;
}>();
const emit = defineEmits<{ engaged: [value: boolean] }>();

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const container = ref<HTMLDivElement | null>(null);
const rotation = ref(0);
const engaged = ref(false);
watch(engaged, (v) => emit("engaged", v));

let reduce = false;
const autoSpin = () => props.spinning && !reduce;

let velocity = 0;
let isDragging = false;
let lastAngle = 0;
let samples: Array<{ t: number; rotation: number }> = [];
let dragMagnitude = 0;
let userSpun = false;
let settledAt: number | null = null;
let audio: HTMLAudioElement | null = null;

function computeFlickVelocity(): number {
  if (samples.length < 2) return 0;
  const first = samples[0]!;
  const last = samples[samples.length - 1]!;
  const dt = (last.t - first.t) / 1000;
  return dt > 0 ? (last.rotation - first.rotation) / dt : 0;
}

function onVisibilityChange() {
  if (document.hidden) audio?.pause();
}
watch(
  () => [props.audioActive, props.previewUrl] as const,
  ([active, url], _, onCleanup) => {
    if (!active || !url) return;
    if (document.hidden) return;
    if (!audio) {
      audio = new Audio();
      audio.loop = true;
      audio.volume = AUDIO_VOLUME;
      audio.preservesPitch = false;
    }
    const a = audio;
    if (a.src !== url) a.src = url;
    a.currentTime = 0;
    a.play().catch(() => {});
    wake();
    document.addEventListener("visibilitychange", onVisibilityChange);
    onCleanup(() => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      a.pause();
    });
  },
);

let raf = 0;
let last = 0;
function frame(now: number) {
  const dt = last ? (now - last) / 1000 : 0;
  last = now;
  const target = autoSpin() ? CRUISE_VELOCITY : 0;
  if (!isDragging) {
    velocity += (target - velocity) * FRICTION * dt;
    rotation.value += velocity * dt;
  }
  const settled = Math.abs(velocity - target) < SETTLE_EPSILON;
  if (settled && !isDragging) userSpun = false;
  const shouldEngage = (isDragging && dragMagnitude > DRAG_THRESHOLD) || (userSpun && !settled);
  if (shouldEngage) settledAt = null;
  else if (engaged.value && settledAt == null) settledAt = performance.now();
  const lingering = settledAt != null && performance.now() - settledAt < LINGER_MS;
  const effective = shouldEngage || lingering;
  if (effective !== engaged.value) engaged.value = effective;
  if (audio && !audio.paused) {
    const ratio = props.spinning
      ? Math.max(velocity / CRUISE_VELOCITY, 1)
      : Math.abs(velocity) / CRUISE_VELOCITY;
    audio.playbackRate = clamp(ratio, MIN_PLAYBACK_RATE, MAX_PLAYBACK_RATE);
  }
  if (!isDragging && !engaged.value && target === 0 && Math.abs(velocity) < REST_EPSILON && (!audio || audio.paused)) {
    velocity = 0;
    raf = 0;
    last = 0;
    return;
  }
  raf = requestAnimationFrame(frame);
}

function wake() {
  if (!raf) raf = requestAnimationFrame(frame);
}
watch(() => props.spinning, wake);

onMounted(() => {
  reduce = reducedMotion();
  velocity = autoSpin() ? CRUISE_VELOCITY : 0;
  wake();
});
onUnmounted(() => {
  cancelAnimationFrame(raf);
  audio?.pause();
  document.removeEventListener("visibilitychange", onVisibilityChange);
});

function getAngle(x: number, y: number): number {
  const rect = container.value!.getBoundingClientRect();
  return Math.atan2(y - (rect.top + rect.height / 2), x - (rect.left + rect.width / 2)) * (180 / Math.PI);
}
function onPointerDown(e: PointerEvent) {
  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  isDragging = true;
  wake();
  dragMagnitude = 0;
  lastAngle = getAngle(e.clientX, e.clientY);
  samples = [{ t: performance.now(), rotation: rotation.value }];
}
function onPointerMove(e: PointerEvent) {
  if (!isDragging) return;
  const angle = getAngle(e.clientX, e.clientY);
  let delta = angle - lastAngle;
  if (delta > 180) delta -= 360;
  if (delta < -180) delta += 360;
  lastAngle = angle;
  rotation.value += delta;
  dragMagnitude += Math.abs(delta);
  if (dragMagnitude > DRAG_THRESHOLD) userSpun = true;
  const now = performance.now();
  samples.push({ t: now, rotation: rotation.value });
  while (samples.length > 2 && now - samples[0]!.t > FLICK_WINDOW_MS) samples.shift();
}
function onPointerUp(e: PointerEvent) {
  if (!isDragging) return;
  (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  isDragging = false;
  const rest = autoSpin() ? CRUISE_VELOCITY : 0;
  velocity = computeFlickVelocity() + rest;
  if (Math.abs(velocity - rest) >= SETTLE_EPSILON) userSpun = true;
}
function onClick(e: MouseEvent) {
  if (dragMagnitude > DRAG_THRESHOLD) {
    e.preventDefault();
    e.stopPropagation();
  }
  dragMagnitude = 0;
}
</script>

<template>
  <div
    ref="container"
    class="absolute top-1/2 left-1/2 -z-[1] size-[90%] -translate-y-1/2 cursor-grab touch-none transition-all duration-300 active:cursor-grabbing"
    :class="engaged ? 'translate-x-[-10%]' : 'translate-x-[-50%] group-hover:translate-x-[-10%]'"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
    @click="onClick"
  >
    <div class="relative size-full overflow-hidden rounded-full" :style="{ transform: `rotate(${rotation}deg)` }">
      <CoverArt
        :src="albumArt"
        :seed="seed"
        class="pointer-events-none absolute inset-0 size-full rounded-full object-cover blur-[3px] select-none"
      />
      <img src="/assets/vinyl.png" alt="" class="pointer-events-none relative size-full select-none" draggable="false" />
    </div>
  </div>
</template>
