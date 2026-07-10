import React from 'react';
import { teamData } from '@/data/dummyData';

const Team = () => {
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
          {teamData.map((member) => (
            <div
              key={member.id}
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
