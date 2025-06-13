
import { useProjectStore } from "../Stores/ProjectStore"
import ProjectCard from "./ProjectCard"

export default function AllProjects() {
  const projects = useProjectStore(state => state.allProjects);

  return (
    <div className="grid grid-cols-2 gap-4">
      {projects?.map(p => (
        <ProjectCard project={p}/>
      ))}
    </div>
  )
}
