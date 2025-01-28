"use client";
import Link from "next/link";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "~/components/ui/tooltip";
import dayjs from "dayjs";
import * as React from "react";

export function About() {
    return (
        <>
            <section>
                <h2 className="text-muted-foreground/60 mb-2">About Me</h2>
                <div className="space-y-2 text-muted-foreground">
                    <p>
                        I'm Marcel, {<Age />}-year-old Software Engineer
                        planning on relocating to Central London this year.
                    </p>
                    <p>Beyond technical work, I play 4K and 5K VSRGs.</p>
                </div>
            </section>
            <section>
                <h2 className="text-muted-foreground/60 mb-2">Current Focus</h2>
                <div className="space-y-2 text-muted-foreground">
                    <p>
                        CEO of{" "}
                        <Link
                            href="https://originoid.ltd"
                            target="_blank"
                            className="text-foreground hover:text-muted-foreground/50 transition-all duration-150 cursor-pointer"
                        >
                            Originoid LTD
                        </Link>
                        , developing{" "}
                        <Link
                            href="https://wanderer.moe"
                            target="_blank"
                            className="text-foreground hover:text-muted-foreground/50 transition-all duration-150 cursor-pointer"
                        >
                            wanderer.moe
                        </Link>{" "}
                        and{" "}
                        <Link
                            href="https://originoid.co"
                            target="_blank"
                            className="text-foreground hover:text-muted-foreground/50 transition-all duration-150 cursor-pointer"
                        >
                            originoid.co
                        </Link>
                        .
                    </p>
                    <p>
                        Currently learning App Development and Web Animations.
                    </p>
                </div>
            </section>
        </>
    );
}

const birthTimestamp = 1156114801000;
const initialAge = 18;

export function Age() {
    const [age, setAge] = React.useState<number>(initialAge);
    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setAge(dayjs().diff(birthTimestamp, "year", true));
        }, 50);
        return () => clearInterval(intervalId);
    }, []);
    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className="text-foreground hover:text-muted-foreground/50 transition-all duration-150 cursor-pointer">
                        {age.toFixed(4)}
                    </span>
                </TooltipTrigger>
                <TooltipContent className="text-center max-w-[250px]">
                    <p>{age.toFixed(12)}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
