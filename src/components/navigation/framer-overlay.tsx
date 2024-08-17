"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export function FramerOverlay({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={pathname}
        >
            {children}
        </motion.div>
    );
}
