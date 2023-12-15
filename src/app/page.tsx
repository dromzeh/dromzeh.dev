import { About } from "~/components/main/about";
import { LanyardProfile } from "~/components/main/lanyard/profile";
import { FollowGrid } from "~/components/socials/follow-grid";

export default function Home() {
    return (
        <div className="flex flex-col gap-10">
            <LanyardProfile />
            <div className="flex flex-col md:flex-row md:justify-between gap-10">
                <About />
                <FollowGrid />
            </div>
        </div>
    );
}
