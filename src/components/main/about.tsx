import Link from "next/link";
import { Age } from "~/components/main/age-info";

export function About() {
    return (
        <div className="">
            <h2 className="text-foreground font-bold text-lg mb-2">About Me</h2>
            <div className="flex flex-col space-y-2">
                <p>
                    Hey! I&apos;m Marcel{" "}
                    <span className="text-xs">(/mɑɹˈsɛl/)</span>, a <Age />
                    -year-old Software Engineer specializing in infrastructure,
                    serverless computing, and backend development.
                </p>
                <p>
                    I'm best known for creating{" "}
                    <Link
                        href="https://wanderer.moe/"
                        target="_blank"
                        className="text-foreground hover:text-muted-foreground/50 transition-all duration-150"
                    >
                        wanderer.moe
                    </Link>
                    , an open-source website hosting game assets with thousands
                    of daily users. Currently, I&apos;m bootstrapping and
                    developing an{" "}
                    <Link
                        href="https://x.com/originoidco"
                        target="_blank"
                        className="text-foreground hover:text-muted-foreground/50 transition-all duration-150"
                    >
                        OC & Art Sharing platform
                    </Link>{" "}
                    scheduled to release Q3 2024.
                </p>
                <p>
                    Alongside, I also write{" "}
                    <Link
                        href="/posts"
                        className="text-foreground hover:text-muted-foreground/50 transition-all duration-150"
                    >
                        posts
                    </Link>{" "}
                    regarding my current interests, projects, and experiences.
                </p>
                <p>
                    Feel free to reach out, but note that I recieve hundreds of
                    messages & may not respond to everyone. Please check my{" "}
                    <Link
                        href="/contact-policy"
                        className="text-foreground hover:text-muted-foreground/50 transition-all duration-150"
                    >
                        contact policy
                    </Link>{" "}
                    first.
                </p>
            </div>
        </div>
    );
}
