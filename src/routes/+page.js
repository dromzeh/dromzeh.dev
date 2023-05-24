import albumsList from "../data/albums.json";
import projectsList from "../data/projects.json";

export const load = async () => {
  return {
    projects: projectsList,
    albums: albumsList,
  };
};
