import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Keyboard, Zoom, Thumbs, FreeMode } from 'swiper/modules';
import { FiX, FiMaximize, FiMinimize, FiPlay, FiPause, FiZoomIn, FiZoomOut } from 'react-icons/fi';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/zoom';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';

const LightboxGallery = ({ images, isOpen, initialIndex, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const swiperRef = useRef(null);
  const containerRef = useRef(null);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          document.exitFullscreen();
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isFullscreen, onClose]);

  // Handle Fullscreen Toggle
  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      try {
        await containerRef.current.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error('Error attempting to enable fullscreen:', err);
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // Listen to external fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Handle Slideshow Toggle
  const toggleSlideshow = () => {
    if (!swiperRef.current) return;
    const swiper = swiperRef.current.swiper;
    
    if (isPlaying) {
      swiper.autoplay.stop();
      setIsPlaying(false);
    } else {
      swiper.autoplay.start();
      setIsPlaying(true);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-sm"
        >
          {/* Top Toolbar */}
          <div className="absolute top-0 left-0 right-0 z-[110] flex items-center justify-end gap-4 p-4 md:p-6 bg-gradient-to-b from-black/80 to-transparent">
            {/* Play/Pause Slideshow */}
            <button
              onClick={toggleSlideshow}
              className="text-white/70 transition-colors hover:text-white"
              title={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
            >
              {isPlaying ? <FiPause className="text-2xl" /> : <FiPlay className="text-2xl" />}
            </button>
            
            {/* Zoom Toggle */}
            <button
              onClick={() => swiperRef.current?.swiper.zoom.toggle()}
              className="text-white/70 transition-colors hover:text-white"
              title="Toggle Zoom"
            >
              {isZoomed ? <FiZoomOut className="text-2xl" /> : <FiZoomIn className="text-2xl" />}
            </button>
            
            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="text-white/70 transition-colors hover:text-white"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <FiMinimize className="text-2xl" /> : <FiMaximize className="text-2xl" />}
            </button>
            
            {/* Close Button */}
            <button
              onClick={() => {
                if (isFullscreen) document.exitFullscreen();
                onClose();
              }}
              className="text-white/70 transition-colors hover:text-white ml-2"
              title="Close"
            >
              <FiX className="text-3xl" />
            </button>
          </div>

          {/* Main Swiper Slider */}
          <div className="flex-1 w-full h-[calc(100%-100px)] relative pb-[100px]">
            <Swiper
              ref={swiperRef}
              modules={[Navigation, Autoplay, Keyboard, Zoom, Thumbs]}
              navigation={true}
              keyboard={{ enabled: true }}
              zoom={{ maxRatio: 3 }}
              initialSlide={initialIndex}
              thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              onInit={(swiper) => {
                swiper.autoplay.stop();
              }}
              onZoomChange={(swiper, scale) => {
                setIsZoomed(scale > 1);
              }}
              className="w-full h-full gallery-swiper"
            >
              {images.map((img, idx) => (
                <SwiperSlide key={idx} className="flex items-center justify-center p-4 md:p-12 pt-20 pb-4">
                  <div className="swiper-zoom-container">
                    <img
                      src={img.src}
                      alt={img.alt || `Gallery image ${idx + 1}`}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          
          {/* Thumbnails Swiper (Mini View at bottom) */}
          <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-black/80 z-[110] px-4 py-3">
            <Swiper
              modules={[Thumbs, FreeMode]}
              onSwiper={setThumbsSwiper}
              spaceBetween={12}
              slidesPerView="auto"
              freeMode={true}
              watchSlidesProgress={true}
              centerInsufficientSlides={true}
              className="h-full thumbs-swiper"
            >
              {images.map((img, idx) => (
                <SwiperSlide 
                  key={idx} 
                  className="!w-24 h-full cursor-pointer rounded-sm overflow-hidden border-2 border-transparent transition-all duration-300 opacity-50 [&.swiper-slide-thumb-active]:opacity-100 [&.swiper-slide-thumb-active]:border-white"
                >
                  <img src={img.src} className="w-full h-full object-cover" alt={`Thumb ${idx + 1}`} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          
          {/* Custom Styles for Swiper Navigation in Gallery */}
          <style dangerouslySetInnerHTML={{__html: `
            .gallery-swiper .swiper-button-next,
            .gallery-swiper .swiper-button-prev {
              color: rgba(255, 255, 255, 0.7);
              transition: color 0.3s;
            }
            .gallery-swiper .swiper-button-next:hover,
            .gallery-swiper .swiper-button-prev:hover {
              color: white;
            }
          `}} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LightboxGallery;
