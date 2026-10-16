<template>
  <NuxtLink class="quiet-link">
    <svg class="back-arrow" viewBox="0 0 24 24" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="2" stroke-miterlimit="10" stroke-linecap="square">
        <path d="M21 12L3 12L3.5 12" />
        <path d="M9 19C9 15 6 13 3 12.5L3 11.5C6 11 9 9 9 5" />
      </g>
    </svg>
    <slot />
  </NuxtLink>
</template>

<style scoped>
.back-arrow {
  display: inline-block;
  width: 0.85em;
  height: 0.85em;
  margin-right: 0.4em;
  vertical-align: -0.18em;
}
</style>
