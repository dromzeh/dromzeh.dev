import { MDXImage } from "~/components/post/mdx-img";
import { MDXComponents } from "mdx/types";
import NextImage from "next/image";
import { Code } from "bright";
import { CopyCodeToClipboard } from "./code";

function CodeBlock(
    props: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLPreElement
    >,
) {
    const { children, ...rest } = props;
    return (
        <div className="relative">
            <div className="absolute top-0 right-0 translate-y-5 translate-x-[-4px]">
                <CopyCodeToClipboard
                    code={
                        (children as React.ReactElement).props
                            .children as string
                    }
                />
            </div>
            <Code
                {...rest}
                theme="material-darker"
                lineNumbers
                className="rounded-sm"
            >
                {children}
            </Code>
        </div>
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
        <b {...rest} className="text-foreground font-semibold">
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
            className="text-foreground hover:text-muted-foreground/50 transition duration-150"
            href={href ?? ""}
        >
            {children}
        </a>
    );
}

export const mdxComponents: MDXComponents = {
    pre: CodeBlock,
    strong: Strong,
    i: Italic,
    img: MDXImage as any,
    Image: NextImage as any,
    a: CustomLink,
};
