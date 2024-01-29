import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "~/components/ui/sheet";
import type { Work } from "~/types/project";
import { GithubIcon, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";

function WorkSheetTagBadge(props: { tag: string }) {
    return <Badge variant="secondary">{props.tag}</Badge>;
}

export function WorkSheet(props: Work): React.ReactElement {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className="text-white group-hover:text-neutral-500 transition-colors duration-150 hover:cursor-pointer">
                    Read More
                </div>
            </SheetTrigger>
            <SheetContent
                side="bottom"
                className="flex items-center justify-center"
            >
                <div className="text-center">
                    <SheetHeader>
                        <SheetTitle className="text-left">
                            {props.name}
                        </SheetTitle>
                        <SheetDescription className="text-left max-w-xl">
                            <div className="flex flex-col space-y-2">
                                {props.description
                                    .split("\n")
                                    .map((line, i) => (
                                        <p key={i}>{line}</p>
                                    ))}
                            </div>
                        </SheetDescription>
                    </SheetHeader>
                    <div className="flex flex-row mt-8 space-x-2 justify-center">
                        {props.projecturl && (
                            <Button size="sm" variant="secondary">
                                <Link
                                    href={props.projecturl}
                                    target="_blank"
                                    className="flex flex-row gap-2"
                                >
                                    <LinkIcon size={16} /> View Project
                                </Link>
                            </Button>
                        )}
                        {props.giturl && (
                            <Button size="sm" variant="secondary">
                                <Link
                                    href={props.giturl}
                                    target="_blank"
                                    className="flex flex-row gap-2"
                                >
                                    <GithubIcon size={16} /> View Source
                                </Link>
                            </Button>
                        )}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
