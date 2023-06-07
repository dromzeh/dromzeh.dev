<script lang="ts">
import Posts from '../components/Posts.svelte'
import Projects from '../components/Projects.svelte'
import Contact from '../components/Contact.svelte'
import Lanyard from '../components/Lanyard.svelte'
import dayjs from 'dayjs'
import moment from 'moment-timezone'

let age = '16' // placeholder
let myTime = moment().tz('Europe/London').format('HH:mm:ss')

setInterval(() => {
	let time = dayjs().diff(dayjs(1156118401000), 'year', true)
	age = time.toString().substring(0, 13)
	myTime = moment().tz('Europe/London').format('HH:mm:ss')
}, 50)

const showProjects = 3
const showPosts = 2
</script>

<svelte:head>
	<title>home • dromzeh.dev</title>
</svelte:head>

<div class="py-24 text-gray-400">
	<p class="text-lg font-semibold text-white">dromzeh.dev</p>
	<div class="grid gap-3 py-2">
		<div>
			Hi, I'm Marcel - known as dromzeh on the internet. I'm a {age} year old Reverse & Software
			Engineer, experienced with Svelte, C#, Typescript, Javascript, Node.js, Tailwind, Python
			& IDA.
		</div>
		<div>
			I'm the Project Lead (& creator) of <a
				class="link-underline font-semibold text-white"
				href="https://wanderer.moe">wanderer.moe</a
			>, a centralized database of various game assets. Created in March 2022, it's built with
			Node.js, Tailwind & SvelteKit and utilizes Cloudflare's Stack (R2, Workers & Pages),
			relied on by thousands of users per day. Our codebase is completely open source, and can
			be found
			<a class="link-underline font-semibold text-white" href="https://git.wanderer.moe/"
				>here</a
			>.
		</div>
		<div class="mb-2">
			Outside of programming stuff, I've played rhythm games since 2015, primarily onto VSRG
			since 2019. And, I "occasionally" write <a
				class="link-underline font-semibold text-white"
				href="https://dromzeh.dev/posts">posts</a> too.
		</div>
		<Lanyard />
		<hr class="border-primary-600/10" />
	</div>
	<div>
		<div>
			<p class="mt-2 text-lg font-semibold text-white">Projects</p>
			<p class="text-sm text-gray-400">{showProjects} recent posts shown</p>
		</div>
		<Projects showProjects="{showProjects}" />
		<div>
			<a href="/projects">
				<p class="mb-2 text-right text-sm text-gray-400 transition-all hover:text-white">
					View More <i class="fas fa-arrow-right"></i>
				</p>
			</a>
		</div>
		<hr class="border-primary-600/10" />
	</div>
	<div>
		<div>
			<p class="mt-4 text-lg font-semibold text-white">Posts</p>
			<p class="text-sm text-gray-400">{showPosts} recent posts shown</p>
		</div>
		<Posts showPosts="{showPosts}" />
		<div>
			<a href="/posts">
				<p class="mb-2 text-right text-sm text-gray-400 transition-all hover:text-white">
					View More <i class="fas fa-arrow-right"></i>
				</p>
			</a>
		</div>
		<hr class="border-primary-600/10" />
	</div>
	<div>
		<div class="mb-2">
			<p class="mt-4 font-semibold text-white">Contact</p>
			<p class="text-sm text-gray-400">
				I aim to respond to all messages within 24 hours, it is currently {myTime} for me (Europe/London).
			</p>
		</div>
		<Contact />
	</div>
</div>
