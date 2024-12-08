import { Metadata } from "next";
import Link from "next/link";
import { ContactContainer } from "~/components/main/contact";

export const metadata: Metadata = {
    title: "Contact",
    description: "Contact Page",
};

export default function Contact() {
    return (
        <div className="min-h-screen max-w-xl mx-auto flex items-center justify-center">
            <div className="py-24 px-6 text-sm">
                <section className="flex flex-col space-y-8">
                    <section>
                        <h2 className="text-muted-foreground/60 mb-2">
                            Contact Guidelines
                        </h2>
                        <div className="space-y-2 text-muted-foreground">
                            <p>
                                If you want to share an idea, ask a question, or
                                simply want to say hello, please don't hesitate
                                to reach out to me with the contact methods
                                below.
                            </p>
                            <p>
                                To ensure a safe and comfortable interaction for
                                everyone, I kindly request that only individuals
                                16 years and older reach out to me directly if
                                we've never spoke before.
                            </p>
                            <p>
                                If you're under 16 and have discovered a bug or
                                issue with any of my projects, I still want to
                                help! You can either email me with your
                                findings, or join Originoid's discord at{" "}
                                <Link
                                    href="https://discord.gg/originoid"
                                    target="_blank"
                                    className="text-foreground hover:text-muted-foreground/50 transition-all duration-150 cursor-pointer"
                                >
                                    discord.gg/originoid
                                </Link>
                                .
                            </p>
                            <p>
                                When you reach out, a little context goes a long
                                way. I truly appreciate messages that are clear,
                                thoughtful, and give me a sense of what you're
                                hoping to discuss. The more details you can
                                share, the better I can understand and help you.
                            </p>
                            <p>
                                Being transparent, I receive quite a few
                                messages, which means my responses might not be
                                instantaneous. Please know this isn't personal —
                                I read and value every message and normally
                                reply within 24 hours. If you don't hear back
                                after a while, a gentle nudge is always welcome.
                            </p>
                        </div>
                    </section>
                    <ContactContainer />
                </section>
            </div>
        </div>
    );
}
