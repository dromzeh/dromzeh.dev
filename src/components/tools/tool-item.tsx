"use client";
import Link from "next/link";

import { Tool } from "~/lib/types";
import { ToolSheet } from "./tool-sheet";

export function ToolItem(tool: Tool) {
    return (
        <div className="flex flex-row space-x-2 items-center justify-between group w-full">
            <Link href={"/tools/" + tool.link}>
                <h3 className="text-foreground group-hover:text-muted-foreground/50 transition-colors duration-150 hover:cursor-pointer">
                    {tool.title}
                </h3>
            </Link>
            <div className="flex-grow border-t border-dotted border-gray-400"></div>
            <ToolSheet {...tool} />
        </div>
    );
}
