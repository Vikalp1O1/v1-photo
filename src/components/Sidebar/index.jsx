import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiMenu, FiMail } from 'react-icons/fi';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const navLinks = [
  { id: 'home', path: '/', label: 'HOME', isAnchor: true },
  { id: 'about', path: '/about', label: 'ABOUT ME', isAnchor: false },
  { id: 'weddings', path: '/weddings', label: 'REAL WEDDINGS', isAnchor: false },
  { id: 'photo-gallery', path: '/photo-gallery', label: 'PHOTO GALLERY', isAnchor: false },
  { id: 'video-gallery', path: '/video-gallery', label: 'VIDEO GALLERY', isAnchor: false },
  { id: 'team', path: '/team', label: 'MEET THE TEAM', isAnchor: false },
  { id: 'contact', path: '/contact', label: 'GET IN TOUCH', isAnchor: false },
];

const Sidebar = ({ isOpen, toggleSidebar, setIsOpen }) => {
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll Spy Logic
  useEffect(() => {
    if (location.pathname !== '/') return; // Only spy on home page

    const handleScroll = () => {
      const sections = navLinks
        .filter(link => link.isAnchor)
        .map((link) => document.getElementById(link.id));
        
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Handle hash scrolling on mount if navigating from another page
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(id);
        }
      }, 100);
    }
  }, [location]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  const handleNavigation = (e, link) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (!link.isAnchor) {
      navigate(link.path);
      setActiveSection(link.id);
    } else {
      if (location.pathname !== '/') {
        navigate(link.path);
      } else {
        if (link.id === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setActiveSection('home');
        } else {
          const element = document.getElementById(link.id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveSection(link.id);
          }
        }
      }
    }
  };

  return (
    <>
      {/* Collapsed Sidebar (Always visible on left) */}
      <div className="fixed left-0 top-0 z-30 flex h-screen w-16 flex-col items-center bg-white py-6 shadow-[2px_0_10px_rgba(0,0,0,0.05)] border-r border-gray/20">
        {/* Small Logo */}
        <div className="flex flex-col items-center cursor-pointer" onClick={(e) => handleNavigation(e, navLinks[0])}>
           <span className="font-serif text-3xl font-bold tracking-tighter text-primary">as</span>
           <span className="text-[6px] font-semibold tracking-widest text-primary mt-1">VISUALS</span>
        </div>

        {/* Hamburger Menu (Absolute Middle) */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer p-4"
          onMouseEnter={() => setIsOpen(true)}
          onClick={() => setIsOpen(true)}
        >
          <div className="flex flex-col gap-1.5 items-center justify-center hover:opacity-70 transition-opacity">
            <span className="block h-[2px] w-6 bg-primary"></span>
            <span className="block h-[2px] w-6 bg-primary"></span>
            <span className="block h-[2px] w-6 bg-primary"></span>
          </div>
        </div>

        {/* Email Icon at Bottom */}
        <div className="absolute bottom-8 flex items-center justify-center text-primary hover:text-gold transition-colors">
          <a href="mailto:info@abhinavsoni.com">
            <FiMail className="text-xl" />
          </a>
        </div>
      </div>

      {/* Drawer Overlay (Optional, but good for focus) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      {/* Opened Drawer */}
      <aside
        onMouseLeave={() => setIsOpen(false)}
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-[280px] flex-col items-center bg-white px-6 py-12 text-primary shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        `}
      >
        <button 
          onClick={() => setIsOpen(false)} 
          className="absolute right-6 top-6 text-primary transition-transform hover:rotate-90 hover:text-gold md:hidden" 
          aria-label="Close menu"
        >
          <FiX className="text-2xl" />
        </button>

        {/* Large Logo */}
        <div className="mb-16 mt-4 flex flex-col items-center text-center cursor-pointer" onClick={(e) => handleNavigation(e, navLinks[0])}>
          <span className="font-serif text-7xl font-bold tracking-tighter">as</span>
          <h2 className="mt-2 text-lg font-bold tracking-[0.15em]">ABHINAV SONI</h2>
          <p className="text-[9px] font-semibold tracking-[0.4em]">PHOTOGRAPHY</p>
        </div>

        {/* Navigation */}
        <nav className="flex w-full flex-1 flex-col items-center gap-4">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.path}
              onClick={(e) => handleNavigation(e, link)}
              className={`group relative text-center font-button text-xs font-semibold tracking-[0.1em] transition-colors duration-300
                ${activeSection === link.id ? 'text-primary' : 'text-text hover:text-primary'}
              `}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Email at Bottom */}
        <div className="mt-auto mb-4 flex items-center gap-3 text-primary hover:text-gold transition-colors">
          <a href="mailto:info@abhinavsoni.com" className="flex items-center gap-3">
            <FiMail className="text-xl" />
            <span className="font-sans text-xs font-semibold tracking-wider">info@abhinavsoni.com</span>
          </a>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
