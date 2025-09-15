import Link from "next/link";
import { Post } from "~/lib/types";

export function PostItem(post: Post) {
    const [day, month, year] = post.date.split("-");
    const formattedDate = new Date(
        `${month}-${day}-${year}`,
    ).toLocaleDateString("en-GB", {
        month: "short",
        year: "numeric",
    });

    return (
        <div className="flex flex-row text-sm space-x-2 items-center justify-between group">
            <Link href={"/posts/" + post.slug} className="group block">
                <h3 className="text-foreground group-hover:text-muted transition-colors duration-150 hover:cursor-pointer">
                    {post.title}
                </h3>
            </Link>
            <div className="flex-grow max-sm:hidden border-t border-dotted border-gray-400"></div>
            <p className="max-sm:hidden">{formattedDate}</p>
        </div>
    );
}
