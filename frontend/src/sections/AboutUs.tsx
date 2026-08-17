import React from 'react';

export const AboutUs: React.FC = () => {
  return (
    <section id="about" className="w-full bg-white py-16 md:py-24 border-b border-[#EBEBEB] select-none scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-[98%] sm:max-w-[94%] lg:max-w-[92%] mx-auto px-2 sm:px-4 md:px-8">
        
        {/* 18 Years of B2B Industrial Excellence & Quality Standards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-[#087EAA]" />
              <span className="font-heading font-semibold text-[#087EAA] text-xs tracking-widest uppercase">
                OUR HERITAGE & VISION
              </span>
            </div>
            <h2 className="font-heading font-semibold text-2xl md:text-4xl text-[#10202B] uppercase tracking-wider leading-tight">
              18 YEARS OF B2B INDUSTRIAL EXCELLENCE
            </h2>
            <p className="text-sm md:text-base text-[#5D7180] font-sans leading-relaxed">
              Founded in 2006 under legal manufacturer Max & Co. in G.I.D.C. Pandesara, Surat, Max Water was established to solve critical process water purity challenges faced by textile processing houses, chemical reactors, power plants, and auto assemblies.
            </p>
            <p className="text-sm md:text-base text-[#5D7180] font-sans leading-relaxed">
              Over the past 18+ years, we have built specialized purification columns, dedicated tanker fleets, and rigorous CoA batch inspection protocols, serving over 200+ industrial clients with 100% satisfaction.
            </p>
          </div>

          <div className="lg:col-span-6 bg-[#F4F8FA] border border-[#EBEBEB] p-8 md:p-12 space-y-6 text-left">
            <h3 className="font-heading font-semibold text-xl text-[#10202B] tracking-wider uppercase">
              STANDARDS & QUALITY COMPLIANCE
            </h3>
            <ul className="space-y-4 font-sans text-xs md:text-sm text-[#5D7180]">
              <li className="flex items-start gap-3">
                <span className="text-[#087EAA] font-bold">✓</span>
                <span><strong>TDS Guarantee:</strong> Deionized water strictly maintained under TDS &lt; 1 ppm.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#087EAA] font-bold">✓</span>
                <span><strong>Certificate of Analysis (CoA):</strong> Every dispatch carries batch-specific lab certification.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#087EAA] font-bold">✓</span>
                <span><strong>Dedicated Logistics:</strong> Stainless steel tanker trucks & HDPE sealed containers.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#087EAA] font-bold">✓</span>
                <span><strong>Strict Industrial Classification:</strong> Purely process solvents (Not for drinking).</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
export default AboutUs;
