<style>
.pointer-ring {
  left: 0;
  top: 0;
  height: 25px;
  width: 25px;
  border-radius: 80px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  position: fixed;
  z-index: 9999;
  pointer-events: none;
  transition: 0.3s all cubic-bezier(0.12, 0.46, 0.36, 0.92); /* https://cubic-bezier.com */
}

.pointer-dot {
  height: 6px;
  width: 6px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

<script>
// x and y coordinates.
let mouseX;
let mouseY;

// pointer scale
let scale = 1;

function mouseMove(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
} // update the x and y coordinates of the mouse pointer when it moves.
</script>

<svelte:window
  on:mousemove="{mouseMove}"
  on:mousedown="{() => (scale = 1.25)}"
  on:mouseup="{() => (scale = 1)}"
/>

<div
  class="pointer-ring"
  style="transform: translate({mouseX}px, {mouseY}px) scale({scale})"
>
  <div class="pointer-dot"></div>
</div>
