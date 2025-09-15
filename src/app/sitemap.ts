import { MetadataRoute } from "next";
import { getPosts } from "~/lib/posts/fetch-posts";

export const dynamic = "force-static";
export const revalidate = false;

const defaults: {
    changeFrequency?:
        | "weekly"
        | "always"
        | "hourly"
        | "daily"
        | "monthly"
        | "yearly"
        | "never";
    lastModified?: Date;
} = {
    changeFrequency: "weekly",
    lastModified: new Date(),
};

const baseUrl = "https://dromzeh.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getPosts();

    const postRoutes = posts.map((post) => ({
        ...defaults,
        url: `${baseUrl}/posts/${post!.slug}`,
        priority: 0.8,
    }));

    return [
        {
            ...defaults,
            url: baseUrl,
            priority: 1,
        },
        ...postRoutes,
    ];
}
