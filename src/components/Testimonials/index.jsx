import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import { testimonialsData } from '@/data/dummyData';
import { FiStar } from 'react-icons/fi';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

const Testimonials = () => {
  return (
    <div className="relative flex min-h-[320px] w-full items-center justify-center bg-primary overflow-hidden py-16">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-50"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}
      />

      {/* Dark Overlay */}
      {/* <div className="absolute inset-0 z-0 bg-black/30" /> */}

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
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            className="w-full"
          >
            {testimonialsData.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="flex flex-col items-center justify-center">

                  {/* Photo & Rating (Added based on text prompt requirements) */}
                  {/* <div className="mb-6 flex flex-col items-center">
                    <img
                      src={testimonial.photo}
                      alt={testimonial.name}
                      className="mb-4 h-16 w-16 rounded-full border-2 border-gold/50 object-cover shadow-lg"
                    />
                    <div className="flex gap-1 text-gold">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FiStar key={i} className="fill-current text-sm" />
                      ))}
                    </div>
                  </div> */}

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

          {/* Custom Navigation Arrows (Square buttons on the right side as in the image) */}
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
