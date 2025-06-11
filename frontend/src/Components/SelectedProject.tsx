import { useProjectStore } from "../Stores/ProjectStore";

export default function SelectedProject() {
  const project = useProjectStore(state => state.selectedProject);

  return (
    <div className="flex flex-col shadow-xl rounded-3xl p-6">
      <h2>{project?.title}</h2>
      <p className="">{project?.description}</p>
    </div>
  )
}
