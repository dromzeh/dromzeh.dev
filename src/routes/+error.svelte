<script>
    import { page } from '$app/stores';
</script>

<svelte:head>
<title>{$page.status}: dromzeh.dev</title>
</svelte:head>

<div class = "flex h-screen">
    <div class = "m-auto text-center">
        <p class = "text-red-400 text-5xl font-semibold">{$page.status}</p>
    </div>
</div>