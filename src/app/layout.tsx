import type { Metadata } from "next";
import "./globals.css";
// import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { CommandMenu } from "~/components/navigation/command";
import { Toaster } from "~/components/ui/sonner";
// import { HydrationOverlay } from "@builder.io/react-hydration-overlay";
import { ThemeProvider } from "~/components/navigation/theme-provider";
import { ThemeToggle } from "~/components/navigation/theme-toggle";
import { FramerOverlay } from "~/components/navigation/framer-overlay";
import { NavigationBar } from "~/components/navigation/navigation-bar";

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
                className={`${geist.className} h-full scroll-smooth antialiased pl-[calc(100vw-100%)]`}
            >
                <ThemeProvider attribute="class" defaultTheme="dark">
                    <NavigationBar />
                    <div>
                        <FramerOverlay>{children}</FramerOverlay>
                    </div>
                    <Toaster />
                    <div
                        className="fixed top-[-10px] z-40 h-10 w-screen bg-background opacity-70 blur backdrop-blur-lg "
                        aria-hidden
                    />
                    <div
                        className="fixed bottom-[-10px] z-40 h-10 w-screen bg-background opacity-70 blur backdrop-blur-lg"
                        aria-hidden
                    />
                </ThemeProvider>
            </body>
        </html>
    );
}
