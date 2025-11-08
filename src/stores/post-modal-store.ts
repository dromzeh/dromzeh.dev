import { create } from "zustand";
import type { Post } from "~/lib/types";

interface PostModalStore {
    currentPost: Post | null;
    posts: Post[];
    openPost: (slug: string) => void;
    closePost: () => void;
    setPosts: (posts: Post[]) => void;
}

export const usePostModalStore = create<PostModalStore>((set, get) => ({
    currentPost: null,
    posts: [],
    openPost: (slug) => {
        const post = get().posts.find((p) => p.slug === slug);
        if (post) {
            set({ currentPost: post });
            window.history.pushState({}, "", `/#${slug}`);
        }
    },
    closePost: () => {
        set({ currentPost: null });
        window.history.pushState({}, "", "/");
    },
    setPosts: (posts) => set({ posts }),
}));
