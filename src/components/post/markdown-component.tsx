import { MDXImage } from "~/components/post/mdx-img";
import { MDXComponents } from "mdx/types";
import NextImage from "next/image";
import { Code } from "bright";
import { CopyCodeToClipboard } from "./code-utils";
import mellowTheme from "./mellow.json";
Code.theme = mellowTheme;

function CodeBlock(
    props: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLPreElement
    >,
) {
    const { children, ...rest } = props;
    return (
        <div className="relative">
            <div
                className={`absolute top-0 right-0 translate-y-5 translate-x-[-4px]`}
            >
                <CopyCodeToClipboard
                    code={(children as any).props.children as string}
                />
            </div>
            <Code
                {...rest}
                lineNumbers
                className={`rounded-sm max-w-[calc(100vw-2rem)] overflow-x-auto text-sm normal-case`}
            >
                {children}
            </Code>
        </div>
    );
}

function Ul(
    props: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLUListElement>,
        HTMLUListElement
    >,
) {
    const { children, ...rest } = props;
    return (
        <ul {...rest} className="list-disc text-sm">
            {children}
        </ul>
    );
}

function Strong(
    props: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
    >,
) {
    const { children, ...rest } = props;
    return (
        <b {...rest} className="text-foreground font-semibold text-sm">
            {children}
        </b>
    );
}

function Italic(
    props: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
    >,
) {
    const { children, ...rest } = props;
    return (
        <i {...rest} className="italic">
            {children}
        </i>
    );
}

function CustomLink(
    props: React.DetailedHTMLProps<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
    >,
) {
    const { children, href } = props;
    return (
        <a
            className="text-foreground hover:text-muted transition duration-150"
            href={href ?? ""}
        >
            {children}
        </a>
    );
}

function Text(
    props: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLParagraphElement>,
        HTMLParagraphElement
    >,
) {
    const { children, ...rest } = props;
    return (
        <p {...rest} className="text-sm my-3">
            {children}
        </p>
    );
}

function Video(
    props: React.DetailedHTMLProps<
        React.VideoHTMLAttributes<HTMLVideoElement>,
        HTMLVideoElement
    >,
) {
    const { children, ...rest } = props;
    return (
        <video {...rest} className="rounded-sm" controls preload="metadata">
            {children}
        </video>
    );
}

function h1(
    props: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
    >,
) {
    const { children, ...rest } = props;
    return (
        <h1
            {...rest}
            className="text-foreground text-sm font-semibold mt-8 py-3"
        >
            # {children}
        </h1>
    );
}

function h2(
    props: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
    >,
) {
    const { children, ...rest } = props;
    return (
        <h2
            {...rest}
            className="text-foreground text-sm font-semibold mt-8 py-3"
        >
            ## {children}
        </h2>
    );
}

function h3(
    props: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
    >,
) {
    const { children, ...rest } = props;
    return (
        <h3
            {...rest}
            className="text-foreground text-sm font-semibold mt-8 py-3"
        >
            ### {children}
        </h3>
    );
}

function inlineCode(
    props: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
    >,
) {
    const { children, ...rest } = props;
    return (
        <code
            {...rest}
            className="bg-background text-foreground code rounded-sm px-1 normal-case"
        >
            {children}
        </code>
    );
}

function ListItem(
    props: React.DetailedHTMLProps<
        React.LiHTMLAttributes<HTMLLIElement>,
        HTMLLIElement
    >,
) {
    const { children, ...rest } = props;
    return (
        <li
            {...rest}
            className="ml-4 list-disc my-2 text-sm marker:text-foreground"
        >
            {children}
        </li>
    );
}

export const mdxComponents: MDXComponents = {
    pre: CodeBlock,
    strong: Strong,
    i: Italic,
    img: MDXImage as any,
    Image: NextImage as any,
    a: CustomLink,
    Video: Video,
    h1: h1,
    h2: h2,
    h3: h3,
    code: inlineCode,
    li: ListItem,
    p: Text,
    ul: Ul,
};
