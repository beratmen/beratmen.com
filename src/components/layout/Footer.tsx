import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTwitter, FaGithub, FaLinkedinIn, FaEnvelope, FaCode, FaHeart, FaPaperPlane, FaCheck } from 'react-icons/fa';
import StyledName from '../shared/StyledName';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Simulate API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success
      setIsSubscribed(true);
      setEmail('');
      
      // Reset subscription status after 3 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              <StyledName />
            </h3>
            <p className="text-gray-400 mb-4">
              Passionate software developer specializing in building exceptional digital experiences with modern web technologies.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com/beratmen" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a 
                href="https://github.com/beratmen" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a 
                href="https://linkedin.com/in/beratmen" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-blue-700 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a 
                href="mailto:contact@beratmen.com" 
                className="bg-gray-800 hover:bg-red-500 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
                aria-label="Email"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              </li>
              <li>
                <a href="#projects" className="text-gray-400 hover:text-white transition-colors">Projects</a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition-colors">Services</a>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Web Development</li>
              <li className="text-gray-400">Frontend Development</li>
              <li className="text-gray-400">Backend Development</li>
              <li className="text-gray-400">Mobile App Development</li>
              <li className="text-gray-400">UI/UX Design</li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to my newsletter for the latest articles, tutorials, and updates.
            </p>
            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
                disabled={isSubmitting || isSubscribed}
                required
              />
              <button
                type="submit"
                disabled={isSubmitting || isSubscribed}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {isSubscribed ? (
                  <FaCheck className="text-green-400" />
                ) : isSubmitting ? (
                  <div className="animate-spin">
                    <FaPaperPlane />
                  </div>
                ) : (
                  <FaPaperPlane />
                )}
              </button>
            </form>
            {error && <p className="mt-2 text-red-400 text-sm">{error}</p>}
            {isSubscribed && <p className="mt-2 text-green-400 text-sm">Thank you for subscribing!</p>}
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 flex items-center justify-center">
            <span>© {new Date().getFullYear()} 
              <StyledName className="ml-1" />. All rights reserved.
            </span>
          </p>
          <p className="text-gray-600 mt-2 flex items-center justify-center text-sm">
            <span>Made with</span>
            <FaHeart className="text-red-500 mx-1" />
            <span>and</span>
            <FaCode className="text-blue-500 mx-1" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;