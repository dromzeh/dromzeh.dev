import { About } from "~/components/main/about";
import { LanyardProfile } from "~/components/main/lanyard";
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
        <div className="min-h-screen max-w-2xl mx-auto px-6 py-16">
            <div className="max-w-lg">
                <main className="space-y-12">
                    <ContactContainer />
                    <LanyardProfile />
                    <About />
                    <WorkContainer />
                    <PostContainer />
                </main>
            </div>
        </div>
    );
}
