export type Faq = {
  question: string;
  answer: string[];
};

export const FAQ: Faq[] = [
  {
    question: "Where does “dromzeh” come from?",
    answer: [
      "From dr0mz, a name I’ve used online for years. I switched to dromzeh in 2018, and after skowt blew up in 2022 I started using it everywhere so every account matched.",
    ],
  },
  {
    question: "When did you start programming?",
    answer: [
      "At 4, on a hand-me-down laptop. A year later I found a bug in Club Penguin that let me add anyone as a friend.",
    ],
  },
  {
    question: "What got you into web development?",
    answer: [
      "This is a long story. I never meant to get into it. Growing up I wanted to make games more than anything, like a lot of web developers. I’d already made a file uploader that got popular when I was 13, so experience was there.",
      "Then came a very long chain of events which I promise you are all related. I loved Nintendo, homebrewed my 3DS and was addicted to Pokémon Sun and Moon. I found the Wii to Wii U transfer video and the Wii U setup fascinating for some reason, to this day I could still tell you everything about both. I also may be the only person who has ever loved Nintendo Land unhealthy amount and still make references of it to this day.",
      "I got the Odyssey Switch for Christmas which turned out to have a faulty dock. Where I got it from replaced it for me; Odyssey had come as a download code I’d already redeemed, so to match the bundle’s price for the return they let me pick any other game. I picked Breath of the Wild, got addicted, and spent a while looking for another game like it.",
      'That game was <a href="https://enka.network/u/717666757/" target="_blank" rel="noopener noreferrer">Genshin Impact</a>, in 2020. I wanted Venti like, a lot, didn’t get him, and quit. When his banner came back, I got him on a new account and started playing again.',
      "I also really wanted Yanfei (to match with Hu Tao, obviously). Waiting for her rate-ups & Kazuha's rerun after I lost the 50/50 in 1.6 is the only reason I kept playing. It took over 350 wishes across her banners to get Yanfei C0. Enkanomiya was the last region I properly played.",
      'When I was doomscrolling at like 2am, I saw a TikTok video teaching people how to grab sheets from Genshin’s preview pages. It had around 3k likes at the time. The only other place to get them was a Google Drive which is notoriously unreliable and difficult to share, so I went through, grabbed them all and put them on my h5ai instance, wtf.dromzeh.dev. It did quite well; people had trouble accessing it, so I set out to make it more accessible. That became wanderer.moe, which became <a href="https://skowt.cc" target="_blank" rel="noopener noreferrer">skowt.cc</a>.',
      "Building it is what got me into web properly, and I moved away from what I’d been doing until then, which was mostly infra, Discord bots, other random tools and reverse engineering. Every web project I’ve made since came out of skowt.",
    ],
  },
  {
    question: "What’s the security research?",
    answer: [
      "I’ve done security research since 2018, mostly on games: anti-tamper, DRM and console security, and how those systems hold up in practice. The write-ups on this site are the recent end of it, and most of them explain how existing exploits and bypasses work rather than releasing new ones. I don’t publish cheats or cracks, and when I find something new, I report it directly to the engineers at the company involved. It’s the same instinct as everything else I do (taking things apart to see how they work), and it’s what Etcht is built on: you can’t protect something properly until you know how it breaks.",
    ],
  },
  {
    question: "How did skowt.cc get so big?",
    answer: [
      'Commenting on TikTok posts. I’d reply “I have a link for [xyz asset] in my bio”, since TikTok deletes links. Enough people saw them, found the site and shared it. How it’s built if you are also a nerd or genuinely curious is available in <a href="/posts/skowt-cc-architecture">the architecture post</a>. I don’t really advertise it myself, it just happens. Sometimes I see it mentioned and it’s a very strange feeling.',
    ],
  },
  {
    question: "How does skowt handle rights holders?",
    answer: [
      '<a href="https://skowt.cc/about" target="_blank" rel="noopener noreferrer">skowt</a> only hosts assets from live, released games, never leaks or betas. Every asset is credited and links to the studio’s content guidelines, and there’s a registered DMCA agent if a rights holder ever wants something down. In all the years it’s been running, nothing has ever needed to be taken down.',
    ],
  },
  {
    question: "What do you play?",
    answer: [
      "Nowadays, mostly Rhythm games, primarily Fortnite Festival and Quaver. I like deterministic things, and rhythm games are about as deterministic as games get. I've been playing them since early 2017; I haven’t been able to play since I broke my arm in May 2026.",
    ],
  },
  {
    question: "What do you do full-time?",
    answer: [
      'Currently, I focus on my own company, <a href="https://antifield.com" target="_blank" rel="noopener noreferrer">Antifield</a>, where I’m building Etcht: provenance built on invisible watermarking.',
      "Artists are why I started it, though it isn’t only for them. I care about their work, and I don’t think the answer is checking whether something was made with AI. It’s knowing where content came from in the first place, and the systems for that today aren’t good enough for what anyone deserves.",
      'You can read more (if curious) at <a href="https://etcht.dev" target="_blank" rel="noopener noreferrer">etcht.dev</a>. The content sharing platform built on it is still on the way.',
    ],
  },
  {
    question: "Do you use AI?",
    answer: [
      "Yes, to help me write and debug code. I’ve written code by hand since I was 4 and still write a lot of it myself. I never want to lose touch with why I do this - seeing something you’ve painstakingly solved actually work is one of the best feelings in the world.",
      "I still design & architect everything myself.",
      "Generative images and video are different. I personally don’t like them, and don’t really see a reason for them. I’m literally building software to solve the problem of stolen work, and AI should never replace the people who make things.",
    ],
  },
  {
    question: "Do you take contracts or freelance work?",
    answer: [
      'It depends on the scope of the project. If you have something in mind, <a href="https://cal.com/dromzeh" target="_blank" rel="noopener noreferrer">book a call</a>.',
    ],
  },
  {
    question: "How do I get in touch?",
    answer: [
      'For anything professional, <a href="https://cal.com/dromzeh" target="_blank" rel="noopener noreferrer">book a call</a>. Otherwise, I’m <a href="https://discord.com/users/492731761680187403" target="_blank" rel="noopener noreferrer">dromzeh on Discord</a>, or you can message me at <a href="https://dm.new/marc" target="_blank" rel="noopener noreferrer">dm.new/marc</a>.',
      'Email: <a href="mailto:marcel@dromzeh.dev">marcel@dromzeh.dev</a> or <a href="mailto:marcel@antifield.com">marcel@antifield.com</a>.',
    ],
  },
];
