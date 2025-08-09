import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/Home';
import About from './components/About';
import Footer from './components/layout/Footer';
import './styles/markdown.css';

// Lazy load heavy components
const Projects = lazy(() => import('./components/Projects'));
const Donate = lazy(() => import('./components/Donate'));
const Blog = lazy(() => import('./components/Blog'));
const BlogPost = lazy(() => import('./components/BlogPost'));
const AdminBlog = lazy(() => import('./components/AdminBlog'));
const Services = lazy(() => import('./components/Services'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const ProjectDetail = lazy(() => import('./components/ProjectDetail'));
const Contact = lazy(() => import('./components/Contact'));
const Timeline = lazy(() => import('./components/Timeline'));

// Loading component
const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

const MainPage: React.FC = () => {
  return (
    <>
      <main className="relative">
        <Home />
        <About />
        <Suspense fallback={<LoadingSpinner />}>
          <Services />
          <Timeline />
          <Projects />
          <Testimonials />
          <Donate />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router basename="/">
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/admin/blog" element={<AdminBlog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/project/:projectName" element={<ProjectDetail />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
