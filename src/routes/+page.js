import projectsList from "../data/projects.json";
import albumsList from "../data/albums.json";

export const load = async () => {
  return {
    projects: projectsList,
    albums: albumsList,
  };
};
