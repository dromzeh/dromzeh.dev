import Link from "next/link";
import { Post } from "~/lib/types";

export function PostItem(post: Post) {
    const [day, month, year] = post.date.split("-");
    const formattedDate = new Date(
        `${month}-${day}-${year}`,
    ).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="flex flex-row space-x-2 items-center justify-between group w-full">
            <Link href={"/posts/" + post.slug}>
                <h3 className="text-foreground group-hover:text-muted-foreground/50 transition-colors duration-150 hover:cursor-pointer">
                    {post.title}
                </h3>
            </Link>
            <div className="flex-grow border-t border-dotted border-gray-400"></div>
            <p>{formattedDate}</p>
        </div>
    );
}
