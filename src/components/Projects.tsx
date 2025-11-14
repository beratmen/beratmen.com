import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FaGithub,
  FaSearch,
  FaStar,
  FaCode,
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaRegClock,
  FaExternalLinkAlt,
  FaCodeBranch,
  FaEye,
  FaCalendarAlt,
  FaLayerGroup,
  FaRocket,
  FaHeart
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchGitHubRepos, GitHubRepo } from '../services/github';

const Projects: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Define project categories
  type ProjectCategory = 'all' | 'featured' | 'recent' | 'stars' | 'web' | 'mobile' | 'api' | 'ai' | 'data' | 'devops';
  type LanguageFilter = string | 'all';

  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');
  const [activeLanguage, setActiveLanguage] = useState<LanguageFilter>('all');
  const [availableLanguages, setAvailableLanguages] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLanguageFilterOpen, setIsLanguageFilterOpen] = useState(false);
  const [showLeftButton, setShowLeftButton] = useState(true);
  const [showRightButton, setShowRightButton] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const languageFilterRef = useRef<HTMLDivElement>(null);

  // Check scroll position to show/hide navigation buttons
  const checkScrollPosition = useCallback(() => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const isAtStart = scrollLeft <= 0;
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1;
      
      setShowLeftButton(!isAtStart);
      setShowRightButton(!isAtEnd);
    }
  }, []);

  // Scroll carousel left or right
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8; // Scroll by 80% of container width
      const newScrollLeft = direction === 'left' 
        ? carouselRef.current.scrollLeft - scrollAmount
        : carouselRef.current.scrollLeft + scrollAmount;
      
      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
      
      // Update button states after scroll operation completes
      setTimeout(checkScrollPosition, 300);
    }
  };

  // Check scroll position when carousel is loaded and when filtering is applied
  useEffect(() => {
    const carousel = carouselRef.current;
    
    const handleResize = () => {
      checkScrollPosition();
    };
    
    if (carousel) {
      // Listen for scroll events
      carousel.addEventListener('scroll', checkScrollPosition);
      // Also check when window is resized
      window.addEventListener('resize', handleResize);
      
      // Check on initial load and when filter changes
      const timer = setTimeout(() => {
        checkScrollPosition();
      }, 100);
      
      // Cleanup
      return () => {
        carousel.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', handleResize);
        clearTimeout(timer);
      };
    }
  }, [checkScrollPosition, filteredRepos]);

  // Get category color
  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      web: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      mobile: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      api: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      ai: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      data: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      devops: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    };
    return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  };

  // Get language color
  const getLanguageColor = (language: string): string => {
    const colors: Record<string, string> = {
      'JavaScript': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'TypeScript': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Python': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'HTML': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'CSS': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
      'Java': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'C++': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      'C#': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    };
    return colors[language] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  };

  useEffect(() => {
    async function loadGitHubRepos() {
      setIsLoading(true);
      setError(null);
      try {
        const githubRepos = await fetchGitHubRepos('beratmen');
        // Filter out forked repos and sort by stars
        const filteredRepos = githubRepos
          .filter(repo => !repo.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count);
        setRepos(filteredRepos);
      } catch (error) {
        console.error('Failed to load repositories:', error);
        setError('Failed to load GitHub repositories. Please check the console for more details.');
      } finally {
        setIsLoading(false);
      }
    }
    loadGitHubRepos();
  }, []);

  // Extract unique languages from repos and handle case sensitivity
  useEffect(() => {
    if (repos.length > 0) {
      const languageMap = new Map<string, string>();
      const standardNames: Record<string, string> = {
        'typescript': 'TypeScript',
        'javascript': 'JavaScript',
        'c++': 'C++',
        'c#': 'C#',
        'html': 'HTML',
        'css': 'CSS',
        'python': 'Python',
        'java': 'Java'
      };
      
      repos.forEach(repo => {
        if (repo.language) {
          const lowerLang = repo.language.toLowerCase();
          // Use standardized name if available, otherwise use the original with first letter capitalized
          const displayName = standardNames[lowerLang] || 
                            (repo.language.charAt(0).toUpperCase() + repo.language.slice(1));
          languageMap.set(lowerLang, displayName);
        }
      });
      
      // Convert Map values to a Set of unique, properly cased language names
      setAvailableLanguages(new Set(Array.from(languageMap.values())));
    }
  }, [repos]);

  // Categorize projects based on topics and language
  const categorizeProject = (repo: GitHubRepo): string[] => {
    const categories: string[] = [];
    
    // Language-based categories
    if (repo.language) {
      categories.push(repo.language.toLowerCase());
    }
    
    // Domain-based categories from topics
    if (repo.topics) {
      if (repo.topics.some(t => ['web', 'frontend', 'react', 'vue', 'angular', 'svelte'].includes(t))) {
        categories.push('web');
      }
      if (repo.topics.some(t => ['mobile', 'react-native', 'flutter', 'ios', 'android'].includes(t))) {
        categories.push('mobile');
      }
      if (repo.topics.some(t => ['api', 'backend', 'node', 'express', 'django', 'flask', 'spring'].includes(t))) {
        categories.push('api');
      }
      if (repo.topics.some(t => ['ai', 'machine-learning', 'ml', 'deep-learning', 'tensorflow', 'pytorch'].includes(t))) {
        categories.push('ai');
      }
      if (repo.topics.some(t => ['data', 'data-science', 'data-analysis', 'big-data'].includes(t))) {
        categories.push('data');
      }
      if (repo.topics.some(t => ['devops', 'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'ci-cd'].includes(t))) {
        categories.push('devops');
      }
    }
    
    return [...new Set(categories)]; // Remove duplicates
  };

  useEffect(() => {
    let tempRepos = [...repos];

    // Apply category filter
    if (activeFilter !== 'all') {
      switch (activeFilter) {
        case 'featured':
          tempRepos = tempRepos.filter(repo => repo.topics?.includes('featured'));
          break;
        case 'recent':
          tempRepos.sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime());
          break;
        case 'stars':
          tempRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
          break;
        case 'web':
        case 'mobile':
        case 'api':
        case 'ai':
        case 'data':
        case 'devops':
          tempRepos = tempRepos.filter(repo => {
            const categories = categorizeProject(repo);
            return categories.includes(activeFilter);
          });
          break;
        default:
          break;
      }
    }

    // Apply language filter
    if (activeLanguage !== 'all') {
      tempRepos = tempRepos.filter(repo => 
        repo.language && repo.language.toLowerCase() === activeLanguage.toLowerCase()
      );
    }

    // Apply search query
    if (searchQuery) {
      tempRepos = tempRepos.filter(repo =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (repo.topics && repo.topics.some(topic => 
          topic.toLowerCase().includes(searchQuery.toLowerCase())
        ))
      );
    }

    setFilteredRepos(tempRepos);
    // Re-check scroll position after repos update
    setTimeout(checkScrollPosition, 100);
  }, [repos, activeFilter, activeLanguage, searchQuery, checkScrollPosition]);

  // Add scroll event listener
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScrollPosition);
      // Initial check
      checkScrollPosition();
      return () => {
        carousel.removeEventListener('scroll', checkScrollPosition);
      };
    }
  }, [checkScrollPosition]);

  const filters = useMemo(() => [
    { id: 'all', label: 'All Projects', icon: <FaCode className="mr-2" /> },
    { id: 'featured', label: 'Featured', icon: <FaStar className="mr-2" /> },
    { id: 'recent', label: 'Most Recent', icon: <FaRegClock className="mr-2" /> },
    { id: 'stars', label: 'Most Stars', icon: <FaStar className="mr-2" /> },
    { id: 'web', label: 'Web', icon: <FaCode className="mr-2" /> },
    { id: 'mobile', label: 'Mobile', icon: <FaCode className="mr-2" /> },
    { id: 'api', label: 'API', icon: <FaCode className="mr-2" /> },
    { id: 'ai', label: 'AI/ML', icon: <FaCode className="mr-2" /> },
    { id: 'data', label: 'Data', icon: <FaCode className="mr-2" /> },
    { id: 'devops', label: 'DevOps', icon: <FaCode className="mr-2" /> },
  ], []);

  // Close language filter when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (languageFilterRef.current && !languageFilterRef.current.contains(event.target as Node)) {
        setIsLanguageFilterOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section id="projects" className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40 dark:from-gray-900 dark:via-blue-950/20 dark:to-indigo-950/30 overflow-hidden">
      {/* Enhanced Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-32 -top-32 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute left-10 top-1/4 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-pink-500/10 dark:from-indigo-400/10 dark:to-pink-400/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute right-1/3 bottom-20 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-blue-500/10 dark:from-purple-400/10 dark:to-blue-400/10 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-1/4 w-4 h-4 bg-blue-400/20 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-1/3 w-6 h-6 bg-purple-400/20 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-40 left-1/5 w-3 h-3 bg-indigo-400/20 rounded-full animate-bounce delay-500"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Enhanced Header Section */}
        <motion.div 
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center justify-center mb-6">
            <motion.div
              className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white text-sm font-medium rounded-full shadow-xl shadow-blue-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaRocket className="w-4 h-4" />
              <span>My Work Portfolio</span>
              <FaHeart className="w-4 h-4 text-red-200 animate-pulse" />
            </motion.div>
          </div>
          
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400">
              Open Source
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 dark:from-purple-400 dark:via-pink-400 dark:to-red-400">
              Projects
            </span>
          </motion.h2>
          
          <motion.p 
            className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Explore my collection of innovative projects built with modern technologies. 
            Each project represents a journey of learning, creativity, and problem-solving.
          </motion.p>
          
          {/* Stats Section */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">{repos.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">
                {repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Stars</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {repos.reduce((sum, repo) => sum + repo.forks_count, 0)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Forks</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Search and Filters */}
        <motion.div 
          className="flex flex-col space-y-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-2xl mx-auto sm:mx-0">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search projects by name, description, or technology..."
                className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500/30 focus:border-blue-500 transition-all duration-300 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex justify-center sm:justify-start space-x-3">
              {/* Mobile filter button */}
              <div className="relative md:hidden">
                <motion.button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center justify-center px-6 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaFilter className="mr-2" />
                  <span>Filter</span>
                </motion.button>
                
                {/* Mobile filter dropdown */}
                <AnimatePresence>
                  {isFilterOpen && (
                    <motion.div 
                      className="absolute right-0 mt-3 w-72 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-2xl z-20 border border-gray-200 dark:border-gray-700"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                          <FaLayerGroup className="mr-2 text-blue-500" />
                          Categories
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                          {filters.map(filter => (
                            <motion.button
                              key={filter.id}
                              onClick={() => {
                                setActiveFilter(filter.id as any);
                                setIsFilterOpen(false);
                              }}
                              className={`text-left px-3 py-2 text-sm rounded-xl transition-all duration-200 ${
                                activeFilter === filter.id 
                                  ? 'bg-blue-500 text-white shadow-lg' 
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="flex items-center">
                                {filter.icon}
                                <span className="truncate">{filter.label}</span>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                          <FaCode className="mr-2 text-purple-500" />
                          Languages
                        </h3>
                        <div className="max-h-48 overflow-y-auto space-y-1">
                          {Array.from(availableLanguages).map(lang => (
                            <motion.button
                              key={lang}
                              onClick={() => {
                                setActiveLanguage(activeLanguage === lang ? 'all' : lang);
                                setIsFilterOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 text-sm rounded-xl transition-all duration-200 ${
                                activeLanguage === lang 
                                  ? 'bg-purple-500 text-white shadow-lg' 
                                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="flex items-center">
                                <span className={`inline-block w-3 h-3 rounded-full mr-3 ${getLanguageColor(lang).split(' ')[0]}`}></span>
                                <span className="truncate">{lang}</span>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Desktop language filter */}
              <div className="relative hidden md:block" ref={languageFilterRef}>
                <motion.button
                  onClick={() => setIsLanguageFilterOpen(!isLanguageFilterOpen)}
                  className="flex items-center justify-center px-6 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaCode className="mr-2" />
                  <span>{activeLanguage === 'all' ? 'All Languages' : activeLanguage}</span>
                </motion.button>
                
                <AnimatePresence>
                  {isLanguageFilterOpen && (
                    <motion.div 
                      className="absolute right-0 mt-3 w-64 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-2xl z-20 border border-gray-200 dark:border-gray-700 max-h-96 overflow-y-auto"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-4">
                        <motion.button
                          onClick={() => {
                            setActiveLanguage('all');
                            setIsLanguageFilterOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 text-sm rounded-xl transition-all duration-200 mb-2 ${
                            activeLanguage === 'all' 
                              ? 'bg-blue-500 text-white shadow-lg' 
                              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          All Languages
                        </motion.button>
                        {Array.from(availableLanguages).map(lang => (
                          <motion.button
                            key={lang}
                            onClick={() => {
                              setActiveLanguage(lang);
                              setIsLanguageFilterOpen(false);
                            }}
                            className={`w-full text-left px-4 py-3 text-sm rounded-xl flex items-center transition-all duration-200 mb-1 ${
                              activeLanguage === lang 
                                ? 'bg-purple-500 text-white shadow-lg' 
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className={`inline-block w-3 h-3 rounded-full mr-3 ${getLanguageColor(lang).split(' ')[0]}`}></span>
                            {lang}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          
          {/* Active filters */}
          <AnimatePresence>
            {(activeFilter !== 'all' || activeLanguage !== 'all') && (
              <motion.div 
                className="flex flex-wrap gap-3 items-center justify-center sm:justify-start"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400 flex items-center">
                  <FaFilter className="mr-2" />
                  Active filters:
                </span>
                {activeFilter !== 'all' && (
                  <motion.span 
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {filters.find(f => f.id === activeFilter)?.label || activeFilter}
                    <motion.button 
                      onClick={() => setActiveFilter('all')}
                      className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-400 hover:bg-blue-300 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      ×
                    </motion.button>
                  </motion.span>
                )}
                {activeLanguage !== 'all' && (
                  <motion.span 
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${getLanguageColor(activeLanguage).split(' ')[0]}`}></span>
                    {activeLanguage}
                    <motion.button 
                      onClick={() => setActiveLanguage('all')}
                      className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-purple-400 hover:bg-purple-300 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      ×
                    </motion.button>
                  </motion.span>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Desktop category filters */}
          <div className="hidden md:flex flex-wrap items-center justify-center gap-3">
            {filters.map(filter => (
              <motion.button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as any)}
                className={`px-4 py-2 text-sm rounded-full transition-all duration-300 flex items-center shadow-lg ${
                  activeFilter === filter.id 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-500/30' 
                    : 'bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter.icon}
                <span>{filter.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-20 h-20 border-4 border-purple-500/20 border-b-purple-500 rounded-full animate-spin animate-reverse"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <FaRocket className="text-2xl text-blue-500 animate-pulse" />
              </div>
            </div>
          </div>
        ) : error ? (
          <motion.div 
            className="text-center py-20 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaGithub className="text-3xl text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">{error}</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">Unable to load projects from GitHub</p>
            <motion.button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Try Again
            </motion.button>
          </motion.div>
        ) : filteredRepos.length > 0 ? (
          <div className="relative">
            {/* Desktop Navigation Buttons */}
            <motion.button
              onClick={() => scrollCarousel('left')}
              className={`${!showLeftButton ? 'opacity-30 cursor-not-allowed' : 'opacity-90 hover:opacity-100'} hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-20 w-14 h-14 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 border border-gray-200 dark:border-gray-700`}
              aria-label="Previous projects"
              disabled={!showLeftButton}
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaChevronLeft className="h-6 w-6" />
            </motion.button>
            
            <motion.button
              onClick={() => scrollCarousel('right')}
              className={`${!showRightButton ? 'opacity-30 cursor-not-allowed' : 'opacity-90 hover:opacity-100'} hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-20 w-14 h-14 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl items-center justify-center text-gray-700 dark:text-gray-200 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 border border-gray-200 dark:border-gray-700`}
              aria-label="Next projects"
              disabled={!showRightButton}
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaChevronRight className="h-6 w-6" />
            </motion.button>

            <motion.div
              ref={carouselRef}
              className="flex overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide gap-8 lg:gap-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              <style dangerouslySetInnerHTML={{
                __html: `
                  .scrollbar-hide::-webkit-scrollbar { display: none; }
                  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
                `
              }} />
              <AnimatePresence>
                {filteredRepos.map((repo, i) => (
                  <motion.div
                    key={repo.id}
                    layout
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -30, scale: 0.9 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: i * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    className="flex-none w-96 group cursor-pointer"
                    whileHover={{ y: -8 }}
                  >
                    {/* Modern Card Design */}
                    <div className="relative h-full bg-gradient-to-br from-white via-white to-gray-50/50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900/50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden backdrop-blur-sm">
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Header with Language Badge */}
                      <div className="relative p-6 pb-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                              <Link to={`/project/${repo.name}`} className="hover:underline">
                                {repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </Link>
                            </h3>
                            {repo.language && (
                              <div className="flex items-center space-x-2">
                                <span className={`inline-block w-3 h-3 rounded-full ${getLanguageColor(repo.language).split(' ')[0]}`}></span>
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{repo.language}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <div className="flex items-center space-x-1 px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                              <FaStar className="w-3 h-3 text-yellow-500" />
                              <span className="text-xs font-medium text-yellow-700 dark:text-yellow-400">{repo.stargazers_count}</span>
                            </div>
                          </div>
                        </div>

                        {/* Statistics Row */}
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
                            <FaCodeBranch className="w-3 h-3" />
                            <span>{repo.forks_count}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
                            <FaEye className="w-3 h-3" />
                            <span>{repo.watchers_count}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
                            <FaCalendarAlt className="w-3 h-3" />
                            <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="relative px-6 pb-6">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {Array.from(new Set([
                            ...categorizeProject(repo)
                          ])).slice(0, 3).map((item, index) => {
                            const colorClass = getCategoryColor(item);
                            return (
                              <span 
                                key={index}
                                className={`text-xs font-medium px-3 py-1 rounded-full ${colorClass} whitespace-nowrap`}
                              >
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                              </span>
                            );
                          })}
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3 min-h-[3.75rem]">
                          {repo.description || <span className="italic text-gray-400">Explore this project to discover its functionality and features.</span>}
                        </p>

                        {/* Topics */}
                        {repo.topics && repo.topics.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-6">
                            {repo.topics.slice(0, 4).map((topic, i) => (
                              <span 
                                key={i} 
                                className="px-2 py-1 bg-gray-100/70 dark:bg-gray-700/70 text-gray-800 dark:text-gray-300 rounded-lg text-xs border border-gray-200/50 dark:border-gray-600/50 backdrop-blur-sm" 
                                title={topic}
                              >
                                #{topic}
                              </span>
                            ))}
                            {repo.topics.length > 4 && (
                              <span className="px-2 py-1 bg-gray-100/70 dark:bg-gray-700/70 text-gray-500 dark:text-gray-400 rounded-lg text-xs border border-gray-200/50 dark:border-gray-600/50">
                                +{repo.topics.length - 4}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="relative border-t border-gray-200/50 dark:border-gray-700/50">
                        <div className="flex">
                          <motion.a 
                            href={repo.html_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex-1 py-4 text-center text-gray-700 dark:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 rounded-bl-3xl transition-all duration-300 font-medium flex items-center justify-center gap-2 text-sm group/btn"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <FaGithub className="group-hover/btn:scale-110 transition-transform duration-200" /> 
                            Code
                          </motion.a>
                          <div className="w-px bg-gray-200/50 dark:bg-gray-700/50"></div>
                          <motion.div className="flex-1">
                            <Link 
                              to={`/project/${repo.name}`} 
                              className="block py-4 text-center text-gray-700 dark:text-gray-200 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 rounded-br-3xl transition-all duration-300 font-medium group/btn"
                            >
                              <motion.div 
                                className="flex items-center justify-center gap-2 text-sm"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <span>Details</span>
                                <FaChevronRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform duration-200" />
                              </motion.div>
                            </Link>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
            
            {/* Mobile navigation buttons */}
            <div className="lg:hidden flex justify-center gap-4 mt-8">
              <motion.button
                onClick={() => scrollCarousel('left')}
                disabled={!showLeftButton}
                className={`p-4 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 shadow-lg ${!showLeftButton ? 'opacity-40 cursor-not-allowed' : 'hover:bg-white dark:hover:bg-gray-800 hover:scale-105'} transition-all duration-300`}
                aria-label="Scroll left"
                whileHover={showLeftButton ? { scale: 1.1 } : {}}
                whileTap={showLeftButton ? { scale: 0.9 } : {}}
              >
                <FaChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </motion.button>
              <motion.button
                onClick={() => scrollCarousel('right')}
                disabled={!showRightButton}
                className={`p-4 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700 shadow-lg ${!showRightButton ? 'opacity-40 cursor-not-allowed' : 'hover:bg-white dark:hover:bg-gray-800 hover:scale-105'} transition-all duration-300`}
                aria-label="Scroll right"
                whileHover={showRightButton ? { scale: 1.1 } : {}}
                whileTap={showRightButton ? { scale: 0.9 } : {}}
              >
                <FaChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </motion.button>
            </div>
          </div>
        ) : (
          <motion.div 
            className="text-center py-20 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaSearch className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-4">No projects found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
              We couldn't find any projects matching your search or filter criteria. Try adjusting your filters or search terms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                onClick={() => {
                  setActiveFilter('all');
                  setActiveLanguage('all');
                  setSearchQuery('');
                }}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear All Filters
              </motion.button>
              <motion.button 
                onClick={() => setSearchQuery('')}
                className="px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-medium shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear Search
              </motion.button>
            </div>
          </motion.div>
        )}
        
        {/* Enhanced View All on GitHub */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <motion.a 
            href="https://github.com/beratmen"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-gray-800 via-gray-900 to-black dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 text-white rounded-2xl transition-all duration-300 font-semibold shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 text-lg group relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative flex items-center space-x-3">
              <FaGithub className="text-2xl group-hover:scale-110 transition-transform duration-300" />
              <span>Explore All Projects on GitHub</span>
              <FaExternalLinkAlt className="text-sm group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
          </motion.a>
          
          <motion.p 
            className="mt-4 text-gray-600 dark:text-gray-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            Visit my GitHub profile to see all {repos.length}+ repositories and contributions
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
