import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import useApi from '@/hooks/useApi';
import { testimonialApi } from '@/lib/endpoints';
import { resolveImageSrc } from '@/lib/helpers';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

const Testimonials = () => {
  const { data: testimonials, loading } = useApi(() =>
    testimonialApi.list({ limit: 20 })
  );

  const [activeIndex, setActiveIndex] = React.useState(0);

  // Loading — show the section with a subtle pulse
  if (loading) {
    return (
      <div className="relative flex min-h-[320px] w-full items-center justify-center bg-primary overflow-hidden py-16">
        <div className="relative z-10 text-center">
          <h2 className="mb-10 font-sans text-sm font-bold uppercase tracking-[0.3em] text-white">
            - What Do Our Customers Think -
          </h2>
          <div className="h-20 w-96 mx-auto bg-white/10 animate-pulse rounded" />
        </div>
      </div>
    );
  }

  const items = (testimonials || []).map((t) => ({
    _id: t._id,
    name: t.clientName,
    backgroundImage: resolveImageSrc(t.backgroundImage),
    review: t.review,
    rating: t.rating,
  }));



  if (items.length === 0) return null;

  return (
    <div className="relative flex min-h-[320px] w-full items-center justify-center bg-primary overflow-hidden py-16">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-50 transition-all duration-700"
        style={{ backgroundImage: `url('${items[activeIndex]?.backgroundImage || 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80'}')` }}
      />

      {/* Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 text-center md:px-20">
        <h2 className="mb-10 font-sans text-sm font-bold uppercase tracking-[0.3em] text-white">
          - What Do Our Customers Think -
        </h2>

        <div className="relative">
          <Swiper
            modules={[Autoplay, EffectFade, Navigation]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={items.length > 1}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            className="w-full"
          >
            {items.map((testimonial) => (
              <SwiperSlide key={testimonial._id}>
                <div className="flex flex-col items-center justify-center">
                  {/* Name */}
                  <h3 className="mb-6 font-sans text-lg font-bold uppercase tracking-wider text-white">
                    {testimonial.name}
                  </h3>

                  {/* Review */}
                  <p className="mx-auto max-w-4xl font-sans text-[13px] leading-relaxed text-gray-200 md:text-[14px]">
                    {testimonial.review}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows */}
          <div className="absolute top-1/2 -right-4 z-20 hidden -translate-y-1/2 flex-row gap-1 md:flex lg:-right-12">
            <button className="swiper-button-prev-custom flex h-10 w-10 cursor-pointer items-center justify-center bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-black">
              &lt;
            </button>
            <button className="swiper-button-next-custom flex h-10 w-10 cursor-pointer items-center justify-center bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-black">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
