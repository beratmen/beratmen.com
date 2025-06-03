import React, { useState, useEffect } from 'react';
import { FaCode } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About Me', href: '#about' },
  { name: 'Experience', href: '#experience-education' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Blog', href: '/blog', isRoute: true },
  { name: 'Contact', href: '#contact' },
  { name: 'Donate', href: '#donate', highlight: true },
];

const Navbar: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Trigger the animation after component mounts
    setIsLoaded(true);
  }, []);
  
  return (
    <nav className="w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm fixed top-0 left-0 z-50 border-b border-gray-100 dark:border-gray-800">
      <LogoAnimation />
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo/Brand */}
        <a href="#home" className={`group focus:outline-none relative ${isLoaded ? 'fade-in-down' : 'opacity-0'}`}>
          <div className="flex items-center relative z-10">
            <div className="mr-1.5 text-blue-600 dark:text-blue-400 opacity-80 group-hover:opacity-100 transition-opacity logo-animate">
              <FaCode className="h-5 w-5" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:via-indigo-600 group-hover:to-purple-600 dark:group-hover:from-blue-300 dark:group-hover:via-indigo-200 dark:group-hover:to-purple-300 transition-colors duration-300">Berat</span>
            <span className="text-2xl font-extrabold text-gray-900 dark:text-white transition-colors duration-300 ml-1">MEN</span>
          </div>
          {/* Animated accent line */}
          <div className="h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 transition-all duration-300 mt-0.5"></div>
          {/* Animated glow effect on hover */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/0 via-indigo-500/0 to-purple-500/0 dark:from-blue-400/0 dark:via-indigo-300/0 dark:to-purple-400/0 rounded-lg blur opacity-0 group-hover:opacity-100 group-hover:from-blue-600/20 group-hover:via-indigo-500/20 group-hover:to-purple-500/20 dark:group-hover:from-blue-400/20 dark:group-hover:via-indigo-300/20 dark:group-hover:to-purple-400/20 transition-all duration-500 -z-10"></div>
        </a>
        {/* Navigation Links */}
        <ul className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <li key={link.name}>
              {link.isRoute ? (
                <Link
                  to={link.href}
                  className={`relative px-2 py-1 font-medium transition-all duration-300 focus:outline-none ${
                    link.highlight 
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 text-white dark:text-white rounded-full px-4 py-1.5 shadow-md hover:shadow-lg transform hover:scale-105'
                      : 'text-gray-700 dark:text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:via-indigo-500 hover:to-purple-500 dark:hover:from-blue-400 dark:hover:via-indigo-300 dark:hover:to-purple-400'
                  }`}
                >
                  <span>{link.name}</span>
                  {!link.highlight && (
                    <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  )}
                </Link>
              ) : (
                <a
                  href={link.href}
                  className={`relative px-2 py-1 font-medium transition-all duration-300 focus:outline-none ${
                    link.highlight 
                      ? 'bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 text-white dark:text-white rounded-full px-4 py-1.5 shadow-md hover:shadow-lg transform hover:scale-105'
                      : 'text-gray-700 dark:text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-600 hover:via-indigo-500 hover:to-purple-500 dark:hover:from-blue-400 dark:hover:via-indigo-300 dark:hover:to-purple-400'
                  }`}
                >
                  <span>{link.name}</span>
                  {!link.highlight && (
                    <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  )}
                </a>
              )}
            </li>
          ))}
        </ul>
        {/* Mobile menu button (not implemented, placeholder) */}
        <button className="md:hidden p-2 rounded-full focus:outline-none bg-white dark:bg-gray-800 group hover:shadow-md hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10 transition-all duration-300 border border-gray-100 dark:border-gray-700" aria-label="Open menu">
          <svg width="24" height="24" fill="none" stroke="url(#nav-icon-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <defs>
              <linearGradient id="nav-icon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2563eb" className="dark:stop-color-blue-400" />
                <stop offset="50%" stopColor="#6366f1" className="dark:stop-color-indigo-300" />
                <stop offset="100%" stopColor="#a855f7" className="dark:stop-color-purple-400" />
              </linearGradient>
            </defs>
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

// Add a keyframe animation for the logo pulse effect
const LogoAnimation = () => {
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes logo-pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
      
      .logo-animate {
        animation: logo-pulse 3s ease-in-out infinite;
      }
      
      @keyframes fade-in-down {
        0% {
          opacity: 0;
          transform: translateY(-10px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .fade-in-down {
        animation: fade-in-down 0.8s ease forwards;
      }
    `}} />
  );
};

export default Navbar;
