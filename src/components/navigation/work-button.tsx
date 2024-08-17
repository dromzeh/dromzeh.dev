"use client";

import { Button } from "../ui/button";
import { Layers } from "lucide-react";

export function WorkButton() {
    return (
        <Button
            variant="ghost"
            className="rounded-full"
            onClick={() => {
                window.location.href = "/work";
            }}
        >
            <Layers size={16} />
            {/* <span className="ml-2">Work</span> */}
        </Button>
    );
}
