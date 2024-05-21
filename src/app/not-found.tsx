import { WavyBackground } from "~/components/background";
import { GoBackButton } from "~/components/navigation/go-back-button";

export default function NotFound() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center text-foreground">
                <div className="max-w-lg space-y-4 flex flex-col">
                    <h1 className="text-7xl font-bold">404</h1>
                    <p className="text-lg">
                        The page you&apos;re looking for doesn&apos;t exist or
                        has been moved elsewhere.
                    </p>
                    <div className="flex justify-center">
                        <GoBackButton />
                    </div>
                </div>
            </div>
        </div>
    );
}
