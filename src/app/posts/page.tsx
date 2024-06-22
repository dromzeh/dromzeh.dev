import { Metadata } from "next";
import Link from "next/link";
import { PostContainer } from "~/components/post/post-container";

export const metadata: Metadata = {
    title: "posts • dromzeh.dev",
    description: "posts list",
    metadataBase: new URL("https://dromzeh.dev"),
};

export default function PostsPage() {
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
                        <span className="text-muted-foreground">Posts</span>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <h1 className="text-foreground font-bold text-lg mb-2">
                            Posts
                        </h1>
                        <div className="flex flex-col space-y-2">
                            <p>
                                A list of posts I&apos;ve written. Posts that
                                are outdated or no longer relevant to my current
                                interests are removed.
                            </p>
                        </div>
                    </div>
                    <section className="flex flex-col space-y-4 mt-2">
                        <div className="flex flex-col space-y-2">
                            <PostContainer />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
