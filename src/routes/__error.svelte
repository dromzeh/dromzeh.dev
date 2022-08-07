<script context="module">
	export function load({ error, status }) {
	  return {props: {status, error,},};}
</script>
<script>
    export let status;
    export let error;
</script>

<svelte:head>
<title>{status}: dromzeh.dev</title>
</svelte:head>

<div class = "flex h-screen">
    <div class = "m-auto text-center">
        <p class = "text-red-400 text-5xl font-semibold">{status}</p>
        <p class = "text-white text-xl">{error.message}</p>
    </div>
</div>