import React, { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiArrowUp } from 'react-icons/fi';

const FloatingButtons = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      
      setScrollProgress(progress);

      // Show scroll-to-top only after scrolling down a bit
      if (scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call to set state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex gap-3 items-center">
      
      {/* WhatsApp Button */}
      <a 
        href="https://wa.me/919799252529" 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110"
      >
        <FaWhatsapp className="text-2xl" />
      </a>

      {/* Scroll to Top Button with Progress */}
      <div 
        className={`transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      >
        <button 
          onClick={scrollToTop}
          className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg transition-transform hover:scale-110 group"
        >
          {/* SVG Progress Circle */}
          <svg
            className="absolute inset-0 h-full w-full -rotate-90 transform"
            viewBox="0 0 48 48"
          >
            {/* Background Track */}
            <circle
              cx="24"
              cy="24"
              r={radius}
              stroke="#f3f4f6"
              strokeWidth="4"
              fill="none"
            />
            {/* Progress Indicator */}
            <circle
              cx="24"
              cy="24"
              r={radius}
              stroke="#d71920"
              strokeWidth="4"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <FiArrowUp className="text-[#d71920] text-xl z-10 transition-colors group-hover:text-black" />
        </button>
      </div>
    </div>
  );
};

export default FloatingButtons;
