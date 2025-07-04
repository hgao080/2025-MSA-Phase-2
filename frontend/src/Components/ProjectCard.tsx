import type { Project } from "../Models/Project";
import { useProjectStore } from "../Stores/ProjectStore";
import { UserIcon, TagIcon } from '@heroicons/react/24/outline';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const setSelectedProject = useProjectStore(state => state.setSelectedProject);
  const selectedProject = useProjectStore(state => state.selectedProject);
  
  const isSelected = selectedProject?.id === project.id;

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Frontend':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Backend':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Fullstack':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div 
      className={`group relative bg-white rounded-xl shadow-sm border-2 transition-all duration-200 cursor-pointer hover:shadow-lg hover:scale-[1.02] ${
        isSelected 
          ? 'border-indigo-500 ring-2 ring-indigo-200 shadow-lg' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => setSelectedProject(project)}
    >
      {/* Card Header */}
      <div className="p-4 pb-3 border-b border-gray-100">
        <div className="flex items-start justify-between gap-3">
          <h3 className={`font-semibold text-lg leading-tight transition-colors overflow-hidden ${
            isSelected ? 'text-indigo-900' : 'text-gray-900 group-hover:text-indigo-700'
          }`}
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {project.title}
          </h3>
          
          {/* Project Tag */}
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getTagColor(project.tag)} shrink-0`}>
            <TagIcon className="w-3 h-3 mr-1" />
            {project.tag}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 pt-3">
        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 overflow-hidden"
           style={{
             display: '-webkit-box',
             WebkitLineClamp: 3,
             WebkitBoxOrient: 'vertical',
             overflow: 'hidden'
           }}>
          {project.description}
        </p>
        
        {/* Author Info */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <UserIcon className="w-4 h-4" />
          <span className="truncate">{project.authorEmail}</span>
        </div>
      </div>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-3 right-3 w-3 h-3 bg-indigo-500 rounded-full ring-2 ring-white"></div>
      )}
      
      {/* Hover Effect */}
      <div className={`absolute inset-0 rounded-xl transition-opacity ${
        isSelected 
          ? 'bg-indigo-50 opacity-10' 
          : 'bg-gray-50 opacity-0 group-hover:opacity-5'
      }`}></div>
    </div>
  )
}
