import type { Metadata } from "next";
import Link from "next/link";
import { Age } from "~/components/main/age-info";

export const metadata: Metadata = {
    title: "extended about me • dromzeh.dev",
    description: "extended about me",
    metadataBase: new URL("https://dromzeh.dev"),
};

export default function Page() {
    return (
        <div className="min-h-screen max-w-xl mx-auto flex items-center justify-center">
            <div className="py-24 px-4 text-sm">
                <section className="flex flex-col my-6 space-y-6">
                    <div className="flex flex-row space-x-2 items-center justify-between group">
                        <span className="text-neutral-500">
                            <Link
                                href="/"
                                className="text-foreground group-hover:text-muted-foreground/50 transition-colors duration-150 hover:cursor-pointer"
                            >
                                Go Back
                            </Link>
                        </span>
                        <div className="flex-grow border-t border-dotted border-gray-400"></div>
                        <span className="text-muted-foreground">
                            About Me (Extended)
                        </span>
                    </div>
                    <p>
                        I&apos;m exactly <Age /> years old. I&apos;ve been
                        programming somewhat consistently since I was around 5
                        years old and first given a laptop, where I started
                        hosting Minecraft Servers and creating shell scripts for
                        automation.
                    </p>
                    <p>
                        At 13, I won my first competition with a Discord
                        commission bot that I made in Python, I was also the
                        youngest participant by 5 years.
                    </p>
                    <p>
                        The above led me to freelancing & eventually working as
                        a Systems Developer for a startup part-time, where I
                        made enough to invest in various projects. I'm now
                        dedicating everything to my own projects.
                    </p>
                    <p>
                        My work mostly revolves around Systems, Infrastructure,
                        and Web Development in Typescript and Rust. I was
                        accepted into college for extraordinary ability as I had
                        no secondary qualification due to medical reasons, but
                        dropped out to work full-time on my projects, and have
                        been doing so for the past 2 years.
                    </p>
                    <p>
                        I've also been working solo on a project for sharing
                        (Art)Work & OCs since the start of 2024, which is on
                        track to release Early September/Late August 2024.
                    </p>
                    <p>
                        Everything I know is entirely self-taught. You learn
                        best by doing and failing and not blindly copying from
                        tutorials. For example, if you want to learn a
                        programming language, take apart a project in said
                        language and intentionally break it, then fix it. Just
                        rinse and repeat until you understand the core concepts.
                    </p>
                    <p>
                        I used to play a lot of Gacha Games, which is what led
                        me to create wanderer.moe at 15. I was tired of people
                        sharing links behind obscure Google Drive/Mega links,
                        where most of the time the link would be expired, and
                        wanted people to find stuff easier. It started as a
                        simple project, but exploded in popularity thanks to
                        TikTok where it now averages hundreds of thousands of
                        monthly users.
                    </p>
                    <p>
                        Alongside, I also played rhythm games from 2016-2018,
                        then quit for a while. Eventually picked it up again in
                        2020 & now primarily play 4K VSRGs. My keybinds are AS
                        on my left and 23 [numpad] on my right, I'm primarily a
                        jack player as I can't read LN.
                    </p>
                </section>
            </div>
        </div>
    );
}
