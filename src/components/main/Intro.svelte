<script lang="ts">
import dayjs from 'dayjs'
import moment from 'moment-timezone'

let age = '16' // placeholder
let myTime = moment().tz('Europe/London').format('HH:mm:ss')

setInterval(() => {
	let time = dayjs().diff(dayjs(1156118401000), 'year', true)
	age = time.toString().substring(0, 7)
	myTime = moment().tz('Europe/London').format('HH:mm:ss')
}, 50)
</script>

<div class="flex flex-col gap-3">
	<p>
		Hey! I'm Marcel
		<span class=" bg-primary-200/10 px-1 text-sm text-primary-200">[he/him]</span>
		- a
		<span class=" bg-primary-200/10 px-1 text-sm text-primary-200">{age}</span>
		year old self taught Full-Stack web developer from the UK. I'm a big serverless fan, primarily
		working on
		<span class=" bg-primary-200/10 px-1 text-sm text-primary-200"
			>infrastructure and backend systems, creating stuff that scales</span
		>. I also enjoy working on frontend just as much, mostly UX.
	</p>
	<p>
		I primarily work with Cloudflare's Technologies, such as Workers, R2 and KV, paired with
		Typescript and sometimes Svelte.
	</p>
	<p>
		I created and spend most of my time working on
		<a href="https://wanderer.moe" class="bg-primary-200/10 px-1 text-sm text-primary-200"
			>wanderer.moe</a>
		- a website which hosts thousands of various game assets. Relied on by thousands of people every
		day, this includes content creators, developers, artists and animators. We're also
		<a href="https://git.wanderer.moe/" class="bg-primary-200/10 px-1 text-sm text-primary-200"
			>completely open source</a
		>.
	</p>
</div>
