<script setup lang="ts">
import { FAQ } from "~/data/faq";

usePageSeo({
  title: "FAQ · dromzeh.dev",
  description: "Questions people ask Marcel Elias (dromzeh), about skowt.cc, Antifield, security research and AI.",
});
</script>

<template>
  <main class="mx-auto w-full max-w-[42rem] px-6 py-16">
    <BackLink to="/" class="text-[15px]">Home</BackLink>

    <SectionLabel as="header" :count="FAQ.length" class="mt-8 mb-10"><h1>FAQ</h1></SectionLabel>

    <div class="flex flex-col gap-10 text-[17px] leading-7">
      <section v-for="item in FAQ" :key="item.question" class="flex flex-col gap-2">
        <h2>{{ item.question }}</h2>
        <p v-for="(paragraph, i) in item.answer" :key="i" class="text-muted" v-html="paragraph" />
      </section>
    </div>
  </main>
</template>
