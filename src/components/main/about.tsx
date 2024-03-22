import Link from "next/link";
import { Age, AgeTooltip } from "~/components/main/age-info";

export function About() {
    return (
        <div className="">
            <h2 className="text-foreground font-bold text-lg mb-2">About Me</h2>
            <div className="flex flex-col space-y-2">
                <p>
                    Hey! I&apos;m Marcel (/mɑɹˈsɛl/) - <Age /> year old Software
                    Engineer specializing in infrastructure, serverless
                    computing, and backend development.
                </p>
                <p>
                    I started programming at <AgeTooltip />. All projects I
                    maintain are available on my{" "}
                    <Link
                        href="https://github.com/dromzeh"
                        target="_blank"
                        className="text-foreground hover:text-muted-foreground/50 transition-all duration-150"
                    >
                        GitHub
                    </Link>
                    .
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
                    , an{" "}
                    <Link
                        href="https://git.wanderer.moe/"
                        target="_blank"
                        className="text-foreground hover:text-muted-foreground/50 transition-all duration-150"
                    >
                        open-source
                    </Link>{" "}
                    website hosting game assets with thousands of daily users.
                    Currently bootstrapping and developing an OC & Art Sharing
                    platform alongside full-time, expected to release Q2 2024.
                </p>
                <p>
                    Contact me through{" "}
                    <Link
                        href="https://discord.com/users/492731761680187403"
                        target="_blank"
                        className="text-foreground hover:text-muted-foreground/50 transition-all duration-150"
                    >
                        Discord
                    </Link>
                    ,{" "}
                    <Link
                        href="htps://dm.new/marc"
                        target="_blank"
                        className="text-foreground hover:text-muted-foreground/50 transition-all duration-150"
                    >
                        {" "}
                        Twitter
                    </Link>
                    , or email{" "}
                    <Link
                        href="mailto:marcel@dromzeh.dev"
                        target="_blank"
                        className="text-foreground hover:text-muted-foreground/50 transition-all duration-150"
                    >
                        marcel@dromzeh.dev
                    </Link>
                    . Before reaching out, please read my{" "}
                    <Link
                        href="/contact-policy"
                        className="text-foreground hover:text-muted-foreground/50 transition-all duration-150"
                    >
                        contact policy
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
}
