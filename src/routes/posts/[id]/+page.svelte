<script>
  export let data;
</script>

<svelte:head>
  <title>{data.title} — dromzeh.dev</title>
  <meta name="description" content="get real" />
</svelte:head>

<div class="mx-auto max-w-screen-lg px-3 py-6">
<article
  class="prose prose-slate max-w-7xl prose-code:text-white prose-p:text-gray-400 prose-strong:text-white prose-blockquote:text-white prose-headings:text-transparent prose-headings:bg-clip-text prose-headings:bg-gradient-to-br prose-headings:text-white prose-headings:font-semibold prose-a:text-white prose-table:text-white prose-table:th:text-blue-400 prose-table:th:hover:text-sky-100 prose-table:td:text-white prose-table:td:hover:text-sky-100 list-disc prose-li:text-gray-400 prose-em:underline"
>
  <div class="lg:p-20 md:p-10 p-3">
    <h4 class="text-3xl text-white monofont">{data.title}</h4>
    <p class="text-white text-lg">
      {data.description}
      <span class="text-gray-400 text-xs">(Published: {data.date})</span>
    </p>
    <svelte:component this={data.content} />
  </div>
</article>
</div>

<style lang="postcss">
  .highlight {
    @apply text-white bg-[#2a2a2a] rounded-md p-1;
    font-family: "jetbrains mono", monospace;
  }
  .highlightUnderline {
    @apply text-white bg-[#2a2a2a] rounded-md p-1 hover:underline;
    font-family: "jetbrains mono", monospace;
  }
  .monofont {
    font-family: "jetbrains mono", monospace !important;
  }
</style>
