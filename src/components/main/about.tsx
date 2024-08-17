"use client";

import Link from "next/link";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "~/components/ui/tooltip";
import dayjs from "dayjs";
import { Button } from "~/components/ui/button";
import * as React from "react";
import {
    DiscordLogoIcon,
    GitHubLogoIcon,
    TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { Mail } from "lucide-react";

export function About() {
    const [quaverGlobalRank, setQuaverGlobalRank] =
        React.useState<number>(2300);
    const [quaverCountryRank, setQuaverCountryRank] =
        React.useState<number>(100);
    const [quaverBestScore, setQuaverBestScore] = React.useState<number>(38);

    React.useEffect(() => {
        const fetchUserData = () => {
            const userRequest = fetch(
                "https://api.quavergame.com/v2/user/52916",
            ).then((response) => response.json());
            const scoresRequest = fetch(
                "https://api.quavergame.com/v2/user/52916/scores/1/best",
            ).then((response) => response.json());

            Promise.all([userRequest, scoresRequest])
                .then(([userData, scoresData]) => {
                    setQuaverGlobalRank(userData.user.stats_keys4.ranks.global);
                    setQuaverCountryRank(
                        userData.user.stats_keys4.ranks.country,
                    );
                    setQuaverBestScore(scoresData.scores[0].performance_rating);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        };

        fetchUserData();
    }, []);

    return (
        <div>
            <h2 className="text-foreground font-bold text-lg mb-2">About Me</h2>
            <div className="flex flex-col space-y-2">
                <p>
                    Hey, I'm Marcel - a <Age />
                    -year-old Software Engineer with a focus on infrastructure
                    and backend development. Currently based in the UK.
                </p>
                <p>
                    Best known for creating{" "}
                    <Link
                        href="https://wanderer.moe/"
                        target="_blank"
                        className="text-foreground hover:text-muted-foreground/50 transition-all duration-150"
                    >
                        wanderer.moe
                    </Link>{" "}
                    at 15, an open-source platform hosting game assets, serving
                    thousands of daily users.
                </p>
                <p>
                    I'm also the founder of{" "}
                    <Link
                        href="https://x.com/dromzeh/status/1771212786736992411"
                        target="_blank"
                        className="text-foreground hover:text-muted-foreground/50 transition-all duration-150"
                    >
                        Originoid
                    </Link>{" "}
                    - an OC & Work sharing platform, launching on iOS, Android,
                    and Web in Q3 2024.
                </p>
                <p>
                    Alongside, I play 4K VSRGs, predominantly{" "}
                    <Link
                        href="https://quavergame.com/user/52916"
                        className="text-foreground hover:text-muted-foreground/50 transition-all duration-150"
                        target="_blank"
                    >
                        Quaver
                    </Link>
                    . Currently ranked #{quaverGlobalRank} global and #
                    {quaverCountryRank} country, with a best score of{" "}
                    {Math.round(quaverBestScore).toFixed(2)} PR.
                </p>
            </div>
        </div>
    );
}

const birthTimestamp = 1156118401000;
const initialAge = 17;

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
