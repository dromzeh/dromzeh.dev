import Link from "next/link";
import type { Metadata } from "next";
import { Age } from "~/components/main/about";

export const metadata: Metadata = {
    title: "about (extended) • dromzeh.dev",
    description: "extended about me page",
};

export default function About() {
    return (
        <div className="min-h-screen max-w-2xl mx-auto">
            <div className="py-24 px-6 text-sm">
                <div className="space-y-8">
                    <header className="space-y-4">
                        <h1 className="text-primary text-2xl font-bold">
                            About (Extended)
                        </h1>
                    </header>

                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold text-foreground">
                            Background
                        </h2>
                        <div className="space-y-3 text-muted-foreground leading-relaxed">
                            <p>
                                I started programming at 4 years old, making
                                games in Unity and creating shell scripts. I was
                                always fascinated by reverse engineering,
                                figuring out ways to exploit online web games,
                                like adding people as friends who hadn't even
                                added me back.
                            </p>
                            <p>
                                At 7, I moved into JavaScript, then at 10, I
                                started working with Python. During ages 13 to
                                15, I got deep into Roblox like any other kid at
                                that age, making Discord bots for Roblox servers
                                and getting into Roblox exploit development.
                            </p>
                            <p>
                                In October 2020 (Year 10), I left traditional
                                secondary school for an online international
                                school due to medical reasons and because it
                                wasn't 'challenging' enough.
                            </p>
                            <p>
                                I basically fully shifted into web development
                                at 15 when wanderer.moe exploded in popularity.
                                At 16-17, I was working as a systems engineer at
                                a startup, I also went to college for a couple
                                months before dropping out & quitting my job at
                                the same time.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold text-foreground">
                            Current Projects
                        </h2>
                        <div className="space-y-3 text-muted-foreground leading-relaxed">
                            <p>
                                My main focus right now is web development and
                                mobile development. I'm primarily working on
                                Originoid and wanderer.moe, but I also have a
                                few side projects going to keep things
                                interesting and avoid getting stuck between the
                                same two projects.
                            </p>
                            <p>
                                I like to create stuff that actually helps
                                people, rather than just extract value from
                                them.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold text-foreground">
                            Technical Interests
                        </h2>
                        <div className="space-y-3 text-muted-foreground leading-relaxed">
                            <p>
                                I'm still very into low-level programming and
                                reverse engineering. I also continue to do a lot
                                of systems work and infrastructure management.
                            </p>
                            <p>
                                I'm heavily into self-hosting and run a Proxmox
                                cluster of 5 PCs in my room. I self host pretty
                                much everything I can as I like having control
                                over my data and services.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold text-foreground">
                            Other Interests
                        </h2>
                        <div className="space-y-3 text-muted-foreground leading-relaxed">
                            <p>
                                I play a stupid amount of rhythm games. I got
                                into the genre in 2017, starting with osu!
                                standard before switching to VSRGs (vertical
                                scrolling rhythm games) in 2020.
                            </p>
                            <p>
                                Sometimes I'll do motion and text graphics work
                                in After Effects, which I've been using on and
                                off since 2019.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold text-foreground">
                            On AI
                        </h2>
                        <div className="space-y-3 text-muted-foreground leading-relaxed">
                            <p>
                                AI should help people solve tedious problems,
                                not replace the work they spend years mastering.
                                The craft and intuition that comes from deep
                                experience has real value that shouldn't be
                                automated away just for convenience.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold text-foreground">
                            Hardware
                        </h2>
                        <div className="space-y-3 text-muted-foreground leading-relaxed">
                            <div className="space-y-1 text-sm">
                                <p>
                                    <strong className="text-foreground">
                                        CPU:
                                    </strong>{" "}
                                    Ryzen 7 9800X3D
                                </p>
                                <p>
                                    <strong className="text-foreground">
                                        GPU:
                                    </strong>{" "}
                                    RTX 5070 OC
                                </p>
                                <p>
                                    <strong className="text-foreground">
                                        RAM:
                                    </strong>{" "}
                                    2x24GB DDR5 6000MHz
                                </p>
                                <p>
                                    <strong className="text-foreground">
                                        Storage:
                                    </strong>{" "}
                                    1TB Samsung 990 EVO Plus M.2 NVME + 512GB
                                    Sabrent M.2 NVME
                                </p>
                                <p>
                                    <strong className="text-foreground">
                                        Monitors:
                                    </strong>{" "}
                                    ViewSonic VX2719-PC-MH 27" 240hz & AOC
                                    CU34G2XE 34" 144hz
                                </p>
                                <p>
                                    <strong className="text-foreground">
                                        Peripherals:
                                    </strong>{" "}
                                    Attack Shark X68HE, Steelseries Rival 650
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold text-foreground">
                            What I Use
                        </h2>
                        <div className="space-y-2 text-muted-foreground leading-relaxed">
                            <div className="space-y-1 text-sm">
                                <p>
                                    <strong className="text-foreground">
                                        Editors:
                                    </strong>{" "}
                                    NvChad, VSC (Cursor), RustRover, all with
                                    vim keybinds
                                </p>
                                <p>
                                    <strong className="text-foreground">
                                        Languages:
                                    </strong>{" "}
                                    Primarily TypeScript, Python & Rust
                                </p>
                                <p>
                                    <strong className="text-foreground">
                                        RE:
                                    </strong>{" "}
                                    My own private AssetStudio Fork, FModel,
                                    UndertaleModTool, IDA
                                </p>
                                <p>
                                    <strong className="text-foreground">
                                        OS (Main PC):
                                    </strong>{" "}
                                    Windows 11 w/ WSL (Ubuntu) & Arch
                                </p>
                                <p>
                                    <strong className="text-foreground">
                                        OS (Mac):
                                    </strong>{" "}
                                    Asahi Linux (Fedora){" "}
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold text-foreground">
                            Media I Recommend
                        </h2>
                        <div className="space-y-2 text-muted-foreground leading-relaxed">
                            <div className="space-y-1 text-sm">
                                <p>
                                    <strong className="text-foreground">
                                        Games:
                                    </strong>{" "}
                                    The Beginner's Guide, Outer Wilds, Celeste,
                                    OMORI, OneShot
                                </p>
                                <p>
                                    <strong className="text-foreground">
                                        Shows:
                                    </strong>{" "}
                                    Cowboy Bebop, Severance, Black Mirror
                                </p>
                                <p>
                                    <strong className="text-foreground">
                                        Music (Artists):
                                    </strong>{" "}
                                    underscores, Jane Remover, Frums, Silentroom
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold text-foreground">
                            Favourite Songs
                        </h2>
                        <div className="space-y-3 text-muted-foreground leading-relaxed">
                            <div className="space-y-1 text-sm">
                                <p>
                                    <strong className="text-foreground">
                                        <Link
                                            href="https://open.spotify.com/track/4kfaLw8sMFbZ1LQxlTaS2y"
                                            target="_blank"
                                            className="text-foreground hover:text-muted-foreground/50 transition-all duration-150 decoration-muted-foreground/30 hover:decoration-muted-foreground/50"
                                        >
                                            Music
                                        </Link>
                                    </strong>{" "}
                                    by underscores
                                </p>
                                <p>
                                    <strong className="text-foreground">
                                        <Link
                                            href="https://open.spotify.com/track/6I7Nu1gsf0NhkzYlyfHa7q"
                                            target="_blank"
                                            className="text-foreground hover:text-muted-foreground/50 transition-all duration-150 decoration-muted-foreground/30 hover:decoration-muted-foreground/50"
                                        >
                                            Aegleseeker - "Afterworld" Full
                                            Version
                                        </Link>
                                    </strong>{" "}
                                    by Frums & Silentroom
                                </p>
                                <p>
                                    <strong className="text-foreground">
                                        <Link
                                            href="https://open.spotify.com/track/1GCjGQ2zBYumwdSF3uVCfX"
                                            target="_blank"
                                            className="text-foreground hover:text-muted-foreground/50 transition-all duration-150 decoration-muted-foreground/30 hover:decoration-muted-foreground/50"
                                        >
                                            Disconnected
                                        </Link>
                                    </strong>{" "}
                                    by ATLUS Sound Team
                                </p>
                                <p>
                                    <strong className="text-foreground">
                                        <Link
                                            href="https://open.spotify.com/track/7sruUbgF96auAnBstqL5wG"
                                            target="_blank"
                                            className="text-foreground hover:text-muted-foreground/50 transition-all duration-150 decoration-muted-foreground/30 hover:decoration-muted-foreground/50"
                                        >
                                            zero_one (Camellia Remix)
                                        </Link>
                                    </strong>{" "}
                                    by The Living Tombstone & Camellia
                                </p>
                                <p>
                                    <strong className="text-foreground">
                                        <Link
                                            href="https://open.spotify.com/track/0UeTH2N7EddbhCP7wnRk7E"
                                            target="_blank"
                                            className="text-foreground hover:text-muted-foreground/50 transition-all duration-150 decoration-muted-foreground/30 hover:decoration-muted-foreground/50"
                                        >
                                            pale machine
                                        </Link>
                                    </strong>{" "}
                                    by bo en
                                </p>
                                <p>
                                    <strong className="text-foreground">
                                        <Link
                                            href="https://open.spotify.com/track/5hM5arv9KDbCHS0k9uqwjr"
                                            target="_blank"
                                            className="text-foreground hover:text-muted-foreground/50 transition-all duration-150 decoration-muted-foreground/30 hover:decoration-muted-foreground/50"
                                        >
                                            Borderline
                                        </Link>
                                    </strong>{" "}
                                    by Tame Impala
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold text-foreground">
                            Miscellaneous
                        </h2>
                        <div className="space-y-3 text-muted-foreground leading-relaxed">
                            <p>
                                I'm deaf in my right ear due to TMJ, which can
                                make it difficult for me to hear people clearly.
                                I also appreciate when people are direct and
                                straightforward in their communication.
                            </p>
                        </div>
                        <div className="space-y-2 text-muted-foreground leading-relaxed">
                            <div className="space-y-1 text-sm">
                                <p>
                                    <strong className="text-foreground">
                                        MBTI:
                                    </strong>{" "}
                                    INTJ
                                </p>
                                <p>
                                    <strong className="text-foreground">
                                        Enneagram:
                                    </strong>{" "}
                                    5w6
                                </p>
                                <p>
                                    <strong className="text-foreground">
                                        Tritype:
                                    </strong>{" "}
                                    583
                                </p>
                                <p>
                                    <strong className="text-foreground">
                                        Instinctual Variant:
                                    </strong>{" "}
                                    sp/sx
                                </p>
                                <p>
                                    <strong className="text-foreground">
                                        Big 5:
                                    </strong>{" "}
                                    RCOEI
                                </p>
                                <p>
                                    <strong className="text-foreground">
                                        Temperament:
                                    </strong>{" "}
                                    Melancholic
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
