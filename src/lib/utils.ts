import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatPostDate(
    dateString: string,
    format: "short" | "long" = "short",
): string {
    const [day, month, year] = dateString.split("-");
    const date = new Date(`${month}-${day}-${year}`);

    if (format === "long") {
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        });
    }

    return date.toLocaleDateString("en-GB", {
        month: "short",
        year: "numeric",
    });
}
