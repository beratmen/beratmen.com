import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getBlogPosts, saveBlogPost, deleteBlogPost } from './blogStorage';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

// Mock the secureStorage
vi.mock('./security', () => ({
  secureStorage: {
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
  sanitize: vi.fn((content) => content)
}));

describe('Blog Storage', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorageMock.clear();
    // Replace global localStorage with mock
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  });
  
  it('should return empty array when no posts exist', () => {
    const posts = getBlogPosts();
    expect(posts).toEqual([]);
  });

  it('should store a blog post correctly', () => {
    const post = { 
      id: 1, 
      title: 'Test Post', 
      content: 'This is a test.',
      excerpt: '',
      date: new Date().toISOString().split('T')[0],
      category: '',
      imageUrl: '',
      tags: [],
      readTime: '',
      author: {
        name: '',
        avatar: '',
        role: ''
      }
    };
    
    saveBlogPost(post);
    const storedPost = getBlogPosts().find(p => p.id === post.id);
    
    // Only check that we have a stored post with the same id
    expect(storedPost?.id).toEqual(post.id);
    expect(storedPost?.title).toEqual(post.title);
    expect(storedPost?.content).toEqual(post.content);
  });

  it('should delete a blog post correctly', () => {
    const post = { 
      id: 1, 
      title: 'Test Post', 
      content: 'This is a test.',
      excerpt: '',
      date: new Date().toISOString().split('T')[0],
      category: '',
      imageUrl: '',
      tags: [],
      readTime: '',
      author: {
        name: '',
        avatar: '',
        role: ''
      }
    };
    
    saveBlogPost(post);
    deleteBlogPost(post.id);
    const storedPost = getBlogPosts().find(p => p.id === post.id);
    expect(storedPost).toBeUndefined();
  });
});