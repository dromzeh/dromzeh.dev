<script lang="ts">
import dayjs from 'dayjs'

const ageDateTimestamp = 1156118401000

let age = '17'
// const fileCount = '11,000+' // TODO: Get this data directly from the new API

setInterval(() => {
	const currentTimestamp = dayjs()
	const ageDiff = currentTimestamp.diff(ageDateTimestamp, 'year', true)
	age = ageDiff.toFixed(4)
}, 50)
</script>

<div class="flex flex-col gap-3">
	<p>
		Hey! I'm Marcel (he/him/his), a {age} year-old fullstack developer currently residing in the
		UK. My primary focus is within serverless computing, infrastructure and backend development.
	</p>
	<p>
		I'm mostly known for creating
		<a
			href="https://wanderer.moe"
			class="text-white underline decoration-zinc-600 transition-colors hover:text-violet-300 hover:decoration-violet-300"
			>wanderer.moe</a>
		- a website that hosts thousands of datamined assets from various games alongside thousands of
		unique daily active users. It's also entirely
		<a
			href="https://git.wanderer.moe/"
			class="text-white underline decoration-zinc-600 transition-colors hover:text-violet-300 hover:decoration-violet-300"
			>open source</a
		>.
	</p>
	<p>
		I also occasionally contribute to open source and have a few projects of my own which are
		actively maintained. You can find them on my
		<a
			href="/projects"
			class="text-white underline decoration-zinc-600 transition-colors hover:text-violet-300 hover:decoration-violet-300"
			>projects page</a
		>.
	</p>
	<p>
		I mostly use Typescript, Rust and Svelte, prefer polyrepos over monorepos and use Cloudflare
		plus AWS for projects.
	</p>
	<p>
		Programming aside, I play
		<a
			href="https://enka.network/u/dromzeh"
			class="text-white underline decoration-zinc-600 transition-colors hover:text-violet-300 hover:decoration-violet-300"
			target="_blank">Gacha</a>
		and
		<a
			href="https://quavergame.com/user/52916"
			class="text-white underline decoration-zinc-600 transition-colors hover:text-violet-300 hover:decoration-violet-300"
			target="_blank">
			VSRG Rhythm
		</a>
		games and sporadically write
		<a
			href="/posts"
			class="text-white underline decoration-zinc-600 transition-colors hover:text-violet-300 hover:decoration-violet-300"
			>posts</a
		>.
	</p>
</div>
