import { useProjectStore } from "../Stores/ProjectStore"
import UserProjectCard from "./UserProjectCard";

export default function UserProjects() {
  const projects = useProjectStore(state => state.myProjects);

  return (
    <div className="grid grid-cols-2 gap-4">
      {projects?.map(p => (
        <UserProjectCard project={p}/>
      ))}
    </div>
  )
}
