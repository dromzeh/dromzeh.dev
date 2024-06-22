import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "contact policy • dromzeh.dev",
    description: "contact policy",
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
                            Contact Policy
                        </span>
                    </div>
                    <p>
                        I currently receive hundreds of messages weekly,
                        therefore I have a contact policy to manage my time and
                        prioritize my work. Please read this before contacting
                        me for the first time.
                    </p>
                    <p>
                        I&apos;m welcome to messages from new people if they
                        pertain to technological discussions, general
                        networking, or topics of mutual interest.
                    </p>
                    <p>
                        If you need help regarding a project I own or maintain,
                        please redirect yourself to the documentation or
                        community associated. Only contact me if explicitly
                        stated in the project&apos;s documentation or community.
                    </p>
                    <p>
                        If you have a security or bug report for any project I
                        own or maintain, please send them to my email with a
                        detailed description and [REPORT] in the subject. I aim
                        to respond to and fix reports within 24 hours.
                    </p>
                    <p>
                        When reaching out -{" "}
                        <Link
                            href="https://nohello.net/"
                            target="_blank"
                            className="text-foreground hover:text-muted-foreground/50 transition-all duration-150"
                        >
                            please be concise and clear about the purpose of
                            your message.
                        </Link>{" "}
                        I am incredibly selective about who I respond to, and
                        messages that are vague, unclear or do not provide a
                        clear purpose risk being ignored.
                    </p>
                    <p>
                        Email:{" "}
                        <Link
                            href="mailto:marcel@dromzeh.dev"
                            target="_blank"
                            className="text-foreground hover:text-muted-foreground/50 transition-all duration-150"
                        >
                            marcel@dromzeh.dev
                        </Link>
                        <br />
                        Twitter:{" "}
                        <Link
                            href="https://dm.new/marc"
                            target="_blank"
                            className="text-foreground hover:text-muted-foreground/50 transition-all duration-150"
                        >
                            @dromzeh
                        </Link>
                        <br />
                        Discord:{" "}
                        <Link
                            href="https://discord.com/users/492731761680187403"
                            target="_blank"
                            className="text-foreground hover:text-muted-foreground/50 transition-all duration-150"
                        >
                            @dromzeh
                        </Link>
                    </p>
                </section>
            </div>
        </div>
    );
}
