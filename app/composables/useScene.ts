const HOLD = 2.8;
const IDLE = 2.4;

export function useScene(root: Ref<HTMLElement | null>, name: string, count: number) {
  const end = count * HOLD + IDLE;
  const t = ref(0);
  const step = computed(() => Math.min(count - 1, Math.floor(t.value / HOLD)));
  const local = computed(() => t.value - step.value * HOLD);

  let playing = true;
  let visible = false;
  let raf = 0;
  let last = 0;

  const loop = (now: number) => {
    raf = 0;
    if (!playing || !visible) {
      last = 0;
      return;
    }
    if (!last) last = now;
    t.value += (now - last) / 1000;
    last = now;
    if (t.value >= end) t.value = 0;
    raf = requestAnimationFrame(loop);
  };

  const go = (n: number) => {
    t.value = Math.max(0, Math.min(count - 1, n)) * HOLD;
    playing = false;
  };

  onMounted(() => {
    const unregister = registerScene(name, go);
    if (reducedMotion()) go(count - 1);
    const io = new IntersectionObserver(
      ([e]) => {
        visible = !!e?.isIntersecting;
        if (!raf && playing && visible) raf = requestAnimationFrame(loop);
      },
      { threshold: 0.3 },
    );
    if (root.value) io.observe(root.value);
    onBeforeUnmount(() => {
      unregister();
      cancelAnimationFrame(raf);
      io.disconnect();
    });
  });

  return { step, local };
}
