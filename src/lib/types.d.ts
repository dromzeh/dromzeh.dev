import type { MDXRemoteSerializeResult } from "next-mdx-remote";

export type Post = {
    title: string;
    slug: string;
    date: string;
    description: string;
    views: number | null;
    body?: string;
    content?: string;
    serializedContent?: MDXRemoteSerializeResult;
};

export type Tool = {
    title: string;
    description: string;
    link: string;
};
