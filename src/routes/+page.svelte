<script lang="ts">
import Intro from '../components/main/Intro.svelte'
import PostsContainer from '../components/posts/PostsContainer.svelte'
import ProjectsContainer from '../components/Projects/ProjectsContainer.svelte'
</script>

<svelte:head>
	<title>home • dromzeh.dev</title>
</svelte:head>

<div class="py-24 text-gray-400">
	<div class="flex flex-col gap-3">
		<div>
			<h1 class="mb-2 text-4xl font-semibold text-white">dromzeh.dev</h1>
			<Intro />
		</div>
		<div class="mb-2 mt-8">
			<h1 class="text-2xl font-semibold text-white">Some Projects</h1>
			<ProjectsContainer numProjectsToShow="{3}" />
			<a href="/projects">
				<p class="mt-2 text-right text-lg font-semibold text-white">View all projects</p>
			</a>
		</div>
		<div class="mb-2 mt-8">
			<h1 class="text-2xl font-semibold text-white">Posts</h1>
			<PostsContainer numPostsToShow="{2}" />
			<a href="/posts">
				<p class="mt-2 text-right text-lg font-semibold text-white">View all posts</p>
			</a>
		</div>
	</div>
</div>
