import type { Project } from "../Models/Project";
import { useProjectStore } from "../Stores/ProjectStore";
import { 
  UserIcon, 
  TagIcon, 
  UserGroupIcon, 
  ClockIcon, 
  CheckCircleIcon,
  ExclamationCircleIcon 
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const setSelectedProject = useProjectStore(state => state.setSelectedProject);
  const selectedProject = useProjectStore(state => state.selectedProject);
  
  const isSelected = selectedProject?.id === project.id;
  const openRoles = project.rolesNeeded.filter(role => !role.filled);
  const teamProgress = (project.currentTeamSize / project.teamSize) * 100;

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Frontend':
        return 'from-blue-500 to-cyan-500';
      case 'Backend':
        return 'from-purple-500 to-pink-500';
      case 'Fullstack':
        return 'from-green-500 to-teal-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ 
        y: -4, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      onClick={() => setSelectedProject(project)}
      className={`group relative bg-white rounded-2xl border p-6 cursor-pointer overflow-hidden transition-all duration-300 ${
        isSelected 
          ? 'border-indigo-500 ring-2 ring-indigo-200 shadow-lg' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      
      {/* Content */}
      <div className="z-10 relative">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 mr-3">
            <div className="flex items-center gap-2 mb-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${getTagColor(project.tag)} text-white`}>
                <TagIcon className="mr-1 w-3 h-3" />
                {project.tag}
              </span>
              {project.estimatedDuration && (
                <span className="inline-flex items-center gap-1 text-gray-500 text-xs">
                  <ClockIcon className="w-3 h-3" />
                  {project.estimatedDuration}
                </span>
              )}
            </div>
            <h3 className={`text-lg font-semibold transition-colors duration-200 overflow-hidden ${
              isSelected ? 'text-indigo-900' : 'text-gray-900 group-hover:text-indigo-600'
            }`}
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {project.title}
            </h3>
            <p className="mt-1 overflow-hidden text-gray-600 text-sm"
               style={{
                 display: '-webkit-box',
                 WebkitLineClamp: 2,
                 WebkitBoxOrient: 'vertical',
                 overflow: 'hidden'
               }}>
              {project.description}
            </p>
          </div>
        </div>

        {/* Team Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-1.5">
              <UserGroupIcon className="w-4 h-4 text-gray-500" />
              <span className="font-medium text-gray-700 text-sm">
                Team Progress
              </span>
            </div>
            <span className="text-gray-600 text-sm">
              {project.currentTeamSize}/{project.teamSize}
            </span>
          </div>
          <div className="bg-gray-200 rounded-full w-full h-2 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${teamProgress}%` }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full h-full"
            />
          </div>
        </div>

        {/* Roles Section */}
        <div className="mb-4">
          <h4 className="mb-3 font-medium text-gray-700 text-sm">Open Roles</h4>
          
          {openRoles.length > 0 ? (
            <div className="space-y-2">
              {openRoles.slice(0, 1).map((role) => (
                <div key={role.id} className="flex items-start gap-2 bg-amber-50 p-2.5 border border-amber-200 rounded-lg">
                  <ExclamationCircleIcon className="flex-shrink-0 mt-0.5 w-4 h-4 text-amber-600" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-amber-800 text-sm">{role.title}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {role.skillsRequired.slice(0, 3).map((skill) => (
                        <span key={skill} className="inline-flex items-center bg-amber-100 px-1.5 py-0.5 rounded font-medium text-amber-800 text-xs">
                          {skill}
                        </span>
                      ))}
                      {role.skillsRequired.length > 3 && (
                        <span className="text-amber-600 text-xs">+{role.skillsRequired.length - 3} more</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {openRoles.length > 1 && (
                <p className="text-gray-500 text-xs text-center">
                  +{openRoles.length - 1} more open role{openRoles.length - 1 > 1 ? 's' : ''}
                </p>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-green-50 p-2.5 border border-green-200 rounded-lg">
              <CheckCircleIcon className="w-4 h-4 text-green-600" />
              <span className="font-medium text-green-800 text-sm">Team Complete!</span>
            </div>
          )}
        </div>

        {/* Author */}
        <div className="pt-4 border-gray-100 border-t">
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <UserIcon className="w-4 h-4" />
            <span className="truncate">
              Created by <span className="font-medium text-gray-700">{project.authorEmail.split('@')[0]}</span>
            </span>
          </div>
        </div>

        {/* Selection/Hover indicator */}
        <div className={`absolute top-4 right-4 transition-opacity duration-200 ${
          isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}>
          <div className={`w-3 h-3 rounded-full ${
            isSelected 
              ? 'bg-indigo-500 ring-2 ring-white' 
              : 'bg-gradient-to-r from-indigo-500 to-purple-500'
          }`}></div>
        </div>
      </div>
    </motion.div>
  );
}
