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
  }

  onMount(() => {
    getRecentCommit();
  });

  // gets the current year for the copyright
  const currentYear = new Date().getFullYear();
</script>

<!-- main footer with all items inside being centered for a cleaner look -->
<footer class="text-center text-gray-400">
  <div class="flex justify-center items-center lg:justify-center p-6">
    <div class="justify-center">
      <p>
        © {currentYear}, dromzeh | built with
        <a class="text-white hover:underline" href="https://kit.svelte.dev/"
          >SvelteKit</a
        >
        and
        <a class="text-white hover:underline" href="https://tailwindcss.com/"
          >TailwindCSS</a
        >
      </p>
      {#if recentCommit}
        <a href="https://github.com/dromzeh/dromzeh.dev/commit/{sha}">
          <p class="text-xs text-white hover:underline">{shaSpliced} -> {recentCommit}</p>
        </a>
      {/if}
    </div>
  </div>

  <div class = "mx-auto">
    <!-- buy me a coffee url -->
      <a
      href="https://www.buymeacoffee.com/marcelmd"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        class = "mx-auto"
        src="https://cdn.buymeacoffee.com/buttons/v2/default-white.png"
        alt="Buy Me A Coffee"
        style="height: 30px !important;width: 109px !important;"
      />
    </a>
  </div>
  <br>

</footer>
