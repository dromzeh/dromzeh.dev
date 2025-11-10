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
import { LanyardProfile } from "./lanyard";

export function About() {
    return (
        <section>
            <div className="space-y-3 text-sm">
                <div className="text-muted-foreground leading-relaxed">
                    I'm Marcel, {<Age />}-year-old developer.
                </div>
                <p className="text-muted-foreground leading-relaxed">
                    Known for{" "}
                    <Link
                        className="text-foreground hover:text-muted transition-all duration-150 decoration-muted-foreground/30 hover:decoration-muted-foreground/50"
                        href="https://skowt.cc"
                        target="_blank"
                    >
                        skowt.cc
                    </Link>
                    , now building{" "}
                    <Link
                        className="text-foreground hover:text-muted transition-all duration-150 decoration-muted-foreground/30 hover:decoration-muted-foreground/50"
                        href="https://originoid.co"
                        target="_blank"
                    >
                        Originoid
                    </Link>
                    , a human-first content sharing platform. I dabble in
                    hardware/electronics and reverse engineering. Currently
                    learning more about how machines think.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                    More available in the{" "}
                    <Link
                        href="/faq"
                        className="text-foreground hover:text-muted transition-all duration-150 decoration-muted-foreground/30 hover:decoration-muted-foreground/50"
                    >
                        FAQ
                    </Link>
                    .
                </p>
            </div>
        </section>
    );
}

const birthTimestamp = 1156114801000;
const initialAge = 19;

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
                    <span className="text-foreground hover:text-muted transition-colors duration-200 cursor-pointer">
                        {age.toFixed(fixedValue)}
                    </span>
                </TooltipTrigger>
                <TooltipContent className="text-center max-w-[250px]">
                    <span>{age.toFixed(12)}</span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
