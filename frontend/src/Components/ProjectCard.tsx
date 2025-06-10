import { Project } from "../types/Project";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className={`bg-[url("${project.imageUrl}")] bg-cover bg-center `}>

    </div>
  )
}
