import React, { useEffect, useState } from 'react';
import MaxWaterLogo from './MaxWaterLogo';

export const Preloader: React.FC = () => {
  const [isFinished, setIsFinished] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Show splash screen logo for ~1.8 seconds, then trigger smooth fade out
    const finishTimer = setTimeout(() => {
      setIsFinished(true);
    }, 1800);

    // Completely unmount after fade-out transition finishes
    const hideTimer = setTimeout(() => {
      setIsHidden(true);
    }, 2500);

    return () => {
      clearTimeout(finishTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (isHidden) return null;

  return (
    <div
      className={`fixed inset-0 w-screen h-screen z-[9999] bg-[#041018] flex items-center justify-center select-none overflow-hidden transition-opacity duration-700 ease-in-out ${
        isFinished ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,184,200,0.18)_0%,transparent_70%)] pointer-events-none" />

      {/* Centered Stable Splash Logo */}
      <div className="relative z-10 drop-shadow-[0_0_50px_rgba(25,184,200,0.5)]">
        <MaxWaterLogo variant="light" size="xl" showSubtitle={true} />
      </div>
    </div>
  );
};
export default Preloader;
