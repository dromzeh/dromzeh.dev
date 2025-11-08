import { MDXImage } from "~/components/post/mdx-img";
import { MDXComponents } from "mdx/types";
import NextImage from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeProps {
    children?: React.ReactNode;
    className?: string;
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

function CodeBlock({ children, className }: CodeProps) {
    const match = /language-(\w+)/.exec(className || "");
    const language = match ? match[1] : "text";
    const code = String(children).replace(/\n$/, "");

    return (
        <SyntaxHighlighter
            style={nord}
            language={language}
            PreTag="div"
            className="rounded-sm text-sm max-w-full !bg-[#161617] !mt-4 !mb-4"
            showLineNumbers={true}
            customStyle={{
                margin: 0,
                padding: "1rem",
                fontSize: "0.875rem",
                background: "#161617",
            }}
        >
            {code}
        </SyntaxHighlighter>
    );
}

function Pre({ children, className }: CodeProps) {
    if (className?.startsWith("language-")) {
        return <CodeBlock className={className}>{children}</CodeBlock>;
    }

    const childElement = children as React.ReactElement<CodeProps>;
    if (childElement?.props?.className?.startsWith("language-")) {
        return <CodeBlock {...childElement.props} />;
    }

    if (typeof children === "string") {
        return <CodeBlock>{children}</CodeBlock>;
    }

    return (
        <pre className="bg-muted rounded-sm p-4 overflow-x-auto text-sm max-w-full">
            {children}
        </pre>
    );
}

function CodeElement({
    children,
    className,
    ...rest
}: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>) {
    if (className?.startsWith("language-")) {
        return <CodeBlock className={className}>{children}</CodeBlock>;
    }

    return inlineCode({ children, className, ...rest });
}

export const mdxComponentsClient: MDXComponents = {
    pre: Pre,
    strong: Strong,
    i: Italic,
    img: MDXImage as any,
    Image: NextImage as any,
    a: CustomLink,
    Video: Video,
    h1: h1,
    h2: h2,
    h3: h3,
    code: CodeElement,
    li: ListItem,
    p: Text,
    ul: Ul,
};
