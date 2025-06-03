import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';
import StyledName from '../shared/StyledName';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const location = useLocation();

  // Check if we're on the main page (either '/' or any URL with a hash like '/#about')
  const isMainPage = location.pathname === '/' || (location.pathname === '/' && location.hash);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Handle smooth scrolling for hash links
  useEffect(() => {
    const handleHashScroll = () => {
      if (location.hash) {
        const id = location.hash.slice(1);
        const element = document.getElementById(id);
        if (element) {
          // Short delay to ensure the DOM is fully loaded
          setTimeout(() => {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }, 100);
        }
      } else if (location.pathname === '/' && !location.hash) {
        // If we're on the main page with no hash, scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    handleHashScroll();
    
    // Also trigger when the component mounts
    return () => {
      // Cleanup if needed
    };
  }, [location.hash, location.pathname]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && !target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  // Close mobile menu on resize if open
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  // Track the active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      // Only track sections on the main page
      if (!isMainPage) return;
      
      const scrollPosition = window.scrollY + 80; // Adding navbar height offset
      
      // Get all sections
      const sections = [
        'home', 'about', 'services', 'timeline', 
        'projects', 'testimonials', 'donate', 'contact'
      ];
      
      // Find the current section
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop && 
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Call once on mount to set initial active section
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMainPage]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const scrollToSection = (sectionId: string) => {
    // Handle special case for home section
    if (sectionId === 'home') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Update URL without reloading the page
      if (history.pushState) {
        history.pushState(null, '', `/#${sectionId}`);
      }
      return;
    }
    
    // Remove the hash if it's passed with the section ID
    const cleanSectionId = sectionId.replace('#', '');
    const element = document.getElementById(cleanSectionId);
    
    if (element) {
      // Scroll to the element with smooth behavior
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      
      // Update URL without reloading the page
      if (history.pushState) {
        history.pushState(null, '', `/#${cleanSectionId}`);
      }
    }
  };

  // Navigation items
  const navItems = [
    { name: 'Home', path: '/#home' },
    { name: 'About', path: '/#about' },
    { name: 'Services', path: '/#services' },
    { name: 'Timeline', path: '/#timeline' },
    { name: 'Projects', path: '/#projects' },
    { name: 'Testimonials', path: '/#testimonials' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/#contact' }
  ];

  return (
    <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md z-50 transition-colors duration-200 safe-area-inset-top">
      <div className="w-[98%] max-w-[1440px] mx-auto px-4 mobile-spacing">
        <div className="flex justify-between items-center h-16 sm:h-16 md:h-16">
          <Link to="/" className="group flex items-center space-x-2 focus:outline-none touch-feedback">
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter">
              <StyledName />
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {isMainPage ? (
              <>
                {navItems.map((item) => (
                  item.name === 'Blog' ? (
                    <Link 
                      key={item.name}
                      to={item.path} 
                      className="nav-link relative px-4 py-1.5 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 group focus:outline-none"
                    >
                      <span className="relative z-10">{item.name}</span>
                      <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200 ease-out origin-center"></div>
                    </Link>
                  ) : (
                    <button 
                      key={item.name} 
                      onClick={() => scrollToSection(item.path.slice(2))} 
                      className={`nav-link relative px-4 py-1.5 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 group focus:outline-none ${
                        activeSection === item.path.slice(2) ? 'font-medium text-blue-600 dark:text-blue-400' : ''
                      }`}
                    >
                      <span className="relative z-10">{item.name}</span>
                      <div className={`absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-lg ${
                        activeSection === item.path.slice(2) ? 'scale-100 opacity-50' : 'scale-0'
                      } group-hover:scale-100 transition-transform duration-200 ease-out origin-center`}></div>
                    </button>
                  )
                ))}
              </>
            ) : (
              <>
                {navItems.map((item) => (
                  <Link 
                    key={item.name}
                    to={item.path} 
                    className="nav-link relative px-4 py-1.5 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-200 group focus:outline-none"
                  >
                    <span className="relative z-10">{item.name}</span>
                    <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-200 ease-out origin-center"></div>
                  </Link>
                ))}
              </>
            )}
            {isMainPage ? (
              <button
                onClick={() => scrollToSection('donate')}
                className={`nav-link relative px-6 py-1.5 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 text-white rounded-lg hover:shadow-lg transition-all duration-200 focus:outline-none ${
                  activeSection === 'donate' ? 'shadow-lg' : ''
                }`}
              >
                Donate
              </button>
            ) : (
              <Link
                to="/#donate"
                className="nav-link relative px-6 py-1.5 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 text-white rounded-lg hover:shadow-lg transition-all duration-200 focus:outline-none"
              >
                Donate
              </Link>
            )}
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
              aria-label="Toggle theme"
            >
              {isDark ? <FaSun size={24} /> : <FaMoon size={24} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none touch-feedback mobile-touch-target"
              aria-label="Toggle theme"
            >
              {isDark ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
            <button
              className="menu-button p-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none touch-feedback mobile-touch-target"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="mobile-menu md:hidden absolute left-0 right-0 top-16 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg safe-area-inset-left safe-area-inset-right">
            <div className="w-[98%] max-w-[1440px] mx-auto px-4 py-4 space-y-2 mobile-spacing">
              {isMainPage ? (
                <>
                  {navItems.map((item) => (
                    item.name === 'Blog' ? (
                      <Link
                        key={item.name}
                        to={item.path}
                        className="nav-link block px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white 
                                 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 focus:outline-none 
                                 touch-feedback mobile-touch-target text-base"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <button
                        key={item.name}
                        onClick={() => {
                          scrollToSection(item.path.slice(2));
                          setIsOpen(false);
                        }}
                        className={`nav-link block w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white 
                                 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 focus:outline-none 
                                 touch-feedback mobile-touch-target text-base ${
                                  activeSection === item.path.slice(2) ? 'bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium' : ''
                                 }`}
                      >
                        {item.name}
                      </button>
                    )
                  ))}
                </>
              ) : (
                <>
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="nav-link block px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white 
                               hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200 focus:outline-none 
                               touch-feedback mobile-touch-target text-base"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </>
              )}
              {isMainPage ? (
                <button
                  onClick={() => {
                    scrollToSection('donate');
                    setIsOpen(false);
                  }}
                  className={`nav-link block w-full text-left px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 
                           text-white rounded-lg hover:shadow-lg transition-all duration-200 focus:outline-none 
                           touch-feedback mobile-touch-target text-base font-medium ${
                            activeSection === 'donate' ? 'shadow-lg' : ''
                           }`}
                >
                  Donate
                </button>
              ) : (
                <Link
                  to="/#donate"
                  className="nav-link block px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 
                           text-white rounded-lg hover:shadow-lg transition-all duration-200 focus:outline-none 
                           touch-feedback mobile-touch-target text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Donate
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
