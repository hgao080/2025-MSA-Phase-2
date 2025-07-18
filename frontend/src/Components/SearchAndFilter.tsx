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
    <div className="mx-auto mb-8 w-full max-w-4xl">
      <div className="flex sm:flex-row flex-col items-center gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 w-full">
          <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 dark:text-gray-500" aria-hidden="true" />
          </div>
          <input
            type="text"
            placeholder="Search projects by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block bg-white dark:bg-gray-800 py-2 pr-3 pl-10 border border-gray-300 focus:border-indigo-500 dark:border-gray-600 dark:focus:border-indigo-400 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-400 w-full text-gray-900 dark:text-gray-100 sm:text-sm leading-5 placeholder-gray-500 dark:placeholder-gray-400 focus:placeholder-gray-400 dark:focus:placeholder-gray-500"
          />
        </div>

        {/* Filter Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 shadow-sm px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 font-medium text-gray-700 dark:text-gray-300 text-sm"
          >
            <FunnelIcon className="mr-2 w-4 h-4" aria-hidden="true" />
            Filter: {selectedFilter}
            <span className="bg-indigo-100 dark:bg-indigo-900/30 ml-2 px-2 py-1 rounded-full text-indigo-800 dark:text-indigo-300 text-xs">
              {selectedFilter}
            </span>
          </button>

          {/* Filter Dropdown */}
          {showFilters && (
            <div className="right-0 z-10 absolute bg-white dark:bg-gray-800 shadow-lg mt-2 border border-gray-200 dark:border-gray-700 rounded-md w-48">
              <div className="py-1">
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedFilter(option);
                      setShowFilters(false);
                    }}
                    className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                      selectedFilter === option
                        ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 font-medium'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
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
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <span className="text-gray-500 text-sm">Active filters:</span>
          
          {searchTerm && (
            <span className="inline-flex items-center bg-blue-100 px-3 py-1 rounded-full font-medium text-blue-800 text-xs">
              Search: "{searchTerm}"
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="inline-flex justify-center items-center ml-2 w-4 h-4 text-blue-400 hover:text-blue-600"
              >
                ×
              </button>
            </span>
          )}
          
          {selectedFilter !== 'All' && (
            <span className="inline-flex items-center bg-purple-100 px-3 py-1 rounded-full font-medium text-purple-800 text-xs">
              Type: {selectedFilter}
              <button
                type="button"
                onClick={() => setSelectedFilter('All')}
                className="inline-flex justify-center items-center ml-2 w-4 h-4 text-purple-400 hover:text-purple-600"
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
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xs underline"
            >
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  );
}
