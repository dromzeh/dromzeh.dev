import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";

const geist = GeistSans;

export const metadata: Metadata = {
    title: "home • dromzeh.dev",
    metadataBase: new URL("https://dromzeh.dev"),
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`${geist.className} min-h-screen flex items-center justify-center`}
            >
                <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    {children}
                </main>
            </body>
        </html>
    );
}
