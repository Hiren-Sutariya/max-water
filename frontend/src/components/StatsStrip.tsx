import React from 'react';

export const StatsStrip: React.FC = () => {
  const stats = [
    { value: '2006', label: 'ESTABLISHED YEAR' },
    { value: '6 CITIES', label: 'CITIES SERVED' },
    { value: '100%', label: 'CLIENT SATISFACTION' },
    { value: 'TDS < 1', label: 'PURITY GRADIENT' },
  ];

  return (
    <div className="w-full bg-[#061824] border-t border-b border-white/10 py-6 md:py-8 select-none z-20 relative">
      <div className="max-w-[95%] lg:max-w-[92%] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center space-y-1">
              <span className="font-heading font-medium text-3xl md:text-5xl text-white tracking-normal">
                {stat.value}
              </span>
              <span className="text-[#19B8C8] font-heading font-medium text-[9px] md:text-[10.5px] tracking-widest uppercase mt-1 block">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default StatsStrip;
