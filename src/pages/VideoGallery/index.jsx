import React from 'react';
import { useNavigate } from 'react-router-dom';
import { videoGalleryData } from '@/data/dummyData';

const VideoGallery = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-200 p-12">
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoGalleryData.map((category) => (
            <div
              key={category.id}
              className="bg-white cursor-pointer group flex flex-col"
              onClick={() => navigate(`/video-gallery/${category.id}`)}
            >
              {/* Image Container */}
              <div className="w-full h-56 overflow-hidden relative">
                <img
                  src={category.coverImage}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Text Container */}
              <div className="p-4 md:p-6 flex-1 flex flex-col">
                <h3 className="text-[14px] font-bold text-gray-900 mb-2 uppercase">
                  {category.title}
                </h3>
                <p className="text-[13px] text-gray-600 leading-relaxed line-clamp-2">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoGallery;
