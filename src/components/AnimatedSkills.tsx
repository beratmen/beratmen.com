import React, { useEffect, useRef, useState } from 'react';
import { FaCode, FaServer, FaDatabase, FaTools, FaFileDownload } from 'react-icons/fa';

interface Skill {
  name: string;
  level: number;
  icon: JSX.Element;
  color: string;
}

const AnimatedSkills: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);
  
  const skills: Skill[] = [
    { 
      name: 'JavaScript', 
      level: 85, 
      icon: <FaCode />, 
      color: 'from-yellow-400 to-yellow-500' 
    },
    { 
      name: 'TypeScript', 
      level: 80, 
      icon: <FaCode />, 
      color: 'from-blue-400 to-blue-500' 
    },
    { 
      name: 'React', 
      level: 75, 
      icon: <FaCode />, 
      color: 'from-cyan-400 to-cyan-500' 
    },
    { 
      name: 'Node.js', 
      level: 70, 
      icon: <FaServer />, 
      color: 'from-green-400 to-green-500' 
    },
    { 
      name: 'SQL', 
      level: 65, 
      icon: <FaDatabase />, 
      color: 'from-orange-400 to-orange-500' 
    },
    { 
      name: 'DevOps', 
      level: 60, 
      icon: <FaTools />, 
      color: 'from-purple-400 to-purple-500' 
    }
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <div ref={skillsRef} className="py-16">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
        Technical Skills
      </h2>
      <div className="max-w-3xl mx-auto space-y-8">
        {skills.map((skill, index) => (
          <div key={skill.name} className="relative">
            <div className="flex items-center mb-2">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${skill.color} flex items-center justify-center text-white mr-3`}>
                {skill.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{skill.name}</h3>
              <span className="ml-auto text-gray-600 dark:text-gray-400">{skill.level}%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${skill.color} rounded-full transform origin-left scale-x-0 transition-transform duration-1000 ease-out`}
                style={{ 
                  transform: isVisible ? `scaleX(${skill.level / 100})` : 'scaleX(0)',
                  transitionDelay: `${index * 150}ms`
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <a 
          href="/resume.pdf" 
          download
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r 
                   from-blue-600 to-blue-400 dark:from-blue-500 dark:to-blue-300 
                   text-white rounded-lg hover:shadow-lg transition-all duration-300 
                   transform hover:-translate-y-1"
        >
          <FaFileDownload />
          <span>Download Resume</span>
        </a>
      </div>
    </div>
  );
};

export default AnimatedSkills;