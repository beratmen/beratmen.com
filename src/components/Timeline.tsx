import React, { useState } from 'react';
import { FaBriefcase, FaGraduationCap, FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface TimelineItem {
  id: number;
  type: 'work' | 'education';
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string[];
  technologies?: string[];
  currentFocus?: string[];
}

const Timeline: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  
  const timelineItems: TimelineItem[] = [
    {
      id: 1,
      type: 'work',
      title: 'Senior Frontend Developer',
      organization: 'Tech Innovations Inc.',
      location: 'New York, NY',
      period: '2022 - Present',
      description: [
        'Led a team of 5 developers in building a modern, responsive web application using React and TypeScript',
        'Implemented CI/CD pipelines resulting in 40% faster deployment cycles',
        'Optimized application performance, reducing load time by 60% and improving overall user experience'
      ],
      technologies: ['React', 'TypeScript', 'Redux', 'Jest', 'CI/CD']
    },
    {
      id: 2,
      type: 'work',
      title: 'Full Stack Developer',
      organization: 'Digital Solutions Ltd.',
      location: 'San Francisco, CA',
      period: '2019 - 2022',
      description: [
        'Developed RESTful APIs and microservices using Node.js, Express, and MongoDB',
        'Built and maintained multiple client-facing web applications',
        'Collaborated with design team to implement UI/UX improvements'
      ],
      technologies: ['JavaScript', 'Node.js', 'Express', 'MongoDB', 'React']
    },
    {
      id: 3,
      type: 'education',
      title: 'Computer Programming',
      organization: 'Gaziantep University',
      location: 'Gaziantep, Turkey',
      period: '2023 - 2025',
      description: [
        'Pursuing a degree in Computer Programming with focus on modern web technologies',
        'Developing practical skills in software development and programming fundamentals',
        'Participating in collaborative projects with fellow students'
      ],
      currentFocus: [
        'Software Development Fundamentals',
        'Web Development Technologies',
        'Database Management Systems',
        'Programming Languages & Frameworks'
      ]
    },
    {
      id: 4,
      type: 'education',
      title: 'Master of Science in Computer Science',
      organization: 'University of Technology',
      location: 'Boston, MA',
      period: '2017 - 2019',
      description: [
        'Specialized in Software Engineering and Machine Learning',
        'Graduate research assistant in the Advanced Web Technologies Lab',
        'Thesis: "Optimizing Performance in Modern Web Applications"'
      ]
    },
    {
      id: 5,
      type: 'work',
      title: 'Junior Web Developer',
      organization: 'Creative Agency',
      location: 'Chicago, IL',
      period: '2015 - 2017',
      description: [
        'Developed and maintained client websites using HTML, CSS, and JavaScript',
        'Implemented responsive designs and ensured cross-browser compatibility',
        'Assisted senior developers with larger projects and code reviews'
      ],
      technologies: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'PHP']
    },
    {
      id: 6,
      type: 'education',
      title: 'Bachelor of Science in Computer Science',
      organization: 'State University',
      location: 'Chicago, IL',
      period: '2011 - 2015',
      description: [
        'Graduated with Honors (GPA: 3.8/4.0)',
        'Member of the Computing Society',
        'Participated in three national programming competitions'
      ]
    }
  ];

  // Separate work and education items
  const workItems = timelineItems.filter(item => item.type === 'work');
  const educationItems = timelineItems.filter(item => item.type === 'education');

  const toggleExpand = (id: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Timeline item renderer
  const renderTimelineItem = (item: TimelineItem, isEducation: boolean) => (
    <div key={item.id} className="relative mb-8 md:mb-10 last:mb-0">
      {/* Timeline Dot */}
      <div className={`absolute left-0 w-8 h-8 md:w-11 md:h-11 rounded-full bg-white dark:bg-gray-900 border-3 md:border-4 ${isEducation ? 'border-green-500' : 'border-blue-500'} transform -translate-x-1/2 flex items-center justify-center z-10`}>
        {item.type === 'work' 
          ? <FaBriefcase className={`${isEducation ? 'text-green-500' : 'text-blue-500'} text-xs md:text-sm`} /> 
          : <FaGraduationCap className={`${isEducation ? 'text-green-500' : 'text-blue-500'} text-xs md:text-sm`} />}
      </div>
      
      {/* Timeline Card */}
      <div className="ml-6 md:ml-8">
        <div className="mobile-card bg-white dark:bg-gray-800 p-4 md:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex justify-between items-start mobile-flex-col md:flex-row">
            <div className="flex-1">
              <span className={`text-xs md:text-sm font-medium ${isEducation ? 'text-green-500 dark:text-green-400' : 'text-blue-500 dark:text-blue-400'} mobile-text-sm`}>
                {item.period}
              </span>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mt-1 mobile-text-lg">
                {item.title}
              </h3>
              <div className="text-gray-600 dark:text-gray-300 font-medium text-sm md:text-base mobile-text-sm">
                {item.organization}
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mobile-text-sm">
                {item.location}
              </div>
            </div>
            <button 
              onClick={() => toggleExpand(item.id)}
              className="mobile-touch-target touch-feedback p-2 md:p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors mt-2 md:mt-0"
              aria-label={expandedItems[item.id] ? "Collapse details" : "Expand details"}
            >
              {expandedItems[item.id] ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
          
          {expandedItems[item.id] && (
            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
              <ul className="space-y-2 text-gray-600 dark:text-gray-400 list-disc list-inside mobile-text-sm">
                {item.description.map((desc, i) => (
                  <li key={i} className="text-sm md:text-base leading-relaxed mobile-text-sm">{desc}</li>
                ))}
              </ul>
              
              {item.currentFocus && (
                <div className="mt-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-lg border border-green-100 dark:border-green-800/50">
                  <h5 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-3">Current Focus</h5>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                    {item.currentFocus.map((focus, i) => (
                      <li key={i}>{focus}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {item.technologies && (
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech, i) => (
                      <span 
                        key={i}
                        className={`px-2 md:px-3 py-1 ${isEducation ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'} text-xs md:text-sm rounded-full mobile-text-sm`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div id="timeline" className="max-w-4xl mx-auto mb-16 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transform hover:scale-[1.01] transition-all duration-300">
        <h3 className="text-2xl font-bold mb-6 text-indigo-600 dark:text-indigo-400 flex items-center">
          <FaBriefcase className="mr-3" /> Experience & Education
        </h3>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
          My professional journey and academic background, highlighting key roles and educational milestones that have shaped my career.
        </p>

        {/* Unified timeline with Education on top */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 md:p-8 shadow-md">
          {/* Education Section */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-8 text-green-600 dark:text-green-400 flex items-center">
              <FaGraduationCap className="mr-3" /> Education
            </h3>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 top-0 h-full w-0.5 bg-green-200 dark:bg-green-700/50"></div>
              
              {/* Education Items */}
              <div>
                {educationItems.map((item) => renderTimelineItem(item, true))}
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div>
            <h3 className="text-xl font-bold mb-8 text-blue-600 dark:text-blue-400 flex items-center">
              <FaBriefcase className="mr-3" /> Professional Experience
            </h3>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-0 top-0 h-full w-0.5 bg-blue-200 dark:bg-blue-700/50"></div>
              
              {/* Work Items */}
              <div>
                {workItems.map((item) => renderTimelineItem(item, false))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;