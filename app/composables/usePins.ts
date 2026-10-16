type Go = (step: number) => void;

const scenes = new Map<string, Go>();

export function registerScene(name: string, go: Go) {
  scenes.set(name, go);
  return () => {
    if (scenes.get(name) === go) scenes.delete(name);
  };
}

export function usePins(root: Ref<HTMLElement | null>) {
  onMounted(() => {
    const el = root.value?.querySelector<HTMLElement>(".prose");
    if (!el) return;

    let current: Element | null = null;
    const io = new IntersectionObserver(
      (entries) => {
        const entering = entries.filter((e) => e.isIntersecting);
        if (!entering.length) return;
        entering.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const next = entering[entering.length - 1]!.target;
        if (next === current) return;
        current = next;
        for (const pin of next.querySelectorAll<HTMLElement>("[data-pin]")) {
          const step = Number(pin.dataset.step);
          if (pin.dataset.pin && Number.isFinite(step)) scenes.get(pin.dataset.pin)?.(step);
        }
      },
      { rootMargin: "-40% 0px -54% 0px", threshold: 0 },
    );

    const observe = () => {
      for (const child of el.children) {
        if (child.matches("p, h2, h3, figure, .codeblock, .aside, ul")) io.observe(child);
      }
    };
    observe();

    const mo = new MutationObserver(observe);
    mo.observe(el, { childList: true });

    onBeforeUnmount(() => {
      io.disconnect();
      mo.disconnect();
    });
  });
}
