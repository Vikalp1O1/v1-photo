import React, { useEffect } from 'react';
import AboutComponent from '@/components/About';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col w-full min-h-screen p-12 bg-gray-200">
      <AboutComponent />
    </div>
  );
};

export default About;
