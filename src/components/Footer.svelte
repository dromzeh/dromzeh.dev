<script>
import axios from "axios";
import { onMount } from "svelte";

let recentCommit;
let sha;
let shaSpliced;

async function getRecentCommit() {
  let response = await axios.get(
    "https://api.github.com/repos/dromzeh/dromzeh.dev/commits?per_page=1"
  );
  // console.log(response.data[0].commit);
  recentCommit = response.data[0].commit.message;
  sha = response.data[0].sha;
  shaSpliced = sha.substring(0, 7);
  // sets commit message to split if there is a new line
  if (recentCommit.includes("\n")) {
    recentCommit = recentCommit.split("\n")[0];
  }
}

onMount(() => {
  getRecentCommit();
});

// gets the current year for the copyright
const currentYear = new Date().getFullYear();
</script>

<footer class="text-left text-gray-400">
  <div class="flex items-center justify-center p-6 lg:justify-center">
    <div class="px-3 text-center">
      <div class="mb-3">
        <p class="text-sm font-light text-neutral-100/80">
          © 2020-{currentYear} • dromzeh.dev, powered by
          <span class="text-[#EC8224]"
            ><i class="fab fa-cloudflare"></i> Cloudflare<span> </span></span>
        </p>
        <p class="text-sm font-light text-neutral-100/80">
          <a
            class="font-medium text-neutral-100/80 hover:text-neutral-100/90 hover:underline"
            href="https://buymeacoffee.com/marcelmd">buymeacoffee</a>
          •
          <a
            class="font-medium text-neutral-100/80 hover:text-neutral-100/90 hover:underline"
            href="https://mit.dromzeh.dev/">mit</a>
          •
          <a
            class="font-medium text-neutral-100/80 hover:text-neutral-100/90 hover:underline"
            href="https://git.dromzeh.dev/">github</a>
        </p>
        {#if recentCommit}
          <a href="https://git.dromzeh.dev/dromzeh.dev/commit/{sha}">
            <p class="mt-4 text-xs text-gray-500">
              [{shaSpliced}] {recentCommit}
            </p>
          </a>
        {/if}
      </div>
    </div>
  </div>
</footer>
