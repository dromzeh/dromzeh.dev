export type LanyardSpotify = {
  song: string;
  artist: string | null;
  album_art_url: string;
  track_id: string | null;
};

type LanyardPresence = {
  listening_to_spotify: boolean;
  spotify: LanyardSpotify | null;
};

const SOCKET_URL = "wss://api.lanyard.rest/socket";

export function useLanyard(ids: string[]) {
  const presences = ref<Record<string, LanyardPresence>>({});
  const ready = ref(false);

  onMounted(() => {
    let ws: WebSocket | null = null;
    let heartbeat: ReturnType<typeof setInterval> | undefined;
    let retry: ReturnType<typeof setTimeout> | undefined;
    let closed = false;
    let retries = 0;

    const connect = () => {
      if (closed) return;
      ws = new WebSocket(SOCKET_URL);
      ws.onmessage = (ev) => {
        let msg: { op: number; t?: string; d: any };
        try {
          msg = JSON.parse(ev.data);
        } catch {
          return;
        }
        if (msg.op === 1) {
          ws?.send(JSON.stringify({ op: 2, d: { subscribe_to_ids: ids } }));
          clearInterval(heartbeat);
          heartbeat = setInterval(() => ws?.send(JSON.stringify({ op: 3 })), msg.d.heartbeat_interval);
          retries = 0;
        } else if (msg.op === 0) {
          if (msg.t === "INIT_STATE") {
            presences.value = msg.d ?? {};
            ready.value = true;
          } else if (msg.t === "PRESENCE_UPDATE" && msg.d?.discord_user?.id) {
            presences.value = { ...presences.value, [msg.d.discord_user.id]: msg.d };
          }
        }
      };
      ws.onclose = () => {
        clearInterval(heartbeat);
        if (closed) return;
        ready.value = true;
        retry = setTimeout(connect, Math.min(30_000, 1000 * 2 ** retries++));
      };
      ws.onerror = () => ws?.close();
    };
    connect();

    onUnmounted(() => {
      closed = true;
      clearInterval(heartbeat);
      clearTimeout(retry);
      ws?.close();
    });
  });

  return { presences, ready };
}
