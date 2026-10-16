export type Project = {
  name: string;
  href: string;
  tag: string;
};

export const PROJECTS: Project[] = [
  { name: "skowt.cc", href: "https://skowt.cc", tag: "Game asset database" },
  {
    name: "etcht.dev",
    href: "https://etcht.dev",
    tag: "Content provenance infrastructure",
  },
  {
    name: "stems.rip",
    href: "https://stems.rip",
    tag: "Song stems separator",
  },
  {
    name: "unboard.lol",
    href: "https://unboard.lol",
    tag: "Multiplayer whiteboard",
  },
  { name: "vmt", href: "https://vmt.sh", tag: "Voice message translation" },
];

export const TOOLS: Project[] = [
  {
    name: "qoconv",
    href: "https://github.com/dromzeh/qoconv",
    tag: "Quaver skins to osu!mania",
  },
  {
    name: "immortail",
    href: "https://github.com/dromzeh/immortail",
    tag: "Minecraft pet immortality",
  },
];

export const MUSIC = {
  discord: { primary: "492731761680187403", alt: "1032676126570577930" },
  lastFmUsername: "idves",
};
