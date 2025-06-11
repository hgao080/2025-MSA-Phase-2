import AllProjects from "../Components/AllProjects";

export default function Projects() {
  return (
    <div className="flex flex-col items-center justify-center w-screen">
      <div className="">
        {/* Search and Filter component TODO Later */}
      </div>

      <div className="mt-12 w-[60%]">
        <AllProjects />
      </div>
      
    </div>
  )
}
