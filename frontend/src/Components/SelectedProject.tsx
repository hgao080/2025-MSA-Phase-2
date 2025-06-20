import { useAuthStore } from "../Stores/AuthStore";
import { useProjectStore } from "../Stores/ProjectStore";

import { useNavigate } from "react-router";

export default function SelectedProject() {
  const navigate = useNavigate();

  const user = useAuthStore(state => state.user);
  const project = useProjectStore(state => state.selectedProject);

  const handleApply = () => {
    if (!user) {
      navigate("/login");
    }
  }

  return (
    <div className="flex flex-col shadow-xl rounded-3xl p-6">
      <div className="flex justify-between items-center">
        <h2>{project?.name}</h2>
        <button className="hover:cursor-pointer" onClick={handleApply}>
          Apply
        </button>
      </div>
      <p className="">{project?.description}</p>
    </div>
  )
}
