"use client";
import { Button } from "../ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

export function CopyCodeToClipboard({ code }: { code: string }) {
    return (
        <Button
            size="sm"
            variant="link"
            onClick={() => {
                navigator.clipboard.writeText(code);
                toast.success("Copied to clipboard");
            }}
        >
            <Copy size={16} />
        </Button>
    );
}
