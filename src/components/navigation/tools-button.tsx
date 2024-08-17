"use client";

import { Button } from "../ui/button";
import { Wrench } from "lucide-react";

export function ToolsButton() {
    return (
        <Button
            variant="ghost"
            className="rounded-full"
            onClick={() => {
                window.location.href = "/tools";
            }}
        >
            <Wrench size={16} />
            {/* <span className="ml-2">Tools</span> */}
        </Button>
    );
}
