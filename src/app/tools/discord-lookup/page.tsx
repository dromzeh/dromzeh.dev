import Link from "next/link";
import { LookupClient } from "../../../components/discord-lookup/client";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Discord Lookup • dromzeh.dev",
    description:
        "Get nicely formatted data about a Discord user from their User ID.",
    metadataBase: new URL("https://dromzeh.dev"),
};

export default function Page() {
    return (
        <div className="min-h-screen max-w-xl mx-auto flex items-center justify-center">
            <div className="py-12 px-4 text-sm">
                <div className="flex flex-col space-y-6">
                    <div className="flex flex-row space-x-2 items-center justify-between group">
                        <span className="text-neutral-500">
                            <Link
                                href="/"
                                className="text-white hover:text-neutral-500 transition-colors duration-150"
                            >
                                Go Back
                            </Link>
                        </span>
                        <div className="flex-grow border-t border-dotted border-gray-400"></div>
                        <span className="text-neutral-400">Discord Lookup</span>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <h1 className="text-white text-lg font-semibold">
                            Discord Lookup Tool
                        </h1>
                        <p className="text-neutral-300">
                            Get nicely formatted data about a Discord user from
                            their User ID. Uses{" "}
                            <Link
                                href="https://git.dromzeh.dev/discord-lookup"
                                className="text-white hover:text-neutral-500 transition-colors duration-75"
                            >
                                discord-lookup
                            </Link>{" "}
                            API hosted on Cloudflare Workers.
                        </p>
                    </div>
                </div>
                <LookupClient />
            </div>
        </div>
    );
}
