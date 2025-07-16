import getPosts, { getPost } from "~/lib/posts/fetch-posts";
import { PostBody } from "~/components/post/body";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateStaticParams() {
    const posts = await getPosts();

    return posts.map((post) => ({
        id: post!.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = params;
    const post = await getPost(id);

    if (!post) return notFound();

    return {
        title: `${post.title.toLowerCase()} • dromzeh.dev`,
        description: post.description.toLowerCase(),
        metadataBase: new URL("https://dromzeh.dev"),
    };
}

type Props = {
    params: { id: string };
};

async function PostPage({ params: { id } }: Props) {
    const post = await getPost(id);

    if (!post) return notFound();

    const [day, month, year] = post.date.split("-");

    const formattedDate = new Date(
        `${month}-${day}-${year}`,
    ).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="min-h-screen max-w-2xl mx-auto px-6 py-16">
            <div className="max-w-lg">
                {/* Header with back navigation */}
                <header className="mb-12">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-8">
                        <Link
                            href="/"
                            className="hover:text-foreground transition-colors duration-200"
                        >
                            ← back
                        </Link>
                        <time className="text-muted-foreground/60">
                            {formattedDate}
                        </time>
                    </div>

                    <h1 className="text-lg font-medium text-foreground leading-tight">
                        {post.title}
                    </h1>
                </header>

                {/* Post Content */}
                <article className="prose prose-neutral dark:prose-invert max-w-none">
                    <PostBody>{post.body!}</PostBody>
                </article>
            </div>
        </div>
    );
}

export default PostPage;
