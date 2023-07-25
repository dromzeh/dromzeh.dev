<script lang="ts">
import PostsContainer from '../../components/posts/PostsContainer.svelte'
</script>

<svelte:head>
	<title>posts • dromzeh.dev</title>
</svelte:head>

<div class="py-24 text-gray-400">
	<h1 class="text-4xl font-semibold text-white">Posts</h1>
	<p class="text-lg font-semibold text-white">
		The rare times I write something, I'll post it here.
	</p>
	<div class="mb-2 mt-8 flex flex-col gap-3">
		<PostsContainer />
	</div>
</div>
