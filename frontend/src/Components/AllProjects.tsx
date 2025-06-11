import ProjectCard from "./ProjectCard"

const projects = [{
  id: 1,
  title: "Project One",
  description: "This is the first project.",
  createdAt: "2023-01-01T00:00:00Z"
}, {
  id: 2,
  title: "Project Two",
  description: "This is the second project.",
  createdAt: "2023-02-01T00:00:00Z"
}, {
  id: 3,
  title: "Project Three",
  description: "This is the third project.",
  createdAt: "2023-03-01T00:00:00Z"
}]

export default function AllProjects() {
  return (
    <div className="flex flex-col w-full gap-4">
      {projects.map(p => (
        <ProjectCard project={p}/>
      ))}
    </div>
  )
}
