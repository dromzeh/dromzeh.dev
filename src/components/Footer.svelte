<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import Icon from "@iconify/svelte";

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
<footer class="text-center text-gray-400">
  <div class="flex justify-center items-center lg:justify-center p-6">
    <div class="justify-center">
      <div class="flex flex-row flex-wrap gap-4 my-auto justify-center mb-6">
        <a
          href="https://discord.com/users/492731761680187403"
          target="_blank"
          rel="noreferrer"
        >
          <Icon
            icon="fa-brands:discord"
            class="text-xl hover:text-white"
          />
        </a>

        <a
          href="https://tiktok.com/@dromzeh"
          target="_blank"
          rel="noreferrer"
        >
          <Icon
            icon="fa-brands:tiktok"
            class="text-xl hover:text-white"
          />
        </a>

        <a
          href="https://twitter.com/dromzeh"
          target="_blank"
          rel="noreferrer"
        >
          <Icon
            icon="fa-brands:twitter"
            class="text-xl hover:text-white"
          />
        </a>

        <a
          href="mailto:marcel@dromzeh.dev"
          target="_blank"
          rel="noreferrer"
        >
          <Icon
            icon="fa-solid:envelope"
            class="text-xl hover:text-white"
          />
        </a>

        <a
          href="https://stats.fm/dromzeh"
          target="_blank"
          rel="noreferrer"
        >
          <Icon
            icon="fa-brands:spotify"
            class="text-xl hover:text-white"
          />
        </a>
      </div>
      <p>
        © {currentYear} built with ❤️ by Marcel,
        <a class="text-white hover:underline" href="https://kit.svelte.dev/"
          >SvelteKit</a
        >
        &
        <a class="text-white hover:underline" href="https://tailwindcss.com/"
          >TailwindCSS</a
        >
      </p>
      {#if recentCommit}
        <a href="https://github.com/dromzeh/dromzeh.dev/commit/{sha}">
          <p class = "text-gray-400 hover:text-white hover:underline text-xs"> {shaSpliced} -> {recentCommit} </p>
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
