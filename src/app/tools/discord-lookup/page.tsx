import { Metadata } from "next";
import Link from "next/link";
import { DiscordLookupClient } from "~/components/tools/discord-lookup-client";

export const metadata: Metadata = {
    title: "discord user lookup tool • dromzeh.dev",
    description: "look up information about discord users from their user id",
    metadataBase: new URL("https://dromzeh.dev"),
};

export default function DiscordLookupPage() {
    return (
        <div className="min-h-screen max-w-xl mx-auto flex items-center justify-center">
            <div className="py-24 px-6 text-sm">
                <div className="flex flex-col space-y-6">
                    <div className="flex flex-row space-x-2 items-center justify-between group">
                        <span className="text-neutral-500">
                            <Link
                                href="/"
                                className="text-foreground group-hover:text-muted transition-colors duration-150 hover:cursor-pointer"
                            >
                                Home
                            </Link>
                        </span>
                        <div className="flex-grow border-t border-dotted border-gray-400"></div>
                        <span className="text-muted-foreground">
                            Discord Lookup
                        </span>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <h1 className="text-foreground font-bold text-lg mb-2">
                            Discord Lookup
                        </h1>
                        <div className="flex flex-col space-y-2">
                            <p>
                                Lookup information about any Discord user by
                                their User ID. Useful for finding out
                                information about a user without having to add
                                them as a friend or be in the same server as
                                them.
                            </p>
                            <p>
                                The source code is available on{" "}
                                <Link
                                    href="https://github.com/dromzeh/dromzeh.dev"
                                    target="_blank"
                                    className="text-foreground hover:text-muted transition-all duration-150"
                                >
                                    GitHub
                                </Link>
                                .
                            </p>
                        </div>
                    </div>
                    <section className="flex flex-col space-y-4 mt-2">
                        <DiscordLookupClient />
                    </section>
                </div>
            </div>
        </div>
    );
}
