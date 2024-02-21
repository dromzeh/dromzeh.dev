import { GithubIcon, Package } from "lucide-react";
import * as React from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "~/components/ui/drawer";
import type { Work } from "~/types/project";

export function WorkSheet(props: Work) {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <div className="text-foreground group-hover:text-muted-foreground/50 transition-colors duration-150 hover:cursor-pointer">
                    Read More
                </div>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-xl">
                    <DrawerHeader>
                        <DrawerTitle className="text-foreground">
                            {props.name}
                        </DrawerTitle>
                        <DrawerDescription className="mt-2 text-left">
                            {props.description.split("\n").map((line, i) => (
                                <p key={i} className="mb-2">
                                    {line}
                                </p>
                            ))}
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <div className="flex items-center justify-center space-x-2"></div>
                    </div>
                    <DrawerFooter>
                        {props.projecturl && (
                            <Link href={props.projecturl}>
                                <Button
                                    variant={"secondary"}
                                    className="w-full"
                                >
                                    <Package className="h-4 w-4 mr-2 inline" />
                                    View Project
                                </Button>
                            </Link>
                        )}
                        {props.giturl && (
                            <Link href={props.giturl}>
                                <Button
                                    className="w-full"
                                    variant={"secondary"}
                                >
                                    <GithubIcon className="h-4 w-4 mr-2 inline" />
                                    View Source
                                </Button>
                            </Link>
                        )}
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
