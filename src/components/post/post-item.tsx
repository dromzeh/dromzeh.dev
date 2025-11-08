"use client";

import Link from "next/link";
import { Post } from "~/lib/types";
import { usePostModalStore } from "~/stores/post-modal-store";
import { formatPostDate } from "~/lib/utils";

export function PostItem(post: Post) {
    const openPost = usePostModalStore((state) => state.openPost);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        openPost(post.slug);
    };

    return (
        <div className="flex flex-row text-sm space-x-2 items-center justify-between group">
            <Link
                href={"/posts/" + post.slug}
                onClick={handleClick}
                className="group block"
            >
                <h3 className="text-foreground group-hover:text-muted transition-colors duration-150 hover:cursor-pointer">
                    {post.title}
                </h3>
            </Link>
            <div className="flex-grow max-sm:hidden border-t border-muted"></div>
            <p className="max-sm:hidden">{formatPostDate(post.date)}</p>
        </div>
    );
}
