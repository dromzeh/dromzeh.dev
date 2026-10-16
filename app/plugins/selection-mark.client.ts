import type { MarkHandle } from "@highlighters/core";

const MARK = {
  color: "#37c6e0",
  opacity: 0.3,
  blendMode: "screen" as const,
  vivid: "screen" as const,
  animation: { draw: false },
};

export default defineNuxtPlugin(() => {
  let lib: typeof import("@highlighters/core") | null = null;
  let handle: MarkHandle | null = null;
  let queued = 0;

  const paint = () => {
    handle?.remove();
    handle = null;
    const sel = document.getSelection();
    if (!sel || sel.isCollapsed) return;
    if (!lib) {
      void import("@highlighters/core").then((m) => {
        lib = m;
        paint();
      });
      return;
    }
    try {
      handle = lib.highlightSelection(MARK);
    } catch {}
  };

  document.addEventListener("selectionchange", () => {
    cancelAnimationFrame(queued);
    queued = requestAnimationFrame(paint);
  });
  document.documentElement.dataset.selMark = "";
});
