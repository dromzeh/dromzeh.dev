<script>
  import { page } from "$app/stores";
</script>

<svelte:head>
  <title>{$page.status} — dromzeh.dev</title>
</svelte:head>

<!-- centers page status text in the middle of the screen in red .... -->
<div class="flex h-screen">
  <div class="m-auto text-center">
    <p class="text-red-400 text-5xl font-semibold">{$page.status}</p>
    <p class="text-white text-2xl">{$page.error.message}</p>
  </div>
</div>
