import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCamera } from 'react-icons/fi';
import useApi from '@/hooks/useApi';
import { categoryApi } from '@/lib/endpoints';
import { resolveImageSrc, PLACEHOLDER_IMAGE } from '@/lib/helpers';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Grid layout patterns — cycle through these for visual variety
const COL_SPANS = [
  'col-span-1',
  'col-span-1',
  'col-span-1 row-span-2',
  'col-span-1',
  'col-span-1',
  'col-span-1',
  'col-span-1',
];

const Portfolio = () => {
  const navigate = useNavigate();
  const { data: categories, loading } = useApi(
    () => categoryApi.list({ limit: 50 }),
    []
  );

  // Loading skeleton
  if (loading) {
    return (
      <div className="w-full bg-[#f8f8f8] pt-12 pb-20">
        <div className="mx-auto max-w-[1800px] px-2 md:px-4">
          <h2 className="mb-6 ml-2 font-cursive text-5xl text-[#222]">Portfolio</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1.5 auto-rows-[240px]">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className={`bg-gray-200 animate-pulse ${COL_SPANS[i]}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const items = (categories || []).map((cat, index) => ({
    _id: cat._id,
    slug: cat.slug,
    title: cat.name,
    image: resolveImageSrc(cat.coverImage || cat.image, PLACEHOLDER_IMAGE),
    colSpan: COL_SPANS[index % COL_SPANS.length],
  }));

  const chunkedItems = [];
  for (let i = 0; i < items.length; i += 7) {
    chunkedItems.push(items.slice(i, i + 7));
  }

  if (chunkedItems.length === 0) return null;

  return (
    <div className="w-full bg-[#f8f8f8] pt-12 pb-20">
      <div className="mx-auto max-w-[1800px] px-2 md:px-4">
        {/* Title */}
        <h2 className="mb-6 ml-2 font-cursive text-5xl text-[#222]">
          Portfolio
        </h2>

        {/* Masonry Grid Slider */}
        <div className="relative group/swiper">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            navigation={{ nextEl: '.portfolio-next', prevEl: '.portfolio-prev' }}
            pagination={{ clickable: true, bulletClass: 'swiper-pagination-bullet !bg-transparent !border !border-gray-400 !opacity-100', bulletActiveClass: 'swiper-pagination-bullet-active !border-black !bg-black' }}
            className="w-full pb-14"
          >
            {chunkedItems.map((chunk, chunkIndex) => (
              <SwiperSlide key={chunkIndex}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1.5 auto-rows-[240px]">
                  {chunk.map((category) => (
                    <div
                      key={category._id}
                      className={`group relative cursor-pointer overflow-hidden bg-gray ${category.colSpan}`}
                      onClick={() => navigate(`/photo-gallery/${category.slug}`)}
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

                        {/* Camera Icon */}
                        <div className="flex items-center text-[11px] font-semibold text-white/90 drop-shadow-md whitespace-nowrap mb-0.5">
                          <FiCamera className="mr-1.5 text-sm" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          <div className="portfolio-prev absolute top-1/2 left-2 sm:left-4 z-20 -translate-y-1/2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-all hover:bg-black/40 hover:scale-110 opacity-0 group-hover/swiper:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          </div>
          <div className="portfolio-next absolute top-1/2 right-2 sm:right-4 z-20 -translate-y-1/2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-all hover:bg-black/40 hover:scale-110 opacity-0 group-hover/swiper:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </div>
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
