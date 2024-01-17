import { About } from "~/components/main/about";
import { LanyardProfile } from "~/components/main/lanyard/profile";
import { FollowGrid } from "~/components/socials/follow-grid";
import type { Metadata } from "next";
import { JoinWaitlist } from "~/components/main/waitlist";
// import { ProjectContainer } from "~/components/project/project-container";

export const metadata: Metadata = {
    title: "home • dromzeh.dev",
    metadataBase: new URL("https://dromzeh.dev"),
};

export default function Home() {
    return (
        <>
            <JoinWaitlist />
            <div className="flex flex-col gap-10">
                <LanyardProfile />
                <div className="flex flex-col md:flex-row md:justify-between gap-10">
                    <FollowGrid />
                    <div className="sm:order-2 order-1">
                        <div className="flex flex-col gap-4">
                            <About />
                            {/* <ProjectContainer /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
