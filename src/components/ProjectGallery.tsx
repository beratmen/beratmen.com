import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { 
  FaGithub, 
  FaCode, 
  FaStar, 
  FaSearch,
  FaTimes
} from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';

// Types
type ProjectCategory = 'all' | 'web' | 'mobile' | 'api' | 'ai' | 'data' | 'devops' | 'featured';
type Technology = 'react' | 'typescript' | 'node' | 'nextjs' | 'tailwind' | 'python' | 'django' | 'docker' | 'aws' | 'gcp' | 'd3';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: Technology[];
  categories: ProjectCategory[];
  githubUrl: string;
  demoUrl?: string;
  featured: boolean;
  stars?: number;
  lastUpdated: string;
}

// Sample data
const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'Personal Portfolio',
    description: 'A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features dark mode, smooth animations, and project showcase.',
    image: '/images/projects/portfolio.jpg',
    technologies: ['nextjs', 'typescript', 'tailwind'],
    categories: ['web', 'featured'],
    githubUrl: 'https://github.com/beratmen/beratmen.com',
    demoUrl: 'https://beratmen.com',
    featured: true,
    stars: 24,
    lastUpdated: '2023-10-15'
  },
  {
    id: '2',
    title: 'E-commerce API',
    description: 'A robust RESTful API for an e-commerce platform built with Node.js, Express, and MongoDB. Implements JWT authentication, payment processing, and order management.',
    image: '/images/projects/ecommerce.jpg',
    technologies: ['node', 'typescript', 'docker'],
    categories: ['api', 'web'],
    githubUrl: 'https://github.com/beratmen/ecommerce-api',
    featured: true,
    stars: 42,
    lastUpdated: '2023-09-28'
  },
  {
    id: '3',
    title: 'Task Management App',
    description: 'A full-stack task management application with real-time updates, built with React, Node.js, and WebSockets.',
    image: '/images/projects/taskapp.jpg',
    technologies: ['react', 'node', 'typescript'],
    categories: ['web', 'mobile'],
    githubUrl: 'https://github.com/beratmen/task-manager',
    demoUrl: 'https://tasks.beratmen.com',
    featured: false,
    stars: 18,
    lastUpdated: '2023-08-15'
  },
  {
    id: '4',
    title: 'AI Image Generator',
    description: 'An AI-powered image generation tool using Stable Diffusion and FastAPI. Create stunning images from text prompts with fine-tuned models.',
    image: '/images/projects/ai-generator.jpg',
    technologies: ['python', 'docker', 'gcp'],
    categories: ['ai', 'web'],
    githubUrl: 'https://github.com/beratmen/ai-image-generator',
    featured: true,
    stars: 56,
    lastUpdated: '2023-10-01'
  },
  {
    id: '5',
    title: 'Data Visualization Dashboard',
    description: 'Interactive data visualization dashboard built with D3.js and React. Connects to various data sources and provides real-time analytics.',
    image: '/images/projects/dashboard.jpg',
    technologies: ['react', 'typescript', 'd3'],
    categories: ['data', 'web'],
    githubUrl: 'https://github.com/beratmen/data-dashboard',
    demoUrl: 'https://dashboard.beratmen.com',
    featured: false,
    stars: 31,
    lastUpdated: '2023-09-10'
  },
  {
    id: '6',
    title: 'DevOps Pipeline',
    description: 'CI/CD pipeline configuration for automated testing, building, and deploying applications to cloud infrastructure.',
    image: '/images/projects/devops.jpg',
    technologies: ['docker', 'aws', 'gcp'],
    categories: ['devops'],
    githubUrl: 'https://github.com/beratmen/devops-pipeline',
    featured: false,
    stars: 27,
    lastUpdated: '2023-09-22'
  }
];

