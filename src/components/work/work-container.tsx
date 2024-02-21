import AllWork from "~/data/work.json";
import { WorkItem } from "./work-item";
import { Work } from "~/types/project";

interface WorkContainerProps {
    work?: Work[];
}

export function WorkContainer({ work = AllWork.work }: WorkContainerProps) {
    return (
        <div className="flex flex-col my-2">
            <h2 className="text-foreground text-lg font-semibold mb-2">
                Selected Work
            </h2>
            <div className="flex flex-col space-y-2">
                {work.map((work: Work) => (
                    <WorkItem key={work.name} {...work} />
                ))}
            </div>
        </div>
    );
}
