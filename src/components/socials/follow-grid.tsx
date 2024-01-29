import Link from "next/link";
import Image from "next/image";
import { MailIcon } from "lucide-react";

export function FollowGrid() {
    return (
        <div className="">
            <h2 className="text-neutral-100 mb-2">Links </h2>
            <div className="flex flex-col space-y-2">
                <Link
                    href="https://github.com/dromzeh"
                    target="_blank"
                    className="flex flex-row space-x-2 items-center group"
                >
                    <Image
                        src="/github.svg"
                        alt="github"
                        width={16}
                        height={16}
                    />
                    <p className="text-neutral-100 group-hover:text-neutral-500 transition-colors duration-150">
                        @dromzeh
                    </p>
                </Link>
                <Link
                    href="https://discord.com/users/492731761680187403"
                    target="_blank"
                    className="flex flex-row space-x-2 items-center group"
                >
                    <Image
                        src="/discord.svg"
                        alt="discord"
                        width={16}
                        height={16}
                    />
                    <p className="text-neutral-100 group-hover:text-neutral-500 transition-colors duration-150">
                        @dromzeh
                    </p>
                </Link>

                <Link
                    href="mailto:marcel@dromzeh.dev"
                    target="_blank"
                    className="flex flex-row space-x-2 items-center group"
                >
                    <MailIcon size={16} />
                    <p className="text-neutral-100 group-hover:text-neutral-500 transition-colors duration-150">
                        marcel@dromzeh.dev
                    </p>
                </Link>
                {/* it'll always be twitter in my heart */}
                <Link
                    href="https://twitter.com/dromzeh"
                    target="_blank"
                    className="flex flex-row space-x-2 items-center group"
                >
                    <Image
                        src="/x_dark.svg"
                        alt="twitter"
                        width={16}
                        height={16}
                    />
                    <p className="text-neutral-100 group-hover:text-neutral-500 transition-colors duration-150">
                        @dromzeh
                    </p>
                </Link>
                <Link
                    href="https://open.spotify.com/user/fnn3ngyzaq9wir8jyevt96zrf"
                    target="_blank"
                    className="flex flex-row space-x-2 items-center group"
                >
                    <Image
                        src="/spotify.svg"
                        alt="spotify"
                        width={16}
                        height={16}
                    />
                    <p className="text-neutral-100 group-hover:text-neutral-500 transition-colors duration-150">
                        marcel
                    </p>
                </Link>

                <Link
                    href="https://www.tiktok.com/@dromzeh"
                    target="_blank"
                    className="flex flex-row space-x-2 items-center group"
                >
                    <Image
                        src="/tiktok.svg"
                        alt="tiktok"
                        width={16}
                        height={16}
                    />
                    <p className="text-neutral-100 group-hover:text-neutral-500 transition-colors duration-150">
                        @dromzeh
                    </p>
                </Link>
            </div>
        </div>
    );
}
