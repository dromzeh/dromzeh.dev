"use client";

import { Button } from "../ui/button";
import { House } from "lucide-react";

export function HomeButton() {
    return (
        <Button
            variant="ghost"
            className="rounded-full"
            onClick={() => {
                window.location.href = "/";
            }}
        >
            <House size={16} />
            {/* <span className="ml-2">Home</span> */}
        </Button>
    );
}
