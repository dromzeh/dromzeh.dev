import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const MONTHS_SHORT = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];
const MONTHS_LONG = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

export function formatPostDate(
    dateString: string,
    format: "short" | "long" = "short",
): string {
    const [day, month, year] = dateString.split("-");
    const monthIndex = parseInt(month, 10) - 1;

    if (format === "long") {
        return `${day} ${MONTHS_LONG[monthIndex]} ${year}`;
    }

    return `${MONTHS_SHORT[monthIndex]} ${year}`;
}
