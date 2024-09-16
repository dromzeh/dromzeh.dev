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
        <div className="min-h-screen max-w-xl mx-auto flex items-center justify-center">
            <div className="py-24 px-6 text-sm">
                <section className="flex flex-col space-y-8">
                    <LanyardProfile />
                    <ContactContainer />
                    <About />
                    <PostContainer />
                    <WorkContainer />
                </section>
            </div>
        </div>
    );
}
