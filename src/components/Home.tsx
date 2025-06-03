import React, { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaCode, FaServer } from 'react-icons/fa';
import { MdEmail, MdOutlineDevices } from 'react-icons/md';
import StyledName from './shared/StyledName';

interface GithubProfile {
  avatar_url: string;
  name: string;
  bio: string;
}

const Home: React.FC = () => {
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [githubProfile, setGithubProfile] = useState<GithubProfile | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProfileData = async () => {
    try {
      setError(null);
      const response = await fetch('https://api.github.com/users/beratmen');
      if (response.ok) {
        const data = await response.json();
        setGithubProfile(data);
        setAvatarUrl(data.avatar_url);
      } else {
        throw new Error('Failed to fetch GitHub profile');
      }
    } catch (error) {
      console.error('Failed to fetch GitHub profile:', error);
      setError('Could not load GitHub profile data');
    }
  };

  useEffect(() => {
    loadProfileData();
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden mobile-container">
      {/* Enhanced Background with Multiple Layers */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-800"></div>
        
        {/* Animated gradient blobs */}
        <div className="absolute top-0 left-0 right-0 bottom-0 opacity-30 dark:opacity-20 overflow-hidden">
          <div className="absolute top-[10%] left-[5%] w-[40%] h-[30%] bg-blue-300/30 dark:bg-blue-500/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-pulse"></div>
          <div className="absolute top-[20%] right-[10%] w-[35%] h-[35%] bg-purple-300/20 dark:bg-purple-500/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-[20%] left-[15%] w-[40%] h-[40%] bg-indigo-300/20 dark:bg-indigo-500/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        {/* Modern grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:40px_40px] dark:bg-[linear-gradient(to_right,rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.03)_1px,transparent_1px)]"></div>
        
        {/* Floating dots pattern */}
        <div className="absolute inset-0 opacity-20 dark:opacity-10">
          {[...Array(24)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1.5 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${5 + Math.random() * 10}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 py-12 sm:py-16 mobile-spacing safe-area-inset-top">
        <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-8 sm:gap-12 md:gap-16 lg:gap-24">
          {/* Text Content */}
          <div className="flex-1 text-center md:text-left">
            <div className={`space-y-6 sm:space-y-8 md:space-y-10 transform transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              {/* Hero Text */}
              <div className="space-y-3 sm:space-y-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100/70 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm font-medium mb-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 mr-2 animate-ping"></span>
                  Available for new projects
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight flex items-baseline mobile-text-lg">
                  <StyledName />
                </h1>
                
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium bg-gradient-to-r from-gray-700 to-gray-500 dark:from-gray-300 dark:to-gray-400 bg-clip-text text-transparent mobile-text-base">
                  Software Developer
                </h2>
              </div>

              {/* Bio with Highlight Card */}
              <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-xl border border-gray-100 dark:border-gray-700 mobile-card">
                <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mobile-text-base">
                  {githubProfile?.bio || 'Passionate about creating modern web applications with cutting-edge technologies. Focused on delivering high-quality, user-centric solutions.'}
                </p>
                
                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 text-sm font-medium touch-feedback">
                    <FaCode className="mr-1" /> Frontend
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-300 text-sm font-medium touch-feedback">
                    <FaServer className="mr-1" /> Backend
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-sm font-medium touch-feedback">
                    <MdOutlineDevices className="mr-1" /> Responsive
                  </span>
                </div>
              </div>

              {/* Modernized Social Links with Label */}
              <div className="space-y-3 sm:space-y-4">
                <h3 className="text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium">Connect with me</h3>
                <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3 sm:gap-4">
                  <a
                    href="https://github.com/beratmen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center sm:justify-start gap-2 px-4 py-3 rounded-xl text-base bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 
                             hover:bg-blue-50 dark:hover:bg-gray-700
                             transition-all duration-300 transform hover:scale-105 hover:-translate-y-1
                             shadow-lg hover:shadow-xl hover:shadow-blue-100/40 dark:hover:shadow-blue-900/30
                             border border-gray-100 dark:border-gray-700 touch-feedback mobile-touch-target"
                  >
                    <FaGithub className="text-lg flex-shrink-0" />
                    <span className="font-medium">GitHub</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/beratmen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center sm:justify-start gap-2 px-4 py-3 rounded-xl text-base bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 
                             hover:bg-blue-50 dark:hover:bg-gray-700
                             transition-all duration-300 transform hover:scale-105 hover:-translate-y-1
                             shadow-lg hover:shadow-xl hover:shadow-blue-100/40 dark:hover:shadow-blue-900/30
                             border border-gray-100 dark:border-gray-700 touch-feedback mobile-touch-target"
                  >
                    <FaLinkedin className="text-lg flex-shrink-0" />
                    <span className="font-medium">LinkedIn</span>
                  </a>
                  <a
                    href="mailto:beratmen9@gmail.com"
                    className="group flex items-center justify-center sm:justify-start gap-2 px-4 py-3 rounded-xl text-base bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 
                             hover:bg-blue-50 dark:hover:bg-gray-700
                             transition-all duration-300 transform hover:scale-105 hover:-translate-y-1
                             shadow-lg hover:shadow-xl hover:shadow-blue-100/40 dark:hover:shadow-blue-900/30
                             border border-gray-100 dark:border-gray-700 touch-feedback mobile-touch-target"
                  >
                    <MdEmail className="text-lg flex-shrink-0" />
                    <span className="font-medium">Email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Profile Picture with 3D Effect */}
          <div className={`transform transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="relative group">
              {/* Error Badge */}
              {error && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 bg-red-500 text-white rounded-full px-4 py-2 text-sm shadow-lg">
                  Error loading profile
                </div>
              )}
              
              {/* Multiple Layered Glow Effects */}
              <div className="absolute -inset-10 bg-gradient-to-r from-blue-600/30 via-indigo-500/20 to-purple-500/30 dark:from-blue-400/20 dark:via-indigo-300/15 dark:to-purple-400/20 
                          rounded-full opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-1000 
                          group-hover:blur-3xl"></div>
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-600/40 via-indigo-500/30 to-purple-500/40 dark:from-blue-400/30 dark:via-indigo-300/20 dark:to-purple-400/30 
                          rounded-full opacity-50 group-hover:opacity-80 blur-xl transition-all duration-700 
                          group-hover:blur-2xl animate-pulse"></div>
              
              {/* 3D Card Effect Container */}
              <div className="relative p-2 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 
                          rounded-2xl transform transition-transform duration-500 group-hover:scale-105 
                          group-hover:rotate-2 shadow-2xl">
                <div className="rounded-xl overflow-hidden bg-white dark:bg-gray-900 p-1 backdrop-blur-sm">
                  <img
                    src={avatarUrl || '/profile-picture.jpg'}
                    alt="Berat MEN"
                    className="w-64 h-64 md:w-80 md:h-80 object-cover transform transition-all duration-500
                             filter group-hover:brightness-110 group-hover:contrast-110 rounded-lg"
                  />
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full 
                            transform group-hover:scale-110 group-hover:translate-x-2 transition-all duration-500"></div>
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-100 dark:bg-purple-900/50 rounded-full 
                            transform group-hover:scale-110 group-hover:-translate-x-2 transition-all duration-500"></div>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <a href="#about" className="flex flex-col items-center group">
            <div className="text-sm bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:-translate-y-1 font-medium">
              Scroll Down
            </div>
            <div className="relative w-8 h-12 border-2 border-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 p-[1px] rounded-full flex justify-center overflow-hidden group-hover:shadow-lg group-hover:shadow-blue-500/20 dark:group-hover:shadow-blue-400/20 transition-all duration-300">
              <div className="absolute inset-[1px] bg-white dark:bg-gray-900 rounded-full flex justify-center"></div>
              <div className="absolute top-2 w-1.5 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 rounded-full animate-bounce z-10"></div>
            </div>
          </a>
        </div>
      </div>
      
      {/* Add keyframe animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 7s ease-in-out infinite alternate;
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        .delay-2000 {
          animation-delay: 2s;
        }
      `}} />
    </section>
  );
};

export default Home;