// Technology icons mapping
const techIcons: Record<Technology, JSX.Element> = {
  react: <FaCode className="text-blue-500" />,
  typescript: <FaCode className="text-blue-600" />,
  node: <FaCode className="text-green-500" />,
  nextjs: <FaCode className="text-black dark:text-white" />,
  tailwind: <FaCode className="text-cyan-400" />,
  python: <FaCode className="text-yellow-400" />,
  django: <FaCode className="text-green-700" />,
  docker: <FaCode className="text-blue-400" />,
  aws: <FaCode className="text-orange-500" />,
  gcp: <FaCode className="text-red-500" />,
  d3: <FaCode className="text-orange-600" />
};

// Technology colors for badges
const techColors: Record<Technology, string> = {
  react: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  typescript: 'bg-blue-50 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200',
  node: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  nextjs: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-white',
  tailwind: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-200',
  python: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-200',
  django: 'bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-200',
  docker: 'bg-blue-50 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200',
  aws: 'bg-orange-50 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200',
  gcp: 'bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-200',
  d3: 'bg-orange-50 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200'
};

interface ProjectGalleryProps {
  projects: Project[];
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ projects }) => {
  // State
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTech, setSelectedTech] = useState<Technology | 'all'>('all');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const controls = useAnimation();
  
  // Available categories and technologies
  const categories: ProjectCategory[] = ['all', 'web', 'mobile', 'api', 'ai', 'data', 'devops', 'featured'];
  const allTechnologiesList: Technology[] = ['react', 'typescript', 'node', 'nextjs', 'tailwind', 'python', 'django', 'docker', 'aws', 'gcp', 'd3'];
  
  // Initialize projects
  useEffect(() => {
    setFilteredProjects(projects);
  }, [projects]);
  
  // Filter projects based on selected filters with animations
  useEffect(() => {
    const filterProjects = async () => {
      // Animate out existing projects
      await controls.start({
        opacity: 0,
        y: 20,
        transition: { duration: 0.2 }
      });
      
      // Apply filters
      let filtered = [...projects];
      
      if (activeCategory !== 'all') {
        filtered = filtered.filter(project => 
          project.categories.includes(activeCategory)
        );
      }
      
      if (selectedTech !== 'all') {
        filtered = filtered.filter(project => 
          project.technologies.includes(selectedTech as Technology)
        );
      }
      
      if (showFeaturedOnly) {
        filtered = filtered.filter(project => project.featured);
      }
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(project => 
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.technologies.some(tech => 
            tech.toLowerCase().includes(query)
          )
        );
      }
      
      setFilteredProjects(filtered);
      
      // Animate in filtered projects
      controls.start({
        opacity: 1,
        y: 0,
        transition: { 
          staggerChildren: 0.05,
          delayChildren: 0.1
        }
      });
    };
    
    filterProjects();
  }, [activeCategory, selectedTech, showFeaturedOnly, searchQuery, projects, controls]);
  
  // Get unique technologies from all projects
  const allTechnologies = useMemo(() => {
    const techSet = new Set<Technology>();
    projects.forEach(project => {
      project.technologies.forEach(tech => {
        if (allTechnologiesList.includes(tech as Technology)) {
          techSet.add(tech as Technology);
        }
      });
    });
    return Array.from(techSet);
  }, [projects]);
  
  // Loading state
  if (!projects.length) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.4 }
          }}
        >
          <motion.div 
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"
            animate={{ 
              rotate: 360,
              transition: { 
                duration: 1, 
                ease: 'linear',
                repeat: Infinity
              }
            }}
          />
          <motion.p 
            className="mt-4 text-gray-600 dark:text-gray-400"
            animate={{
              opacity: [0.6, 1, 0.6],
              transition: { 
                duration: 1.5, 
                repeat: Infinity,
                ease: 'easeInOut'
              }
            }}
          >
            Loading projects...
          </motion.p>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <motion.h2 
          className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Projects
        </motion.h2>
        <motion.p 
          className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          A collection of my recent work and side projects
        </motion.p>
      </div>

      {/* Filters */}
      <motion.div 
        className="mb-8 flex flex-wrap items-center justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >  
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Featured toggle */}
          <div className="flex items-center">
            <label className="inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={showFeaturedOnly}
                onChange={() => setShowFeaturedOnly(!showFeaturedOnly)}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                <FaStar className="text-yellow-400 mr-1" />
                Featured Only
              </span>
            </label>
          </div>
        </div>
        
        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                activeCategory === category
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category === 'all' ? 'All Projects' : 
               category === 'featured' ? (
                 <span className="flex items-center">
                   <FaStar className="mr-1 text-yellow-400" /> Featured
                 </span>
               ) : category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        {/* Technology filters */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400 mr-2">Technologies:</span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTech('all')}
              className={`px-3 py-1 text-xs rounded-full transition-all ${
                selectedTech === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              All
            </button>
            {allTechnologies.map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-3 py-1 text-xs rounded-full transition-all flex items-center gap-1 ${
                  selectedTech === tech
                    ? 'bg-blue-600 text-white'
                    : techColors[tech] + ' hover:opacity-80'
                }`}
              >
                {techIcons[tech]}
                {tech.charAt(0).toUpperCase() + tech.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
      
      <div className="mt-12">
        {filteredProjects.length > 0 ? (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
    <AnimatePresence>
      {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.98 },
                  show: { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { 
                      type: 'spring',
                      damping: 20,
                      stiffness: 100
                    }
                  },
                  exit: { 
                    opacity: 0, 
                    y: -20, 
                    scale: 0.98,
                    transition: { duration: 0.2 }
                  }
                }}
                whileHover={{ 
                  y: -5,
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  transition: { 
                    duration: 0.3,
                    ease: 'easeOut'
                  }
                }}
                className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full relative"
              >
                {/* Project Image */}
                <motion.div 
                  className="relative h-48 overflow-hidden"
                  whileHover={{ 
                      scale: 1.03,
                      transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }
                    }}
                  >
                    <motion.img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1 }}
                      whileHover={{ 
                        scale: 1.1,
                        transition: { 
                          duration: 0.8,
                          ease: [0.2, 0.8, 0.2, 1]
                        }
                      }}
                    />
                    {/* Overlay */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-between p-4"
                      initial={{ opacity: 0 }}
                      whileHover={{ 
                        opacity: 1,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <motion.div 
                        className="flex justify-end gap-2"
                        initial={{ y: -20, opacity: 0 }}
                        whileHover={{ 
                          y: 0, 
                          opacity: 1,
                          transition: { 
                            staggerChildren: 0.1,
                            delayChildren: 0.1
                          }
                        }}
                      >
                        {project.githubUrl && (
                          <motion.a 
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                            aria-label="View on GitHub"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ 
                              scale: 1, 
                              opacity: 1,
                              transition: { 
                                type: 'spring',
                                stiffness: 500,
                                damping: 30
                              }
                            }}
                          >
                            <FaGithub className="w-4 h-4" />
                          </motion.a>
                        )}
                        {project.demoUrl && (
                          <motion.a 
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
                            aria-label="View Live Demo"
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ 
                              scale: 1, 
                              opacity: 1,
                              transition: { 
                                type: 'spring',
                                stiffness: 500,
                                damping: 30,
                                delay: 0.1
                              }
                            }}
                          >
                            <FiExternalLink className="w-4 h-4" />
                          </motion.a>
                        )}
                      </motion.div>
                      <motion.div 
                        className="flex flex-wrap gap-1"
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ 
                          y: 0, 
                          opacity: 1,
                          transition: { 
                            staggerChildren: 0.05,
                            delayChildren: 0.2
                          }
                        }}
                      >
                        {project.technologies.slice(0, 4).map((tech, i) => (
                          <motion.span 
                            key={tech}
                            className={`text-xs px-2 py-1 rounded-full ${techColors[tech]} flex items-center gap-1 cursor-default`}
                            initial={{ scale: 0.8, opacity: 0, y: 10 }}
                            animate={{ 
                              scale: 1, 
                              opacity: 1, 
                              y: 0,
                              transition: { 
                                type: 'spring',
                                stiffness: 500,
                                damping: 30,
                                delay: 0.2 + (i * 0.05)
                              }
                            }}
                            whileHover={{ 
                              scale: 1.05,
                              y: -2,
                              transition: { duration: 0.2 }
                            }}
                          >
                            {techIcons[tech]}
                            {tech.charAt(0).toUpperCase() + tech.slice(1)}
                          </motion.span>
                        ))}
                        {project.technologies.length > 4 && (
                          <motion.span 
                            className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                            initial={{ scale: 0.8, opacity: 0, y: 10 }}
                            animate={{ 
                              scale: 1, 
                              opacity: 1, 
                              y: 0,
                              transition: { 
                                type: 'spring',
                                stiffness: 500,
                                damping: 30,
                                delay: 0.4
                              }
                            }}
                          >
                            +{project.technologies.length - 4} more
                          </motion.span>
                        )}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                    
                    {/* Featured Badge */}
                    {project.featured && (
                      <motion.div 
                        className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full flex items-center shadow-md"
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ 
                          scale: 1, 
                          rotate: 0,
                          transition: { 
                            type: 'spring',
                            stiffness: 500,
                            damping: 15,
                            delay: 0.2
                          }
                        }}
                        whileHover={{
                          scale: 1.1,
                          rotate: [0, -5, 5, -5, 0],
                          transition: { 
                            duration: 0.6,
                            ease: 'easeInOut'
                          }
                        }}
                      >
                        <FaStar className="mr-1" />
                        <span>Featured</span>
                      </motion.div>
                    )}
                  </div>
                  
                  {/* Project Content */}
                  <div className="p-5 flex-1 flex flex-col">
                    <motion.div 
                      className="flex-1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: 0.1,
                          duration: 0.4
                        }
                      }}
                    >
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                        {project.description}
                      </p>
                    </motion.div>
                    
                    <motion.div 
                      className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { 
                          delay: 0.2,
                          duration: 0.4
                        }
                      }}
                    >
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <motion.span 
                          className="flex items-center mr-3"
                          whileHover={{ scale: 1.1 }}
                        >
                          <FaStar className="text-yellow-400 mr-1" />
                          <span>{project.stars || 0}</span>
                        </motion.span>
                        <motion.span 
                          className="flex items-center"
                          whileHover={{ scale: 1.05 }}
                        >
                          <FaCode className="text-blue-400 mr-1" />
                          <span>Updated {formatLastUpdated(project.lastUpdated)}</span>
                        </motion.span>
                      </div>
                      
                      <div className="flex space-x-1">
                        {project.githubUrl && (
                          <motion.a 
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                            aria-label="View on GitHub"
                            whileHover={{ 
                              y: -2,
                              scale: 1.1,
                              color: 'var(--tw-text-opacity-100)'
                            }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                          >
                            <FaGithub className="w-4 h-4" />
                          </motion.a>
                        )}
                        {project.demoUrl && (
                          <motion.a 
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                            aria-label="View Live Demo"
                            whileHover={{ 
                              y: -2,
                              scale: 1.1,
                              color: 'var(--tw-text-opacity-100)'
                            }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                          >
                            <FiExternalLink className="w-4 h-4" />
                          </motion.a>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        ) : (
          <motion.div 
            className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { 
                type: 'spring',
                stiffness: 300,
                damping: 20
              }
            }}
          >
            <motion.div
              animate={{
                y: [0, -5, 0],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }
              }}
            >
              <FaSearch className="text-5xl text-gray-400 mx-auto mb-4" />
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No projects found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Try adjusting your search or filter criteria</p>
            <motion.button 
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setSelectedTech('all');
                setShowFeaturedOnly(false);
              }}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium relative overflow-hidden group"
              whileHover={{ 
                scale: 1.03,
                boxShadow: '0 4px 12px -2px rgba(37, 99, 235, 0.5)'
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: 1, 
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Helper function to format last updated date
function formatLastUpdated(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'recently';
  }
}

// Memoize the component to prevent unnecessary re-renders
const MemoizedProjectGallery = React.memo(ProjectGallery, (prevProps, nextProps) => {
  // Only re-render if the projects array changes
  return prevProps.projects === nextProps.projects;
});

export default MemoizedProjectGallery;