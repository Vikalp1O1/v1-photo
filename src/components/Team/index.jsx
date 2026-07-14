import React from 'react';
import useApi from '@/hooks/useApi';
import { teamApi } from '@/lib/endpoints';
import { resolveImageSrc, PLACEHOLDER_IMAGE } from '@/lib/helpers';

const Team = () => {
  const { data: members, loading } = useApi(() => teamApi.list({ limit: 20 }));

  // Loading skeleton
  if (loading) {
    return (
      <div className="w-full bg-white py-20 px-4 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="flex flex-col items-center mb-16">
            <h2 className="text-2xl font-bold tracking-widest text-[#333] uppercase">
              OUR-TEAM
            </h2>
            <div className="w-8 h-1 bg-black mt-2"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-gray-100 animate-pulse h-72 shadow-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const items = (members || []).map((m) => ({
    _id: m._id,
    name: m.name,
    role: m.designation,
    description: m.description,
    image: resolveImageSrc(m.image, PLACEHOLDER_IMAGE),
  }));

  if (items.length === 0) return null;

  return (
    <div className="w-full bg-white py-20 px-4 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-2xl font-bold tracking-widest text-[#333] uppercase">
            OUR-TEAM
          </h2>
          <div className="w-8 h-1 bg-black mt-2"></div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {items.map((member) => (
            <div
              key={member._id}
              className="bg-white flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.15)] h-full overflow-hidden"
            >
              {/* Image */}
              <div className="w-full h-40 sm:h-44 bg-gray-100 relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info Container */}
              <div className="flex flex-col flex-1 p-5 lg:p-6 bg-white">
                <h3 className="text-lg font-medium tracking-wide text-[#333] uppercase mb-2">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-500 uppercase tracking-wide mb-2 font-medium">
                  {member.role}
                </p>
                <p className="text-[12px] text-[#444] leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
