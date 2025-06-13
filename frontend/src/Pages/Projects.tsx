import { useEffect } from "react";
import AllProjects from "../Components/AllProjects";
import SelectedProject from "../Components/SelectedProject";
import { useProjectStore } from "../Stores/ProjectStore";

export default function Projects() {
  const fetchAllProjects = useProjectStore(state => state.fetchAllProjects);

  useEffect(() => {
    fetchAllProjects();
  }, [fetchAllProjects]);

  return (
    <div className="mt-24 flex flex-col items-center justify-center w-screen">
      <div className="">
        {/* Search and Filter component TODO Later */}
      </div>

      <div className="flex justify-between gap-4 w-[55%]">
        <div className="flex-1">
          <AllProjects />
        </div>
        

        <div className="flex-1">
          <SelectedProject />
        </div>
      </div>
      
    </div>
  )
}
