import React from 'react';
import { Award, ShieldCheck, Zap, DollarSign } from 'lucide-react';

export const WhyUs: React.FC = () => {
  const valueProps = [
    {
      icon: <Award className="w-7 h-7 text-[#087EAA]" />,
      tag: 'BEST SELLER',
      title: 'BEST SELLER & MOST TRUSTED IN GUJARAT',
      desc: 'Recognized as Gujarat’s premier B2B process water supplier, trusted by 200+ chemical, pharmaceutical, auto, and power plants.',
    },
    {
      icon: <ShieldCheck className="w-7 h-7 text-[#087EAA]" />,
      tag: 'BEST QUALITY',
      title: 'UNCOMPROMISED BEST QUALITY OF WATER',
      desc: 'Formulated with multi-bed deionization and RO filtration. Every dispatch arrives with an official Certificate of Analysis (CoA) certifying TDS or ppm at 0. And other components like sulphate, chlorine are also nil.',
    },
    {
      icon: <Zap className="w-7 h-7 text-[#087EAA]" />,
      tag: 'FAST DELIVERY',
      title: 'FAST TURNAROUND & RELIABLE DELIVERY',
      desc: 'Equipped with dedicated SS tanker fleets and regional warehouse hubs ensuring rapid dispatch to your factory within 12–24 hours.',
    },
    {
      icon: <DollarSign className="w-7 h-7 text-[#087EAA]" />,
      tag: 'CONVENIENT PRICE',
      title: 'CONVENIENT & COMPETITIVE B2B PRICING',
      desc: 'Direct factory manufacturer pricing without middleman markups. Customized volume pricing tiers for 5L, 20L, 200L, 1,000L, and bulk tankers.',
    },
  ];

  return (
    <section id="why-us" className="w-full bg-[#F4F8FA] text-[#10202B] py-16 md:py-24 border-b border-[#EBEBEB] select-none scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-[98%] sm:max-w-[94%] lg:max-w-[92%] mx-auto px-2 sm:px-4 md:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end text-left">
          
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-[#087EAA]" />
              <span className="font-heading font-semibold text-[#087EAA] text-xs md:text-sm tracking-widest uppercase">
                WHY CHOOSE MAX WATER
              </span>
            </div>
            <h2 className="font-heading font-semibold text-2xl md:text-4xl tracking-wider text-[#10202B] uppercase leading-tight">
              GUJARAT’S MOST TRUSTED B2B PROCESS WATER SUPPLIER.
            </h2>
          </div>

          <div className="lg:col-span-5">
            {/* Client Requirement Note Statement Box */}
            <div className="bg-white border-l-4 border-[#087EAA] p-5 border border-[#EBEBEB] shadow-xs">
              <p className="text-xs md:text-sm text-[#10202B] font-sans font-medium leading-relaxed italic">
                “We are the best seller in Gujarat and trusted. We believe in customer comfort, best quality of water, fast delivery at convenient price.”
              </p>
            </div>
          </div>

        </div>

        {/* 4 Value Pillars Grid in Crisp Light Theme */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {valueProps.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#EBEBEB] hover:border-[#087EAA]/40 p-8 flex flex-col justify-between space-y-6 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <div className="p-3 bg-[#F4F8FA] border border-[#EBEBEB] group-hover:border-[#087EAA]/30 transition-colors">
                  {item.icon}
                </div>
                <span className="font-mono text-[10px] font-bold tracking-widest text-[#087EAA] bg-[#F4F8FA] px-2.5 py-1 border border-[#EBEBEB] uppercase">
                  {item.tag}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-heading font-semibold text-sm md:text-base text-[#10202B] tracking-wider uppercase leading-snug group-hover:text-[#087EAA] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#5D7180] font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
export default WhyUs;
