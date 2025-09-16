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
                    Hi - I&apos;m Marcel, currently {<Age />} years-old.
                </div>
                <p className="text-muted-foreground leading-relaxed">
                    I do pretty much everything and anything. There's a{" "}
                    <Link
                        href="/faq"
                        className="text-foreground hover:text-muted transition-all duration-150 decoration-muted-foreground/30 hover:decoration-muted-foreground/50"
                    >
                        FAQ
                    </Link>{" "}
                    you can read that explains further alongside my contact
                    policy.
                </p>
                <div className="text-muted-foreground leading-relaxed flex flex-row flex-wrap gap-2">
                    <LanyardProfile />
                </div>
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
