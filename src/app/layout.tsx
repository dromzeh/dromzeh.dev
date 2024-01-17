import type { Metadata } from "next";
import "./globals.css";
// import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { CommandMenu } from "~/components/navigation/command";

const geist = GeistSans;

export const metadata: Metadata = {
    title: "dromzeh.dev",
    metadataBase: new URL("https://dromzeh.dev"),
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({
    children,
}: RootLayoutProps): React.ReactElement {
    return (
        <html lang="en">
            <body
                className={`${geist.className} min-h-screen flex items-center justify-center`}
            >
                <main className="max-w-4xl mx-auto">
                    <section className="px-6 sm:px-8 lg:px-10 py-16">
                        <CommandMenu />
                        {children}
                    </section>
                </main>
            </body>
        </html>
    );
}
