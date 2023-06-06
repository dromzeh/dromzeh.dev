<script lang="ts">
import type { Contact } from '$lib/types/contact'
import contactListData from '../data/contact.json'

let contactList: Contact[] = contactListData.contact.map((contact) => ({
	...contact
}))
</script>

<div>
	<div class="grid gap-3 py-2">
		{#each contactList as contact}
			<a href="{contact.url}" target="_blank">
				<div
					class="relative rounded-lg bg-white bg-opacity-0 p-2 transition-all hover:bg-opacity-5">
					<p class="font-semibold text-primary-100">
						<i class="{contact.icon} mr-2"></i>{contact.title}
					</p>
					<p>{contact.description}</p>
				</div>
			</a>
		{/each}
	</div>
</div>
