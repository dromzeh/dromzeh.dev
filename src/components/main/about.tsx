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
        <div>
            <h2 className="text-foreground font-semibold text-lg mb-2">
                About
            </h2>
            <div className="flex flex-col space-y-2">
                <p>
                    Hey - I'm Marcel, an <Age />
                    -year-old Software Engineer specializing in Infrastructure,
                    DevOps & Backend development.
                </p>
                <p>
                    Mostly known from creating{" "}
                    <Link
                        href="https://wanderer.moe/"
                        target="_blank"
                        className="text-foreground hover:text-muted-foreground/50 transition-all duration-150"
                    >
                        wanderer.moe
                    </Link>
                    , an open-source platform for game assets at 15, now serving
                    thousands of daily users.
                </p>
                <p>
                    Currently, I'm the Founder & CEO of Originoid LTD, going all
                    in making{" "}
                    <Link
                        href="https://originoid.co"
                        target="_blank"
                        className="text-foreground hover:text-muted-foreground/50 transition-all duration-150"
                    >
                        Originoid
                    </Link>
                    , a platform for creators to post their artwork and original
                    characters.
                </p>
            </div>
        </div>
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
