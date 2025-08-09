import React, { useState } from 'react';
import { FaBriefcase, FaGraduationCap, FaChevronDown, FaChevronUp, FaInstagram, FaTwitter, FaLinkedin, FaEnvelope } from 'react-icons/fa';

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
  website?: string;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
}

const Timeline: React.FC = () => {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  
  const timelineItems: TimelineItem[] = [
    {
      id: 1,
      type: 'work',
      title: 'Founder & CEO',
      organization: 'Xenovig Digital',
      location: 'Turkey',
      period: '2025 - Present',
      description: [
        'Founded Xenovig Digital, a leading digital media agency specializing in innovative web solutions and digital transformation',
        'Providing comprehensive web development services including custom website design, development, and maintenance',
        'Expert in SEO optimization, helping businesses improve their online visibility and search engine rankings',
        'Developing robust e-commerce solutions that drive sales and enhance customer experience',
        'Leading a team of digital experts to deliver cutting-edge digital marketing strategies',
        'Building and maintaining strong client relationships while expanding the company portfolio'
      ],
      technologies: ['Web Development', 'SEO Optimization', 'E-commerce Solutions', 'Digital Marketing', 'UI/UX Design', 'Social Media Management'],
      website: 'https://www.xenovig.com',
      socialLinks: {
        instagram: 'https://instagram.com/xenovig',
        twitter: 'https://twitter.com/xenovig',
        linkedin: 'https://linkedin.com/company/xenovig'
      }
    },
    {
      id: 2,
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
                {item.website ? (
                  <a
                    href={item.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors border-b border-dashed border-transparent hover:border-current"
                    title="Visit Website"
                  >
                    {item.organization}
                  </a>
                ) : (
                  item.organization
                )}
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-xs md:text-sm mobile-text-sm">
                {item.location}
              </div>

              {/* Social & Contact Links */}
              <div className="mt-4">
                <div className="flex items-center space-x-4">
                  {item.socialLinks?.instagram && (
                    <a
                      href={item.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 transition-colors transform hover:scale-110"
                      title="Instagram @xenovig"
                      aria-label="Instagram"
                    >
                      <FaInstagram size={20} />
                    </a>
                  )}
                  {item.socialLinks?.twitter && (
                    <a
                      href={item.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors transform hover:scale-110"
                      title="Twitter @xenovig"
                      aria-label="Twitter"
                    >
                      <FaTwitter size={20} />
                    </a>
                  )}
                  {item.socialLinks?.linkedin && (
                    <a
                      href={item.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors transform hover:scale-110"
                      title="LinkedIn @xenovig"
                      aria-label="LinkedIn"
                    >
                      <FaLinkedin size={20} />
                    </a>
                  )}
                  {item.organization === 'Xenovig Digital' && (
                    <a
                      href="mailto:info@xenovig.com"
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors transform hover:scale-110"
                      title="Email info@xenovig.com"
                      aria-label="Email"
                    >
                      <FaEnvelope size={20} />
                    </a>
                  )}
                </div>
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
                      <li key={i} className="text-sm md:text-base">{focus}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {item.technologies && item.technologies.length > 0 && (
                <div className="mt-6">
                  <h5 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2">Technologies & Skills</h5>
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech, i) => (
                      <span 
                        key={i}
                        className={`px-2 md:px-3 py-1 text-xs md:text-sm rounded-full ${isEducation 
                          ? 'bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                          : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'}`}
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
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 transform hover:scale-[1.01] transition-all duration-300">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-indigo-600 dark:text-indigo-400 flex items-center">
          <FaBriefcase className="mr-3" /> Experience & Education
        </h2>
        <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
          My professional journey and academic background, highlighting key roles and educational milestones that have shaped my career.
        </p>

        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 md:p-6 lg:p-8 shadow-md">
          {/* Education Section */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-6 text-green-600 dark:text-green-400 flex items-center">
              <FaGraduationCap className="mr-2" /> Education
            </h3>
            
            <div className="relative pl-4 md:pl-6">
              <div className="absolute left-0 top-0 h-full w-0.5 bg-green-200 dark:bg-green-700/50"></div>
              <div>
                {educationItems.map((item) => renderTimelineItem(item, true))}
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-blue-600 dark:text-blue-400 flex items-center">
              <FaBriefcase className="mr-2" /> Professional Experience
            </h3>
            
            <div className="relative pl-4 md:pl-6">
              <div className="absolute left-0 top-0 h-full w-0.5 bg-blue-200 dark:bg-blue-700/50"></div>
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