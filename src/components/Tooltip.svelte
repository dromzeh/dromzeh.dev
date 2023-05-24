<style>
.tooltip {
  z-index: 50;
}
</style>

<script>
export let tooltipText;
</script>

<div
  class="tooltip pointer-events-none absolute mt-16 flex origin-top scale-0 flex-col space-x-1.5 rounded-lg border-[0.1px] border-white/10 bg-white/5 px-1 py-1 text-[.69rem] font-medium shadow-sm backdrop-blur transition-all duration-200 ease-in-out group-hover:scale-100">
  <div class="flex space-x-1">
    <p class="rounded-lg bg-white/10 px-1.5 py-1 shadow-inner">
      {tooltipText}
    </p>
  </div>
</div>
