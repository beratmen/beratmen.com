import React from 'react';

interface StyledNameProps {
  className?: string;
}

const StyledName: React.FC<StyledNameProps> = ({ className = '' }) => {
  return (
    <span className={className}>
      <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">Berat</span>
      <span className="text-gray-900 dark:text-white ml-1">MEN</span>
    </span>
  );
};

export default StyledName;
