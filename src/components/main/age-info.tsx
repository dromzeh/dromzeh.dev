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
                        {typeof age === "number" ? age.toFixed(4) : age}
                    </span>
                </TooltipTrigger>
                <TooltipContent className="text-center max-w-[250px]">
                    <p>{typeof age === "number" ? age.toFixed(12) : age}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
