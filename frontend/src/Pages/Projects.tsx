import { useEffect, useState, useMemo } from 'react';
import AllProjects from '../Components/Projects/AllProjects';
import SearchAndFilter from '../Components/Projects/SearchAndFilter';
import SelectedProject from '../Components/Projects/SelectedProject';
import { useProjectStore } from '../Stores/ProjectStore';
import type { ProjectType } from '../Models/Project';

export default function Projects() {
	const fetchAllProjects = useProjectStore((state) => state.fetchAllProjects);
	const allProjects = useProjectStore((state) => state.allProjects);
	
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedFilter, setSelectedFilter] = useState<ProjectType | 'All'>('All');

	useEffect(() => {
		fetchAllProjects();
	}, [fetchAllProjects]);

	// Filter and search projects
	const filteredProjects = useMemo(() => {
		let filtered = allProjects;

		// Filter by project type
		if (selectedFilter !== 'All') {
			filtered = filtered.filter((project) => project.tag === selectedFilter);
		}

		// Filter by search term (case-insensitive)
		if (searchTerm.trim()) {
			filtered = filtered.filter((project) =>
				project.title.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		return filtered;
	}, [allProjects, selectedFilter, searchTerm]);

	return (
		<div className='flex flex-col bg-gray-50 dark:bg-gray-900 pt-28'>
			<div className="flex flex-col flex-1 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
				{/* Page Header */}
				<div className="flex-shrink-0 mb-8">
					<h1 className="mb-2 font-bold text-gray-900 dark:text-gray-100 text-3xl">Discover Projects</h1>
					<p className="text-gray-600 dark:text-gray-400">Find and join exciting projects that match your skills and interests.</p>
				</div>

				{/* Search and Filter */}
				<div className="flex-shrink-0 mb-8">
					<SearchAndFilter
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
						selectedFilter={selectedFilter}
						setSelectedFilter={setSelectedFilter}
					/>
				</div>

				{/* Projects Display */}
				<div className="flex-1 pb-8 min-h-0">
					<div className="mx-auto px-4 w-full min-w-[70vw] max-w-7xl h-full">
						{filteredProjects?.length > 0 ? (
							<div className='flex lg:flex-row flex-col gap-6 lg:gap-8 h-full'>
								{/* Projects Grid */}
								<div className='flex-1 lg:flex-1'>
									<AllProjects projects={filteredProjects} />
								</div>
								
								{/* Selected Project Panel */}
								<div className='flex-shrink-0 lg:flex-1 lg:max-w-md'>
									<div className="lg:top-6 lg:sticky h-full lg:h-auto">
										<SelectedProject />
									</div>
								</div>
							</div>
						) : (
							<div className='flex flex-col justify-center items-center px-4 py-16'>
								<div className="text-center">
									<div className="flex justify-center items-center bg-gray-100 dark:bg-gray-700 mx-auto mb-4 rounded-full w-16 h-16">
										<svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
										</svg>
									</div>
									<h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100 text-xl">No projects found</h3>
									<p className="max-w-md text-gray-500 dark:text-gray-400 text-center">
										No projects match your current search criteria. Try adjusting your search terms or filters to find what you're looking for.
									</p>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
