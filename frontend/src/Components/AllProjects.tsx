import ProjectCard from "./ProjectCard"

const projects = [{

}]

export default function AllProjects() {
  return (
    <div className="grid grid-cols-2">
      {projects.map(p => (
        <ProjectCard project={p}/>
      ))}
    </div>
  )
}
