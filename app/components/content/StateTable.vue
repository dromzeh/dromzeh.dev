<script setup lang="ts">
export type StCell =
  | string
  | { text: string; align?: "end"; dim?: boolean }
  | { sw: boolean; ok?: boolean }
  | { path: string }
  | { tag: string; tone?: "ok" | "em" | "bad" };

export interface StRow {
  id: string;
  cells: StCell[];
  inactive?: boolean;
  lit?: boolean;
}

const props = defineProps<{ columns: string[]; rows: StRow[]; cols: string }>();

const isSwitch = (c: StCell | undefined) => typeof c === "object" && "sw" in c;
const centred = computed(() => props.columns.map((_, i) => props.rows.length > 0 && props.rows.every((r) => isSwitch(r.cells[i]))));

const split = (p: string) => {
  const i = p.lastIndexOf("/");
  return [p.slice(0, i + 1), p.slice(i + 1)];
};
</script>

<template>
  <div class="dg-table" :style="{ '--st-cols': cols }">
    <div class="dg-head">
      <span v-for="(c, i) in columns" :key="c" :data-centre="centred[i] || undefined">{{ c }}</span>
    </div>
    <div class="dg-rows">
      <div v-for="r in rows" :key="r.id" class="dg-row" :data-off="r.inactive || undefined" :data-lit="r.lit || undefined">
        <template v-for="(c, i) in r.cells" :key="i">
          <span v-if="typeof c === 'string'">{{ c }}</span>
          <span v-else-if="'sw' in c" class="sw" data-centre :data-on="c.sw || undefined" :data-ok="c.ok || undefined" />
          <span v-else-if="'path' in c" class="path"><i>{{ split(c.path)[0] }}</i>{{ split(c.path)[1] }}</span>
          <span v-else-if="'tag' in c"><span class="tag" :data-tone="c.tone">{{ c.tag }}</span></span>
          <span v-else :class="c.dim ? 'val' : undefined" :data-align="c.align">{{ c.text }}</span>
        </template>
      </div>
    </div>
  </div>
</template>
