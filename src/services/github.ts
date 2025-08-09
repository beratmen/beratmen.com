export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  homepage: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
}

// Cache for GitHub API responses
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function getFromCache(key: string) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
}

function setToCache(key: string, data: any) {
  cache.set(key, { data, timestamp: Date.now() });
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  const cacheKey = `repos-${username}`;
  const cachedData = getFromCache(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    // Silent fetch to avoid console errors
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`).catch(() => {
      // Return a mock response object for network errors
      return { ok: false, status: 403, json: () => Promise.resolve([]) };
    });
    
    if (response.status === 403 || !response.ok) {
      // Rate limited or error - use fallback data (silent handling)
      const fallbackRepos: GitHubRepo[] = [
        {
          id: 1,
          name: "beratmen.com",
          full_name: "beratmen/beratmen.com",
          html_url: "https://github.com/beratmen/beratmen.com",
          description: "Personal portfolio website built with React, TypeScript, and Tailwind CSS",
          homepage: "https://beratmen.com",
          topics: ["react", "typescript", "tailwindcss", "portfolio"],
          stargazers_count: 5,
          forks_count: 2,
          watchers_count: 5,
          language: "TypeScript",
          created_at: "2024-01-01T00:00:00Z",
          updated_at: "2025-08-09T00:00:00Z",
          pushed_at: "2025-08-09T00:00:00Z",
          fork: false
        }
      ];
      setToCache(cacheKey, fallbackRepos);
      return fallbackRepos;
    }
    
    const repos: GitHubRepo[] = await response.json();
    // Only return repositories that you created (not forks)
    const userRepos = repos.filter(repo => !repo.fork);
    // Sort by stargazers_count (stars) descending, then by updated_at descending
    userRepos.sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });
    
    setToCache(cacheKey, userRepos);
    return userRepos;
    
  } catch (error) {
    // Silent error handling for rate limiting
    if (error instanceof Error && !error.message.includes('403')) {
      console.warn('GitHub API temporarily unavailable, using fallback data');
    }
    // Return fallback data on error
    const fallbackRepos: GitHubRepo[] = [
      {
        id: 1,
        name: "beratmen.com",
        full_name: "beratmen/beratmen.com",
        html_url: "https://github.com/beratmen/beratmen.com",
        description: "Personal portfolio website built with React, TypeScript, and Tailwind CSS",
        homepage: "https://beratmen.com",
        topics: ["react", "typescript", "tailwindcss", "portfolio"],
        stargazers_count: 5,
        forks_count: 2,
        watchers_count: 5,
        language: "TypeScript",
        created_at: "2024-01-01T00:00:00Z",
        updated_at: "2025-08-09T00:00:00Z",
        pushed_at: "2025-08-09T00:00:00Z",
        fork: false
      }
    ];
    return fallbackRepos;
  }
}

export async function fetchRepoReadme(repo: string, owner: string): Promise<string> {
  const cacheKey = `readme-${owner}-${repo}`;
  const cachedData = getFromCache(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`);
    
    if (!response.ok) {
      const fallbackReadme = `# ${repo}\n\nThis repository contains the source code for ${repo}.`;
      setToCache(cacheKey, fallbackReadme);
      return fallbackReadme;
    }
    
    const data = await response.json();
    const readmeContent = atob(data.content); // Decode base64 content
    
    setToCache(cacheKey, readmeContent);
    return readmeContent;
  } catch (error) {
    // Silent error handling
    const fallbackReadme = `# ${repo}\n\nThis repository contains the source code for ${repo}.`;
    return fallbackReadme;
  }
}

export async function fetchRepoLanguages(repo: string, owner: string): Promise<Record<string, number>> {
  const cacheKey = `languages-${owner}-${repo}`;
  const cachedData = getFromCache(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`);
    
    if (!response.ok) {
      const fallbackLanguages = { TypeScript: 80, CSS: 15, HTML: 5 };
      setToCache(cacheKey, fallbackLanguages);
      return fallbackLanguages;
    }
    
    const languages = await response.json();
    setToCache(cacheKey, languages);
    return languages;
  } catch (error) {
    // Silent error handling
    const fallbackLanguages = { TypeScript: 80, CSS: 15, HTML: 5 };
    return fallbackLanguages;
  }
}