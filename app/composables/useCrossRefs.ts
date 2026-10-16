export function useCrossRefs(root: Ref<HTMLElement | null>) {
  onMounted(() => {
    const el = root.value;
    if (!el || !window.matchMedia("(hover: hover)").matches) return;

    const blockOf = (clause: HTMLElement): HTMLElement | null => {
      const para = clause.closest(".prose > *");
      for (const dir of ["previousElementSibling", "nextElementSibling"] as const) {
        let node = para?.[dir] ?? null;
        while (node) {
          if (node.classList.contains("codeblock") && node.querySelector(`.line[data-ref="${clause.dataset.ref}"]`)) return node as HTMLElement;
          node = node[dir];
        }
      }
      return null;
    };

    const blocks = new Map<HTMLElement, HTMLElement>();
    const clauses = new Map<HTMLElement, HTMLElement[]>();
    for (const c of el.querySelectorAll<HTMLElement>(".clause[data-ref]")) {
      const b = blockOf(c);
      if (!b) continue;
      blocks.set(c, b);
      clauses.set(b, [...(clauses.get(b) ?? []), c]);
    }

    let lit: HTMLElement[] = [];
    let hot: HTMLElement | null = null;
    const clear = () => {
      for (const x of lit) x.classList.remove("is-hot");
      if (hot) delete hot.dataset.dim;
      lit = [];
      hot = null;
    };
    const light = (block: HTMLElement, n: string) => {
      const line = block.querySelector<HTMLElement>(`.line[data-ref="${n}"]`);
      if (line && lit[0] === line) return;
      clear();
      if (!line) return;
      hot = block;
      block.dataset.dim = "";
      lit = [line, ...(clauses.get(block) ?? []).filter((c) => c.dataset.ref === n)];
      for (const x of lit) x.classList.add("is-hot");
    };

    const over = (e: Event) => {
      const t = e.target as HTMLElement;
      const clause = t.closest<HTMLElement>(".clause[data-ref]");
      const block = clause && blocks.get(clause);
      if (block) return light(block, clause.dataset.ref!);
      if (clause) return;
      const line = t.closest<HTMLElement>(".codeblock .line[data-ref]");
      if (line) return light(line.closest<HTMLElement>(".codeblock")!, line.dataset.ref!);
      if (lit.length) clear();
    };
    el.addEventListener("mouseover", over);
    el.addEventListener("mouseleave", clear);
    onBeforeUnmount(() => {
      el.removeEventListener("mouseover", over);
      el.removeEventListener("mouseleave", clear);
    });
  });
}
