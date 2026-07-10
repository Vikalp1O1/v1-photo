import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, FreeMode, Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';

const AlbumSlider = ({ albums, basePath }) => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-full bg-black overflow-hidden relative">
      <Swiper
        modules={[Mousewheel, FreeMode, Navigation]}
        direction="horizontal"
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1440: { slidesPerView: 4 },
        }}
        freeMode={true}
        mousewheel={true}
        navigation={{
          nextEl: '.album-next',
          prevEl: '.album-prev',
        }}
        className="h-full w-full group/swiper"
      >
        {albums.map((album) => (
          <SwiperSlide 
            key={album.id} 
            className="swiper-slide h-full relative group group/slide cursor-pointer overflow-hidden transition-all duration-500 group-has-[.swiper-slide:hover]/swiper:opacity-40 group-has-[.swiper-slide:hover]/swiper:grayscale-[50%] hover:!opacity-100 hover:!grayscale-0" 
            onClick={() => navigate(`${basePath}/${album.id}`)}
          >
            {/* Background Image */}
            <img
              src={album.coverImage}
              alt={album.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover/slide:scale-105"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover/slide:opacity-100 transition-opacity duration-300" />

            {/* Content (Bottom Left) */}
            <div className="absolute bottom-8 left-5 text-white z-10 translate-y-4 group-hover/slide:translate-y-0 transition-transform duration-500">
              <h2 className="text-xl md:text-2xl font-sans font-bold tracking-wider mb-2">
                {album.title}
              </h2>
              <span className="inline-block bg-red-500 border border-white text-white text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm">
                Album
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows (Bottom Right) */}
      <div className="absolute bottom-8 right-8 flex gap-2 z-20">
        <div className="album-prev rounded-xs flex h-10 w-12 cursor-pointer items-center justify-center bg-black/50 text-white backdrop-blur-sm transition-all duration-300 hover:bg-slate-800 opacity-0 hover:!opacity-100 shadow-xl group-hover:opacity-100">
          <FiChevronLeft className="text-xl" />
        </div>
        <div className="album-next rounded-xs flex h-10 w-12 cursor-pointer items-center justify-center bg-black/50 text-white backdrop-blur-sm transition-all duration-300 hover:bg-slate-800 opacity-0 hover:!opacity-100 shadow-xl group-hover:opacity-100">
          <FiChevronRight className="text-xl" />
        </div>
      </div>
    </div>
  );
};

export default AlbumSlider;
