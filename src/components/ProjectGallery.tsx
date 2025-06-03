import React, { useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaFilter } from 'react-icons/fa';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl: string;
  featured: boolean;
}

const ProjectGallery: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  
  const filters = ['all', 'featured', 'react', 'typescript', 'node', 'backend'];
  
  useEffect(() => {
    // Fetch projects or use local data
    setTimeout(() => {
      setProjects([
        {
          id: 1,
          title: 'Personal Portfolio',
          description: 'My responsive portfolio website built with React and TypeScript',
          image: '/images/projects/portfolio.jpg',
          technologies: ['react', 'typescript', 'tailwind'],
          githubUrl: 'https://github.com/beratmen/beratmen.com',
          demoUrl: 'https://beratmen.com',
          featured: true
        },
        // Add more projects here
      ]);
      setLoading(false);
    }, 1000);
  }, []);
  
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredProjects(projects);
    } else if (activeFilter === 'featured') {
      setFilteredProjects(projects.filter(project => project.featured));
    } else {
      setFilteredProjects(projects.filter(project => 
        project.technologies.includes(activeFilter)
      ));
    }
  }, [activeFilter, projects]);

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="py-16">
      {/* Filter Controls */}
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {filters.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full capitalize transition-all ${
              activeFilter === filter
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map(project => (
          <div 
            key={project.id}
            className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 w-full">
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      {project.technologies.map(tech => (
                        <span 
                          key={tech}
                          className="px-2 py-1 text-xs bg-gray-800/80 text-white rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-800/80 text-white rounded-full hover:bg-gray-700 transition-colors"
                      >
                        <FaGithub />
                      </a>
                      {project.demoUrl && (
                        <a 
                          href={project.demoUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 bg-blue-600/90 text-white rounded-full hover:bg-blue-500 transition-colors"
                        >
                          <FaExternalLinkAlt />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <div className="text-center py-16">
          <FaFilter className="mx-auto text-4xl text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No projects found</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Try changing your filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default ProjectGallery;