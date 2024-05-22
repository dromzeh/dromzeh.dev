import Link from "next/link";
import { Metadata } from "next";
import { Tool } from "~/lib/types";
import { ToolItem } from "~/components/tools/tool-item";

export const metadata: Metadata = {
    title: "tools • dromzeh.dev",
    description: "list of somewhat useful tools for public use",
    metadataBase: new URL("https://dromzeh.dev"),
};

export default function PostsPage() {
    const tools: Tool[] = [
        {
            title: "AI 'Disturbance' Filter",
            description: `Apply a "disturbance" filter to overlay any image. The level of disturbance can be adjusted using the slider`,
            link: "ai-disturbance",
        },
        {
            title: "Discord Lookup",
            description: `Lookup information about any Discord user by their User ID. Useful for finding out information about a user without having to add them as a friend or be in the same server as them.`,
            link: "discord-lookup",
        },
    ];

    return (
        <div className="min-h-screen max-w-xl mx-auto flex items-center justify-center">
            <div className="py-12 px-4 text-sm">
                <div className="flex flex-col space-y-6">
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
                        <span className="text-muted-foreground">Tools</span>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <h1 className="text-foreground font-bold text-lg mb-2">
                            Tools
                        </h1>
                        <div className="flex flex-col space-y-2">
                            <p>
                                A list of tools I&apos;ve built for public use
                                on this site. The source code for each tool is
                                available on{" "}
                                <Link
                                    href="https://git.dromzeh.dev/dromzeh.dev"
                                    className="text-foreground hover:text-muted-foreground/50 transition-colors duration-150 hover:cursor-pointer"
                                >
                                    GitHub
                                </Link>
                                .
                            </p>
                        </div>
                    </div>
                    <section className="flex flex-col space-y-4 mt-2">
                        <div className="flex flex-col space-y-2">
                            {tools?.map((tool: Tool) => (
                                <ToolItem key={tool.title} {...tool} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
