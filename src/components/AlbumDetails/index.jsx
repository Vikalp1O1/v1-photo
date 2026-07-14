import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiArrowLeft } from 'react-icons/fi';
import LightboxGallery from '@/components/LightboxGallery';

const AlbumDetails = ({ album, backPath, hasMore, onLoadMore }) => {
  const navigate = useNavigate();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore && onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, onLoadMore]);

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
          {/* Infinite Scroll Target & Skeletons */}
          {hasMore && (
            <>
              <div ref={observerTarget} className="w-full aspect-[4/3] bg-gray-200 animate-pulse shadow-sm flex items-center justify-center">
                <span className="text-gray-400 font-button text-[10px] tracking-widest uppercase">Loading...</span>
              </div>
              <div className="w-full aspect-[4/3] bg-gray-200 animate-pulse shadow-sm hidden sm:block"></div>
              <div className="w-full aspect-[4/3] bg-gray-200 animate-pulse shadow-sm hidden md:block"></div>
              <div className="w-full aspect-[4/3] bg-gray-200 animate-pulse shadow-sm hidden lg:block"></div>
            </>
          )}
          
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
