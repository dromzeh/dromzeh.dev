<script setup lang="ts">
const route = useRoute();
const { data: post } = await useAsyncData(`post-${route.path}`, () => queryCollection("posts").path(route.path).first());

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: "Post not found", fatal: true });
}

usePageSeo({
  title: `${post.value.title} · dromzeh.dev`,
  description: post.value.summary,
  type: "article",
});

const body = ref<HTMLElement | null>(null);
usePins(body);
useCrossRefs(body);
useFootnotes(body);

const scrolled = ref(false);
onMounted(() => {
  const onScroll = () => (scrolled.value = window.scrollY > 240);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  onBeforeUnmount(() => window.removeEventListener("scroll", onScroll));
});
</script>

<template>
  <div v-if="post">
    <div class="post-fade" aria-hidden="true" />
    <nav class="post-bar" :data-scrolled="scrolled || undefined">
      <BackLink to="/">Writing</BackLink>
      <span class="post-bar-title" aria-hidden="true">{{ post.title }}</span>
    </nav>

    <main ref="body" class="post-sheet">
      <header class="post-head">
        <h1>{{ post.title }}</h1>
        <p>{{ post.summary }}</p>
      </header>
      <ContentRenderer :value="post" tag="div" class="prose" />
    </main>
  </div>
</template>
