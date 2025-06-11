import type { Project } from "../../Models/Project";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="border p-4 rounded-md">
      <h2 className="">{project.title}</h2>
      <p className="">{project.description}</p>
    </div>
  )
}
