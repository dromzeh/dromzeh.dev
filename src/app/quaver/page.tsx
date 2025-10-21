import { Metadata } from "next";
import Link from "next/link";
import { QuaverDisplay } from "~/components/quaver/quaver-display";

export const metadata: Metadata = {
    title: "quaver stats • dromzeh.dev",
    description: "quaver stats",
};

export default function Quaver() {
    return (
        <div className="min-h-screen max-w-xl mx-auto px-6 py-16">
            <div className="space-y-8">
                <header className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-8">
                        <Link
                            href="/"
                            className="hover:text-foreground transition-colors duration-200"
                        >
                            ←
                        </Link>
                    </div>
                </header>

                <QuaverDisplay />
            </div>
        </div>
    );
}
