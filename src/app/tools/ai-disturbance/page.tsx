import { Metadata } from "next";
import Link from "next/link";
import { AIDisturbanceClient } from "~/components/ai-disturbance/client";

export const metadata: Metadata = {
    title: "ai 'disturbance' filter overlay tool • dromzeh.dev",
    description: "apply a 'disturbance' filter overlay to any image",
    metadataBase: new URL("https://dromzeh.dev"),
};

export default function AIDisturbancePage() {
    return (
        <div className="min-h-screen max-w-xl mx-auto flex items-center justify-center">
            <div className="py-12 px-4 text-sm">
                <div className="flex flex-col space-y-6">
                    <div className="flex flex-row space-x-2 items-center justify-between group">
                        <span className="text-neutral-500">
                            <Link
                                href="/tools"
                                className="text-foreground group-hover:text-muted-foreground/50 transition-colors duration-150 hover:cursor-pointer"
                            >
                                Tools
                            </Link>
                        </span>
                        <div className="flex-grow border-t border-dotted border-gray-400"></div>
                        <span className="text-muted-foreground">
                            AI &quot;Disturbance&quot; Filter
                        </span>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <h1 className="text-foreground font-bold text-lg mb-2">
                            AI &quot;Disturbance&quot; Filter
                        </h1>
                        <div className="flex flex-col space-y-2">
                            <p>
                                Apply a &quot;disturbance&quot; filter to
                                overlay any image. The level of disturbance can
                                be adjusted using the slider.
                            </p>
                            <p>
                                The image processing is handled locally on the
                                client. The source code is available on{" "}
                                <Link
                                    href="https://github.com/dromzeh/dromzeh.dev"
                                    target="_blank"
                                    className="text-foreground hover:text-muted-foreground/50 transition-all duration-150"
                                >
                                    GitHub
                                </Link>
                                .
                            </p>
                        </div>
                    </div>
                    <section className="flex flex-col space-y-4 mt-2">
                        <AIDisturbanceClient />
                    </section>
                </div>
            </div>
        </div>
    );
}
