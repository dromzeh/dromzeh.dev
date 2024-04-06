import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "contact policy • dromzeh.dev",
    metadataBase: new URL("https://dromzeh.dev"),
};

export default function Page() {
    return (
        <div className="min-h-screen max-w-xl mx-auto flex items-center justify-center">
            <div className="py-12 px-4 text-sm">
                <section className="flex flex-col my-6 space-y-6">
                    <p>
                        I currently receive hundreds of messages a week,
                        therefore I have a contact policy to manage my time and
                        energy effectively. Please read this page before
                        reaching out.
                    </p>
                    <p>
                        I&apos;m open to messages from new people if they are in
                        regards to networking, partnerships, collaborations,
                        technical discussions or investments.
                    </p>
                    <p>
                        If you need help regarding a project I own or maintain,
                        do not contact me. Instead, please redirect yourself to
                        the documentation or community associated with the
                        project.
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
                        I am selective about who I respond to, and messages that
                        are vague, unclear or do not provide a clear purpose
                        risk being ignored.
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
