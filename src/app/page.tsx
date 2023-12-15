import { About } from "~/components/main/about";
import { LanyardProfile } from "~/components/main/lanyard/profile";
import { FollowGrid } from "~/components/socials/follow-grid";
import { Badge } from "~/components/ui/badge";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
    return (
        <>
            <JoinWaitlist />
            <div className="flex flex-col gap-10">
                <LanyardProfile />
                <div className="flex flex-col md:flex-row md:justify-between gap-10">
                    <About />
                    <FollowGrid />
                </div>
            </div>
        </>
    );
}

function JoinWaitlist() {
    return (
        <Link href="https://waitlist.wanderer.moe/" target="_blank">
            <Badge
                className="mb-8 font-normal text-sm group border-amber-500 text-amber-500 hover:bg-amber-500  hover:text-white transition-all duration-150"
                variant={"outline"}
            >
                join wanderer.moe&apos;s update waitlist (beta access)
                <ArrowRight
                    size={16}
                    className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-150"
                />
            </Badge>
        </Link>
    );
}
