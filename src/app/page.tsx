import { About } from "~/components/main/about";
import type { Metadata } from "next";
import { WorkContainer } from "~/components/work/work-container";
import { PostContainer } from "~/components/post/post-container";
import { ContactContainer } from "~/components/main/contact";

export const metadata: Metadata = {
    title: "home • dromzeh.dev",
    description: "marcel's personal site",
    metadataBase: new URL("https://dromzeh.dev"),
};

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center max-w-lg mx-auto px-6 py-16">
            <main className="space-y-12">
                <ContactContainer />
                <About />
                <WorkContainer />
                <PostContainer />
            </main>
        </div>
    );
}
