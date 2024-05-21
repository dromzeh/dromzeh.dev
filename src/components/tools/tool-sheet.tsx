"use client";
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
import type { Tool } from "~/lib/types";

export function ToolSheet(tool: Tool) {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <div className="text-foreground group-hover:text-muted-foreground/50 transition-colors duration-150 hover:cursor-pointer">
                    Details
                </div>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-xl">
                    <DrawerHeader>
                        <DrawerTitle className="text-foreground">
                            {tool.title}
                        </DrawerTitle>
                        <DrawerDescription className="mt-2 text-left">
                            {tool.description.split("\n").map((line, i) => (
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
                        <Link href={`/tools/${tool.link}`}>
                            <Button variant={"secondary"} className="w-full">
                                Go to Tool
                            </Button>
                        </Link>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
