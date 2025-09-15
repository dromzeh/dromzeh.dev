import { MetadataRoute } from "next";
import { getPosts } from "~/lib/posts/fetch-posts";

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

const posts = await getPosts();

export default function sitemap(): MetadataRoute.Sitemap {
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
