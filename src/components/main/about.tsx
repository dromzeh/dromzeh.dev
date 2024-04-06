import Link from "next/link";
import { Age } from "~/components/main/age-info";

export function About() {
    return (
        <div className="">
            <h2 className="text-foreground font-bold text-lg mb-2">About Me</h2>
            <div className="flex flex-col space-y-2">
                <p>
                    Hey! I&apos;m Marcel (/mɑɹˈsɛl/), a <Age />
                    -year-old Software Engineer specializing in infrastructure,
                    serverless computing, and backend development.
                </p>
                <p>
                    Mostly known for creating{" "}
                    <Link
                        href="https://wanderer.moe/"
                        target="_blank"
                        className="text-foreground hover:text-muted-foreground/50 transition-all duration-150"
                    >
                        wanderer.moe
                    </Link>
                    , an open-source website hosting game assets with thousands
                    of daily users.
                </p>
                <p>
                    Currently, I&apos;m bootstrapping and developing an{" "}
                    <Link
                        href="https://x.com/originoidco"
                        target="_blank"
                        className="text-foreground hover:text-muted-foreground/50 transition-all duration-150"
                    >
                        OC & Art Sharing platform
                    </Link>{" "}
                    expected to release Q2 2024.
                </p>
                <p>
                    Alongside, I occasionally invest small cheques in projects
                    that I find interesting.
                </p>
                <p>
                    If you want to reach out, please read my{" "}
                    <Link
                        href="/contact-policy"
                        className="text-foreground hover:text-muted-foreground/50 transition-all duration-150"
                    >
                        contact policy
                    </Link>{" "}
                    beforehand.
                </p>
            </div>
        </div>
    );
}
