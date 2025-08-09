import React from 'react';
import { FaCode, FaServer, FaMobile, FaDatabase, FaCloud, FaTools } from 'react-icons/fa';

const Services: React.FC = () => {
  const services = [
    {
      title: 'Frontend Development',
      description: 'Crafting responsive, accessible, and performant user interfaces with modern frameworks like React.',
      icon: <FaCode className="text-3xl text-blue-500" />
    },
    {
      title: 'Backend Development',
      description: 'Building robust server-side applications and APIs using Node.js and other technologies.',
      icon: <FaServer className="text-3xl text-green-500" />
    },
    {
      title: 'Mobile App Development',
      description: 'Creating cross-platform mobile applications with React Native or native technologies.',
      icon: <FaMobile className="text-3xl text-purple-500" />
    },
    {
      title: 'Database Design',
      description: 'Designing efficient database schemas and implementing optimized queries for various database systems.',
      icon: <FaDatabase className="text-3xl text-orange-500" />
    },
    {
      title: 'Cloud Solutions',
      description: 'Deploying and managing applications on cloud platforms like AWS, Azure, or Google Cloud.',
      icon: <FaCloud className="text-3xl text-cyan-500" />
    },
    {
      title: 'DevOps & CI/CD',
      description: 'Setting up continuous integration and deployment pipelines for automated testing and delivery.',
      icon: <FaTools className="text-3xl text-red-500" />
    }
  ];

  return (
    <section id="services" className="relative py-16 sm:py-20 md:py-24 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40 dark:from-gray-900 dark:via-blue-950/20 dark:to-indigo-950/30 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -right-32 -top-32 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute left-10 top-1/4 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-pink-500/10 dark:from-indigo-400/10 dark:to-pink-400/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute right-1/3 bottom-20 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-blue-500/10 dark:from-purple-400/10 dark:to-blue-400/10 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400">
              My
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 dark:from-purple-400 dark:via-pink-400 dark:to-red-400">
              {" "}Services
            </span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            I offer a range of services to help businesses and individuals bring their digital ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group relative h-full bg-gradient-to-br from-white via-white to-gray-50/50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900/50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden backdrop-blur-sm p-8 transform hover:-translate-y-2"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="mb-5">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;