import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiArrowLeft } from 'react-icons/fi';
import LightboxGallery from '@/components/LightboxGallery';

const AlbumDetails = ({ album, backPath }) => {
  const navigate = useNavigate();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);

  const closeLightbox = () => setSelectedPhotoIndex(null);

  return (
    <div className="min-h-screen bg-[#f8f8f8] py-8 px-4 md:px-8">
      <div className="max-w-[2000px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          
          {/* 1. Details Card (Same shape as photo cards) */}
          <div 
            className="w-full aspect-[4/3] bg-white flex flex-col justify-center p-6 lg:p-8 shadow-sm relative group cursor-pointer overflow-hidden" 
            onClick={() => navigate(backPath)}
          >
            <div className="absolute top-4 left-4 flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors text-gray-600">
              <FiArrowLeft />
            </div>

            <h1 className="font-serif text-2xl md:text-3xl text-[#222] mb-3 mt-4 leading-tight capitalize">
              {album.title.toLowerCase()}
            </h1>
            
            <p className="font-sans text-xs md:text-[13px] leading-relaxed text-gray-600 mb-4 line-clamp-4">
              {album.description}
            </p>
            
            <div className="flex items-center gap-1 text-[#D32F2F] font-sans text-xs font-semibold tracking-wider uppercase mt-auto">
              <FiMapPin className="text-[10px]" /> {album.location}
            </div>
          </div>

          {/* 2. Photo Cards */}
          {album.photos.map((photo, index) => (
            <div 
              key={index} 
              className="w-full aspect-[4/3] bg-gray-200 overflow-hidden shadow-sm cursor-pointer group"
              onClick={() => setSelectedPhotoIndex(index)}
            >
              <img 
                src={photo} 
                alt={`${album.title} photo ${index + 1}`} 
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
          
        </div>
      </div>

      <LightboxGallery 
        images={album.photos.map(p => ({ src: p, alt: album.title }))} 
        isOpen={selectedPhotoIndex !== null}
        initialIndex={selectedPhotoIndex || 0}
        onClose={closeLightbox}
      />
    </div>
  );
};

export default AlbumDetails;
