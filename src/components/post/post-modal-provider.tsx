"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MDXRemote } from "next-mdx-remote";
import { mdxComponentsClient } from "./markdown-component-client";
import { usePostModalStore } from "~/stores/post-modal-store";
import { formatPostDate } from "~/lib/utils";

export { usePostModalStore as usePostModal };

export function PostModalRenderer() {
    const currentPost = usePostModalStore((state) => state.currentPost);
    const closePost = usePostModalStore((state) => state.closePost);

    useEffect(() => {
        function handleEscape(e: KeyboardEvent) {
            if (e.key === "Escape" && currentPost) {
                closePost();
            }
        }

        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [currentPost, closePost]);

    return (
        <AnimatePresence>
            {currentPost && (
                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        mass: 0.8,
                    }}
                    className="fixed inset-0 z-50 bg-background"
                >
                    <div
                        className="h-full overflow-y-auto px-6 md:px-12 lg:px-24 py-16 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/30"
                        style={{
                            scrollbarWidth: "thin",
                            scrollbarColor:
                                "rgba(255, 255, 255, 0.2) transparent",
                        }}
                    >
                        <div className="max-w-lg mx-auto">
                            <header className="mb-12">
                                <div className="flex items-center justify-between text-sm text-muted-foreground mb-8">
                                    <button
                                        onClick={closePost}
                                        className="text-muted-foreground/60 hover:text-foreground transition-colors duration-200"
                                    >
                                        ←
                                    </button>
                                    <time className="text-muted-foreground/60">
                                        {formatPostDate(
                                            currentPost.date,
                                            "long",
                                        )}
                                    </time>
                                </div>
                                <h1 className="text-lg font-medium text-foreground leading-tight">
                                    {currentPost.title}
                                </h1>
                            </header>

                            <article className="prose prose-neutral dark:prose-invert max-w-none">
                                {currentPost.serializedContent ? (
                                    <MDXRemote
                                        {...currentPost.serializedContent}
                                        components={mdxComponentsClient}
                                    />
                                ) : (
                                    <p className="text-muted-foreground">
                                        No content available
                                    </p>
                                )}
                            </article>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
