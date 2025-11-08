import { About } from "~/components/main/about";
import type { Metadata } from "next";
import { PostContainer } from "~/components/post/post-container";
import { ContactContainer } from "~/components/main/contact";
import { MusicStatus } from "~/components/main/music-status";

export const metadata: Metadata = {
    title: "home • dromzeh.dev",
    description: "marcel's personal site",
    metadataBase: new URL("https://dromzeh.dev"),
};

export default function Home() {
    return (
        <div className="h-screen px-6 md:px-12 lg:px-24 py-16">
            <main className="h-full w-full grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-32 lg:gap-48">
                <div className="h-full flex flex-col justify-between">
                    <div className="max-w-md">
                        <ContactContainer />
                    </div>
                    <div className="space-y-12 max-w-md">
                        <About />
                    </div>
                </div>
                <div className="h-full flex flex-col md:justify-between items-end gap-16 md:gap-0">
                    <MusicStatus />
                    <div className="md:max-w-md md:w-full w-[300px]">
                        <PostContainer />
                    </div>
                </div>
            </main>
        </div>
    );
}
