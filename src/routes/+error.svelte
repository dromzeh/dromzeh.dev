<script>
  import { page } from "$app/stores";
  const dev = process.env.NODE_ENV === "development";
</script>

<svelte:head>
  <title>{$page.status} — dromzeh.dev</title>
</svelte:head>

<!-- centers page status text in the middle of the screen in red .... -->
<div class="flex h-screen">
  <div class="m-auto text-center">
    <p class="text-red-400 text-5xl font-semibold">{$page.status}</p>
    <p class="text-white text-2xl">{$page.error.message}</p>
    {#if dev}
      <p class="text-gray-400 text-xs">{$page.error.stack}</p>
    {/if}
  </div>
</div>
