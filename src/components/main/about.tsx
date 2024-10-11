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
            <h2 className="text-lg mb-2 font-bold text-foreground">About Me</h2>
            <div className="space-y-2 text-muted-foreground">
                <p>
                    Hi, I'm Marcel — a {<Age />}-year-old Software Engineer. Currently based in South West England, set to relocate to London next year.
                </p>
                <p>
                    At 15, I created <Link href="https://wanderer.moe/" target="_blank" className="text-foreground hover:text-muted-foreground/50 transition-all duration-150 cursor-pointer">wanderer.moe</Link>, an open-source platform for game assets that now serves thousands of daily users.
                </p>
                <p>
                    I'm the Founder & CEO of Originoid LTD, developing <Link href="https://originoid.co" target="_blank"  className="text-foreground hover:text-muted-foreground/50 transition-all duration-150 cursor-pointer">Originoid</Link> — a platform where creators can showcase their artwork, edits, and original characters.
                </p>
                <p>
                    Beyond my primary focus, I enjoy video editing and connecting with like-minded individuals who share my interests.
                </p>
            </div>
        </section>
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
