<style lang="postcss">
.highlight {
  @apply rounded-md bg-[#2a2a2a] p-1 text-white;
}
.highlightUnderline {
  @apply rounded-md bg-[#2a2a2a] p-1 text-white hover:underline;
}
</style>

<script>
export let data;
</script>

<svelte:head>
  <title>{data.title} — dromzeh.dev</title>
  <meta name="description" content="get real" />
</svelte:head>

<div class="mx-auto min-h-screen max-w-screen-lg px-3 py-6">
  <article
    class="prose-table:th:text-blue-400 prose-table:th:hover:text-sky-100 prose-table:td:text-white prose-table:td:hover:text-sky-100 prose prose-slate max-w-7xl list-disc prose-headings:bg-gradient-to-br prose-headings:bg-clip-text prose-headings:font-semibold prose-headings:text-transparent prose-headings:text-white prose-p:text-gray-400 prose-a:text-emerald-300 prose-blockquote:text-white prose-strong:text-white prose-em:underline prose-code:text-white prose-li:text-gray-400 prose-table:text-white"
  >
    <div class="p-3 md:p-10 lg:p-20">
      <h4 class="text-3xl text-white">{data.title}</h4>
      <p class="text-lg text-white">
        {data.description}
        <span class="text-xs text-gray-400">(Published: {data.date})</span>
      </p>
      <svelte:component this="{data.content}" />
    </div>
  </article>
</div>
