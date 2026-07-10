import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { videoGalleryData } from '@/data/dummyData';
import { FiPlay, FiX } from 'react-icons/fi';
import ReactPlayer from 'react-player';

const VideoGalleryDetails = () => {
  const { id } = useParams();
  const category = videoGalleryData.find(c => c.id === id);
  const navigate = useNavigate();
  const [playingVideo, setPlayingVideo] = useState(null);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center font-button tracking-widest text-primary">
        CATEGORY NOT FOUND
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] pt-20 pb-12 px-4 md:px-8">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          
          {/* Main Info Box - Spans 2x2 on large screens */}
          <div className="bg-white p-8 md:p-12 lg:p-16 flex flex-col justify-center col-span-1 md:col-span-2 lg:col-span-2 md:row-span-2 lg:row-span-2 shadow-sm">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl italic text-primary mb-6">
              {category.displayTitle}
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed max-w-md">
              {category.description}
            </p>
          </div>

          {/* Videos */}
          {category.videos.map((video) => (
            <div 
              key={video.id} 
              className="flex flex-col cursor-pointer group"
              onClick={() => video.url && setPlayingVideo(video.url)}
            >
              {/* Video Thumbnail Area */}
              <div className="relative w-full aspect-video bg-black overflow-hidden group-hover:opacity-90 transition-opacity">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover opacity-80"
                />
                {/* Fake YouTube Header overlay */}
                <div className="absolute top-0 left-0 w-full p-3 bg-gradient-to-b from-black/80 to-transparent flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <span className="font-serif font-bold text-xs">aS</span>
                  </div>
                  <span className="text-white text-sm font-semibold truncate flex-1 shadow-black drop-shadow-md">
                    {video.title}
                  </span>
                </div>
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-10 bg-black/70 hover:bg-[#ff0000] transition-colors rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%" className="w-8 h-8 fill-white">
                      <path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z"></path>
                      <path d="M 45,24 27,14 27,34" fill="#fff"></path>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Text Below Video */}
              <div className="py-3 px-1">
                <h3 className="text-[10px] md:text-xs font-bold text-primary tracking-widest uppercase">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Video Player Modal */}
      {playingVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4">
          <button 
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white hover:text-gold transition-colors z-10"
            onClick={() => setPlayingVideo(null)}
          >
            <FiX className="text-3xl md:text-4xl" />
          </button>
          
          <div className="relative w-full max-w-6xl aspect-video rounded-lg overflow-hidden shadow-2xl">
            <ReactPlayer 
              url={playingVideo} 
              width="100%" 
              height="100%" 
              playing={true}
              controls={true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGalleryDetails;
