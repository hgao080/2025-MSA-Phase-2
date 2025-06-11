import { Button } from '@headlessui/react'

import { useProjectStore } from "../Stores/ProjectStore";

export default function SelectedProject() {
  const project = useProjectStore(state => state.selectedProject);

  return (
    <div className="flex flex-col shadow-xl rounded-3xl p-6">
      <div className="flex justify-between items-center">
        <h2>{project?.title}</h2>
        <Button className="data-hover:cursor-pointer">
          Apply
        </Button>
      </div>
      <p className="">{project?.description}</p>
    </div>
  )
}
