<style lang="postcss">
.highlight {
  @apply rounded-md bg-[#2a2a2a] p-1 text-white;
}
.highlightUnderline {
  @apply rounded-md bg-[#2a2a2a] p-1 text-white hover:underline;
}
</style>

<script>
import { convertDate } from "../../../lib/utils/helpers.js";
export let data;

console.log(data);
</script>

<svelte:head>
  <title>{data.title} — dromzeh.dev</title>
  <meta name="description" content="get real" />
</svelte:head>

<!-- TODO: fix formatting -->
<div class="mx-auto min-h-screen max-w-screen-lg px-3 py-6">
  <article
    class="prose-blue-400 prose-th prose-td prose prose-slate max-w-7xl text-neutral-100/90 prose-headings:text-3xl prose-headings:text-white prose-p:text-gray-400 prose-a:text-neutral-100/80 prose-a:hover:text-neutral-100/90 prose-blockquote:text-white prose-strong:text-neutral-100/80 prose-strong:hover:text-neutral-100/90 prose-em:underline prose-code:text-white prose-table:text-white prose-th:hover:text-sky-100 prose-td:hover:text-sky-100">
    <div class="p-3 md:p-10 lg:p-20">
      <h4 class="text-3xl text-white">{data.title}</h4>
      <div class="flex flex-row gap-1">
        {#each data.tags as tag}
          <span
            class="rounded-full bg-indigo-300/10 px-3 py-1.5 text-xs text-indigo-300 ring-1 ring-inset ring-indigo-400/20"
            >{tag}</span>
        {/each}
      </div>
      <p class="text-xl font-normal text-gray-400">
        Published: {convertDate(data.date)}
      </p>
      <p class="text-lg text-white">
        {data.description}
      </p>
      <svelte:component this="{data.content}" />
    </div>
  </article>
</div>
