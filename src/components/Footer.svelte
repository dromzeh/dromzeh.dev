<style lang="postcss">
.badgeImg {
  @apply h-6 w-16;
}
</style>

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

<!-- main footer with all items inside being centered for a cleaner look -->

<footer class="text-left text-gray-400">
  <div class="flex items-center justify-center p-6 lg:justify-center">
    <pre class="text-xs">
      ,_     _
      |\\_,-~/
      / _  _ |    ,--.
     (  @  @ )   / ,-'
      \  _T_/-._( (
      /         `. \
     |         _  \ |
      \ \ ,  /      |
       || |-_\__   /
      ((_/`(____,-'

    </pre>
    <div class="justify-center px-3">
      <div class="mb-3">
        <p>
          © 2020-{currentYear} •
          <a
            class="text-white underline hover:text-emerald-300"
            href="https://mit.dromzeh.dev/">mit</a
          >
          •
          <a
            class="text-white underline hover:text-emerald-300"
            href="https://discord.com/users/492731761680187403">discord</a
          >
          •
          <a
            class="text-white underline hover:text-emerald-300"
            href="https://github.com/dromzeh/">github</a
          >
        </p>
        {#if recentCommit}
          <a href="https://github.com/dromzeh/dromzeh.dev/commit/{sha}">
            <p class="text-xs text-gray-500">
              // {recentCommit} ({shaSpliced})
            </p>
          </a>
        {/if}
      </div>
      <div class="flex flex-wrap gap-1">
        <img
          class="badgeImg"
          src="../assets/badge/transnow2.gif"
          alt="trans rights"
        />
        <img class="badgeImg" src="../assets/badge/gnu-linux.gif" alt="gnu" />
      </div>
    </div>
  </div>
</footer>
