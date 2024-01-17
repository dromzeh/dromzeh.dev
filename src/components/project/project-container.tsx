import AllProjects from "~/data/projects.json";
import { ProjectItem } from "./project-item";
import { Project } from "~/types/project";

interface ProjectContainerProps {
    projects?: Project[];
}

export function ProjectContainer({
    projects = AllProjects.projects,
}: ProjectContainerProps) {
    return (
        <div className="flex flex-col my-2">
            <h2 className="text-neutral-100 mb-2">Projects</h2>
            <div className="flex flex-col space-y-2">
                {projects.map((project: Project) => (
                    <ProjectItem key={project.name} {...project} />
                ))}
            </div>
        </div>
    );
}
