<script setup lang="ts">
import { SITE_DESCRIPTION } from "#shared/site";
import { PROJECTS, TOOLS } from "~/data/site";
import { CRAFT_PIECES } from "~/data/craft";
import { FAQ } from "~/data/faq";

usePageSeo({
  title: "dromzeh.dev (Marcel Elias)",
  description: SITE_DESCRIPTION,
});

const age = useAge();

const { data: posts } = await useAsyncData("home-posts", () =>
  queryCollection("posts").where("visibility", "=", "published").order("order", "ASC").select("path", "title").all(),
);
</script>

<template>
  <main class="mx-auto flex min-h-dvh w-full max-w-[42rem] flex-col justify-center px-6 py-14">
    <div class="flex flex-col gap-12">
      <div class="cut">
        <ClientOnly>
          <NowPlaying />
          <template #fallback><NowPlayingSkeleton /></template>
        </ClientOnly>
      </div>

      <section class="cut flex flex-col gap-5 text-[17px] leading-7">
        <p>
          I'm Marcel,
          <span class="tabular-nums" data-allow-mismatch="text">{{ age.toFixed(7) }}</span>
          years old. I make things I think should exist, and take apart things
          that would rather I didn't.
        </p>
        <p>
          Now: <a href="https://etcht.dev">Etcht</a>, content provenance
          infrastructure, at my company
          <a href="https://antifield.com">Antifield</a>. Alongside it, a content
          sharing platform with Etcht built in. 40,000 people are waiting on me
          to finish it.
        </p>
        <p>
          Made <a href="https://skowt.cc">skowt.cc</a> at 15, when the budget
          was student credits and the database was a folder. It grew to 5
          billion social impressions and 27 million downloads. Previously
          tooling for large online communities, engineering contracts & the UK
          government.
        </p>
      </section>

      <section class="cut flex flex-col gap-4">
        <SectionLabel :count="posts?.length ?? 0">Writing</SectionLabel>
        <div class="flex flex-col gap-1.5 text-[17px] leading-7">
          <NuxtLink v-for="post in posts" :key="post.path" :to="post.path" class="quiet-link w-fit">
            {{ post.title }}
          </NuxtLink>
        </div>
      </section>

      <section class="cut flex flex-col gap-4">
        <SectionLabel :count="PROJECTS.length">Projects</SectionLabel>
        <div class="flex flex-col gap-1.5 text-[17px] leading-7">
          <div v-for="project in PROJECTS" :key="project.name" class="flex items-baseline justify-between gap-4">
            <a :href="project.href" class="quiet-link">{{ project.name }}</a>
            <span class="text-right text-[15px] text-muted">{{ project.tag }}</span>
          </div>
        </div>
        <p class="text-[15px] leading-6 text-muted">
          Also:
          <template v-for="(tool, i) in TOOLS" :key="tool.name">
            <a :href="tool.href" :title="tool.tag" class="quiet-link">{{ tool.name }}</a>
            <span v-if="i < TOOLS.length - 1" aria-hidden="true"> · </span>
          </template>
        </p>
      </section>

      <section class="cut flex flex-col gap-4">
        <SectionLabel :count="CRAFT_PIECES.length"><NuxtLink to="/craft" class="quiet-link">Craft</NuxtLink></SectionLabel>
        <SectionLabel :count="FAQ.length"><NuxtLink to="/faq" class="quiet-link">FAQ</NuxtLink></SectionLabel>
      </section>
    </div>
  </main>
</template>
