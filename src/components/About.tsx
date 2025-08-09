import React from 'react';
import {
  FaDatabase,
  FaCloud,
  FaTools,
  FaLaptopCode,
  FaUserTie,
} from 'react-icons/fa';
import StyledName from './shared/StyledName';

type Skill = {
  name: string;
  level: string;
  progress: string;
  colorClass: string;
};

type SkillGroupProps = {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
  progressBg: string;
  progressFg: string;
};

const SkillGroup: React.FC<SkillGroupProps> = ({
  title,
  icon,
  skills,
  progressBg,
  progressFg,
}) => (
  <div>
    <h4 className={`text-lg sm:text-xl font-semibold mb-4 sm:mb-6 flex items-center bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent`}>
      {icon} {title}
    </h4>
    <div className="space-y-4 sm:space-y-5">
      {skills.map((skill, idx) => (
        <div key={idx} className="group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">{skill.name}</span>
            <span className={`text-xs sm:text-sm ${skill.colorClass}`}>{skill.level}</span>
          </div>
          <div className={`relative h-2 ${progressBg} rounded-full overflow-hidden`}>
            <div
              className={`absolute top-0 left-0 h-full ${progressFg} rounded-full group-hover:animate-pulse`}
              style={{ width: skill.progress }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40 dark:from-gray-900 dark:via-blue-950/20 dark:to-indigo-950/30 transition-colors duration-200 mobile-container safe-area-inset-bottom overflow-hidden"
      aria-label="About Me"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -right-32 -top-32 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute left-10 top-1/4 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-pink-500/10 dark:from-indigo-400/10 dark:to-pink-400/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute right-1/3 bottom-20 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-blue-500/10 dark:from-purple-400/10 dark:to-blue-400/10 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 mobile-spacing">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16 mobile-text-lg">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400">
            About
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 dark:from-purple-400 dark:via-pink-400 dark:to-red-400">
            {" "}Me
          </span>
        </h2>

        {/* Bio Section */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16 mobile-spacing">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 transform hover:scale-[1.01] transition-all duration-300 mobile-card">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                Hi, I'm <StyledName />
              </h3>
              <div>
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-3 sm:mb-4">
                  I'm a passionate software engineer specializing in modern web technologies and cloud solutions. 
                  With expertise in React, TypeScript, and cloud architecture, I build robust applications that solve real-world problems.
                </p>
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-3 sm:mb-4">
                  My journey in technology began with self-study and has evolved through
                  work at notable companies. I'm particularly interested in full-stack development,
                  and I enjoy sharing my knowledge through writing and open-source contributions.
                </p>
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  When I'm not coding, you'll find me exploring new technologies or
                  contributing to open-source projects that could shape the future of web development.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16 mobile-spacing">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 transform hover:scale-[1.01] transition-all duration-300 mobile-card">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent flex items-center">
              <FaUserTie className="mr-2 sm:mr-3 text-blue-600 dark:text-blue-400 text-lg sm:text-xl" aria-hidden /> Professional Summary
            </h3>
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-4">
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  I am a dedicated Software Developer with a strong foundation in both front-end and back-end development.
                  My expertise lies in creating efficient, scalable web applications and implementing robust software solutions.
                </p>
                <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  With a deep understanding of modern web technologies and best practices, I excel in
                  delivering high-quality code and solving complex technical challenges.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16 mobile-spacing">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Frontend Skills */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 transform hover:scale-[1.01] transition-all duration-300 mobile-card">
              <SkillGroup
                title="Frontend Development"
                icon={<FaLaptopCode className="mr-2 text-blue-600 dark:text-blue-400 text-lg sm:text-xl" aria-hidden />}
                skills={[
                  { name: 'React.js', level: 'Intermediate', progress: '75%', colorClass: 'text-blue-600 dark:text-blue-400' },
                  { name: 'TypeScript', level: 'Intermediate', progress: '70%', colorClass: 'text-blue-600 dark:text-blue-400' },
                  { name: 'Next.js', level: 'Basic', progress: '50%', colorClass: 'text-blue-600 dark:text-blue-400' },
                  { name: 'Tailwind CSS', level: 'Intermediate', progress: '75%', colorClass: 'text-blue-600 dark:text-blue-400' },
                ]}
                progressBg="bg-blue-100 dark:bg-blue-900/40"
                progressFg="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400"
              />
            </div>

            {/* Backend Skills */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 transform hover:scale-[1.01] transition-all duration-300 mobile-card">
              <SkillGroup
                title="Backend Development"
                icon={<FaDatabase className="mr-2 text-blue-600 dark:text-blue-400 text-lg sm:text-xl" aria-hidden />}
                skills={[
                  { name: 'Node.js', level: 'Basic', progress: '60%', colorClass: 'text-blue-600 dark:text-blue-400' },
                  { name: 'Express', level: 'Basic', progress: '55%', colorClass: 'text-blue-600 dark:text-blue-400' },
                  { name: 'MongoDB', level: 'Basic', progress: '50%', colorClass: 'text-blue-600 dark:text-blue-400' },
                  { name: 'PostgreSQL', level: 'Learning', progress: '40%', colorClass: 'text-blue-600 dark:text-blue-400' },
                ]}
                progressBg="bg-blue-100 dark:bg-blue-900/40"
                progressFg="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400"
              />
            </div>

            {/* Cloud & DevOps */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 transform hover:scale-[1.01] transition-all duration-300 mobile-card">
              <SkillGroup
                title="Cloud & DevOps"
                icon={<FaCloud className="mr-2 text-blue-600 dark:text-blue-400 text-lg sm:text-xl" aria-hidden />}
                skills={[
                  { name: 'AWS', level: 'Basic', progress: '45%', colorClass: 'text-blue-600 dark:text-blue-400' },
                  { name: 'Docker', level: 'Learning', progress: '35%', colorClass: 'text-blue-600 dark:text-blue-400' },
                  { name: 'CI/CD', level: 'Learning', progress: '30%', colorClass: 'text-blue-600 dark:text-blue-400' },
                  { name: 'Git', level: 'Intermediate', progress: '70%', colorClass: 'text-blue-600 dark:text-blue-400' },
                ]}
                progressBg="bg-blue-100 dark:bg-blue-900/40"
                progressFg="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400"
              />
            </div>

            {/* Other Skills */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 transform hover:scale-[1.01] transition-all duration-300 mobile-card">
              <SkillGroup
                title="Other Skills"
                icon={<FaTools className="mr-2 text-blue-600 dark:text-blue-400 text-lg sm:text-xl" aria-hidden />}
                skills={[
                  { name: 'Agile', level: 'Basic', progress: '50%', colorClass: 'text-blue-600 dark:text-blue-400' },
                  { name: 'UI/UX Design', level: 'Basic', progress: '55%', colorClass: 'text-blue-600 dark:text-blue-400' },
                  { name: 'Testing', level: 'Learning', progress: '40%', colorClass: 'text-blue-600 dark:text-blue-400' },
                  { name: 'Documentation', level: 'Basic', progress: '60%', colorClass: 'text-blue-600 dark:text-blue-400' },
                ]}
                progressBg="bg-blue-100 dark:bg-blue-900/40"
                progressFg="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;