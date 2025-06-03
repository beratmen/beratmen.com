import React, { useEffect, useRef, useState } from 'react';
import { FaCode, FaServer, FaDatabase, FaTools, FaMobile, FaDesktop, FaCloud, FaLaptopCode } from 'react-icons/fa';

interface Skill {
  name: string;
  level: number;
  icon: JSX.Element;
  color: string;
}

interface SkillCategory {
  title: string;
  icon: JSX.Element;
  skills: Skill[];
}

const Skills: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);
  
  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend Development",
      icon: <FaDesktop className="text-blue-500" />,
      skills: [
        { name: 'React', level: 90, icon: <FaCode />, color: 'from-blue-400 to-blue-600' },
        { name: 'TypeScript', level: 85, icon: <FaCode />, color: 'from-blue-500 to-blue-700' },
        { name: 'JavaScript', level: 92, icon: <FaCode />, color: 'from-yellow-400 to-yellow-600' },
        { name: 'HTML/CSS', level: 95, icon: <FaCode />, color: 'from-orange-400 to-orange-600' },
      ]
    },
    {
      title: "Backend Development",
      icon: <FaServer className="text-green-500" />,
      skills: [
        { name: 'Node.js', level: 88, icon: <FaServer />, color: 'from-green-400 to-green-600' },
        { name: 'Express', level: 85, icon: <FaServer />, color: 'from-green-500 to-green-700' },
        { name: 'Python', level: 75, icon: <FaServer />, color: 'from-blue-400 to-blue-600' },
        { name: 'RESTful APIs', level: 90, icon: <FaServer />, color: 'from-indigo-400 to-indigo-600' },
      ]
    },
    {
      title: "Database & Storage",
      icon: <FaDatabase className="text-purple-500" />,
      skills: [
        { name: 'MongoDB', level: 85, icon: <FaDatabase />, color: 'from-green-400 to-green-600' },
        { name: 'PostgreSQL', level: 80, icon: <FaDatabase />, color: 'from-blue-400 to-blue-600' },
        { name: 'Firebase', level: 78, icon: <FaDatabase />, color: 'from-yellow-400 to-yellow-600' },
        { name: 'Redis', level: 70, icon: <FaDatabase />, color: 'from-red-400 to-red-600' },
      ]
    },
    {
      title: "DevOps & Tools",
      icon: <FaTools className="text-gray-500" />,
      skills: [
        { name: 'Git', level: 92, icon: <FaTools />, color: 'from-orange-400 to-orange-600' },
        { name: 'Docker', level: 75, icon: <FaTools />, color: 'from-blue-400 to-blue-600' },
        { name: 'CI/CD', level: 80, icon: <FaTools />, color: 'from-green-400 to-green-600' },
        { name: 'AWS', level: 70, icon: <FaCloud />, color: 'from-yellow-400 to-yellow-600' },
      ]
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
      { threshold: 0.1 }
    );
    
    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <section id="skills" ref={skillsRef} className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* DELETE THIS ENTIRE BLOCK - Start of Technical Skills section */}
        {/* 
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Technical Skills</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Some description text here...
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          Technical skills content here...
        </div>
        */}
        {/* END DELETE BLOCK */}
        
        {/* KEEP THIS SECTION - Your main skills section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">Skills & Expertise</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            I've developed a diverse set of skills throughout my career. Here's an overview of my technical expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {skillCategories.map((category, catIndex) => (
            <div key={category.title} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-4">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{category.title}</h3>
              </div>
              
              <div className="space-y-6">
                {category.skills.map((skill, index) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-md bg-gradient-to-r ${skill.color} flex items-center justify-center text-white mr-3`}>
                          {skill.icon}
                        </div>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{skill.name}</span>
                      </div>
                      <span className="text-gray-600 dark:text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full transform origin-left scale-x-0 transition-transform duration-1000 ease-out`}
                        style={{ 
                          transform: isVisible ? `scaleX(${skill.level / 100})` : 'scaleX(0)',
                          transitionDelay: `${(catIndex * 4 + index) * 100}ms`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Skills section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-10">Additional Skills</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Next.js', icon: <FaLaptopCode />, color: 'bg-black dark:bg-gray-800 text-white' },
              { name: 'Redux', icon: <FaCode />, color: 'bg-purple-600 text-white' },
              { name: 'GraphQL', icon: <FaCode />, color: 'bg-pink-600 text-white' },
              { name: 'Tailwind CSS', icon: <FaCode />, color: 'bg-teal-500 text-white' },
              { name: 'Jest', icon: <FaCode />, color: 'bg-red-600 text-white' },
              { name: 'React Native', icon: <FaMobile />, color: 'bg-blue-500 text-white' },
              { name: 'Webpack', icon: <FaTools />, color: 'bg-blue-600 text-white' },
              { name: 'SASS/SCSS', icon: <FaCode />, color: 'bg-pink-500 text-white' },
              { name: 'UI/UX Design', icon: <FaDesktop />, color: 'bg-indigo-500 text-white' },
              { name: 'Responsive Design', icon: <FaDesktop />, color: 'bg-green-500 text-white' },
              { name: 'SEO', icon: <FaTools />, color: 'bg-yellow-500 text-white' },
              { name: 'Agile/Scrum', icon: <FaTools />, color: 'bg-blue-400 text-white' }
            ].map((skill, index) => (
              <div
                key={skill.name}
                className={`${skill.color} p-4 rounded-lg shadow-md text-center transform hover:-translate-y-1 transition-transform duration-300`}
                style={{ 
                  opacity: isVisible ? 1 : 0,
                  transition: `opacity 0.5s ease-out ${index * 50 + 800}ms, transform 0.3s ease-out`
                }}
              >
                <div className="text-2xl mb-2 flex justify-center">
                  {skill.icon}
                </div>
                <span className="text-sm font-medium">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;