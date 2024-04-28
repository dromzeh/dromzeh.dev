export type Post = {
    title: string;
    slug: string;
    date: string;
    description: string;
    views: number | null;
    body?: string;
    content?: string;
};
