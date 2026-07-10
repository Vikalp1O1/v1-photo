import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    title: 'The Himalayas',
    subtitle: 'Breathtaking peaks & valleys.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    title: 'Tropical Beach',
    subtitle: 'Golden sands & ocean waves.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
    title: 'Elegance & Grace',
    subtitle: 'A beautiful bride on her special day.',
  }
];

const Hero = () => {
  return (
    <section id="home" className="relative h-[70vh] w-full group">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, Navigation]}
        effect="fade"
        loop={true}
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
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
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
