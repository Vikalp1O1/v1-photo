import React from 'react';
import { useNavigate } from 'react-router-dom';
import useApi from '@/hooks/useApi';
import { videoCategoryApi } from '@/lib/endpoints';
import { resolveImageSrc, PLACEHOLDER_IMAGE } from '@/lib/helpers';

const VideoGallery = () => {
  const navigate = useNavigate();
  const { data: categories, loading } = useApi(() =>
    videoCategoryApi.list({ limit: 20 })
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-200 p-12">
        <div className="max-w-8xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white">
                <div className="w-full h-56 bg-gray-300 animate-pulse" />
                <div className="p-6">
                  <div className="h-4 bg-gray-200 animate-pulse mb-2 w-1/2" />
                  <div className="h-3 bg-gray-100 animate-pulse w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const items = (categories || []).map((cat) => ({
    _id: cat._id,
    slug: cat.slug,
    title: cat.name,
    description: cat.description || '',
    coverImage: resolveImageSrc(cat.image, PLACEHOLDER_IMAGE),
  }));

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-200 flex items-center justify-center">
        <p className="font-button text-sm tracking-widest text-gray-500 uppercase">
          No video categories available
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 p-12">
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((category) => (
            <div
              key={category._id}
              className="bg-white cursor-pointer group flex flex-col"
              onClick={() => navigate(`/video-gallery/${category.slug}`)}
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
