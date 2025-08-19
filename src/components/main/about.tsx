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
        <section>
            <div className="space-y-3 text-sm">
                <p className="text-muted-foreground leading-relaxed">
                    Hey! I'm Marcel, a {<Age />}-year-old self-taught developer.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                    My interests lie in low-level programming, reverse
                    engineering, hardware, and systems work.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                    Currently full-time at my own company{" "}
                    <Link
                        href="https://originoid.ltd"
                        target="_blank"
                        className="text-foreground hover:text-muted-foreground/70 transition-colors duration-200"
                    >
                        Originoid LTD
                    </Link>
                    , known for{" "}
                    <Link
                        href="https://originoid.co"
                        target="_blank"
                        className="text-foreground hover:text-muted-foreground/70 transition-colors duration-200"
                    >
                        originoid.co
                    </Link>{" "}
                    and{" "}
                    <Link
                        href="https://skowt.cc"
                        target="_blank"
                        className="text-foreground hover:text-muted-foreground/70 transition-colors duration-200"
                    >
                        skowt.cc
                    </Link>{" "}
                    (prev. called wanderer.moe).
                </p>
                <p>
                    Also working on a side project for the past couple months
                    called{" "}
                    <Link
                        href="https://festivalenhanced.com"
                        target="_blank"
                        className="text-foreground hover:text-muted-foreground/70 transition-colors duration-200"
                    >
                        Festival Enhanced
                    </Link>
                    .
                </p>
                <p>
                    Further information about me can be found on my{" "}
                    <Link
                        href="/about-extended"
                        className="text-foreground hover:text-muted-foreground/70 transition-colors duration-200"
                    >
                        extended about me
                    </Link>
                    .
                </p>
            </div>
        </section>
    );
}

const birthTimestamp = 1156114801000;
const initialAge = 18;

interface AgeProps {
    fixedValue?: number;
}

export function Age({ fixedValue = 5 }: AgeProps) {
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
                    <span className="text-foreground hover:text-muted-foreground/70 transition-colors duration-200 cursor-pointer">
                        {age.toFixed(fixedValue)}
                    </span>
                </TooltipTrigger>
                <TooltipContent className="text-center max-w-[250px]">
                    <p>{age.toFixed(12)}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
