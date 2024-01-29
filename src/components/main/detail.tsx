import { ChevronRight } from "lucide-react";

export function MoreInfo() {
    return (
        <div>
            <h2 className="text-neutral-100 font-bold text-lg mb-2">
                More Info
            </h2>
            <ul className="pl-4 list-disc">
                <MoreInfoItem question="Timezone" answer="Europe/London" />
                <MoreInfoItem
                    question="Languages"
                    answer="TS, Rust, Python, Svelte."
                />
                <MoreInfoItem
                    question="Frameworks"
                    answer="Hono, Next.js, SvelteKit."
                />
                <MoreInfoItem
                    question="Infrastructure"
                    answer="Cloudflare & DigitalOcean."
                />
                <MoreInfoItem question="Database" answer="LibSQL, flawless." />
                <MoreInfoItem
                    question="Open to Work"
                    answer="Feel free to reach out."
                />
            </ul>
        </div>
    );
}

function MoreInfoItem({
    question,
    answer,
}: {
    question: string;
    answer: string;
}) {
    return (
        <li className="mb-2">
            <span className="text-white">{question}</span>{" "}
            <ChevronRight className="h-3 w-3 text-gray-500 inline" />
            <span>{answer}</span>
        </li>
    );
}
