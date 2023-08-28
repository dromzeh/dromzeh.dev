<script lang="ts">
import dayjs from 'dayjs'
import moment from 'moment-timezone'

let age = '17'
let myTime = moment().tz('Europe/London').format('HH:mm:ss')

setInterval(() => {
	let time = dayjs().diff(dayjs(1156118401000), 'year', true)
	age = time.toString().substring(0, 7)
	myTime = moment().tz('Europe/London').format('HH:mm:ss')
}, 50)
</script>

<div class="flex flex-col gap-3">
	<p>
		Hey! I'm Marcel - a
		<span class=" bg-white/5 text-white">{age}</span>
		year old self taught Full-Stack web developer from the UK. I'm a big serverless fan, mostly
		<span class=" bg-white/5 text-white"
			>infrastructure and backend systems, creating stuff that scales</span
		>.
	</p>
	<p>
		I primarily work with Cloudflare's Technologies, including Workers, Pages, R2 and KV, paired
		with Typescript and SvelteKit / Next. A full list of technologies can be found on my
		<a href="https://git.dromzeh.dev" target="_blank" class="bg-white/5 text-white"> GitHub </a>
		profile.
	</p>
	<p>
		I created and spend most of my time working on
		<a href="https://wanderer.moe" class="bg-white/5 text-white">wanderer.moe</a>
		- a website which hosts thousands of various game assets. Relied on by thousands daily. The codebase
		is
		<a href="https://git.wanderer.moe/" class="bg-white/5 text-white">100% open source</a>.
	</p>
</div>
