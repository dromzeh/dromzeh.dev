import AllWork from "~/data/work.json";
import { WorkItem } from "./work-item";
import { Work } from "~/types/project";

interface WorkContainerProps {
    work?: Work[];
}

export function WorkContainer({ work = AllWork.work }: WorkContainerProps) {
    return (
        <div>
            <h2 className="text-foreground  font-semibold text-lg mb-2">
                Work
            </h2>
            <div className="flex flex-col space-y-2">
                {work?.map((work: Work) => (
                    <WorkItem key={work.name} {...work} />
                ))}
            </div>
        </div>
    );
}
