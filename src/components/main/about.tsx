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
                        I'm Marcel (a.k.a. "dromzeh"), a {<Age />}-year-old
                        developer and former systems engineer.
                    </p>
                    <p>
                        My interests lie in low-level programming, reverse
                        engineering, hardware, and systems work.
                    </p>
                </div>
            </section>

            <section>
                <h2 className="text-muted-foreground/60 mb-2">Current Focus</h2>
                <div className="space-y-2 text-muted-foreground">
                    <p>
                        Full-time Founder/CEO @{" "}
                        <Link
                            href="https://originoid.ltd"
                            target="_blank"
                            className="text-foreground hover:text-muted-foreground/50 transition-all duration-150 cursor-pointer"
                        >
                            Originoid LTD
                        </Link>
                        , working on{" "}
                        <Link
                            href="https://originoid.co"
                            target="_blank"
                            className="text-foreground hover:text-muted-foreground/50 transition-all duration-150 cursor-pointer"
                        >
                            originoid.co
                        </Link>{" "}
                        and{" "}
                        <Link
                            href="https://wanderer.moe"
                            target="_blank"
                            className="text-foreground hover:text-muted-foreground/50 transition-all duration-150 cursor-pointer"
                        >
                            wanderer.moe
                        </Link>
                        .
                    </p>
                    <p>
                        Currently working primarily in web development, learning
                        mobile development and web animations alongside.
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
