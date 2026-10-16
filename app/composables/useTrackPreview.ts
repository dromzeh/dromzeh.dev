const cache = new Map<string, string | null>();

export function useTrackPreview(artist: Ref<string | undefined>, title: Ref<string | undefined>) {
  const url = ref<string | null>(null);

  watch(
    [artist, title],
    ([a, t], _, onCleanup) => {
      if (!a || !t) {
        url.value = null;
        return;
      }
      const key = `${a}::${t}`;
      if (cache.has(key)) {
        url.value = cache.get(key)!;
        return;
      }
      url.value = null;
      const controller = new AbortController();
      onCleanup(() => controller.abort());
      fetchPreview(a, t, controller.signal)
        .then((preview) => {
          cache.set(key, preview);
          url.value = preview;
        })
        .catch(() => {});
    },
    { immediate: true },
  );

  return url;
}

async function fetchPreview(artist: string, title: string, signal: AbortSignal): Promise<string | null> {
  const term = encodeURIComponent(`${artist} ${cleanTitle(title)}`);
  const res = await fetch(`https://itunes.apple.com/search?term=${term}&entity=song&limit=1`, { signal });
  if (!res.ok) return null;
  const data = await res.json();
  return data.results?.[0]?.previewUrl ?? null;
}

function cleanTitle(title: string): string {
  return title
    .replace(/\s*\([^)]*\)\s*/g, " ")
    .replace(/\s*-\s*(remastered|bonus|live|deluxe|edit|mix|remix|single version|album version)[^-]*$/i, "")
    .trim();
}
