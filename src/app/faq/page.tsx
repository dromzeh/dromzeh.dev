import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "faq • dromzeh.dev",
    description: "faq page",
};

export default function FAQ() {
    return (
        <div className="min-h-screen max-w-xl mx-auto px-6 py-16">
            <div className="space-y-8">
                <header className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-8">
                        <Link
                            href="/"
                            className="hover:text-foreground transition-colors duration-200"
                        >
                            ←
                        </Link>
                    </div>
                    <h1 className="text-lg font-medium text-foreground">FAQ</h1>
                </header>

                <main className="space-y-8">
                    <section className="space-y-4 text-sm">
                        <h2 className="font-semibold text-foreground text-sm">
                            Background & How I Got Into Programming
                        </h2>
                        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                            <p>
                                I started programming at 4 years old, making
                                games in Unity and creating shell scripts. I was
                                always fascinated by reverse engineering,
                                exploiting and malware. One of the first things
                                I did was figuring out ways to exploit online
                                web games, like adding people as friends who
                                hadn&apos;t even added me back.
                            </p>
                            <p>
                                At 7, I moved into JavaScript, then at 10, I
                                started working with Python. During ages 13 to
                                15, I got deep into Roblox like any other kid at
                                that age, making Discord bots for Roblox servers
                                and getting into Roblox exploit development.
                            </p>
                            <p>
                                Left mainstream school in Year 10 to an
                                international secondary school. I got a 9 in
                                Further Maths & Computer Science alongside a
                                BTEC Level 2 Disctinction in Business & finished
                                secondary school one year early.
                            </p>
                            <p>
                                Then I basically fully shifted into web
                                development at 15 when skowt.cc (prev.
                                wanderer.moe) exploded in popularity. Proceeded
                                to drop out of college at 16.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <h2 className="font-semibold text-foreground text-sm">
                            Current Interests
                        </h2>
                        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                            <p>
                                Due to TikTok's algorithm, I&apos;ve been stuck
                                mostly doing web development for the past few
                                years. I have, however, been thoroughly enjoying
                                hardware and robotics and have been working on a
                                (top secret) project for the past few months.
                            </p>
                            <p>
                                Sometimes I&apos;ll do systems work and
                                infrastructure management, plus being pretty
                                into self-hosting everything I can. I&apos;ve
                                also dabbled in doing some low-level programming
                                and reverse engineering.
                            </p>
                            <p>
                                Alongside that, I play an unhealthy amount of
                                rhythm games. I got into the genre in 2017,
                                starting with osu! standard before switching to
                                VSRGs (vertical scrolling rhythm games) in 2020,
                                predominately 4K. Recently got my hands on
                                5-fret controllers and I'm now learning 5-fret
                                rhythm games.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4 text-sm">
                        <h2 className="font-semibold text-foreground text-sm">
                            Stance On AI
                        </h2>
                        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                            <p>
                                AI should help people solve tedious problems,
                                not replace the work they spend years pouring
                                their heart, soul & the sacrifices they make
                                into. What we gain from our experience as humans
                                has so much value that shouldn&apos;t be
                                automated away just for &quot;convenience&quot;
                                or to cut corners.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-4 text-sm">
                        <h2 className="font-semibold text-foreground text-sm">
                            PC Hardware
                        </h2>
                        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
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
                                    48GB (2x24GB) DDR5 6000MHz
                                </p>
                                <p>
                                    <strong className="text-foreground">
                                        SSDs:
                                    </strong>{" "}
                                    1TB Samsung 990 EVO Plus M.2 NVME + 512GB
                                    Sabrent M.2 NVME
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4 text-sm">
                        <h2 className="font-semibold text-foreground text-sm">
                            Games
                        </h2>
                        <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                            <div className="space-y-1 text-sm">
                                <p>
                                    <strong className="text-foreground">
                                        Suggestions:
                                    </strong>{" "}
                                    Outer Wilds, OneShot, The Beginner&apos;s
                                    Guide, OMORI, Hollow Knight, Celeste,
                                    ULTRAKILL, Dead Take
                                </p>
                                <p>
                                    <strong className="text-foreground">
                                        Liked:
                                    </strong>{" "}
                                    Persona 3 Reload, Neon White, Halo 4, Halo
                                    Reach, Metal: Hellsinger, Sonic Adventure 2,
                                    Watchdogs: Legion, Left 4 Dead 2, BO6
                                    (Zombies)
                                </p>
                                <p>
                                    <strong className="text-foreground">
                                        Rotation:
                                    </strong>{" "}
                                    Quaver, Fortnite (Festival), Phasmophobia,
                                    Rock Band 4, YARG, Elden Ring Nightreign
                                </p>
                                <p>
                                    <strong className="text-foreground">
                                        Need to play:
                                    </strong>{" "}
                                    Hollow Knight: Silksong, Black Ops 7, CIV 7,
                                    Borderlands 4, GTA 6, Persona 4 Revival
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4 text-sm">
                        <h2 className="font-semibold text-foreground text-sm">
                            Media I Like
                        </h2>
                        <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                            <div className="space-y-1 text-sm">
                                <p>
                                    <strong className="text-foreground">
                                        Shows:
                                    </strong>{" "}
                                    Cowboy Bebop, Severance, Black Mirror,
                                    Cyberpunk: Edgerunners
                                </p>
                                <p>
                                    <strong className="text-foreground">
                                        Movies:
                                    </strong>{" "}
                                    Black Mirror: Bandersnatch, Unfriended,
                                    Unfriended: Dark Web, Sonic 1-3
                                </p>
                                <p>
                                    <strong className="text-foreground">
                                        Music Artists:
                                    </strong>{" "}
                                    Frums, Imperial Circus Dead Decadence,
                                    underscores, Camellia, Silentroom, Dance
                                    Gavin Dance, Basement
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4 text-sm">
                        <h2 className="font-semibold text-foreground text-sm">
                            Contact Guidelines
                        </h2>

                        <div className="space-y-3 text-muted-foreground">
                            <p>
                                I won&apos;t reply to anything regarding project
                                updates/timelines & personal, sensitive,
                                controversial or potentially triggering
                                subjects.
                            </p>
                            <p>
                                For issues considered urgent or problems with
                                any of my projects, email me at marcel at
                                dromzeh dot dev or marcel at originoid dot co.
                            </p>
                            <p>
                                Please be direct and provide useful context to
                                help me understand better.{" "}
                                <Link
                                    href="https://nohello.net/en/"
                                    target="_blank"
                                    className="text-primary hover:text-muted duration-300 transition-colors"
                                >
                                    Vague messages
                                </Link>{" "}
                                means no reply.
                            </p>
                            <p>
                                Responses are prioritized based on the topic and
                                urgency due as I recieve hundreds of messages
                                each week.
                            </p>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
