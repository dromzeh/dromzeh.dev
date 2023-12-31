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
    React.useEffect(() => {
        console.log(
            "%c 👋 plz leave a ⭐ on github, thx: https://git.dromzeh.dev/dromzeh.dev",
            "font-size: 12px; font-family: monospace; background: black; display: inline-block; color: white; padding: 12px; border-radius: 4px;",
        );
    }, []);

    return (
        <div>
            <h2 className="text-neutral-100 mb-2">About</h2>
            <div className="flex flex-col space-y-2">
                <p>
                    Hey, I&apos;m Marcel - <Age /> year old full-stack developer
                    focused within infrastructure, serverless computing and
                    backend development. My first experience with programming
                    was making Shell Scripts to automate my Minecraft Servers
                    then making websites at <AgeTooltip />.
                </p>
                <p>
                    I&apos;m now the creator of{" "}
                    <Link
                        href="https://wanderer.moe/"
                        target="_blank"
                        className="text-neutral-100 hover:text-neutral-500 transition-all duration-150"
                    >
                        wanderer.moe
                    </Link>{" "}
                    - a site that hosts thousands of assets from various games
                    with thousands of daily users. We&apos;re also{" "}
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
                    All projects I&apos;ve worked on &{" "}
                    <Link
                        href="https://github.com/dromzeh/dromzeh.dev"
                        target="_blank"
                        className="text-neutral-100 hover:text-neutral-500 transition-all duration-150"
                    >
                        this site
                    </Link>{" "}
                    are available
                    {` `}
                    <Link
                        href="https://github.com/dromzeh"
                        target="_blank"
                        className="text-neutral-100 hover:text-neutral-500 transition-all duration-150"
                    >
                        on my GitHub
                    </Link>{" "}
                    to view.
                </p>
                <p>
                    Feel free to contact me for any reason, even if it&apos;s
                    just to chat - expect asynchronous responses. You can
                    contact me through{" "}
                    <Link
                        href="https://discord.com/users/492731761680187403"
                        target="_blank"
                        className="text-neutral-100 hover:text-neutral-500 transition-all duration-150"
                    >
                        {" "}
                        Discord
                    </Link>{" "}
                    or send an email to
                    <Link
                        href="mailto:marcel@dromzeh.dev"
                        target="_blank"
                        className="text-neutral-100 hover:text-neutral-500 transition-all duration-150"
                    >
                        {" "}
                        marcel@dromzeh.dev
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
}

export function AgeTooltip() {
    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className="text-neutral-100 hover:text-neutral-500 transition-all duration-150 cursor-pointer">
                        6 years old
                    </span>
                </TooltipTrigger>
                <TooltipContent className="text-center max-w-[250px]">
                    <p>
                        Seriously, I did everything (including self hosting) on
                        an unused hand-me-down laptop running Windows 7.
                    </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
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
