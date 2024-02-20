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
        <div className="">
            <h2 className="text-neutral-100 font-bold text-lg mb-2">
                About Me
            </h2>
            <div className="flex flex-col space-y-2">
                <p>
                    Hey! I&apos;m Marcel (/mɑɹˈsɛl/) - <Age /> year old Software
                    Engineer specializing in infrastructure, serverless
                    computing, and backend development.
                </p>
                <p>
                    I started programming at <AgeTooltip />. All projects I
                    maintain are available on my{" "}
                    <Link
                        href="https://github.com/dromzeh"
                        target="_blank"
                        className="text-neutral-100 hover:text-neutral-500 transition-all duration-150"
                    >
                        GitHub
                    </Link>
                    .
                </p>
                <p>
                    Mostly known for creating{" "}
                    <Link
                        href="https://wanderer.moe/"
                        target="_blank"
                        className="text-neutral-100 hover:text-neutral-500 transition-all duration-150"
                    >
                        wanderer.moe
                    </Link>
                    , an{" "}
                    <Link
                        href="https://git.wanderer.moe/"
                        target="_blank"
                        className="text-neutral-100 hover:text-neutral-500 transition-all duration-150"
                    >
                        open-source
                    </Link>{" "}
                    website hosting game assets with thousands of daily users.
                    Currently developing an OC Sharing platform alongside,
                    expected to release Q1-Q2 2024.
                </p>
                <p>
                    Contact me through{" "}
                    <Link
                        href="https://discord.com/users/492731761680187403"
                        target="_blank"
                        className="text-neutral-100 hover:text-neutral-500 transition-all duration-150"
                    >
                        Discord
                    </Link>{" "}
                    or email{" "}
                    <Link
                        href="mailto:marcel@dromzeh.dev"
                        target="_blank"
                        className="text-neutral-100 hover:text-neutral-500 transition-all duration-150"
                    >
                        marcel@dromzeh.dev
                    </Link>
                    . Expect responses to be prioritized based on importance.{" "}
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
                        Seriously, I did everything on an unused hand-me-down
                        laptop running Windows 7.
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
                <TooltipContent className="text-center max-w-[250px]">
                    <p>{age.toFixed(12)}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
