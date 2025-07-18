import { Work } from "~/types/project";
import Link from "next/link";

export function WorkItem(props: Work) {
    return (
        <div className="flex flex-row text-sm space-x-2 items-center justify-between group">
            <Link href={props.projecturl || props.giturl || "#"}>
                <h3 className="text-foreground group-hover:text-muted-foreground/50 transition-colors duration-150 hover:cursor-pointer">
                    {props.name}
                </h3>
            </Link>
            <div className="flex-grow max-sm:hidden border-t border-dotted border-gray-400"></div>
            <p className="max-sm:hidden">{props.role}</p>
        </div>
    );
}
