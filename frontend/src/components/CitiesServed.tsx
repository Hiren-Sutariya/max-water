import React from 'react';

export const CitiesServed: React.FC = () => {
  const cities = [
    'ANKLESHWAR',
    'AHMEDABAD',
    'SURAT',
    'VADODARA',
    'DAHEJ',
    'VAPI',
  ];

  return (
    <section id="cities" className="w-full bg-[#10202B] py-16 md:py-24 border-b border-[#1E3442] select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center space-y-12">
        
        {/* Centered Heading in Chakra Petch */}
        <div className="space-y-3">
          <h2 className="font-heading font-semibold text-2xl md:text-4xl tracking-wider text-white uppercase">
            CITIES & INDUSTRIAL HUBS SERVED
          </h2>
          <div className="w-12 h-1 bg-[#087EAA] mx-auto" />
        </div>

        {/* 6 Minimal Typographic City Name Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 pt-4">
          {cities.map((cityName, idx) => (
            <div
              key={idx}
              className="bg-[#0B1720] border border-white/10 hover:border-[#19B8C8]/60 h-24 md:h-28 p-4 flex items-center justify-center group transition-all duration-300 hover:-translate-y-1 shadow-md cursor-pointer"
            >
              <h3 className="font-heading font-semibold text-base md:text-lg text-white tracking-widest uppercase group-hover:text-[#19B8C8] transition-colors text-center">
                {cityName}
              </h3>
            </div>
          ))}
        </div>

        {/* Bottom Subtitle with Highlighted Text */}
        <div className="pt-6 border-t border-white/10 max-w-3xl mx-auto">
          <p className="text-sm md:text-base font-sans leading-relaxed text-slate-300">
            <span className="text-[#19B8C8] font-medium">Supporting key industrial hubs</span>{' '}
            with reliable batch-certified process water logistics and dedicated tanker fleets.
          </p>
        </div>

      </div>
    </section>
  );
};
export default CitiesServed;
