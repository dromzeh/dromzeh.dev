<script setup lang="ts">
import { MUSIC } from "~/data/site";

const { presences, ready } = useLanyard([MUSIC.discord.primary, MUSIC.discord.alt]);
const lastFm = ref<TrackData | null>(null);
const lastFmLoading = ref(true);

const live = computed(() => {
  const p = presences.value[MUSIC.discord.primary];
  const a = presences.value[MUSIC.discord.alt];
  return p?.listening_to_spotify && p.spotify ? p : a?.listening_to_spotify && a.spotify ? a : null;
});
const isLive = computed(() => live.value !== null);

watch(
  isLive,
  (v) => {
    if (v) return;
    lastFmLoading.value = true;
    fetchLastPlayed()
      .then((t) => (lastFm.value = t))
      .finally(() => (lastFmLoading.value = false));
  },
  { immediate: true },
);

const track = computed<TrackData | null>(() =>
  live.value ? fromLanyard(live.value.spotify!) : lastFm.value,
);
const showSkeleton = computed(() => !ready.value || (!isLive.value && lastFmLoading.value));

const wrapper = ref<HTMLElement | null>(null);
const hovered = ref(false);
const vinylEngaged = ref(false);
const artist = computed(() => track.value?.artist);
const title = computed(() => track.value?.title);
const previewUrl = useTrackPreview(artist, title);
const audioActive = computed(
  () => ((hovered.value && !!track.value?.isLive) || vinylEngaged.value) && !!previewUrl.value,
);

const clearHover = () => (hovered.value = false);
const onVisibility = () => {
  if (document.hidden) clearHover();
};
onMounted(() => {
  window.addEventListener("blur", clearHover);
  document.addEventListener("visibilitychange", onVisibility);
});
onUnmounted(() => {
  window.removeEventListener("blur", clearHover);
  document.removeEventListener("visibilitychange", onVisibility);
});
watch([title, artist], () => {
  hovered.value = hovered.value && !!wrapper.value?.matches(":hover");
});
</script>

<template>
  <NowPlayingSkeleton v-if="showSkeleton" />
  <component
    :is="track.url ? 'a' : 'div'"
    v-else-if="track"
    ref="wrapper"
    :href="track.url || undefined"
    :target="track.url ? '_blank' : undefined"
    :rel="track.url ? 'noopener noreferrer' : undefined"
    draggable="false"
    class="plain-link group flex w-fit max-w-full items-center gap-3 select-none"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <div class="relative isolate shrink-0 self-center">
      <CoverArt
        :src="track.albumArt"
        :seed="track.title || track.artist"
        :alt="track.title"
        glitch
        class="pointer-events-none relative z-[1] size-10 rounded-sm object-cover shadow-md select-none"
      />
      <VinylDisc
        :spinning="track.isLive"
        :album-art="track.albumArt"
        :seed="track.title || track.artist"
        :preview-url="previewUrl"
        :audio-active="audioActive"
        @engaged="vinylEngaged = $event"
      />
    </div>

    <div
      class="flex min-w-0 flex-col transition-transform duration-300 ease-out"
      :class="vinylEngaged ? 'translate-x-3' : 'group-hover:translate-x-3'"
    >
      <div class="flex min-w-0 items-center gap-1.5">
        <Transition name="eq">
          <div v-if="track.isLive" class="flex h-3 shrink-0 items-center gap-0.5 overflow-hidden" aria-hidden>
            <span class="eq-bar" />
            <span class="eq-bar" style="animation-delay: 0.33s" />
            <span class="eq-bar" style="animation-delay: 0.66s" />
          </div>
        </Transition>
        <p class="truncate text-[15px] leading-5 text-text">{{ track.title }}</p>
      </div>
      <p class="truncate text-[15px] leading-5 text-muted">{{ track.artist }}</p>
    </div>
  </component>
</template>
