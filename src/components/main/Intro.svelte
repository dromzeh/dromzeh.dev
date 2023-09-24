<script lang="ts">
import dayjs from 'dayjs'
import moment from 'moment-timezone'

const date = dayjs(1156118401000)
let age = '17'

const fileCount = '11,000+' // TODO: get this data directly from API when it's ready

let myTime = moment().tz('Europe/London').format('HH:mm:ss')

setInterval(() => {
	let time = dayjs().diff(date, 'year', true)
	age = time.toString().substring(0, 7)
	myTime = moment().tz('Europe/London').format('HH:mm:ss')
}, 50)
</script>

<div class="flex flex-col gap-3">
	<p>
		Hey! I'm Marcel (he/him/his), a {age} year-old fullstack developer from the UK. I'm passionate
		about serverless computing, infrastructure and backend development.
	</p>
	<p>
		I'm also the creator of
		<a
			href="https://wanderer.moe"
			class="text-white underline decoration-zinc-600 transition-colors hover:text-violet-300 hover:decoration-violet-300"
			>wanderer.moe</a>
		- a website that hosts {fileCount} datamined assets from various games. Completely free and
		<a
			href="https://git.wanderer.moe/"
			class="text-white underline decoration-zinc-600 transition-colors hover:text-violet-300 hover:decoration-violet-300"
			>open source</a
		>.
	</p>
	<p>
		I occasionally contribute to open source and have a few projects of my own which are
		actively maintained. You can find them on my
		<a
			href="/projects"
			class="text-white underline decoration-zinc-600 transition-colors hover:text-violet-300 hover:decoration-violet-300"
			>projects page</a
		>.
	</p>
	<p>
		Programming aside, I play an unhealthy amount of
		<a
			href="https://enka.network/u/dromzeh"
			class="text-white underline decoration-zinc-600 transition-colors hover:text-violet-300 hover:decoration-violet-300"
			target="_blank">Gacha</a>
		and
		<a
			href="https://quavergame.com/user/52916"
			class="text-white underline decoration-zinc-600 transition-colors hover:text-violet-300 hover:decoration-violet-300"
			target="_blank">
			VSRG Rhythm Games
		</a>
		- I also sporadically write
		<a
			href="/posts"
			class="text-white underline decoration-zinc-600 transition-colors hover:text-violet-300 hover:decoration-violet-300"
			>posts</a
		>.
	</p>
</div>
