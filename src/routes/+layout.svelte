<script>
import Nav from "../components/Nav.svelte";
import Footer from "../components/Footer.svelte";

import NProgress from "nprogress";
import { navigating } from "$app/stores";
import "../app.css";

// Progress css
import "nprogress/nprogress.css";

NProgress.configure({
  // Full list: https://github.com/rstacruz/nprogress#configuration
  minimum: 0.16,
  showSpinner: false,
  // 3476CF
});

$: {
  if ($navigating) {
    NProgress.start();
  }
  if (!$navigating) {
    NProgress.done();
  }
}

// nprogress is used to show loading progress bar at the top of the page
</script>

<!-- <Pointer /> -->
<Nav />

<main>
  <slot />
</main>

<Footer />
