import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import useApi from '@/hooks/useApi';
import { bannerApi } from '@/lib/endpoints';
import { resolveImageSrc, PLACEHOLDER_IMAGE } from '@/lib/helpers';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Hero = () => {
  const { data: banners, loading } = useApi(() => bannerApi.list());

  // Loading skeleton
  if (loading) {
    return (
      <section className="relative h-[70vh] w-full bg-gray-100 animate-pulse" />
    );
  }

  // Fallback if no banners from API
  const slides = banners?.length
    ? banners.map((b) => ({
        _id: b._id,
        image: resolveImageSrc(b.image, PLACEHOLDER_IMAGE),
        title: b.title,
        subtitle: b.subtitle || '',
      }))
    : [];

  if (slides.length === 0) return null;

  return (
    <section id="home" className="relative h-[70vh] w-full group">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect="fade"
        loop={slides.length > 1}
        speed={1500}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: '.hero-next',
          prevEl: '.hero-prev',
        }}
        className="hero-swiper h-[70vh] w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide._id}>
            <div className="relative h-full w-full bg-gray-100">
              {/* Image */}
              <img
                src={slide.image}
                alt={slide.title}
                loading="lazy"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <div className="hero-prev absolute bottom-10 left-10 rounded-xs z-10 flex h-10 w-13 cursor-pointer items-center justify-center bg-black/50 text-white backdrop-blur-sm transition-all duration-300 hover:bg-slate-800 opacity-0 group-hover:opacity-100 shadow-xl">
        <FiChevronLeft className="text-xl" />
      </div>
      <div className="hero-next absolute bottom-10 right-10 rounded-xs z-10 flex h-10 w-13 cursor-pointer items-center justify-center bg-black/50 text-white backdrop-blur-sm transition-all duration-300 hover:bg-slate-800 opacity-0 group-hover:opacity-100 shadow-xl">
        <FiChevronRight className="text-xl" />
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .hero-swiper .swiper-pagination-bullet {
          background-color: white;
          opacity: 0.6;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          background-color: #C89B3C;
          opacity: 1;
        }
      `}} />
    </section>
  );
};

export default Hero;
