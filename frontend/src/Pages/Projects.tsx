import { useEffect, useState, useMemo } from 'react';
import AllProjects from '../Components/AllProjects';
import SearchAndFilter from '../Components/SearchAndFilter';
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
		<div className='flex flex-col bg-gray-50 dark:bg-gray-900 pt-28 min-h-screen'>
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
					<AllProjects projects={filteredProjects} />
				</div>
			</div>
		</div>
	);
}
