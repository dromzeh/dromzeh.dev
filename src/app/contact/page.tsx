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
                        <h2 className="text-foreground text-sm font-medium mb-4">
                            Contact Guidelines
                        </h2>
                        <div className="space-y-3 text-muted-foreground">
                            <p>
                                Feel free to reach out to me using any of the
                                contact methods listed below.
                            </p>
                            <p>
                                I won't reply to anything regarding project
                                updates/timelines & personal, sensitive,
                                controversial or potentially triggering
                                subjects.
                            </p>
                            <p>
                                For issues considered urgent or problems with
                                any of my projects, email me directly with your
                                findings; include "URGENT" in the subject.
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
                                urgency due to the amount of messages I receive
                                & the fact I'm currently working 24/7 on getting
                                Originoid out as soon as possible.
                            </p>
                        </div>
                    </section>

                    <ContactContainer />
                </section>
            </div>
        </div>
    );
}
