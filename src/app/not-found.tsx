import { Button } from "~/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="text-center">
            <div className="max-w-lg">
                <h1 className="text-7xl font-bold">404</h1>
                <p className="text-xl">
                    The page you&apos;re looking for doesn&apos;t exist or has
                    been moved elsewhere.
                </p>
                <Link href="/">
                    <Button className="mt-4">Go Back Home</Button>
                </Link>
            </div>
        </div>
    );
}
