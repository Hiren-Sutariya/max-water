import React, { useRef } from 'react';
import { useWaterPhysics } from '../hooks/useWaterPhysics';
import StatsStrip from '../components/StatsStrip';

interface HeroProps {
  onExploreProducts: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreProducts: _onExploreProducts, onContactClick }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize the canvas wave/ripple physics simulation with light-theme config
  useWaterPhysics(canvasRef, { isLight: true });

  return (
    <section
      id="home"
      className="relative w-full min-h-screen bg-[#F9F9F9] flex flex-col justify-between overflow-hidden pt-24 md:pt-28 select-none"
    >
      {/* HTML5 Canvas Fluid Background (Transparent & Light) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto"
      />

      {/* Subtle industrial background pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,126,170,0.03)_0%,transparent_85%)] pointer-events-none" />

      {/* Industrial Water Processing & Piping Facility Backdrop Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.16] mix-blend-luminosity pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop')`,
          filter: 'contrast(115%) brightness(105%)',
        }}
      />

      {/* Soft silver backdrop mask ensuring text readability */}
      <div className="absolute inset-0 bg-white/70 pointer-events-none" />

      {/* Centered Copy Area */}
      <div className="relative z-10 w-full max-w-[96%] sm:max-w-[94%] lg:max-w-5xl mx-auto px-2 sm:px-4 md:px-6 flex-grow flex flex-col justify-center items-center text-center py-12 md:py-16">
        <div className="max-w-4xl space-y-5 flex flex-col items-center">

          {/* Centered Heading in Chakra Petch font */}
          <h1 className="font-heading font-medium tracking-normal leading-[1.08] text-center select-none uppercase flex flex-col items-center gap-1">
            <span className="text-[#087EAA] text-3xl sm:text-4xl md:text-6xl lg:text-7xl">
              PURE WATER,
            </span>
            <span className="text-[#10202B] text-3xl sm:text-4xl md:text-6xl lg:text-7xl">
              ENGINEERED FOR PURITY.
            </span>
          </h1>

          {/* Subtitle in clean sans-serif */}
          <p className="text-[#5D7180] text-xs sm:text-sm md:text-base lg:text-lg font-sans font-normal max-w-2xl leading-relaxed px-2">
            Strategic process water supply engineered for industrial growth.
          </p>

          {/* Solid brand blue button */}
          <div className="pt-2">
            <button
              onClick={onContactClick}
              className="bg-[#087EAA] hover:bg-[#063B5C] text-white font-heading font-medium text-xs md:text-sm tracking-wider px-8 py-3.5 flex items-center gap-2 transition-colors uppercase shadow-sm cursor-pointer"
            >
              Enquire Now
              <span className="text-[10px] md:text-xs">↗</span>
            </button>
          </div>

        </div>
      </div>

      {/* Stats Strip anchored at the bottom of the screen */}
      <StatsStrip />
    </section>
  );
};
export default Hero;
