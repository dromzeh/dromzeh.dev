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
                try {
                    navigator.clipboard.writeText(code);
                    toast.success("Copied to clipboard");
                } catch (err) {
                    toast.error("Failed to copy to clipboard");
                }
            }}
        >
            <Copy size={16} />
        </Button>
    );
}
