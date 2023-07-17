<style lang="postcss">
.arrow {
	transition: transform 0.1s ease-in-out;
	transform: rotate(-45deg);
}

.contact:hover .arrow {
	transform: rotate(0deg);
	@apply text-white;
}

.contact:hover .desc {
	@apply text-gray-300;
}
</style>

<script lang="ts">
import type { Contact } from '../lib/types/contact'
import contactListData from '../data/contact.json'

// interface ContactWithHover extends Contact {
// 	isHovered: boolean
// }

let contactList: Contact[] = contactListData.contact.map((contact) => ({
	...contact
}))
</script>

<div>
	<div class="grid gap-3 py-2">
		{#each contactList as contact}
			<a href="{contact.url}" target="_blank">
				<div class="contact transition-all">
					<p class="mb-1 text-xl font-semibold text-white">
						<i class="{contact.icon} mr-2"></i>{contact.title}
					</p>
					<p class="desc desc mb-6 text-sm transition">
						{contact.description}
					</p>
					<p class="text-right"><i class="fa fa-arrow-right arrow"></i></p>
				</div>
			</a>
			<hr class="border-primary-600/10" />
		{/each}
	</div>
</div>
