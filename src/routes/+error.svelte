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
    <p class="text-5xl font-semibold text-red-400">{$page.status}</p>
    <p class="text-2xl text-white">{$page.error.message}</p>
    {#if dev}
      <p class="text-xs text-gray-400">{$page.error.stack}</p>
    {/if}
  </div>
</div>
