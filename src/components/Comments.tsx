import React, { useState } from 'react';
import { FaUser, FaClock, FaReply, FaThumbsUp } from 'react-icons/fa';
import StyledName from './shared/StyledName';

interface Comment {
  id: number;
  name: string;
  date: string;
  content: string;
  likes: number;
  isAuthor?: boolean;
}

interface CommentsProps {
  postId: number;
}

const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      name: 'Jane Doe',
      date: '2025-05-28',
      content: 'Great article! The insights on React optimization really helped me with my project.',
      likes: 3
    },
    {
      id: 2,
      name: 'Berat MEN',
      date: '2025-05-29',
      content: 'Thank you for your kind feedback! I\'m glad it was helpful.',
      likes: 1,
      isAuthor: true
    }
  ]);
  
  const [newComment, setNewComment] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !name.trim()) return;
    
    const comment: Comment = {
      id: Date.now(),
      name: name.trim(),
      date: new Date().toISOString().split('T')[0],
      content: newComment.trim(),
      likes: 0
    };
    
    setComments([...comments, comment]);
    setNewComment('');
  };

  const handleLike = (id: number) => {
    setComments(comments.map(comment => 
      comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
    ));
  };

  return (
    <div className="mt-16">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Comments ({comments.length})</h3>
      
      {/* Comment List */}
      <div className="space-y-6 mb-10">
        {comments.map(comment => (
          <div 
            key={comment.id} 
            className={`p-6 rounded-xl ${
              comment.isAuthor 
                ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50' 
                : 'bg-white dark:bg-gray-800 shadow-md'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  comment.isAuthor 
                    ? 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}>
                  <FaUser />
                </div>
                <div className="ml-3">
                  <h4 className={`font-semibold ${
                    comment.isAuthor 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {comment.isAuthor ? (
                      <>
                        <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">Berat</span>
                        <span className="text-gray-900 dark:text-white ml-1">MEN</span>
                      </>
                    ) : comment.name}
                    {comment.isAuthor && <span className="ml-2 text-xs px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 rounded-full">Author</span>}
                  </h4>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <FaClock className="mr-1" />
                    <span>{new Date(comment.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleLike(comment.id)}
                  className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  <FaThumbsUp />
                  <span>{comment.likes}</span>
                </button>
                <button className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400 transition-colors">
                  <FaReply />
                </button>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
          </div>
        ))}
      </div>
      
      {/* Comment Form */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Leave a Comment</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                      bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                      focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Comment
            </label>
            <textarea
              id="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                      bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white
                      focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
              required
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comments;