import { sanitize, secureStorage } from './security';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  imageUrl: string;
  tags: string[];
  readTime: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  isDraft?: boolean;
  goldenLinks?: {
    url: string;
    title: string;
  }[];
  customReadTime?: boolean;
}

const STORAGE_KEY = 'blog_posts';
const SECURE_STORAGE_KEY = 'secure_blog_posts';

// Helper function to handle storage errors
const handleStorageError = (error: unknown, operation: string) => {
  console.error(`Error during ${operation}:`, error);
  throw new Error(`Failed to ${operation}`);
};

// Check if secure storage is available, otherwise use localStorage as fallback
const isSecureStorageAvailable = () => {
  try {
    secureStorage.setItem('test', 'test');
    secureStorage.removeItem('test');
    return true;
  } catch (error) {
    console.warn('Secure storage is not available, falling back to localStorage');
    return false;
  }
};

export const getBlogPosts = (): BlogPost[] => {
  try {
    // Try secure storage first
    if (isSecureStorageAvailable()) {
      const secureData = secureStorage.getItem(SECURE_STORAGE_KEY);
      if (secureData) {
        return secureData;
      }
    }
    
    // Fallback to localStorage
    const posts = localStorage.getItem(STORAGE_KEY);
    return posts ? JSON.parse(posts) : [];
  } catch (error) {
    return handleStorageError(error, 'get blog posts');
  }
};

export const getPublishedBlogPosts = (): BlogPost[] => {
  try {
    const posts = getBlogPosts();
    return posts
      .filter(post => !post.isDraft)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    return handleStorageError(error, 'get published blog posts');
  }
};

export const saveBlogPost = (post: BlogPost): void => {
  try {
    const posts = getBlogPosts();
    const existingIndex = posts.findIndex(p => p.id === post.id);
    
    // Sanitize user-generated content
    const sanitizedPost = {
      ...post,
      title: sanitize(post.title),
      excerpt: sanitize(post.excerpt),
      content: sanitize(post.content),
      date: new Date().toISOString().split('T')[0],
      category: sanitize(post.category),
      imageUrl: post.imageUrl // URLs handled differently, add validation if needed
    };
    
    if (existingIndex !== -1) {
      // Update existing post
      posts[existingIndex] = sanitizedPost;
    } else {
      // Add new post at the beginning
      posts.unshift(sanitizedPost);
    }
    
    // Try to save to secure storage first
    try {
      secureStorage.setItem('secure_blog_posts', posts);
    } catch (error) {
      console.warn('Failed to save to secure storage, falling back to localStorage', error);
    }
    
    // Always save to localStorage as fallback
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (error) {
    handleStorageError(error, 'save blog post');
  }
};

export const getBlogPostById = (id: number): BlogPost | undefined => {
  try {
    const posts = getBlogPosts();
    return posts.find(post => post.id === id);
  } catch (error) {
    return handleStorageError(error, 'get blog post by ID');
  }
};

export const deleteBlogPost = (id: number): void => {
  try {
    const posts = getBlogPosts();
    const updatedPosts = posts.filter(post => post.id !== id);
    
    // Try to save to secure storage first
    try {
      secureStorage.setItem('secure_blog_posts', updatedPosts);
    } catch (error) {
      console.warn('Failed to delete from secure storage, falling back to localStorage', error);
    }
    
    // Always update localStorage as fallback
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
  } catch (error) {
    handleStorageError(error, 'delete blog post');
  }
};

export const updateBlogPost = (updatedPost: BlogPost): void => {
  try {
    const posts = getBlogPosts();
    const index = posts.findIndex(post => post.id === updatedPost.id);
    if (index !== -1) {
      posts[index] = {
        ...updatedPost,
        date: new Date().toISOString().split('T')[0]
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } else {
      throw new Error('Blog post not found');
    }
  } catch (error) {
    handleStorageError(error, 'update blog post');
  }
}; 