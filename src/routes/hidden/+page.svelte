<style lang="postcss">
.rainbow {
  font-family: unifont, monospace;
  color: transparent;
  position: absolute;
  letter-spacing: 0.05em;
  background: linear-gradient(
    90deg,
    #ffb3e6 16.7%,
    #ffddb3 16.7%,
    #ffddb3 33.4%,
    #ffffb3 33.4%,
    #ffffb3 50.1%,
    #b3ffc9 50.1%,
    #b3ffc9 66.8%,
    #b3e6ff 66.8%,
    #ddb3ff 83.5%,
    #ffb3f2 83.5%
  );
  -webkit-background-clip: text;
  background-clip: text;
  line-height: 1.1em;
  animation: rainbow 20s linear infinite;
  @keyframes rainbow {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 60em 0;
    }
  }
}
</style>

<script>
import Draggable from "../../components/Draggable.svelte";
</script>

<svelte:head>
  <title>:3</title>
  <meta name="description" content="get real" />
</svelte:head>

<body class="min-h-screen text-gray-100">
  <div class="mx-auto max-w-screen-lg px-3 py-6">
    <Draggable>
      <pre class="rainbow font-semibold">//  i'll add something cool
here soon </pre>
    </Draggable>
  </div>
</body>
