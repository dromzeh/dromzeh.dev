"use client";

import { useEffect } from "react";
import { usePostModalStore } from "~/stores/post-modal-store";
import type { Post } from "~/lib/types";

export function PostModalSync({ posts }: { posts: Post[] }) {
    useEffect(() => {
        usePostModalStore.getState().setPosts(posts);
    }, [posts]);

    useEffect(() => {
        const syncHashToStore = () => {
            const hash = window.location.hash.slice(1);

            if (hash) {
                const post = posts.find((p) => p.slug === hash);
                if (post) {
                    usePostModalStore.setState({ currentPost: post });
                }
            } else {
                usePostModalStore.setState({ currentPost: null });
            }
        };

        syncHashToStore();
        window.addEventListener("hashchange", syncHashToStore);
        window.addEventListener("popstate", syncHashToStore);

        return () => {
            window.removeEventListener("hashchange", syncHashToStore);
            window.removeEventListener("popstate", syncHashToStore);
        };
    }, [posts]);

    return null;
}
