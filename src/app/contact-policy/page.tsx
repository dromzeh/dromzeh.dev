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
                        therefore I maintain a strict contact policy to manage
                        my time and energy effectively. Please read this page
                        before reaching out.
                    </p>
                    <p>
                        I&apos;m not open to unsolicited casual, informal, or
                        personal discussions.
                    </p>
                    <p>
                        If you need help regarding a project I own or maintain,
                        please redirect yourself to the documentation or
                        community associated with the project.
                    </p>
                    <p>
                        If you have a security or bug report for any of my
                        projects, please send them to my email with a detailed
                        description and [REPORT] in the subject. I aim to
                        respond to reports within 24 hours.
                    </p>
                    <p>
                        I&apos;m open to receiving inquiries regarding
                        networking, partnerships, or collaborations related to
                        any projects I own or maintain.
                    </p>
                    <p>
                        Ensure your messages are concise, professional, and
                        direct when reaching out. Failure to adhere to these
                        guidelines may result in your message and any future
                        messages{" "}
                        <b className="text-foreground font-semibold">
                            being ignored.
                        </b>
                    </p>
                    <p>
                        If you have read and understood the above, you may reach
                        out to me through the following methods:
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
