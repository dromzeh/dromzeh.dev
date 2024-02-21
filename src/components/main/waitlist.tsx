import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function JoinWaitlist() {
    return (
        <>
            <Link href="https://waitlist.wanderer.moe/" target="_blank">
                <button className="relative inline-flex h-7 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2 focus:ring-offset-neutral-50 group">
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E5B8F4_0%,#810CA8_50%,#E5B8F4_100%)] group-hover:animate-[spin_1s_linear_infinite] transition-colors" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-neutral-950 px-4 py-1 text-sm font-medium text-foreground backdrop-blur-3xl">
                        join wanderer.moe&apos;s update waitlist
                        <ArrowRight
                            size={16}
                            className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-150"
                        />
                    </span>
                </button>
            </Link>
        </>
    );
}
