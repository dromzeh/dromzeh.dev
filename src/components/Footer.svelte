<script>
/* following code will be used later.

    import axios from "axios";
    import { onMount } from "svelte"; 
    let memberCount;
    let onlineUsers;

    async function getDiscordUsers() {
    try {
      let response = await axios
        .get(
          "https://discord.com/api/v9/invites/659KAFfNd6?with_counts=true&with_expiration=true"
        )
        .then(function (response) {
          memberCount = response.data.approximate_member_count;
          onlineUsers = response.data.approximate_presence_count;
        });
    } catch (e) {
      memberCount = "?";
      onlineUsers = "?";
    }
  }

    onMount(() => {
        getDiscordUsers();
    });
*/

// gets the current year for the copyright
const currentYear = new Date().getFullYear();
</script>

<!-- main footer with all items inside being centered for a cleaner look -->
<footer class="text-center text-gray-400">
    <div class="flex justify-center items-center lg:justify-center p-6">
    <div class="justify-center">
        <p>© {currentYear} - dromzeh.</p>
        <p>built with <a class = "hover:bg-opacity-25 bg-indigo-400 bg-opacity-5 p-1 rounded-md font-bold text-indigo-300" href = "https://kit.svelte.dev/">SvelteKit</a> and <a class = "hover:bg-opacity-25 bg-indigo-400 bg-opacity-5 p-1 rounded-md font-bold text-indigo-300" href = "https://tailwindcss.com/">TailwindCSS</a></p>
    </div>
    </div>
</footer>