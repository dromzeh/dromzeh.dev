export type CraftPiece = {
  slug: string;
  src: string;
  title: string;
  poster?: string;
  aspect?: string;
  note?: string;
  facts?: string[];
  href?: string;
};

export const CRAFT_COLUMNS: [CraftPiece[], CraftPiece[]] = [
  [
    {
      slug: "lagtrain-gcal",
      src: "/lab/lagtrain-gcal.mp4",
      poster: "/lab/lagtrain-gcal-poster.jpg",
      aspect: "880/522",
      title: "Google Calendar",
      note: "Rendering Lagtrain",
      facts: ["2026"],
      href: "https://lagtrain.dromzeh.dev",
    },
    {
      slug: "skowt",
      src: "/lab/skowt-recent-games-fade.mp4",
      poster: "/lab/skowt-recent-games-fade-poster.jpg",
      aspect: "880/796",
      title: "skowt.cc",
      note: "Landing states",
      facts: ["2026"],
      href: "https://skowt.cc",
    },
  ],
  [
    {
      slug: "balatro",
      src: "/lab/balatro-shaders.mp4",
      poster: "/lab/balatro-shaders-poster.jpg",
      aspect: "880/506",
      title: "Balatro",
      note: "Web shaders & UI",
      facts: ["2026"],
      href: "https://balatro.dromzeh.dev",
    },
    {
      slug: "music-player",
      src: "/lab/dromzeh-music-player.mp4",
      poster: "/lab/dromzeh-music-player-poster.jpg",
      aspect: "880/454",
      title: "dromzeh.dev",
      note: "Music player",
      facts: ["2026"],
    },
    {
      slug: "persona-3",
      src: "/lab/p3r-pause-css.mp4",
      poster: "/lab/p3r-pause-css-poster.jpg",
      aspect: "880/496",
      title: "Persona 3",
      note: "Pause menu recreation",
      facts: ["2024"],
    },
  ],
];

export const CRAFT_PIECES: CraftPiece[] = [...CRAFT_COLUMNS[0], ...CRAFT_COLUMNS[1]];

export const isVideo = (p: CraftPiece) => /\.(mp4|webm)$/.test(p.src);
export const pieceLabel = (p: CraftPiece) => (p.note ? `${p.title} — ${p.note}` : p.title);
