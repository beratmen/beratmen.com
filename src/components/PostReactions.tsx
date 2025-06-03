import React, { useState } from 'react';
import { FaThumbsUp, FaHeart, FaLightbulb, FaBookmark, FaShare } from 'react-icons/fa';

interface Reaction {
  icon: JSX.Element;
  label: string;
  color: string;
  count: number;
}

interface PostReactionsProps {
  postId: number;
}

const PostReactions: React.FC<PostReactionsProps> = ({ postId }) => {
  const [reactions, setReactions] = useState<Reaction[]>([
    { 
      icon: <FaThumbsUp />, 
      label: 'Like', 
      color: 'bg-blue-500 hover:bg-blue-600',
      count: 12 
    },
    { 
      icon: <FaHeart />, 
      label: 'Love', 
      color: 'bg-red-500 hover:bg-red-600',
      count: 5 
    },
    { 
      icon: <FaLightbulb />, 
      label: 'Insightful', 
      color: 'bg-yellow-500 hover:bg-yellow-600',
      count: 8 
    }
  ]);
  
  const [userReactions, setUserReactions] = useState<Record<string, boolean>>({});
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  
  const handleReaction = (label: string) => {
    if (userReactions[label]) {
      // User already reacted, remove reaction
      setUserReactions({...userReactions, [label]: false});
      setReactions(reactions.map(reaction => 
        reaction.label === label 
          ? {...reaction, count: reaction.count - 1}
          : reaction
      ));
    } else {
      // Add new reaction
      setUserReactions({...userReactions, [label]: true});
      setReactions(reactions.map(reaction => 
        reaction.label === label 
          ? {...reaction, count: reaction.count + 1}
          : reaction
      ));
    }
  };
  
  const handleShare = () => {
    setShowShareOptions(!showShareOptions);
  };
  
  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    // Here you would typically save to localStorage or user profile
  };
  
  return (
    <div className="py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {reactions.map(reaction => (
            <button
              key={reaction.label}
              onClick={() => handleReaction(reaction.label)}
              className={`flex flex-col items-center px-3 py-2 rounded-lg text-white transition-all ${
                userReactions[reaction.label] 
                  ? reaction.color + ' animate-pulse' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <span className="text-lg">{reaction.icon}</span>
              <div className="mt-1 text-xs flex items-center">
                <span>{reaction.count}</span>
              </div>
            </button>
          ))}
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-full transition-colors ${
              bookmarked 
                ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
            aria-label="Bookmark post"
          >
            <FaBookmark />
          </button>
          
          <div className="relative">
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Share post"
            >
              <FaShare />
            </button>
            
            {showShareOptions && (
              <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 w-48 z-10">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Share via</div>
                <div className="grid grid-cols-2 gap-2">
                  <button className="p-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors">
                    Twitter
                  </button>
                  <button className="p-2 text-white bg-blue-800 rounded hover:bg-blue-900 transition-colors">
                    Facebook
                  </button>
                  <button className="p-2 text-white bg-green-600 rounded hover:bg-green-700 transition-colors">
                    WhatsApp
                  </button>
                  <button className="p-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors">
                    LinkedIn
                  </button>
                </div>
                <button className="w-full mt-2 p-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  Copy Link
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostReactions;