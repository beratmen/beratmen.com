import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaTag } from 'react-icons/fa';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  tags: string[];
}

interface RelatedPostsProps {
  currentPostId: number;
  currentPostTags: string[];
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({ currentPostId, currentPostTags }) => {
  // This would typically come from your blog post data store
  const allPosts: Post[] = [
    /* Sample data to be replaced with your actual posts */
  ];
  
  // Find related posts based on tag similarity
  const relatedPosts = allPosts
    .filter(post => post.id !== currentPostId) // Exclude current post
    .filter(post => post.tags.some(tag => currentPostTags.includes(tag))) // Must have at least one matching tag
    .sort((a, b) => {
      // Sort by number of matching tags (descending)
      const aMatches = a.tags.filter(tag => currentPostTags.includes(tag)).length;
      const bMatches = b.tags.filter(tag => currentPostTags.includes(tag)).length;
      return bMatches - aMatches;
    })
    .slice(0, 3); // Take top 3
  
  if (relatedPosts.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Related Articles</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map(post => (
          <Link 
            key={post.id}
            to={`/blog/${post.id}`}
            className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            
            <div className="p-4">
              <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                {post.title}
              </h4>
              
              <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-3">
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-1" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                {post.tags[0] && (
                  <div className="flex items-center">
                    <FaTag className="mr-1" />
                    <span>{post.tags[0]}</span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;