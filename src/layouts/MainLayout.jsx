import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';
import { Outlet, useLocation } from 'react-router-dom';

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isHiddenPage = location.pathname.startsWith('/weddings') || location.pathname.startsWith('/photo-gallery') || location.pathname.startsWith('/video-gallery');

  return (
    <div className="flex min-h-screen font-sans bg-white relative overflow-hidden">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} setIsOpen={setIsOpen} />

      {/* Main Content (Shifted by Collapsed Sidebar width 64px = 4rem) */}
      <main className="ml-16 flex-1 w-[calc(100%-4rem)] flex flex-col">
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </main>

      {/* Global Floating Buttons */}
      {!isHiddenPage && <FloatingButtons />}
    </div>
  );
};

export default MainLayout;
