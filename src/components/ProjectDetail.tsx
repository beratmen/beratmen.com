import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaStar, 
  FaCodeBranch, 
  FaEye, 
  FaCircle, 
  FaArrowRight,
  FaCode,
  FaCalendarAlt,
  FaDownload,
  FaUsers,
  FaTag,
  FaChevronLeft,
  FaHome,
  FaRocket,
  FaLayerGroup,
  FaCog
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchGitHubRepos, fetchRepoReadme, fetchRepoLanguages, GitHubRepo } from '../services/github';
import projects, { Project } from '../data/projects';
import ReactMarkdown from 'react-markdown';

const ProjectDetail: React.FC = () => {
  const { projectName } = useParams<{ projectName: string }>();
  const [repo, setRepo] = useState<GitHubRepo | null>(null);
  const [customProject, setCustomProject] = useState<Project | null>(null);
  const [readme, setReadme] = useState<string>('');
  const [languages, setLanguages] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Add these new states for related projects
  const [relatedRepos, setRelatedRepos] = useState<GitHubRepo[]>([]);
  const [showNavigation, setShowNavigation] = useState(false);
  
  useEffect(() => {
    async function loadProjectDetails() {
      setIsLoading(true);
      try {
        // First, check if this is a custom project
        const customProj = projects.find(p => p.id === projectName);
        if (customProj) {
          setCustomProject(customProj);
          setReadme(customProj.detailedDescription);
          
          // If custom project has githubUrl, try to fetch additional GitHub data
          if (customProj.githubUrl) {
            try {
              const repoName = customProj.githubUrl.split('/').pop() || '';
              const repos = await fetchGitHubRepos('beratmen');
              const githubRepo = repos.find(r => r.name === repoName);
              if (githubRepo) {
                setRepo(githubRepo);
                const languagesData = await fetchRepoLanguages(githubRepo.name, 'beratmen');
                setLanguages(languagesData);
              }
              setRelatedRepos(repos.filter(r => r.name !== repoName));
            } catch (err) {
              console.log('Could not fetch GitHub data for custom project');
            }
          } else {
            // For custom projects without GitHub, load all repos for related projects
            try {
              const repos = await fetchGitHubRepos('beratmen');
              setRelatedRepos(repos);
            } catch (err) {
              console.log('Could not fetch related repositories');
            }
          }
        } else {
          // This is a GitHub repository
          const repos = await fetchGitHubRepos('beratmen');
          const currentRepo = repos.find(r => r.name === projectName);
          
          if (!currentRepo) {
            setError('Project not found');
            return;
          }
          
          setRepo(currentRepo);
          
          // Find related projects based on language or topics
          const related = repos.filter(r => r.id !== currentRepo.id);
          setRelatedRepos(related);
          
          // Fetch README and languages in parallel
          const [readmeContent, languagesData] = await Promise.all([
            fetchRepoReadme(currentRepo.name, 'beratmen'),
            fetchRepoLanguages(currentRepo.name, 'beratmen')
          ]);
          
          setReadme(readmeContent);
          setLanguages(languagesData);
        }
        
      } catch (err) {
        console.error('Error loading project details:', err);
        setError('Failed to load project details');
      } finally {
        setIsLoading(false);
      }
    }
    
    if (projectName) {
      loadProjectDetails();
      // Reset scroll position to top when changing projects
      window.scrollTo(0, 0);
    }
  }, [projectName]);
  
  // Format date to readable format
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Calculate total bytes for languages
  const totalLanguageBytes = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
  
  // Language colors mapping (add more as needed)
  const languageColors: Record<string, string> = {
    JavaScript: 'bg-yellow-300',
    TypeScript: 'bg-blue-500',
    HTML: 'bg-orange-600',
    CSS: 'bg-blue-400',
    Python: 'bg-green-500',
    Java: 'bg-red-500',
    C: 'bg-gray-600',
    'C++': 'bg-pink-500',
    'C#': 'bg-purple-500',
    Ruby: 'bg-red-600',
    PHP: 'bg-indigo-400',
    Swift: 'bg-orange-500',
    Go: 'bg-cyan-500',
    Rust: 'bg-brown-500',
    Kotlin: 'bg-purple-400',
    default: 'bg-gray-400'
  };
  
  const getLanguageColor = (language: string) => {
    const bgClass = languageColors[language] || languageColors.default;
    const textClass = bgClass.replace('bg-', 'text-');
    return { bg: bgClass, text: textClass };
  };
  
  // Get project data - either from custom projects or GitHub repo
  const currentProject = customProject || (repo ? {
    title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    description: repo.description || '',
    technologies: repo.language ? [repo.language] : [],
    githubUrl: repo.html_url,
    liveUrl: repo.homepage,
    status: 'completed' as const,
    startDate: repo.created_at,
    endDate: repo.updated_at,
    category: 'web'
  } : null);

  if (isLoading) {
    return (
      <div className="min-h-screen py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40 dark:from-gray-900 dark:via-blue-950/20 dark:to-indigo-950/30 flex justify-center items-center">
        <motion.div 
          className="relative"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-24 h-24 border-4 border-blue-500/20 border-t-blue-500 rounded-full"></div>
          <div className="absolute inset-0 w-24 h-24 border-4 border-purple-500/20 border-b-purple-500 rounded-full animate-spin animate-reverse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <FaRocket className="text-3xl text-blue-500 animate-pulse" />
          </div>
        </motion.div>
      </div>
    );
  }
  
  if (error || (!repo && !customProject)) {
    return (
      <div className="min-h-screen py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40 dark:from-gray-900 dark:via-blue-950/20 dark:to-indigo-950/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center border border-gray-200/50 dark:border-gray-700/50 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-8">
              <FaGithub className="text-4xl text-red-500" />
            </div>
            <h2 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-6">{error || 'Project not found'}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg leading-relaxed">
              The project you're looking for doesn't exist or couldn't be loaded. It might have been moved or deleted.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/#projects" 
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <FaChevronLeft className="mr-2" />
                  Back to Projects
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/" 
                  className="inline-flex items-center px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-2xl font-semibold shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300"
                >
                  <FaHome className="mr-2" />
                  Go Home
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40 dark:from-gray-900 dark:via-blue-950/20 dark:to-indigo-950/30">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-32 -top-32 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute left-10 top-1/4 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-pink-500/10 dark:from-indigo-400/10 dark:to-pink-400/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute right-1/3 bottom-20 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-blue-500/10 dark:from-purple-400/10 dark:to-blue-400/10 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Breadcrumb Navigation */}
          <motion.div 
            className="flex items-center space-x-2 mb-8 text-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link to="/#projects" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
              Projects
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 dark:text-gray-400">{currentProject?.title || 'Unknown Project'}</span>
          </motion.div>

          {/* Project Header */}
          <motion.div 
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-12 mb-8 border border-gray-200/50 dark:border-gray-700/50"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Header Content */}
            <div className="flex flex-col lg:flex-row justify-between items-start mb-8">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-4">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <FaRocket className="text-2xl text-white" />
                  </motion.div>
                  <div>
                    <h1 className="text-3xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400">
                      {currentProject?.title || 'Unknown Project'}
                    </h1>
                    <div className="flex items-center space-x-4 mt-2">
                      {(repo?.language || currentProject?.technologies?.[0]) && (
                        <div className="flex items-center space-x-2">
                          <span className={`w-3 h-3 rounded-full ${getLanguageColor(repo?.language || currentProject?.technologies?.[0] || '').bg}`}></span>
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{repo?.language || currentProject?.technologies?.[0]}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                        <FaCalendarAlt className="w-3 h-3" />
                        <span>Updated {formatDate(repo?.pushed_at || currentProject?.endDate || currentProject?.startDate || new Date().toISOString())}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-lg lg:text-xl leading-relaxed text-gray-700 dark:text-gray-300 mb-6 max-w-3xl">
                  {currentProject?.description || "Explore this innovative project and discover its unique features and capabilities."}
                </p>
                
                {/* Project Topics/Technologies */}
                {(repo?.topics?.length || customProject?.technologies?.length) && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {(repo?.topics || customProject?.technologies || []).map((item, index) => (
                      <motion.span 
                        key={index}
                        className="inline-flex items-center px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium rounded-full border border-blue-200 dark:border-blue-800"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <FaTag className="w-3 h-3 mr-1" />
                        {item}
                      </motion.span>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6 lg:mt-0 lg:ml-8">
                {(repo?.html_url || currentProject?.githubUrl) && (
                  <motion.a 
                    href={repo?.html_url || currentProject?.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub className="mr-2 text-lg" />
                    View Source
                  </motion.a>
                )}
                
                {(repo?.homepage || currentProject?.liveUrl) && (
                  <motion.a 
                    href={(repo?.homepage || currentProject?.liveUrl) || ''}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaExternalLinkAlt className="mr-2" />
                    Live Demo
                  </motion.a>
                )}
                
                <motion.button 
                  className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-2xl font-semibold shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigator.clipboard.writeText(repo?.html_url || currentProject?.githubUrl || window.location.href)}
                >
                  <FaDownload className="mr-2" />
                  Copy Link
                </motion.button>
              </div>
            </div>
            
            {/* Project Statistics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {repo && (
                <>
                  <motion.div 
                    className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 p-6 rounded-2xl border border-yellow-200 dark:border-yellow-800"
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <FaStar className="text-2xl text-yellow-500" />
                      <span className="text-xs font-medium text-yellow-700 dark:text-yellow-400 bg-yellow-200 dark:bg-yellow-900/50 px-2 py-1 rounded-full">STARS</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{repo.stargazers_count}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">GitHub Stars</p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-2xl border border-green-200 dark:border-green-800"
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <FaCodeBranch className="text-2xl text-green-500" />
                      <span className="text-xs font-medium text-green-700 dark:text-green-400 bg-green-200 dark:bg-green-900/50 px-2 py-1 rounded-full">FORKS</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{repo.forks_count}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Repository Forks</p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-800"
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <FaEye className="text-2xl text-blue-500" />
                      <span className="text-xs font-medium text-blue-700 dark:text-blue-400 bg-blue-200 dark:bg-blue-900/50 px-2 py-1 rounded-full">WATCHERS</span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{repo.watchers_count || 0}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Active Watchers</p>
                  </motion.div>
                </>
              )}
              
              <motion.div 
                className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-2xl border border-purple-200 dark:border-purple-800"
                whileHover={{ scale: 1.02, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <FaUsers className="text-2xl text-purple-500" />
                  <span className="text-xs font-medium text-purple-700 dark:text-purple-400 bg-purple-200 dark:bg-purple-900/50 px-2 py-1 rounded-full">STATUS</span>
                </div>
                <p className="text-xl font-bold text-gray-900 dark:text-white capitalize">
                  {customProject?.status || (repo ? 'Active' : 'Unknown')}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Project Status</p>
              </motion.div>
              
              {customProject?.features && (
                <motion.div 
                  className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 p-6 rounded-2xl border border-indigo-200 dark:border-indigo-800"
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <FaCog className="text-2xl text-indigo-500" />
                    <span className="text-xs font-medium text-indigo-700 dark:text-indigo-400 bg-indigo-200 dark:bg-indigo-900/50 px-2 py-1 rounded-full">FEATURES</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{customProject.features.length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Key Features</p>
                </motion.div>
              )}
              
              {customProject?.technologies && (
                <motion.div 
                  className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 p-6 rounded-2xl border border-teal-200 dark:border-teal-800"
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <FaCode className="text-2xl text-teal-500" />
                    <span className="text-xs font-medium text-teal-700 dark:text-teal-400 bg-teal-200 dark:bg-teal-900/50 px-2 py-1 rounded-full">TECH</span>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">{customProject.technologies.length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Technologies Used</p>
                </motion.div>
              )}
            </div>
            
            {/* Language Statistics */}
            {Object.keys(languages).length > 0 && (
              <motion.div 
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <FaLayerGroup className="mr-3 text-blue-500" />
                  Language Breakdown
                </h3>
                
                <div className="mb-4 h-4 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 shadow-inner">
                  {Object.entries(languages).map(([lang, bytes]) => {
                    const percentage = (bytes / totalLanguageBytes) * 100;
                    const color = languageColors[lang] || languageColors.default;
                    return (
                      <motion.div 
                        key={lang}
                        className={`h-full ${color} float-left`}
                        style={{ width: `${percentage}%` }}
                        title={`${lang}: ${percentage.toFixed(1)}%`}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    );
                  })}
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {Object.entries(languages).map(([lang, bytes], index) => {
                    const percentage = (bytes / totalLanguageBytes) * 100;
                    return (
                      <motion.div 
                        key={lang} 
                        className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      >
                        <FaCircle className={`text-sm ${languageColors[lang] || languageColors.default}`} />
                        <div>
                          <span className="font-semibold text-gray-800 dark:text-gray-200 text-sm">{lang}</span>
                          <div className="text-xs text-gray-600 dark:text-gray-400">
                            {percentage.toFixed(1)}%
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </motion.div>
          {/* Project README */}
          <motion.div 
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-12 mb-8 border border-gray-200/50 dark:border-gray-700/50"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                <FaGithub className="text-xl text-white" />
              </div>
              Documentation
            </h2>
            
            {readme ? (
              <div className="prose prose-lg max-w-none dark:prose-invert 
                             prose-headings:text-gray-900 dark:prose-headings:text-white
                             prose-headings:font-bold prose-headings:mb-4 prose-headings:mt-8
                             prose-p:text-gray-700 dark:prose-p:text-gray-300
                             prose-p:leading-relaxed prose-p:my-6
                             prose-a:text-blue-600 dark:prose-a:text-blue-400
                             prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                             prose-code:bg-gray-100 dark:prose-code:bg-gray-800
                             prose-code:px-2 prose-code:py-1 prose-code:rounded-md
                             prose-code:text-sm prose-code:font-mono prose-code:text-pink-600 dark:prose-code:text-pink-400
                             prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800
                             prose-pre:p-6 prose-pre:rounded-2xl prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700
                             prose-img:rounded-xl prose-img:shadow-lg prose-img:mx-auto
                             prose-ul:my-6 prose-ol:my-6
                             prose-li:my-2 prose-li:text-gray-700 dark:prose-li:text-gray-300
                             prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-950/30
                             prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl
                             prose-table:border-collapse prose-table:border prose-table:border-gray-200 dark:prose-table:border-gray-700
                             prose-th:bg-gray-100 dark:prose-th:bg-gray-800 prose-th:p-3
                             prose-td:p-3 prose-td:border prose-td:border-gray-200 dark:prose-td:border-gray-700">
                <ReactMarkdown>{readme}</ReactMarkdown>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaGithub className="text-3xl text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">No Documentation Available</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  This project doesn't have a README file yet, but you can explore the source code to learn more.
                </p>
                <motion.a 
                  href={repo?.html_url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaGithub className="mr-2" />
                  Explore Source Code
                </motion.a>
              </div>
            )}
          </motion.div>

          {/* Custom Project Features Section */}
          {customProject && (
            <>
              {customProject.features && customProject.features.length > 0 && (
                <motion.div 
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-12 mb-8 border border-gray-200/50 dark:border-gray-700/50"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                      <FaCog className="text-xl text-white" />
                    </div>
                    Key Features
                  </h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {customProject.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start space-x-4 p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-800"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                      >
                        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
                          <span className="text-white font-bold text-sm">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800 dark:text-gray-200 font-medium">{feature}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {customProject.technologies && customProject.technologies.length > 0 && (
                <motion.div 
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-12 mb-8 border border-gray-200/50 dark:border-gray-700/50"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                >
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                      <FaCode className="text-xl text-white" />
                    </div>
                    Technologies Used
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {customProject.technologies.map((tech, index) => (
                      <motion.span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              )}

              {customProject.challenges && customProject.challenges.length > 0 && (
                <motion.div 
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-12 mb-8 border border-gray-200/50 dark:border-gray-700/50"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                      <FaRocket className="text-xl text-white" />
                    </div>
                    Challenges & Solutions
                  </h2>
                  <div className="space-y-6">
                    {customProject.challenges.map((challenge, index) => (
                      <motion.div
                        key={index}
                        className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl border border-orange-200 dark:border-orange-800"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.55 + index * 0.1 }}
                        whileHover={{ scale: 1.01, y: -2 }}
                      >
                        <p className="text-gray-800 dark:text-gray-200">{challenge}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {customProject.learnings && customProject.learnings.length > 0 && (
                <motion.div 
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-12 mb-8 border border-gray-200/50 dark:border-gray-700/50"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.55 }}
                >
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                      <FaUsers className="text-xl text-white" />
                    </div>
                    Key Learnings
                  </h2>
                  <div className="space-y-6">
                    {customProject.learnings.map((learning, index) => (
                      <motion.div
                        key={index}
                        className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-200 dark:border-purple-800"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        whileHover={{ scale: 1.01, y: -2 }}
                      >
                        <p className="text-gray-800 dark:text-gray-200">{learning}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </>
          )}
          
          {/* Related Projects Section */}
          {relatedRepos.length > 0 && (
            <motion.div 
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 lg:p-12 mb-8 border border-gray-200/50 dark:border-gray-700/50"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <FaLayerGroup className="text-xl text-white" />
                </div>
                Related Projects
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {relatedRepos.slice(0, 8).map((relatedRepo, index) => (
                  <motion.div
                    key={relatedRepo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  >
                    <Link
                      to={`/project/${relatedRepo.name}`}
                      className="group bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-600/50 h-44 flex flex-col"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                          <FaCode className="text-sm text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-gray-800 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {relatedRepo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </h3>
                        </div>
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between">
                        {relatedRepo.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 flex-1">
                            {relatedRepo.description}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between mt-auto">
                          {relatedRepo.language && (
                            <div className="flex items-center space-x-2">
                              <span className={`w-3 h-3 rounded-full ${getLanguageColor(relatedRepo.language).bg}`}></span>
                              <span className="text-xs text-gray-600 dark:text-gray-400">{relatedRepo.language}</span>
                            </div>
                          )}
                          <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center space-x-1">
                              <FaStar className="w-3 h-3" />
                              <span>{relatedRepo.stargazers_count}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <FaCodeBranch className="w-3 h-3" />
                              <span>{relatedRepo.forks_count}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              {relatedRepos.length > 8 && (
                <div className="text-center mt-8">
                  <Link 
                    to="/#projects"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <FaLayerGroup className="mr-2" />
                    View All {relatedRepos.length} Projects
                  </Link>
                </div>
              )}
            </motion.div>
          )}
          
          {/* Navigation Footer */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/#projects" 
                className="inline-flex items-center px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-2xl font-semibold shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300"
              >
                <FaChevronLeft className="mr-3" />
                Back to Projects
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/" 
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FaHome className="mr-3" />
                Go Home
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Action Button */}
        <motion.div 
          className="fixed bottom-8 right-8 z-50"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <motion.button 
            onClick={() => setShowNavigation(prev => !prev)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle project navigation"
          >
            <motion.div
              animate={{ rotate: showNavigation ? 45 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaRocket className="text-2xl group-hover:scale-110 transition-transform duration-200" />
            </motion.div>
          </motion.button>
          
          <AnimatePresence>
            {showNavigation && (
              <motion.div 
                className="absolute bottom-20 right-0 w-80 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                    <FaLayerGroup className="mr-3 text-blue-500" />
                    Quick Navigation
                  </h3>
                  <div className="space-y-2 max-h-80 overflow-y-auto">
                    {relatedRepos.slice(0, 6).map(repo => (
                      <Link
                        key={repo.id}
                        to={`/project/${repo.name}`}
                        className="block p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FaCode className="text-xs text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </p>
                            {repo.language && (
                              <p className="text-xs text-gray-500 dark:text-gray-400">{repo.language}</p>
                            )}
                          </div>
                          <FaChevronLeft className="w-3 h-3 text-gray-400 rotate-180 group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
                      </Link>
                    ))}
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                      <Link
                        to="/#projects"
                        className="flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium"
                      >
                        <FaLayerGroup className="mr-2" />
                        <span>View All Projects</span>
                        <FaArrowRight className="ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetail;