"use client";
import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "../ui/canvas-rev";
import {
    DiscordLogoIcon,
    GitHubLogoIcon,
    TwitterLogoIcon,
} from "@radix-ui/react-icons";
import { IconProps } from "@radix-ui/react-icons/dist/types";
import { CrossIcon } from "lucide-react";
import Link from "next/link";

export function SocialsReveal() {
    return (
        <>
            <div className="flex flex-row items-center justify-center w-full gap-4 mx-auto">
                <Link
                    href="https://discord.com/users/492731761680187403"
                    className="w-full"
                >
                    <SocialsCard title="Discord" icon={<DiscordLogoIcon />}>
                        <CanvasRevealEffect
                            animationSpeed={5.1}
                            containerClassName="bg-background"
                            colors={[[75, 92, 196]]}
                        />
                    </SocialsCard>
                </Link>
                <Link href="https://twitter.com/dromzeh" className="w-full">
                    <SocialsCard title="Twitter" icon={<TwitterLogoIcon />}>
                        <CanvasRevealEffect
                            animationSpeed={5.1}
                            containerClassName="bg-background"
                            colors={[[125, 211, 252]]}
                        />
                    </SocialsCard>
                </Link>
                <Link href="https://github.com/dromzeh" className="w-full">
                    <SocialsCard title="GitHub" icon={<GitHubLogoIcon />}>
                        <CanvasRevealEffect
                            animationSpeed={5.1}
                            containerClassName="bg-background"
                            colors={[
                                [125, 211, 252],
                                [255, 255, 255],
                            ]}
                        />
                    </SocialsCard>
                </Link>
            </div>
        </>
    );
}

const SocialsCard = ({
    title,
    icon,
    children,
}: {
    title: string;
    icon: React.ReactElement<IconProps>;
    children?: React.ReactNode;
}) => {
    const [hovered, setHovered] = React.useState(false);
    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2]  max-w-sm w-full mx-auto p-4  h-[25px] relative"
        >
            {/* i have no clue why, but when i remove this, i get a nonsensical error(?) */}
            <CrossIcon className="hidden absolute h-1 w-1  dark:text-white text-black" />
            <CrossIcon className="hidden absolute h-1 w-1  dark:text-white text-black" />
            <CrossIcon className="hidden absolute h-1 w-1 dark:text-white text-black" />
            <CrossIcon className="hidden absolute h-1 w-1 dark:text-white text-black" />

            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-full w-full absolute inset-0"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative z-20">
                <div className="text-center transition duration-200 w-full mx-auto flex items-center justify-center">
                    {React.cloneElement(icon, {
                        className: "h-4 w-4 dark:text-white text-black",
                    })}
                </div>
            </div>
        </div>
    );
};
