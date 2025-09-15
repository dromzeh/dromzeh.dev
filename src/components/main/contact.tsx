"use client";

// IMPORTANT:
// this was not made by me but based from @vaunblu's work on X/Twitter with a few modifications
// if you are using this code, please credit them and not me
// https://x.com/vaunblu

import {
    AnimatePresence,
    motion,
    MotionConfig,
    Variants,
    type Transition,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const transition: Transition = { type: "spring", bounce: 0.3, duration: 0.3 };

type ContextType = {
    status: string;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
};

const Context = React.createContext<ContextType>({
    status: "",
    setStatus: () => null,
});

const socials = [
    {
        id: "x",
        href: "https://x.com/dromzeh",
        label: "Twitter/X",
        icon: "./socials/x.png",
    },
    {
        id: "github",
        href: "https://github.com/dromzeh",
        label: "GitHub",
        icon: "./socials/github.png",
    },
    {
        id: "discord",
        href: "https://discord.com/users/492731761680187403",
        label: "Discord",
        icon: "./socials/discord.png",
    },
    {
        id: "tiktok",
        href: "https://tiktok.com/@dromzeh",
        label: "TikTok",
        icon: "./socials/tiktok.png",
    },
];

function SocialsContent() {
    const ctx = React.useContext<ContextType>(Context);

    const icon: Variants = {
        hidden: {
            opacity: 0,
            y: 15,
            translateX: "-50%",
            filter: "blur(3px)",
            rotate: "0deg",
        },
        show: (custom: { rotateRight: boolean }) => ({
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            rotate: custom?.rotateRight ? "6deg" : "-3deg",
        }),
        exit: {
            opacity: 0,
            y: 15,
            filter: "blur(3px)",
            rotate: "0deg",
            transition: { ...transition, duration: 0.5 },
        },
    };

    return (
        <div className="flex justify-between items-center gap-3 text-sm text-muted-foreground">
            {socials.map((social, index) => (
                <React.Fragment key={social.id}>
                    <Link
                        href={social.href}
                        target="_blank"
                        // target={
                        //     social.target !== undefined
                        //         ? social.target
                        //         : "_blank"
                        // }
                        onMouseOver={() => ctx.setStatus(social.id)}
                        onMouseOut={() => ctx.setStatus("idle")}
                        className="relative text-foreground hover:text-muted transition-colors duration-200"
                    >
                        <AnimatePresence>
                            {ctx.status === social.id && (
                                <motion.div
                                    variants={icon}
                                    custom={{ rotateRight: index % 2 === 0 }}
                                    initial="hidden"
                                    animate="show"
                                    exit="exit"
                                    className={`size-8 absolute -top-10 left-1/2 -translate-x-1/2 overflow-hidden rounded-lg bg-black shadow-mixed ${
                                        social.id === "x" ? "p-1.5" : ""
                                    } ${index % 2 === 0 ? "rotate-3" : "-rotate-3"}`}
                                >
                                    <Image
                                        src={social.icon}
                                        width={32}
                                        height={32}
                                        alt={social.label}
                                        className="w-full h-full object-cover"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <span>{social.label}</span>
                    </Link>
                    {index < socials.length - 1 && (
                        <span className="text-muted-foreground/40">•</span>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}

export function ContactContainer() {
    const [status, setStatus] = React.useState("idle");

    React.useEffect(() => {
        function handleEscape(e: KeyboardEvent) {
            if (e.key === "Escape") {
                setStatus("idle");
            }
        }
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [setStatus]);

    return (
        <Context.Provider value={{ status, setStatus }}>
            <MotionConfig transition={transition}>
                <SocialsContent />
            </MotionConfig>
        </Context.Provider>
    );
}
