"use client";

import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";

export function PostsButton() {
    return (
        <Button
            variant="ghost"
            className="rounded-full"
            onClick={() => {
                window.location.href = "/posts";
            }}
        >
            <Bookmark size={16} />
            {/* <span className="ml-2">Posts</span> */}
        </Button>
    );
}
