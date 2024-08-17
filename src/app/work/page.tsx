import { WorkContainer } from "~/components/work/work-container";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "work • dromzeh.dev",
    description: "list of my work",
    metadataBase: new URL("https://dromzeh.dev"),
};

export default function WorkPage() {
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
                        <span className="text-muted-foreground">Work</span>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <h1 className="text-foreground font-bold text-lg mb-2">
                            Work
                        </h1>
                        <div className="flex flex-col space-y-2">
                            <p>
                                A list of things I&apos;ve worked or are
                                currently working on. Anything old or
                                unmaintained is removed.
                            </p>
                        </div>
                    </div>
                    <section className="flex flex-col space-y-4 mt-2">
                        <WorkContainer />
                    </section>
                </div>
            </div>
        </div>
    );
}
