"use client";

// sticky navbar

import { ThemeToggle } from "./theme-toggle";
import { CommandMenu } from "./command";
// import { HomeButton } from "./home-button";
import { WorkButton } from "./work-button";
import { ToolsButton } from "./tools-button";
import { PostsButton } from "./posts-button";

export function NavigationBar() {
    return (
        <div className="fixed inset-x-0 bottom-0 flex justify-center z-50 translate-y-[-20px]">
            <div className="max-w-md flex items-center border rounded-full bg-background shadow-md">
                <div className="flex flex-row items-center">
                    <WorkButton />
                    {/* <HomeButton /> */}
                    <ToolsButton />
                    <CommandMenu />
                    <PostsButton />
                    <ThemeToggle />
                </div>
            </div>
        </div>
    );
}
