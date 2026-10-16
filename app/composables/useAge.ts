const BIRTH_TIMESTAMP = 1156114801000;
const YEAR_MS = 365.25 * 24 * 60 * 60 * 1000;
const UPDATE_INTERVAL_MS = 1000;

function currentAge(): number {
  return (Date.now() - BIRTH_TIMESTAMP) / YEAR_MS;
}

export function useAge() {
  const age = ref(currentAge());
  let interval: ReturnType<typeof setInterval> | undefined;

  onMounted(() => {
    interval = setInterval(() => {
      age.value = currentAge();
    }, UPDATE_INTERVAL_MS);
  });
  onUnmounted(() => clearInterval(interval));

  return age;
}
