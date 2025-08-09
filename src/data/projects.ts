// Define the Project interface
export interface Project {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  technologies: string[];
  category: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  features: string[];
  challenges: string[];
  learnings: string[];
  status: 'completed' | 'in-progress' | 'planned';
  startDate: string;
  endDate?: string;
  screenshots?: string[];
  videoUrl?: string;
  badges?: string[];
}

// Create an array of detailed projects
const projects: Project[] = [
  {
    id: "personal-portfolio",
    title: "Personal Portfolio Website",
    description: "A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS.",
    detailedDescription: `
# Personal Portfolio Website

A comprehensive portfolio website showcasing my skills, projects, and professional journey. This website serves as a digital representation of my work and capabilities.

## Project Overview

This portfolio website is designed to be fast, accessible, and visually appealing. It features a modern design with smooth animations, dark mode support, and responsive layouts that work across all devices.

## Key Features

- **Modern Design**: Clean, minimalist interface with attention to detail
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: User preference-based theme switching
- **Animation**: Smooth transitions and interactive elements using Framer Motion
- **Performance**: Optimized for fast loading and smooth user experience
- **SEO Optimized**: Proper meta tags and structured data for search engines

## Technical Implementation

The website is built using modern web technologies and best practices:

- **Frontend Framework**: React 18 with TypeScript for type safety
- **Styling**: Tailwind CSS for utility-first styling approach
- **Animations**: Framer Motion for smooth, performant animations
- **Routing**: React Router for client-side navigation
- **Build Tool**: Vite for fast development and optimized builds
- **Deployment**: Hosted on modern web platforms with CI/CD

## Development Process

The development process followed modern best practices:

1. **Planning**: Wireframing and design system creation
2. **Development**: Component-based architecture with reusable elements
3. **Testing**: Cross-browser and device compatibility testing
4. **Optimization**: Performance optimization and accessibility improvements
5. **Deployment**: Automated deployment pipeline setup

## Future Enhancements

- Blog integration with CMS
- Contact form with backend integration
- Project showcase with filtering capabilities
- Analytics integration for visitor insights
    `,
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "React Router", "Vite"],
    category: "web",
    githubUrl: "https://github.com/beratmen/beratmen.com",
    liveUrl: "https://beratmen.com",
    features: [
      "Responsive design across all devices",
      "Dark/light mode toggle",
      "Smooth animations and transitions",
      "Modern, clean interface",
      "SEO optimized",
      "Fast loading performance"
    ],
    challenges: [
      "Implementing smooth animations without performance impact",
      "Creating a responsive design that works on all screen sizes",
      "Optimizing images and assets for fast loading",
      "Ensuring accessibility compliance"
    ],
    learnings: [
      "Advanced React patterns and hooks",
      "TypeScript best practices",
      "Performance optimization techniques",
      "Modern CSS with Tailwind",
      "Animation principles with Framer Motion"
    ],
    status: "completed",
    startDate: "2024-01-01",
    endDate: "2024-03-15",
    badges: ["Featured", "Personal", "Open Source"]
  },
  {
    id: "e-commerce-platform",
    title: "Modern E-commerce Platform",
    description: "A full-stack e-commerce solution with React frontend and Node.js backend.",
    detailedDescription: `
# Modern E-commerce Platform

A comprehensive e-commerce platform designed for modern online retail needs. This project demonstrates full-stack development capabilities with a focus on user experience and business functionality.

## Project Overview

This e-commerce platform provides a complete solution for online businesses, featuring user authentication, product management, shopping cart functionality, and payment processing.

## Key Features

- **User Management**: Registration, login, profile management
- **Product Catalog**: Browse, search, and filter products
- **Shopping Cart**: Add, remove, and modify cart items
- **Checkout Process**: Secure payment processing
- **Admin Dashboard**: Product and order management
- **Responsive Design**: Mobile-first approach

## Technical Stack

- **Frontend**: React, TypeScript, Redux Toolkit
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT tokens with refresh mechanism
- **Payments**: Stripe integration
- **Styling**: Styled Components with responsive design
- **State Management**: Redux with RTK Query for API calls

## Architecture

The application follows a modern architecture pattern:

- **Component-based UI**: Reusable React components
- **RESTful API**: Well-structured backend endpoints
- **Database Design**: Optimized MongoDB schemas
- **Security**: Input validation, authentication, and authorization
- **Performance**: Code splitting and lazy loading

## Business Logic

- **Inventory Management**: Real-time stock tracking
- **Order Processing**: Complete order lifecycle management
- **Payment Handling**: Secure transaction processing
- **User Analytics**: Shopping behavior tracking
- **Admin Tools**: Comprehensive management interface
    `,
    technologies: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Stripe", "Redux", "JWT"],
    category: "web",
    features: [
      "User authentication and authorization",
      "Product catalog with search and filters",
      "Shopping cart and checkout process",
      "Payment processing with Stripe",
      "Admin dashboard for management",
      "Responsive design for all devices"
    ],
    challenges: [
      "Implementing secure payment processing",
      "Managing complex state across the application",
      "Ensuring data consistency across multiple users",
      "Optimizing performance for large product catalogs"
    ],
    learnings: [
      "Full-stack development workflow",
      "Payment gateway integration",
      "Database design and optimization",
      "State management best practices",
      "Security implementation in web applications"
    ],
    status: "completed",
    startDate: "2023-06-01",
    endDate: "2023-11-30",
    badges: ["Full Stack", "E-commerce", "MongoDB"]
  },
  {
    id: "task-management-app",
    title: "Collaborative Task Management App",
    description: "A real-time collaborative task management application with team features.",
    detailedDescription: `
# Collaborative Task Management App

A comprehensive task management solution designed for teams and individuals to organize, track, and collaborate on projects effectively.

## Project Overview

This application provides a modern approach to task management with real-time collaboration features, intuitive interfaces, and powerful organizational tools.

## Key Features

- **Project Organization**: Create and manage multiple projects
- **Task Management**: Create, assign, and track tasks
- **Team Collaboration**: Real-time updates and notifications
- **Progress Tracking**: Visual progress indicators and reporting
- **Time Tracking**: Built-in time tracking for productivity analysis
- **File Sharing**: Attach files and documents to tasks

## Technical Implementation

- **Frontend**: React with hooks and context API
- **Real-time Communication**: Socket.io for live updates
- **Backend**: Node.js with Express framework
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Auth0 integration
- **File Storage**: AWS S3 for file uploads
- **Deployment**: Docker containers with CI/CD pipeline

## Features in Detail

### Task Management
- Create, edit, and delete tasks
- Set priorities, due dates, and assignees
- Add comments and attachments
- Track time spent on tasks

### Team Collaboration
- Real-time notifications
- Comment threads on tasks
- Team member management
- Activity feed and history

### Project Organization
- Multiple project support
- Kanban board visualization
- Custom workflows and statuses
- Progress reporting and analytics
    `,
    technologies: ["React", "Node.js", "PostgreSQL", "Socket.io", "Prisma", "Auth0", "AWS S3", "Docker"],
    category: "web",
    features: [
      "Real-time collaboration",
      "Project and task organization",
      "Team member management",
      "Time tracking functionality",
      "File sharing and attachments",
      "Progress reporting and analytics"
    ],
    challenges: [
      "Implementing real-time synchronization",
      "Managing complex user permissions",
      "Optimizing database queries for performance",
      "Ensuring data consistency in collaborative environment"
    ],
    learnings: [
      "Real-time application development",
      "Database design for multi-tenant applications",
      "WebSocket implementation and management",
      "Cloud services integration",
      "Team collaboration features implementation"
    ],
    status: "in-progress",
    startDate: "2024-02-01",
    badges: ["Real-time", "Collaboration", "PostgreSQL"]
  },
  {
    id: "weather-dashboard",
    title: "Advanced Weather Dashboard",
    description: "A comprehensive weather application with forecasts, maps, and alerts.",
    detailedDescription: `
# Advanced Weather Dashboard

A sophisticated weather application providing current conditions, forecasts, interactive maps, and weather alerts for locations worldwide.

## Project Overview

This weather dashboard combines multiple weather data sources to provide comprehensive weather information with an intuitive, map-based interface.

## Key Features

- **Current Weather**: Real-time weather conditions
- **Extended Forecasts**: 7-day and hourly forecasts
- **Interactive Maps**: Weather layers and radar
- **Severe Alerts**: Weather warnings and notifications
- **Location Services**: GPS-based and manual location selection
- **Historical Data**: Weather trends and comparisons

## Technical Stack

- **Frontend**: React with TypeScript
- **Maps Integration**: Mapbox GL JS
- **Weather APIs**: OpenWeatherMap, WeatherAPI
- **State Management**: Zustand for simplified state management
- **Charts**: Chart.js for data visualization
- **Styling**: Tailwind CSS with custom components

## Data Sources

- **Weather Data**: Multiple API sources for reliability
- **Map Data**: Mapbox vector tiles
- **Geocoding**: Reverse geocoding for location names
- **Alerts**: National weather service integrations

## User Experience

- **Responsive Design**: Optimized for all screen sizes
- **Performance**: Efficient data fetching and caching
- **Accessibility**: Screen reader compatible
- **Offline Support**: Service worker for offline functionality
    `,
    technologies: ["React", "TypeScript", "Mapbox", "Chart.js", "Tailwind CSS", "Zustand"],
    category: "web",
    features: [
      "Real-time weather data",
      "Interactive weather maps",
      "Extended weather forecasts",
      "Severe weather alerts",
      "Location-based services",
      "Data visualization with charts"
    ],
    challenges: [
      "Integrating multiple weather APIs",
      "Optimizing map performance",
      "Handling large amounts of weather data",
      "Creating intuitive data visualizations"
    ],
    learnings: [
      "Map integration and customization",
      "API integration and data management",
      "Data visualization best practices",
      "Performance optimization for data-heavy applications"
    ],
    status: "completed",
    startDate: "2023-09-01",
    endDate: "2023-12-15",
    badges: ["Weather", "Maps", "API Integration"]
  },
  {
    id: "mobile-fitness-app",
    title: "React Native Fitness Tracker",
    description: "A comprehensive fitness tracking mobile app with workout plans and progress monitoring.",
    detailedDescription: `
# React Native Fitness Tracker

A complete fitness tracking mobile application designed to help users achieve their health and fitness goals through personalized workout plans and comprehensive progress monitoring.

## Project Overview

This mobile application provides users with the tools they need to track workouts, monitor progress, and stay motivated on their fitness journey.

## Key Features

- **Workout Tracking**: Log exercises, sets, reps, and weights
- **Pre-built Programs**: Various workout plans for different goals
- **Progress Analytics**: Visual progress tracking and statistics
- **Social Features**: Share achievements and connect with friends
- **Nutrition Tracking**: Calorie and macro tracking
- **Wearable Integration**: Sync with fitness devices

## Technical Implementation

- **Framework**: React Native with Expo
- **State Management**: Redux Toolkit with persistence
- **Database**: SQLite for offline data storage
- **Backend**: Firebase for user data and sync
- **Authentication**: Firebase Auth with social login
- **Analytics**: Custom analytics for user insights
- **Push Notifications**: Workout reminders and achievements

## Features in Detail

### Workout Management
- Custom workout creation
- Exercise library with instructions
- Timer for rest periods
- Progress photos and measurements

### Progress Tracking
- Weight and body measurement tracking
- Performance analytics and trends
- Achievement system and badges
- Workout history and statistics

### Social Integration
- Friend connections and challenges
- Leaderboards and competitions
- Achievement sharing
- Community features
    `,
    technologies: ["React Native", "Expo", "Redux", "SQLite", "Firebase", "TypeScript"],
    category: "mobile",
    features: [
      "Comprehensive workout tracking",
      "Pre-built fitness programs",
      "Progress analytics and visualization",
      "Social features and challenges",
      "Offline functionality",
      "Wearable device integration"
    ],
    challenges: [
      "Implementing complex animations in React Native",
      "Managing offline data synchronization",
      "Optimizing performance for large datasets",
      "Creating intuitive mobile user interfaces"
    ],
    learnings: [
      "Mobile app development with React Native",
      "Offline-first application architecture",
      "Mobile UI/UX design principles",
      "Firebase integration and real-time features"
    ],
    status: "completed",
    startDate: "2023-03-01",
    endDate: "2023-08-30",
    badges: ["Mobile", "React Native", "Fitness"]
  }
];

export default projects;