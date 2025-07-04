import { useState } from 'react';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import type { ProjectType } from '../Models/Project';

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedFilter: ProjectType | 'All';
  setSelectedFilter: (filter: ProjectType | 'All') => void;
}

export default function SearchAndFilter({
  searchTerm,
  setSearchTerm,
  selectedFilter,
  setSelectedFilter,
}: SearchAndFilterProps) {
  const [showFilters, setShowFilters] = useState(false);

  const filterOptions: (ProjectType | 'All')[] = ['All', 'Frontend', 'Backend', 'Fullstack'];

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        {/* Search Bar */}
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            placeholder="Search projects by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Filter Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FunnelIcon className="h-4 w-4 mr-2" aria-hidden="true" />
            Filter: {selectedFilter}
            <span className="ml-2 text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
              {selectedFilter}
            </span>
          </button>

          {/* Filter Dropdown */}
          {showFilters && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <div className="py-1">
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedFilter(option);
                      setShowFilters(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      selectedFilter === option
                        ? 'bg-indigo-50 text-indigo-700 font-medium'
                        : 'text-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {option !== 'All' && (
                        <span
                          className={`inline-block w-2 h-2 rounded-full ${
                            option === 'Frontend'
                              ? 'bg-blue-500'
                              : option === 'Backend'
                              ? 'bg-green-500'
                              : 'bg-purple-500'
                          }`}
                        />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {(searchTerm || selectedFilter !== 'All') && (
        <div className="mt-4 flex flex-wrap gap-2 items-center">
          <span className="text-sm text-gray-500">Active filters:</span>
          
          {searchTerm && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Search: "{searchTerm}"
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="ml-2 inline-flex items-center justify-center w-4 h-4 text-blue-400 hover:text-blue-600"
              >
                ×
              </button>
            </span>
          )}
          
          {selectedFilter !== 'All' && (
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              Type: {selectedFilter}
              <button
                type="button"
                onClick={() => setSelectedFilter('All')}
                className="ml-2 inline-flex items-center justify-center w-4 h-4 text-purple-400 hover:text-purple-600"
              >
                ×
              </button>
            </span>
          )}
          
          {(searchTerm || selectedFilter !== 'All') && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedFilter('All');
              }}
              className="text-xs text-gray-500 hover:text-gray-700 underline"
            >
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  );
}
