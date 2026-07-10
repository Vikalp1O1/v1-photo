import React, { useState } from 'react';
import { awesomeShootsData } from '@/data/dummyData';
import { FiX, FiCamera } from 'react-icons/fi';
import LightboxGallery from '@/components/LightboxGallery';

const AwesomeShoots = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = 'auto';
  };

  const images = awesomeShootsData.slice(0, 8);

  const ImageCard = ({ item, index }) => (
    <div 
      className="group relative cursor-pointer overflow-hidden bg-gray h-full w-full min-h-0"
      onClick={() => openLightbox(index)}
    >
      {/* Image with Zoom Hover */}
      <img
        src={item.src}
        alt={item.alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      {/* Watermark */}
      <div className="absolute top-3 right-3 flex flex-col items-center opacity-80 z-10 pointer-events-none">
         <span className="font-serif text-lg font-bold leading-none text-white shadow-black drop-shadow-md">as</span>
         <span className="text-[4px] font-sans tracking-widest text-white shadow-black drop-shadow-md mt-0.5">VISUALS</span>
      </div>

      {/* Dark Overlay & View Icon */}
      <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/0 transition-colors duration-500 group-hover:bg-black/50">
        <div className="flex h-16 w-16 scale-50 items-center justify-center rounded-full border border-white/50 bg-white/20 text-white opacity-0 backdrop-blur-sm transition-all duration-500 ease-out group-hover:scale-100 group-hover:opacity-100">
          <FiCamera className="text-2xl" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full bg-[#f4f4f4] pt-12 pb-20">
      <div className="mx-auto max-w-[1800px] px-2 md:px-4">
        {/* Title */}
        <h2 className="mb-6 ml-2 font-cursive text-5xl text-[#222]">
          Our Awesome Shoots
        </h2>

        {/* Symmetrical 5-Column Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1 sm:h-[300px] lg:h-[400px]">
          {/* Column 1 (2 stacked) */}
          <div className="grid grid-rows-2 gap-1 h-full min-h-0 relative">
            <ImageCard item={images[0]} index={0} />
            <ImageCard item={images[1]} index={1} />
          </div>

          {/* Column 2 (1 tall) */}
          <div className="h-[250px] sm:h-full min-h-0 relative">
            <ImageCard item={images[2]} index={2} />
          </div>

          {/* Column 3 (2 stacked) */}
          <div className="grid grid-rows-2 gap-1 h-full min-h-0 relative">
            <ImageCard item={images[3]} index={3} />
            <ImageCard item={images[4]} index={4} />
          </div>

          {/* Column 4 (2 stacked) */}
          <div className="grid grid-rows-2 gap-1 h-full min-h-0 relative">
            <ImageCard item={images[5]} index={5} />
            <ImageCard item={images[6]} index={6} />
          </div>

          {/* Column 5 (1 tall) */}
          <div className="h-[200px] sm:h-full min-h-0 relative">
            <ImageCard item={images[7]} index={7} />
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxGallery 
        images={images} 
        isOpen={selectedImageIndex !== null}
        initialIndex={selectedImageIndex || 0}
        onClose={closeLightbox}
      />
    </div>
  );
};

export default AwesomeShoots;
