"use client";

import { Button } from "~/components/ui/button";
import { ArrowRight } from "lucide-react";

export function GoBackButton() {
    return (
        <Button
            className="group flex flex-row space-x-1 items-center"
            variant={"secondary"}
            onClick={() => {
                window.history.back();
            }}
        >
            Go Back{" "}
            <ArrowRight
                className="ml-1 group-hover:translate-x-1 transition-transform"
                size={16}
            />
        </Button>
    );
}
