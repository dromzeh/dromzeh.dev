import projectsList from "../data/projects.json";

export const load = async () => {
    return {
        projects: projectsList
    };
}