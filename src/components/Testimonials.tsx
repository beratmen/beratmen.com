import React, { useState, useEffect } from 'react';
import { FaQuoteLeft, FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa';
import StyledName from './shared/StyledName';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Founder',
      company: 'StartUp Edge',
      content: 'I hired Berat MEN to build our company website and API integration. His work was clean, well-documented, and performed exactly as we needed. I highly recommend his services.',
      avatar: '/images/testimonials/avatar3.jpg',
      rating: 4
    },
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CTO',
      company: 'TechNova',
      content: 'Working with Berat MEN was an exceptional experience. His technical expertise and ability to understand our business needs resulted in a solution that exceeded our expectations.',
      avatar: '/images/testimonials/avatar1.jpg',
      rating: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Product Manager',
      company: 'Innovate Labs',
      content: 'Berat MEN delivered our project on time and on budget. His communication throughout the process was excellent, and he was always available to answer questions and make adjustments.',
      avatar: '/images/testimonials/avatar2.jpg',
      rating: 5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Helper function to render content with styled name
  const renderContent = (content: string) => {
    if (content.includes('Berat MEN')) {
      const parts = content.split('Berat MEN');
      return (
        <>
          {parts[0]}
          <StyledName />
          {parts[1]}
        </>
      );
    }
    return content;
  };

  const goToTestimonial = (index: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const nextTestimonial = () => {
    goToTestimonial((currentIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    goToTestimonial((currentIndex - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);
    
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section id="testimonials" className="relative py-12 md:py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/40 dark:from-gray-900 dark:via-blue-950/20 dark:to-indigo-950/30 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -right-32 -top-32 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute left-10 top-1/4 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-pink-500/10 dark:from-indigo-400/10 dark:to-pink-400/10 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute right-1/3 bottom-20 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-blue-500/10 dark:from-purple-400/10 dark:to-blue-400/10 rounded-full filter blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      <div className="container relative z-10 mx-auto mobile-spacing px-4 mobile-container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 mobile-text-contrast">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 dark:from-white dark:via-blue-400 dark:to-purple-400">
              Client
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 dark:from-purple-400 dark:via-pink-400 dark:to-red-400">
              {" "}Testimonials
            </span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mobile-text-base">
            Here's what people are saying about working with me.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Testimonial Cards */}
          <div className="overflow-hidden relative mobile-scroll">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="w-full flex-shrink-0 px-2 md:px-4"
                >
                  <div className="mobile-card bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 lg:p-10 shadow-lg relative touch-feedback">
                    <FaQuoteLeft className="text-3xl md:text-4xl text-blue-100 dark:text-gray-700 absolute top-4 md:top-8 left-4 md:left-8" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center mb-4 md:mb-6">
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden mb-3 sm:mb-0 sm:mr-4 md:mr-6">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback for missing images
                            (e.target as HTMLImageElement).src = 'https://placehold.co/150x150/EEE/31343C?text=User';
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mobile-text-lg">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mobile-text-sm">
                          {testimonial.role}, {testimonial.company}
                        </p>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <FaStar 
                              key={i}
                              className={`${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'} mr-1 text-sm`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg relative z-10 mobile-text-base leading-relaxed">
                      "{renderContent(testimonial.content)}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-6 bg-white dark:bg-gray-700 rounded-full p-3 shadow-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors z-10"
            aria-label="Previous testimonial"
          >
            <FaChevronLeft />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-6 bg-white dark:bg-gray-700 rounded-full p-3 shadow-lg text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors z-10"
            aria-label="Next testimonial"
          >
            <FaChevronRight />
          </button>
          
          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'bg-blue-500 w-6' 
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;