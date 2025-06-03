import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch, FaEye, FaHistory, FaCircle, FaArrowRight } from 'react-icons/fa';
import { fetchGitHubRepos, fetchRepoReadme, fetchRepoLanguages, GitHubRepo } from '../services/github';
import ReactMarkdown from 'react-markdown';

const ProjectDetail: React.FC = () => {
  const { projectName } = useParams<{ projectName: string }>();
  const [repo, setRepo] = useState<GitHubRepo | null>(null);
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
        // Replace 'beratmen' with your actual GitHub username
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
  
  if (isLoading) {
    return (
      <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (error || !repo) {
    return (
      <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">{error || 'Project not found'}</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              The project you're looking for doesn't exist or couldn't be loaded.
            </p>
            <Link 
              to="/#projects" 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Projects
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Project Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {repo.name.replace(/-/g, ' ')}
              </h1>
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
                {repo.description}
              </p>
              
              {/* Topics */}
              {repo.topics.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {repo.topics.map((topic, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex mt-4 md:mt-0">
              <a 
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded-lg mr-3 flex items-center"
              >
                <FaGithub className="mr-2" />
                <span>View on GitHub</span>
              </a>
              
              {repo.homepage && (
                <a 
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center"
                >
                  <FaExternalLinkAlt className="mr-2" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          </div>
          
          {/* Project Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <FaStar className="text-yellow-400 mr-2" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">Stars</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{repo.stargazers_count}</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <FaCodeBranch className="text-green-500 mr-2" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">Forks</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{repo.forks_count}</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <FaEye className="text-blue-500 mr-2" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">Watchers</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{repo.watchers_count || 0}</p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <FaHistory className="text-purple-500 mr-2" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">Last Updated</span>
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{formatDate(repo.pushed_at)}</p>
            </div>
          </div>
          
          {/* Language Stats */}
          {Object.keys(languages).length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Languages</h3>
              
              <div className="mb-2 h-6 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                {Object.entries(languages).map(([lang, bytes]) => {
                  const percentage = (bytes / totalLanguageBytes) * 100;
                  const color = languageColors[lang] || languageColors.default;
                  return (
                    <div 
                      key={lang}
                      className={`h-full ${color} float-left`}
                      style={{ width: `${percentage}%` }}
                      title={`${lang}: ${percentage.toFixed(1)}%`}
                    ></div>
                  );
                })}
              </div>
              
              <div className="flex flex-wrap gap-4">
                {Object.entries(languages).map(([lang, bytes]) => {
                  const percentage = (bytes / totalLanguageBytes) * 100;
                  return (
                    <div key={lang} className="flex items-center">
                      <FaCircle className={`mr-1 text-xs ${languageColors[lang] || languageColors.default}`} />
                      <span className="font-medium text-gray-800 dark:text-gray-200 text-base">{lang}</span>
                      <span className="ml-1 text-gray-600 dark:text-gray-400 text-sm">
                        {percentage.toFixed(1)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        
        {/* Project README */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 markdown-body">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <FaGithub className="mr-3" />
            README
          </h2>
          
          {readme ? (
            <div className="prose prose-lg max-w-none dark:prose-invert 
                           prose-headings:text-gray-900 dark:prose-headings:text-white
                           prose-p:text-gray-700 dark:prose-p:text-gray-300
                           prose-p:leading-relaxed prose-p:my-4
                           prose-a:text-blue-600 dark:prose-a:text-blue-400
                           prose-a:font-medium prose-a:underline
                           prose-code:bg-gray-100 dark:prose-code:bg-gray-700
                           prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                           prose-code:text-sm prose-code:font-mono
                           prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800
                           prose-pre:p-4 prose-pre:rounded-lg
                           prose-img:rounded-md prose-img:mx-auto
                           prose-ul:my-4 prose-ol:my-4
                           prose-li:my-1 prose-li:text-gray-700 dark:prose-li:text-gray-300">
              <ReactMarkdown>{readme}</ReactMarkdown>
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400 italic">
              No README file found for this project.
            </p>
          )}
        </div>
        
        {/* Related Projects Section */}
        {relatedRepos.length > 0 && (
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedRepos.map(relatedRepo => (
                <Link
                  key={relatedRepo.id}
                  to={`/project/${relatedRepo.name}`}
                  className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors flex flex-col"
                >
                  <h3 className="font-bold text-gray-800 dark:text-white mb-2 truncate">{relatedRepo.name.replace(/-/g, ' ')}</h3>
                  {relatedRepo.language && (
                    <div className="flex items-center mt-auto pt-2">
                      <span className={`w-3 h-3 rounded-full mr-1.5 ${getLanguageColor(relatedRepo.language).bg}`}></span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{relatedRepo.language}</span>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
        
        {/* Back to Projects Button */}
        <div className="mt-8 text-center">
          <Link 
            to="/#projects" 
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg inline-block transition-colors"
          >
            ← Back to Projects
          </Link>
        </div>
        
        {/* Floating Project Navigation */}
        <div className="fixed bottom-8 right-8 z-50">
          <button 
            onClick={() => setShowNavigation(prev => !prev)}
            className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors focus:outline-none"
            aria-label="Toggle project navigation"
          >
            <FaGithub className={`text-xl ${showNavigation ? 'opacity-0' : 'opacity-100'} absolute transition-opacity`} />
            <svg 
              className={`w-5 h-5 ${showNavigation ? 'opacity-100' : 'opacity-0'} absolute transition-opacity`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {showNavigation && (
            <div className="absolute bottom-16 right-0 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 transform transition-transform origin-bottom-right">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                Browse Projects
              </h3>
              <div className="max-h-96 overflow-y-auto pr-1 space-y-2">
                {relatedRepos.length > 0 ? (
                  <>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Related to this project:</p>
                    {relatedRepos.map(repo => (
                      <Link
                        key={repo.id}
                        to={`/project/${repo.name}`}
                        className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-center">
                          <div className="flex-shrink-0 mr-3">
                            {repo.language && (
                              <span className={`block w-3 h-3 rounded-full ${getLanguageColor(repo.language).bg}`}></span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {repo.name.replace(/-/g, ' ')}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                    <div className="border-t border-gray-200 dark:border-gray-700 my-3"></div>
                  </>
                ) : null}
                
                <Link
                  to="/#projects"
                  className="flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mt-2"
                >
                  <span>All Projects</span>
                  <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;