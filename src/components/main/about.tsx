"use client";
import Link from "next/link";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "../ui/tooltip";
import dayjs from "dayjs";
import * as React from "react";

const ageDateTimestamp = 1156118401000;
const fallBackAge = 17;

export function About() {
    return (
        <div>
            <h2 className="text-neutral-100 mb-2">About</h2>
            <div className="flex flex-col space-y-2">
                <p>
                    👋 Hey! I&apos;m Marcel, a <Age /> year-old full-stack
                    developer currently residing in the UK. My primary focus is
                    within serverless computing, infrastructure and backend
                    development.
                </p>
                <p>
                    I&apos;m mostly known for creating{" "}
                    <Link
                        href="https://wanderer.moe/"
                        target="_blank"
                        className="text-neutral-100 hover:text-neutral-500 transition-all duration-150"
                    >
                        wanderer.moe
                    </Link>{" "}
                    - a site that hosts thousands of assets from various games
                    with thousands of unique daily active users (~300K MAU).
                    It&apos;s mostly{" "}
                    <Link
                        href="https://git.wanderer.moe/"
                        target="_blank"
                        className="text-neutral-100 hover:text-neutral-500 transition-all duration-150"
                    >
                        open-source
                    </Link>
                    .
                </p>
                <p>
                    All of my projects & contributions,{" "}
                    <Link
                        href="https://github.com/dromzeh/dromzeh.dev"
                        target="_blank"
                        className="text-neutral-100 hover:text-neutral-500 transition-all duration-150"
                    >
                        including this site
                    </Link>{" "}
                    are open-source and
                    {` `}
                    <Link
                        href="https://github.com/dromzeh"
                        target="_blank"
                        className="text-neutral-100 hover:text-neutral-500 transition-all duration-150"
                    >
                        viewable on GitHub
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
}

export function Age() {
    const [age, setAge] = React.useState<number>(fallBackAge);

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setAge(dayjs().diff(ageDateTimestamp, "year", true));
        }, 50);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className="text-neutral-100 hover:text-neutral-500 transition-all duration-150 cursor-pointer">
                        {age.toFixed(4)}
                    </span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{age.toFixed(12)}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
