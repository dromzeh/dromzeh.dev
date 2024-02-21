import { About } from "~/components/main/about";
import { LanyardProfile } from "~/components/main/lanyard/profile";
import type { Metadata } from "next";
import { MoreInfo } from "~/components/main/more-info";
import { WorkContainer } from "~/components/work/work-container";

export const metadata: Metadata = {
    title: "home • dromzeh.dev",
    metadataBase: new URL("https://dromzeh.dev"),
};

export default function Home() {
    return (
        <div className="min-h-screen max-w-xl mx-auto flex items-center justify-center">
            <div className="py-12 px-4 text-sm">
                <section className="flex flex-col space-y-6">
                    <LanyardProfile />
                    <About />
                    <WorkContainer />
                    <MoreInfo />
                </section>
            </div>
        </div>
    );
}
