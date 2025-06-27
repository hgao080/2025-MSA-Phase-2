import type { Project } from "../Models/Project";
import { useUserProjectStore } from "../Stores/UserProjectStore";

interface ProjectCardProps {
  project: Project;
}

export default function UserProjectCard({ project }: ProjectCardProps) {
  const setSelectedProject = useUserProjectStore(state => state.setSelectedProject);

  return (
    <div className="min-h-100 flex flex-col justify-end border p-4 rounded-3xl hover:cursor-pointer" key={project.id} onClick={() => setSelectedProject(project)}>
      <h2 className="">{project.title}</h2>
    </div>
  )
}
