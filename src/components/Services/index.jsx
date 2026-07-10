import React from 'react';
import { servicesData } from '@/data/dummyData';
import * as Icons from 'react-icons/fi';

const Services = () => {
  return (
    <div className="w-full bg-[#f4f4f4] py-16 px-4 md:px-12">
      <div className="mx-auto max-w-[1400px]">
        {/* Title */}
        <h2 className="mb-12 ml-2 font-cursive text-5xl text-[#222]">
          What We Do
        </h2>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service) => {
            const Icon = Icons[service.iconName];
            return (
              <div
                key={service.id}
                className="group flex cursor-pointer items-start gap-5 rounded-lg border border-transparent p-4 transition-all duration-300 hover:bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
              >
                {/* Icon Container (Mimicking the blue floral wreath vibe) */}
                <div className="flex shrink-0 h-16 w-16 items-center justify-center rounded-full bg-[#0d2a45] text-white shadow-md transition-all duration-300 group-hover:shadow-lg ">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/50 bg-[#0d2a45]">
                    {Icon && <Icon className="text-2xl text-gold" />}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="mb-2 font-sans text-sm font-bold tracking-wide text-[#222] transition-colors group-hover:text-gold">
                    {service.title}
                  </h3>
                  <p className="font-sans text-[12px] leading-relaxed text-[#555]">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Services;
