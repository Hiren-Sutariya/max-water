import React from 'react';

interface MaxWaterLogoProps {
  variant?: 'light' | 'dark'; // 'dark' text for light header, 'light' text for dark footer
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  showSubtitle?: boolean;
}

export const MaxWaterLogo: React.FC<MaxWaterLogoProps> = ({
  variant = 'dark',
  size = 'md',
  showSubtitle = false,
}) => {
  const isDarkText = variant === 'dark';

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12 md:w-14 md:h-14',
    xl: 'w-16 h-16 md:w-20 md:h-20',
    '2xl': 'w-24 h-24 md:w-32 md:h-32',
  };

  const titleSizes = {
    sm: 'text-sm',
    md: 'text-base md:text-lg',
    lg: 'text-xl md:text-2xl',
    xl: 'text-2xl sm:text-3xl md:text-4xl',
    '2xl': 'text-4xl md:text-6xl',
  };

  return (
    <div className="flex items-center gap-3.5 select-none group cursor-pointer">
      
      {/* Hexagonal Shield & Crisp White W-Wave Monogram Emblem */}
      <div className={`relative shrink-0 ${iconSizes[size]} transition-transform duration-300 group-hover:scale-105`}>
        <svg
          viewBox="0 0 52 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
        >
          <defs>
            {/* Main Gradient */}
            <linearGradient id="hexGradPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#19B8C8" />
              <stop offset="50%" stopColor="#087EAA" />
              <stop offset="100%" stopColor="#062F4A" />
            </linearGradient>

            {/* Subtle Inner Overlay */}
            <linearGradient id="innerGlass" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Hexagonal Shield Container Background */}
          <polygon
            points="26,3 47,15 47,37 26,49 5,37 5,15"
            fill="url(#hexGradPrimary)"
            rx="3"
          />

          {/* Faceted Top Glass Reflection Highlight */}
          <polygon
            points="26,5 44,16 26,24 8,16"
            fill="url(#innerGlass)"
          />

          {/* Crisp White Interlocking W/M-Wave Fluid Lines */}
          <path
            d="M13 22L20 33L26 23L32 33L39 22"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Outer Border Stroke */}
          <polygon
            points="26,3 47,15 47,37 26,49 5,37 5,15"
            stroke="white"
            strokeWidth="1.5"
            strokeOpacity="0.25"
          />
        </svg>
      </div>

      {/* Modern Industrial Brand Typography */}
      <div className="flex flex-col text-left justify-center">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-heading font-bold tracking-wider uppercase leading-none ${
              isDarkText ? 'text-[#10202B]' : 'text-white'
            } ${titleSizes[size]}`}
          >
            MAX<span className="text-[#19B8C8] font-semibold">WATER</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#087EAA]" />
        </div>

        {showSubtitle && (
          <span className={`font-mono tracking-widest text-[#19B8C8] uppercase font-medium ${
            size === 'xl' || size === '2xl' ? 'text-xs sm:text-sm tracking-[0.25em] pt-1.5' : 'text-[9px] pt-1'
          }`}>
            INDUSTRIAL B2B PURITY
          </span>
        )}
      </div>

    </div>
  );
};
export default MaxWaterLogo;
