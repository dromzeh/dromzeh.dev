import Link from "next/link";
import { Post } from "~/lib/types";
import { PostSheet } from "./post-sheet";

export function PostItem(post: Post) {
    return (
        <div className="flex flex-row space-x-2 items-center justify-between group w-full">
            <Link href={"/posts/" + post.slug}>
                <h3 className="text-foreground group-hover:text-muted-foreground/50 transition-colors duration-150 hover:cursor-pointer">
                    {post.title}
                </h3>
            </Link>
            <div className="flex-grow border-t border-dotted border-gray-400"></div>
            <PostSheet {...post} />
        </div>
    );
}
