import type { Metadata } from "next";
import "./globals.css";
// import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

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
                <main className="max-w-5xl mx-auto">
                    <section className="px-4 sm:px-6 lg:px-8 py-16">
                        {children}
                    </section>
                </main>
            </body>
        </html>
    );
}
