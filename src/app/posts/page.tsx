import { Metadata } from "next";
import { PostContainer } from "~/components/post/post-container";

export const metadata: Metadata = {
    title: "posts • dromzeh.dev",
    metadataBase: new URL("https://dromzeh.dev"),
};

export default function PostsPage() {
    return (
        <div className="min-h-screen max-w-xl mx-auto flex items-center justify-center">
            <div className="py-12 px-4 text-sm">
                <section className="flex flex-col space-y-6 min-w-full">
                    <PostContainer />
                </section>
            </div>
        </div>
    );
}
