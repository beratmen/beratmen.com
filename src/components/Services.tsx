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
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">My Services</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            I offer a range of services to help businesses and individuals bring their digital ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="mb-5">{service.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;