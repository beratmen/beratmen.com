import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Donate from './components/Donate';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import AdminBlog from './components/AdminBlog';
import Footer from './components/layout/Footer';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import ProjectDetail from './components/ProjectDetail';
import Contact from './components/Contact';
import Timeline from './components/Timeline';
import './styles/markdown.css';

// Removed: SectionName template component (not used anywhere)

const MainPage: React.FC = () => {
  return (
    <>
      <main className="relative">
        <Home />
        <About />
        {/* Removed <Skills /> */}
        <Services />
        <Timeline />
        <Projects />
        <Testimonials />
        <Donate />
        <Contact />
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
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/admin/blog" element={<AdminBlog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/project/:projectName" element={<ProjectDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;