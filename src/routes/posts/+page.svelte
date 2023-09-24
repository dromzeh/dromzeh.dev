<script lang="ts">
import PostsContainer from '../../components/posts/PostsContainer.svelte'
</script>

<svelte:head>
	<title>posts • dromzeh.dev</title>
</svelte:head>

<div class="py-24 text-zinc-400">
	<h1 class="text-4xl font-semibold text-white">Posts</h1>
	<div class="mb-2 mt-8 flex flex-col gap-3">
		<PostsContainer />
	</div>
</div>
