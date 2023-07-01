<script lang="ts">
import Posts from '../components/Posts.svelte'
import Projects from '../components/Projects.svelte'
import Contact from '../components/Contact.svelte'
import Lanyard from '../components/Lanyard.svelte'
import dayjs from 'dayjs'
import moment from 'moment-timezone'
import Technologies from '../components/Technologies.svelte'

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
		<p>
			I'm Marcel - a {age} year old Self-Taught Full-Stack Developer & Reverse Engineer.
		</p>
		<p>
			I specialize in Full-Stack Web Development, with experience in a variety of languages
			and frameworks. My current focus is on Front-End Web Development, currently working with
			SvelteKit and TailwindCSS. I'm also big fan of Serverless - frequently utilizing
			Cloudflare Workers for my projects. I also have experience with UX/UI design, with a11y
			in mind.
		</p>
		<p>
			I'm currently building <a
				class="link-underline font-semibold text-white"
				href="https://wanderer.moe/">wanderer.moe</a> - a centralized database of thousands of
			Game Assets. Still under heavy development, running with SvelteKit, TailwindCSS, and Cloudflare
			Workers, D1 & R2.
		</p>
		<p class="mb-2">
			Outside of anything development related, I've played Rhythm Games since 2015, primary
			VSRGs. And, I "occasionally" write <a
				class="link-underline font-semibold text-white"
				href="https://dromzeh.dev/posts">posts</a> about what I get up to.
		</p>
		<Lanyard />
		<hr class="border-primary-600/10" />
	</div>
	<div>
		<div class="mb-2">
			<p class="mt-2 text-lg font-semibold text-white">Technologies</p>
			<Technologies />
		</div>
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
