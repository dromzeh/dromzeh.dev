<script setup lang="ts">
import { CRAFT_COLUMNS, CRAFT_PIECES, pieceLabel } from "~/data/craft";

const route = useRoute();
const openPiece = computed(() => CRAFT_PIECES.find((p) => p.slug === route.query.piece) ?? null);

usePageSeo({
  title: "Craft · dromzeh.dev",
  description: "Small interface experiments and clips by Marcel Elias (dromzeh).",
});
</script>

<template>
  <main class="mx-auto w-full max-w-[56rem] px-6 py-16">
    <BackLink to="/" class="text-[15px]">Home</BackLink>

    <SectionLabel as="header" :count="CRAFT_PIECES.length" class="mt-8 mb-10">Craft</SectionLabel>

    <div class="grid gap-x-10 sm:grid-cols-2">
      <div v-for="(column, i) in CRAFT_COLUMNS" :key="i" class="flex flex-col">
        <NuxtLink
          v-for="piece in column"
          :key="piece.slug"
          :to="{ path: '/craft', query: { piece: piece.slug } }"
          class="plain-link block"
          :aria-label="`Open ${pieceLabel(piece)}`"
          @click="tick()"
        >
          <PieceFigure :piece="piece" />
        </NuxtLink>
      </div>
    </div>

    <PieceOverlay v-if="openPiece" :pieces="CRAFT_PIECES" :piece="openPiece" />
  </main>
</template>
