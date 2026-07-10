import React from 'react';
import { portfolioCategories } from '@/data/dummyData';
import { FiCamera } from 'react-icons/fi';

const Portfolio = () => {
  return (
    <div className="w-full bg-[#f8f8f8] pt-12 pb-20">
      <div className="mx-auto max-w-[1800px] px-2 md:px-4">
        {/* Title */}
        <h2 className="mb-6 ml-2 font-cursive text-5xl text-[#222]">
          Portfolio
        </h2>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1.5 auto-rows-[240px]">
          {portfolioCategories.map((category) => (
            <div
              key={category.id}
              className={`group relative cursor-pointer overflow-hidden bg-gray ${category.colSpan}`}
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.title}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />

              {/* Top Right Watermark Logo */}
              <div className="absolute top-3 right-3 flex flex-col items-center opacity-80">
                <span className="font-serif text-lg font-bold leading-none text-white shadow-black drop-shadow-md">as</span>
                <span className="text-[4px] font-sans tracking-widest text-white shadow-black drop-shadow-md mt-0.5">VISUALS</span>
              </div>

              {/* Bottom Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

              {/* Bottom Content */}
              <div className="absolute bottom-4 left-5 right-4 flex items-end justify-between z-10 pointer-events-none">
                {/* Title */}
                <h3 className="font-sans text-[14px] font-bold tracking-wider text-white uppercase drop-shadow-md pr-4 leading-tight">
                  {category.title}
                </h3>

                {/* Photo Count */}
                <div className="flex items-center text-[11px] font-semibold text-white/90 drop-shadow-md whitespace-nowrap mb-0.5">
                  <FiCamera className="mr-1.5 text-sm" />
                  {category.photoCount}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Get In Touch Button */}
        <div className="mt-12 flex justify-center">
          <a href="#contact" className="bg-blue-600 hover:bg-blue-700 text-white font-button text-xs font-semibold px-10 py-4 tracking-[0.2em] transition-colors duration-300 shadow-md">
            GET IN TOUCH
          </a>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
