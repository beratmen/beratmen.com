import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaSpinner } from 'react-icons/fa';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Simulate API call - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success!
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40 dark:from-gray-900 dark:via-blue-950/20 dark:to-indigo-950/30 mobile-container safe-area-inset-bottom overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -right-32 -top-32 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute left-10 top-1/4 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-pink-500/10 dark:from-indigo-400/10 dark:to-pink-400/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute right-1/3 bottom-20 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-blue-500/10 dark:from-purple-400/10 dark:to-blue-400/10 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 mobile-spacing">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 mobile-text-lg">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400">
              Get In
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 dark:from-purple-400 dark:via-pink-400 dark:to-red-400">
              {" "}Touch
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mobile-text-base">
            Have a project in mind or want to discuss collaboration opportunities? I'd love to hear from you!
          </p>
        </div>

        {/* New modern grid layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8 xl:gap-10 items-stretch mobile-spacing">
          {/* Contact Info (left column) */}
          <div className="flex flex-col gap-6 sm:gap-8 xl:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 flex-1 flex flex-col justify-center min-h-[180px] mobile-card">
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">Contact Information</h3>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 mobile-touch-target">
                    <FaEnvelope className="text-blue-500 text-sm sm:text-base" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">Email</h4>
                    <a href="mailto:contact@beratmen.com" className="text-sm sm:text-base text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors touch-feedback break-all">
                      contact@beratmen.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-50 dark:bg-green-900/20 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 mobile-touch-target">
                    <FaPhone className="text-green-500 dark:text-green-400 text-sm sm:text-base" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">Phone</h4>
                    <a href="tel:+1234567890" className="text-sm sm:text-base text-gray-900 dark:text-white hover:text-green-500 dark:hover:text-green-400 transition-colors touch-feedback">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 mobile-touch-target">
                    <FaMapMarkerAlt className="text-purple-500 dark:text-purple-400 text-sm sm:text-base" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-1">Location</h4>
                    <p className="text-sm sm:text-base text-gray-900 dark:text-white">
                      Palo Alto, CA, United States
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden flex-shrink-0 mobile-card h-48 sm:h-56" style={{minHeight: 220}}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d101439.6696474454!2d-122.20067837907636!3d37.42941722310311!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb07b9daa25ef%3A0xaa8c762b5358f661!2sPalo%20Alto%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1717305215451!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                sandbox="allow-same-origin allow-scripts allow-popups"
                title="Google Maps - Palo Alto"
                className="rounded-lg shadow-inner dark:opacity-90 hover:opacity-100 transition-opacity duration-300 h-full w-full"
              ></iframe>
            </div>
          </div>
          
          {/* Contact Form (right, 2/3 width) */}
          <div className="xl:col-span-2 flex flex-col justify-center">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 flex-1 flex flex-col justify-center h-full mobile-card">
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">Send a Message</h3>
              
              {isSubmitted ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-700/30 rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-800/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaPaperPlane className="text-green-500 dark:text-green-400 text-xl" />
                  </div>
                  <h4 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">Message Sent Successfully!</h4>
                  <p className="text-green-600 dark:text-green-300 mb-4">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors mobile-touch-target touch-feedback text-sm sm:text-base"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-700/30 rounded-lg p-4 text-red-600 dark:text-red-400">
                      {error}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 sm:px-4 py-3 sm:py-4 text-base rounded-lg border border-gray-300 dark:border-gray-600 
                                bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
                                mobile-input touch-feedback"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 sm:px-4 py-3 sm:py-4 text-base rounded-lg border border-gray-300 dark:border-gray-600 
                                bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                                focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
                                mobile-input touch-feedback"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4 sm:mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 text-base rounded-lg border border-gray-300 dark:border-gray-600 
                              bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                              focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all
                              mobile-input touch-feedback"
                      placeholder="Project Inquiry"
                    />
                  </div>
                  
                  <div className="mb-6 sm:mb-8">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 text-base rounded-lg border border-gray-300 dark:border-gray-600 
                              bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                              focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none
                              mobile-input touch-feedback min-h-[120px]"
                      placeholder="Hello, I'm interested in working with you on..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1
                             flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed
                             mobile-touch-target touch-feedback text-base font-medium min-h-[48px] shadow-lg hover:shadow-xl relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative z-10 flex items-center space-x-2">
                      {isSubmitting ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <FaPaperPlane />
                          <span>Send Message</span>
                        </>
                      )}
                    </div>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;