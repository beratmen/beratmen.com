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
  watchers_count: number; // Add this property
  language: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
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
    return userRepos;
    
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return [];
  }
}

export async function fetchRepoReadme(repo: string, owner: string): Promise<string> {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`);
    
    if (!response.ok) {
      return '';
    }
    
    const data = await response.json();
    const readmeContent = atob(data.content); // Decode base64 content
    
    return readmeContent;
  } catch (error) {
    console.error('Error fetching repository README:', error);
    return '';
  }
}

export async function fetchRepoLanguages(repo: string, owner: string): Promise<Record<string, number>> {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`);
    
    if (!response.ok) {
      return {};
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching repository languages:', error);
    return {};
  }
}