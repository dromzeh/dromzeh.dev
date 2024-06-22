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
            <div className="py-12 px-4 text-sm">
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
                        Now, I mostly work on Systems, Infrastructure, and Web
                        Development in Typescript and Rust. I was accepted into
                        college for extraordinary ability, but dropped out to
                        work full-time on my projects, and have been doing so
                        for the past 2 years.
                    </p>
                    <p>
                        Everything I know is entirely self-taught, tutorials are
                        a waste of time - you learn by doing and failing. If you
                        want to learn a programming language, take apart a
                        project in said language and intentionally break it,
                        then fix it. Just rinse and repeat until you understand
                        the core concepts.
                    </p>
                </section>
            </div>
        </div>
    );
}
