import React, { useState } from 'react';
import { FiCamera } from 'react-icons/fi';
import LightboxGallery from '@/components/LightboxGallery';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import useApi from '@/hooks/useApi';
import { awesomeShootApi } from '@/lib/endpoints';
import { resolveImageSrc } from '@/lib/helpers';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const AwesomeShoots = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const { data: photosResponse, loading } = useApi(
    () => awesomeShootApi.getAll({ limit: 100 }),
    []
  );

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = 'auto';
  };

  const allImages = (photosResponse || []).map((photo) => ({
    src: resolveImageSrc(photo.image),
    alt: photo.title || 'Awesome Shoot',
  }));

  // Chunk images into groups of 8
  const chunkedImages = [];
  for (let i = 0; i < allImages.length; i += 8) {
    chunkedImages.push(allImages.slice(i, i + 8));
  }

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
      <div className="mx-auto max-w-[1800px] px-2 md:px-4 relative group/swiper">
        {/* Title */}
        <h2 className="mb-6 ml-2 font-cursive text-5xl text-[#222]">
          Our Awesome Shoots
        </h2>

        {loading ? (
          <div className="flex justify-center py-20 text-gray-500 animate-pulse font-button tracking-widest text-sm">
            Loading...
          </div>
        ) : chunkedImages.length === 0 ? (
          <div className="flex justify-center py-20 text-gray-400 font-button tracking-widest text-sm">
            No photos uploaded yet.
          </div>
        ) : (
          <>
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{ delay: 6000, disableOnInteraction: false }}
              navigation={{ nextEl: '.awesome-next', prevEl: '.awesome-prev' }}
              pagination={{ clickable: true, bulletClass: 'swiper-pagination-bullet !bg-transparent !border !border-gray-400 !opacity-100', bulletActiveClass: 'swiper-pagination-bullet-active !border-black !bg-black' }}
              className="w-full pb-14"
            >
              {chunkedImages.map((images, chunkIndex) => (
                <SwiperSlide key={chunkIndex}>
                  {/* Symmetrical 5-Column Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-1 sm:h-[300px] lg:h-[400px]">
                    {/* Column 1 (2 stacked) */}
                    {images[0] && (
                      <div className="grid grid-rows-2 gap-1 h-full min-h-0 relative">
                        <ImageCard item={images[0]} index={chunkIndex * 8 + 0} />
                        {images[1] && <ImageCard item={images[1]} index={chunkIndex * 8 + 1} />}
                      </div>
                    )}

                    {/* Column 2 (1 tall) */}
                    {images[2] && (
                      <div className="h-[250px] sm:h-full min-h-0 relative">
                        <ImageCard item={images[2]} index={chunkIndex * 8 + 2} />
                      </div>
                    )}

                    {/* Column 3 (2 stacked) */}
                    {images[3] && (
                      <div className="grid grid-rows-2 gap-1 h-full min-h-0 relative">
                        <ImageCard item={images[3]} index={chunkIndex * 8 + 3} />
                        {images[4] && <ImageCard item={images[4]} index={chunkIndex * 8 + 4} />}
                      </div>
                    )}

                    {/* Column 4 (2 stacked) */}
                    {images[5] && (
                      <div className="grid grid-rows-2 gap-1 h-full min-h-0 relative">
                        <ImageCard item={images[5]} index={chunkIndex * 8 + 5} />
                        {images[6] && <ImageCard item={images[6]} index={chunkIndex * 8 + 6} />}
                      </div>
                    )}

                    {/* Column 5 (1 tall) */}
                    {images[7] && (
                      <div className="h-[200px] sm:h-full min-h-0 relative">
                        <ImageCard item={images[7]} index={chunkIndex * 8 + 7} />
                      </div>
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation Arrows */}
            <div className="awesome-prev absolute top-1/2 left-2 sm:left-4 z-20 -translate-y-1/2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-all hover:bg-black/40 hover:scale-110 opacity-0 group-hover/swiper:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            </div>
            <div className="awesome-next absolute top-1/2 right-2 sm:right-4 z-20 -translate-y-1/2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-all hover:bg-black/40 hover:scale-110 opacity-0 group-hover/swiper:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
            </div>
          </>
        )}
      </div>

      {/* Lightbox Modal */}
      <LightboxGallery 
        images={allImages} 
        isOpen={selectedImageIndex !== null}
        initialIndex={selectedImageIndex || 0}
        onClose={closeLightbox}
      />
    </div>
  );
};

export default AwesomeShoots;
