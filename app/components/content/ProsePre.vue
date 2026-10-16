<script lang="ts">
import { siC, siGnubash, siRust, siTypescript } from "simple-icons";
import { ICONS, type Icon } from "~/utils/icons";

interface LangIcon extends Icon {
  title: string;
  color: string;
  square?: boolean;
}

const brand = (i: { title: string; path: string; hex: string }, extra: Partial<LangIcon> = {}): LangIcon => ({
  title: i.title,
  viewBox: "0 0 24 24",
  body: `<path d="${i.path}" fill="currentColor"/>`,
  color: `#${i.hex}`,
  ...extra,
});

const TS = brand(siTypescript, { square: true });
const RUST = brand(siRust, { color: "#e8916b" });
const BASH = brand(siGnubash);

const LANGS: Record<string, LangIcon> = {
  ts: TS,
  typescript: TS,
  c: brand(siC),
  rs: RUST,
  rust: RUST,
  sh: BASH,
  bash: BASH,
  sql: { title: "SQL", ...ICONS.database!, color: "var(--color-ident)" },
};

const STEP = /^(\s*)(\/\/|#|--)\s*(\d)\s*$/;
</script>

<script setup lang="ts">
import { Comment, Fragment, Text, h, isVNode, type VNode } from "vue";

const props = defineProps<{
  code?: string;
  language?: string | null;
  filename?: string | null;
  highlights?: number[];
  meta?: string | null;
  class?: string | null;
}>();

const slots = useSlots();

function text(v: VNode): string | null {
  if (typeof v.children === "string") return v.children;
  if (Array.isArray(v.children) && v.children.length === 1) {
    const c = v.children[0];
    if (isVNode(c) && c.type === Text) return String(c.children);
    if (typeof c === "string") return c;
  }
  return null;
}

function transform(nodes: VNode[]): VNode[] {
  return nodes.map((v) => {
    if (!isVNode(v) || v.type === Comment) return v;
    const cls = String(v.props?.class ?? "");
    if (v.type === "span" && cls.split(" ").includes("line") && Array.isArray(v.children)) {
      const kids = v.children.filter((k): k is VNode => isVNode(k) && k.type !== Comment);
      const last = kids[kids.length - 1];
      const t = last ? text(last) : null;
      const m = t?.match(STEP);
      if (!m) return v;
      const src = h("span", { class: "ref-src", "aria-hidden": "true" }, t!.trimEnd());
      return h("span", { class: v.props?.class, "data-ref": m[3] }, [...kids.slice(0, -1), src]);
    }
    if (Array.isArray(v.children) && (v.type === "code" || v.type === Fragment)) {
      return h(v.type as any, v.props, transform(v.children as VNode[]));
    }
    return v;
  });
}

const render = () => {
  const lang = props.language ? LANGS[props.language.toLowerCase()] : undefined;
  return h("figure", { class: "codeblock" }, [
    props.filename
      ? h("figcaption", { class: "codeblock-name" }, [
          lang
            ? h("svg", {
                class: "codeblock-lang",
                "data-square": lang.square ? "" : undefined,
                viewBox: lang.viewBox,
                style: { "--lang": lang.color },
                role: "img",
                "aria-label": lang.title,
                innerHTML: lang.body,
              })
            : null,
          h("span", { class: "codeblock-file" }, props.filename),
        ])
      : null,
    h("pre", { class: props.class ?? undefined }, transform(slots.default?.() ?? [])),
  ]);
};
</script>

<template>
  <render />
</template>
