import React from 'react';

const About = () => {
  return (
    <div className="w-full flex flex-col bg-white mb-2">

      {/* SECTION 1: Image Left, Text Right */}
      <div className="relative flex flex-col md:flex-row w-full h-auto md:h-[750px]">

        {/* Left Image (50%) */}
        <div className="w-full md:w-1/2 h-[500px] md:h-full relative z-0">
          <img
            src="https://images.unsplash.com/photo-1519638399535-1b036603ac77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Abhinav Soni - Photographer"
            loading="lazy"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Right Content (50%) */}
        <div className="w-full md:w-1/2 flex items-center justify-start bg-white z-10 relative">
          <div className="bg-white p-8 md:p-16 md:-ml-16 xl:-ml-24 max-w-[650px]">
            <h2 className="font-sans text-2xl md:text-3xl font-bold tracking-[0.2em] text-[#222] uppercase">
              Who I Am?
            </h2>
            <p className="mt-2 font-sans italic text-gray-400 text-sm md:text-base">
              Founder & CEO
            </p>

            <div className="mt-8 md:mt-12">
              <p className="font-sans text-[#222]">
                Hi, I'm <strong className="font-serif italic font-bold text-xl ml-1 tracking-wide">Abhinav Soni</strong>
              </p>
              <p className="mt-4 font-sans text-sm md:text-[15px] leading-relaxed text-gray-600 max-w-lg">
                I am a Jaipur based photographer working worldwide since 2015 with heart and soul and love to make people happy with my photos!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Text Left, Image Right (Corners touching perfectly) */}
      <div className="relative flex flex-col-reverse md:flex-row w-full h-auto md:h-[750px]">

        {/* Left Content (50%) */}
        <div className="w-full md:w-1/2 flex items-center justify-end bg-white z-10 relative">
          <div className="bg-white p-8 md:p-16 md:-mr-16 xl:-mr-24 max-w-[650px] text-left md:text-right">
            <h2 className="font-sans text-2xl md:text-3xl font-bold tracking-[0.2em] text-[#222] uppercase">
              What I Do?
            </h2>
            <p className="mt-2 font-sans italic text-gray-400 text-sm md:text-base">
              A little bit of my work
            </p>

            <div className="mt-8 md:mt-12 space-y-5">
              <p className="font-sans text-sm md:text-[15px] leading-relaxed text-gray-600">
                My style is Candid and Inspiring with a touch of cinematic flair. Experienced in Intimate weddings & destination weddings.
              </p>
              {/* <p className="font-sans text-sm md:text-[15px] leading-relaxed text-gray-600">
                My photos turn fleeting moments into precious memories.
              </p> */}
              <p className="font-sans text-sm md:text-[15px] leading-relaxed text-gray-600">
                Because for me there is nothing more beautiful than a beaming customer's face while they look at their memories. This is what I work for and this is what I love!
              </p>
              <p className="font-sans text-sm md:text-[15px] leading-relaxed text-gray-600 font-medium">
                And what's better than memories?
              </p>
            </div>
          </div>
        </div>

        {/* Right Image (50%) */}
        <div className="w-full md:w-1/2 h-[500px] md:h-full relative z-0">
          <img
            src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Abhinav Soni - Working"
            loading="lazy"
            className="w-full h-full object-cover object-center"
          />
        </div>

      </div>

    </div>
  );
};

export default About;
