export function useFootnotes(root: Ref<HTMLElement | null>) {
  onMounted(() => {
    const el = root.value?.querySelector<HTMLElement>(".prose");
    if (!el) return;
    const notes = [...el.querySelectorAll<HTMLElement>(".note")];
    if (!notes.length) return;

    const section = document.createElement("section");
    section.className = "footnotes";
    section.setAttribute("aria-label", "Notes");
    const ol = document.createElement("ol");
    section.appendChild(ol);

    notes.forEach((note, i) => {
      const n = i + 1;
      const mark = note.querySelector<HTMLElement>(".note-mark")!;
      const body = note.querySelector<HTMLElement>(".note-body")!;

      mark.replaceChildren();
      mark.removeAttribute("aria-hidden");
      const up = document.createElement("a");
      up.href = `#fn-${n}`;
      up.id = `fnref-${n}`;
      up.textContent = `[${n}]`;
      up.setAttribute("aria-label", `note ${n}`);
      mark.appendChild(up);

      const li = document.createElement("li");
      li.id = `fn-${n}`;
      body.classList.add("footnote-text");
      li.appendChild(body);
      const back = document.createElement("a");
      back.href = `#fnref-${n}`;
      back.className = "footnote-back";
      back.textContent = "↩";
      back.setAttribute("aria-label", `back to note ${n} in the text`);
      li.appendChild(back);
      ol.appendChild(li);
    });

    el.appendChild(section);
  });
}
