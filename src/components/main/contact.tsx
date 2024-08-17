import Link from "next/link";
import { Button } from "../ui/button";
import { GithubIcon, Mail } from "lucide-react";
import { DiscordLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";

export function ContactContainer() {
    return (
        <div>
            <h2 className="text-foreground font-bold text-lg mb-2">Contact</h2>
            <div className="flex flex-row gap-2 flex-wrap">
                <ContactItem
                    icon={<Mail size={16} />}
                    title="Email"
                    url="mailto:marcel@dromzeh.dev"
                />
                <ContactItem
                    icon={<GithubIcon size={16} />}
                    title="GitHub"
                    url="https://github.com/dromzeh"
                />
                <ContactItem
                    icon={<DiscordLogoIcon className="size-4" />}
                    title="Discord"
                    url="https://discord.com/users/1081004946872352958"
                />
                <ContactItem
                    icon={<TwitterLogoIcon className="size-4" />}
                    title="Twitter (X)"
                    url="https://x.com/dromzeh"
                />
            </div>
        </div>
    );
}

interface ContactItemProps {
    icon: React.ReactNode;
    title: string;
    url: string;
    props?: React.ComponentProps<typeof Button>;
}

function ContactItem({ icon, title, url, props = {} }: ContactItemProps) {
    return (
        <Link href={url} target="_blank" rel="noopener noreferrer">
            <Button
                variant="outline"
                className="rounded-xl flex flex-row gap-2 items-center"
                {...props}
            >
                {icon}
                {title}
            </Button>
        </Link>
    );
}
