import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaSearch, FaStar, FaCodeBranch, FaFilter, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { fetchGitHubRepos, GitHubRepo } from '../services/github';

const Projects: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<GitHubRepo[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    async function loadGitHubRepos() {
      setIsLoading(true);
      try {
        const githubRepos = await fetchGitHubRepos('beratmen');
        setRepos(githubRepos);
        setFilteredRepos(githubRepos);
      } catch (error) {
        console.error('Failed to load repositories:', error);
        setError('Failed to load GitHub repositories');
      } finally {
        setIsLoading(false);
      }
    }
    
    loadGitHubRepos();
  }, []);
  
  // Get all unique languages from repos
  const languages = [...new Set(repos.map(repo => repo.language).filter(Boolean))];
  
  // Language colors mapping
  const languageColors: Record<string, {text: string, bg: string}> = {
    JavaScript: {text: 'text-yellow-400', bg: 'bg-yellow-400'},
    TypeScript: {text: 'text-blue-500', bg: 'bg-blue-500'},
    HTML: {text: 'text-orange-600', bg: 'bg-orange-600'},
    CSS: {text: 'text-blue-400', bg: 'bg-blue-400'},
    Python: {text: 'text-green-500', bg: 'bg-green-500'},
    Java: {text: 'text-red-500', bg: 'bg-red-500'},
    C: {text: 'text-gray-600', bg: 'bg-gray-600'},
    'C++': {text: 'text-pink-500', bg: 'bg-pink-500'},
    'C#': {text: 'text-purple-500', bg: 'bg-purple-500'},
    Ruby: {text: 'text-red-600', bg: 'bg-red-600'},
    PHP: {text: 'text-indigo-400', bg: 'bg-indigo-400'},
    Swift: {text: 'text-orange-500', bg: 'bg-orange-500'},
    Go: {text: 'text-cyan-500', bg: 'bg-cyan-500'},
    Rust: {text: 'text-amber-600', bg: 'bg-amber-600'},
    Kotlin: {text: 'text-purple-400', bg: 'bg-purple-400'},
    default: {text: 'text-gray-400', bg: 'bg-gray-400'}
  };
  
  // Handle filtering and searching
  useEffect(() => {
    let result = [...repos];
    
    // Apply category filter
    if (activeFilter !== 'all') {
      if (activeFilter === 'featured') {
        result = result.filter(repo => repo.stargazers_count > 0 || repo.topics.includes('featured'));
      } else {
        // Filter by language
        result = result.filter(repo => repo.language === activeFilter);
      }
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(repo => 
        repo.name.toLowerCase().includes(query) ||
        (repo.description && repo.description.toLowerCase().includes(query)) ||
        repo.topics.some(topic => topic.toLowerCase().includes(query))
      );
    }
    
    setFilteredRepos(result);
    // Reset scroll position when filters change
    setScrollPosition(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, [activeFilter, searchQuery, repos]);
  
  // Available filters
  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'featured', label: 'Featured' },
    ...languages.slice(0, 6).map(lang => ({ id: lang, label: lang }))
  ];

  // Helper function to get language color
  const getLanguageColor = (language: string | null) => {
    if (!language) return languageColors.default;
    return languageColors[language] || languageColors.default;
  };

  // Scroll functions for navigation buttons
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      
      // If we're at or near the beginning, scroll to the end
      if (scrollPosition <= 50) {
        const maxScroll = container.scrollWidth - container.clientWidth;
        container.scrollTo({
          left: maxScroll,
          behavior: 'smooth'
        });
        setScrollPosition(maxScroll);
      } else {
        // Otherwise, continue scrolling left
        const newPosition = Math.max(scrollPosition - 800, 0);
        container.scrollTo({
          left: newPosition,
          behavior: 'smooth'
        });
        setScrollPosition(newPosition);
      }
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const maxScroll = container.scrollWidth - container.clientWidth;
      
      // If we're at or near the end, scroll back to the beginning
      if (scrollPosition >= maxScroll - 50) {
        container.scrollTo({
          left: 0,
          behavior: 'smooth'
        });
        setScrollPosition(0);
      } else {
        // Otherwise, continue scrolling right
        const newPosition = Math.min(scrollPosition + 800, maxScroll);
        container.scrollTo({
          left: newPosition,
          behavior: 'smooth'
        });
        setScrollPosition(newPosition);
      }
    }
  };

  // Update scroll position when container is scrolled manually
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-gray-900 mobile-container safe-area-inset-bottom">
      <div className="container mx-auto px-4 sm:px-6 mobile-spacing">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-3">Portfolio</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white mobile-text-lg">My GitHub Projects</h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mobile-text-base">
            Explore open-source projects I've created and contributed to.
          </p>
        </div>
        
        {/* Search and Filter */}
        <div className="mb-8 sm:mb-10 mobile-spacing">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            {/* Search Input */}
            <div className="relative w-full sm:w-auto">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-80 pl-10 pr-4 py-3 sm:py-4 text-base bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 
                         rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white
                         mobile-input touch-feedback"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
            </div>
            
            {/* Filter Dropdown for Mobile */}
            <div className="sm:hidden w-full">
              <div className="relative">
                <select
                  value={activeFilter}
                  onChange={(e) => setActiveFilter(e.target.value)}
                  className="w-full appearance-none pl-10 pr-10 py-3 sm:py-4 text-base bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 
                           rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white
                           mobile-input touch-feedback"
                >
                  {filters.map(filter => (
                    <option key={filter.id} value={filter.id}>{filter.label}</option>
                  ))}
                </select>
                <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            
            {/* Filter Pills for Desktop */}
            <div className="hidden sm:flex flex-wrap gap-2">
              {filters.map(filter => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === filter.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Statistics Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 mobile-spacing">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 sm:p-4 text-center mobile-card">
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mb-1">My Projects</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">{repos.length}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 sm:p-4 text-center mobile-card">
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mb-1">Featured</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                {repos.filter(repo => repo.stargazers_count > 0 || repo.topics.includes('featured')).length}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 sm:p-4 text-center mobile-card">
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mb-1">Top Language</p>
              <p className="text-sm sm:text-lg font-bold text-gray-900 dark:text-white truncate" title={languages[0] || 'N/A'}>
                {languages[0] || 'N/A'}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-3 sm:p-4 text-center mobile-card">
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mb-1">Total Stars</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white">
                {repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)}
              </p>
            </div>
          </div>
        </div>
        
        {/* Projects Carousel - Horizontal Scrollable Layout */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow">
            <FaGithub className="text-4xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">{error}</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Unable to load projects from GitHub</p>
          </div>
        ) : filteredRepos.length > 0 ? (
          <div className="relative">
            {/* Navigation buttons - Hidden on mobile, shown on larger screens */}
            <button 
              onClick={scrollLeft}
              className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 shadow-lg rounded-full p-3 sm:p-4 transition-all backdrop-blur-sm border border-transparent hover:border-blue-300 dark:hover:border-blue-700 group overflow-hidden mobile-touch-target"
              aria-label="Scroll left or go to end"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-600/10 via-indigo-500/10 to-purple-500/10 dark:from-blue-400/20 dark:via-indigo-300/20 dark:to-purple-400/20 transition-opacity duration-300"></div>
              <FaChevronLeft className="text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 transform group-hover:scale-110 transition-transform duration-300" />
            </button>
            
            <button 
              onClick={scrollRight}
              className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 dark:bg-gray-800/90 shadow-lg rounded-full p-3 sm:p-4 transition-all backdrop-blur-sm border border-transparent hover:border-blue-300 dark:hover:border-blue-700 group overflow-hidden mobile-touch-target"
              aria-label="Scroll right or go to beginning"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-blue-600/10 via-indigo-500/10 to-purple-500/10 dark:from-blue-400/20 dark:via-indigo-300/20 dark:to-purple-400/20 transition-opacity duration-300"></div>
              <FaChevronRight className="text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 transform group-hover:scale-110 transition-transform duration-300" />
            </button>
            
            {/* Scrollable container */}
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto pb-6 sm:pb-8 snap-x snap-mandatory gap-4 sm:gap-6 px-1 sm:px-2 mobile-scroll"
              style={{ 
                scrollbarWidth: 'none', 
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch'
              }}
              onScroll={handleScroll}
            >
              <style dangerouslySetInnerHTML={{ __html: `
                .overflow-x-auto::-webkit-scrollbar {
                  display: none;
                }
              `}} />
              
              {filteredRepos.map(repo => (
                <div
                  key={repo.id}
                  className="flex-shrink-0 w-[280px] sm:w-[320px] mx-2 sm:mx-3 first:ml-0 last:mr-0 snap-start bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 min-h-[320px] sm:min-h-[340px] max-h-[340px] flex flex-col group hover:-translate-y-1 mobile-card touch-feedback"
                >
                  <div className="flex-1 flex flex-col p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white truncate pr-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        <Link to={`/project/${repo.name}`} className="touch-feedback" title={repo.name.replace(/-/g, ' ')}>
                          {repo.name.replace(/-/g, ' ')}
                        </Link>
                      </h3>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full ${getLanguageColor(repo.language).bg}`} title={repo.language || 'Unknown'}></span>
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{repo.language || 'N/A'}</span>
                      </div>
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3 min-h-[3em] sm:min-h-[3.5em]">
                      {repo.description ? repo.description : <span className="italic text-gray-400">No description available.</span>}
                    </div>
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                      {repo.topics && repo.topics.slice(0, 3).map((topic, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full text-xs truncate max-w-[80px] sm:max-w-[100px] border border-gray-200 dark:border-gray-600" title={topic}>{topic}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-auto bg-gray-50 dark:bg-gray-700/30 rounded-lg p-2">
                      <span className="flex items-center gap-1 font-medium"><FaStar className="text-yellow-400 text-xs" /> {repo.stargazers_count}</span>
                      <span className="flex items-center gap-1 font-medium"><FaCodeBranch className="text-xs" /> {repo.forks_count}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500">{new Date(repo.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}</span>
                    </div>
                  </div>
                  <div className="flex border-t border-gray-100 dark:border-gray-700">
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 sm:py-3 text-center text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-bl-2xl transition-colors font-medium flex items-center justify-center gap-2 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 text-sm mobile-touch-target touch-feedback">
                      <FaGithub className="text-sm" /> Code
                    </a>
                    <Link to={`/project/${repo.name}`} className="flex-1 py-2 sm:py-3 text-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-br-2xl transition-colors font-medium flex items-center justify-center gap-2 group-hover:bg-gray-100 dark:group-hover:bg-gray-700/50 text-sm mobile-touch-target touch-feedback">
                      Details <FaArrowRight className="text-sm" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Scroll indicator with circular scroll hint - Hidden on mobile */}
            <div className="hidden sm:flex flex-col items-center justify-center mt-6">
              <div className="w-48 bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                {scrollContainerRef.current && (
                  <div 
                    className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 h-full rounded-full transition-all duration-300"
                    style={{ 
                      width: `${scrollContainerRef.current.clientWidth / scrollContainerRef.current.scrollWidth * 100}%`,
                      marginLeft: `${scrollPosition / scrollContainerRef.current.scrollWidth * 100}%`
                    }}
                  ></div>
                )}
              </div>
              <p className="text-xs bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent mt-3 flex items-center gap-2 font-medium">
                <span className="inline-block w-4 h-0.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400"></span>
                Use buttons to navigate or cycle through all projects
                <span className="inline-block w-4 h-0.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400"></span>
              </p>
            </div>
            
            {/* Mobile scroll hint */}
            <div className="sm:hidden text-center mt-4">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Swipe left or right to browse projects
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-xl shadow">
            <FaSearch className="text-4xl text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No projects found</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Try changing your search or filter criteria</p>
            <button 
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
        
        {/* View All on GitHub */}
        <div className="mt-12 sm:mt-16 text-center mobile-spacing">
          <a 
            href="https://github.com/beratmen"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 sm:px-6 py-3 sm:py-4 bg-blue-600 text-white dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 rounded-lg transition-colors font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-transform mobile-touch-target touch-feedback text-sm sm:text-base"
          >
            <FaGithub className="mr-2 text-base sm:text-lg" />
            <span>View All Projects on GitHub</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;

// This is where you would fetch from your actual backend
// In a production environment, uncomment this code and remove the mock data
/*
const response = await fetch(`/api/linkedin/profile/${username}`);
if (!response.ok) {
  throw new Error(`Failed to fetch LinkedIn profile: ${response.statusText}`);
}
const data = await response.json();
return {
  ...data,
  lastUpdated: new Date()
};
*/