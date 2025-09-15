import AllWork from "~/data/work.json";
import { WorkItem } from "./work-item";
import { Work } from "~/types/project";

interface WorkContainerProps {
    work?: Work[];
}

export function WorkContainer({ work = AllWork.work }: WorkContainerProps) {
    return (
        <section>
            <h2 className="text-foreground text-sm font-medium mb-4">
                Current Focus
            </h2>
            <div className="space-y-3">
                {work?.map(
                    (work: Work) =>
                        work.active && <WorkItem key={work.name} {...work} />,
                )}
            </div>
        </section>
    );
}
