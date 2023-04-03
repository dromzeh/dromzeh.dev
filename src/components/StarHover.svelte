<script>
import { onMount } from "svelte";
import axios from "axios";

export let repository;
let stars = 0;

// stars = data.stargazers_count, forks = data.forks_count

onMount(() => {
  getRepoStats();
});

async function getRepoStats() {
  let response = await axios.get(`https://api.github.com/repos/${repository}`);
  let data = response.data;
  stars = data.stargazers_count;
}
</script>

<div
  class="pointer-events-none absolute mt-16 flex origin-top scale-0 flex-col space-x-1.5 rounded-lg border-[0.1px] border-white/10 bg-white/5 px-1 py-1 text-[.69rem] font-medium shadow-sm backdrop-blur transition-all duration-200 ease-in-out group-hover:scale-100"
>
  <div class="flex space-x-1">
    <p class="rounded-lg bg-white/10 px-1.5 py-1 shadow-inner">
      ⭐ {stars}
    </p>
  </div>
</div>
