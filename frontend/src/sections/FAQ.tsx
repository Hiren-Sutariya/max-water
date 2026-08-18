import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData: FAQItem[] = [
    {
      question: 'What industries does Max Water supply process water to?',
      answer: 'We supply batch-certified industrial process water, deionized (DI) water, demineralized (DM) water, and radiator coolants to chemical synthesis plants, pharmaceuticals, auto assemblies, power generation boilers, electronics, and textile processing hubs across West India.',
    },
    {
      question: 'Where does Max Water operate and deliver?',
      answer: 'Our central purification and distribution logistics operate across primary West India industrial clusters, including Ankleshwar GIDC, Ahmedabad Auto Belt, Surat Textiles, Vadodara Power Hub, Dahej SEZ, and Vapi Chemical Zone with dedicated tanker fleets.',
    },
    {
      question: 'How does Max Water guarantee batch purity & TDS levels?',
      answer: 'Every batch undergoes laboratory testing prior to dispatch. We provide a Certificate of Analysis (CoA) with each delivery certifying TDS or ppm at 0 for DI water, electrical conductivity (< 1.0 µS/cm), zero hardness, and exact pH compliance.',
    },
    {
      question: 'What delivery capacities and packaging options are available?',
      answer: 'We supply process water in 5 L clear bottles, 20 L heavy-duty jerry cans, 200 L L-ring HDPE drums, 1,000 L IBC totes, and bulk dedicated stainless steel tanker trucks (up to 10,000 L - 25,000 L).',
    },
    {
      question: 'How to initiate sample testing or bulk supply contracts?',
      answer: 'You can click "Request a call" or reach our industrial supply desk directly via WhatsApp. Our technical engineering team evaluates your water spec requirements and delivers sample batches within 12-24 hours.',
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full bg-[#F9FBFD] text-[#10202B] py-16 md:py-24 border-b border-[#EBEBEB] select-none scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-[98%] sm:max-w-[94%] lg:max-w-[92%] mx-auto px-2 sm:px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start text-left">
          
          {/* Left Column: Heading & Context */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Top Indicator & Label */}
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-[#087EAA]" />
              <span className="font-heading font-semibold text-lg tracking-wider text-[#10202B] uppercase">
                FAQ's
              </span>
            </div>

            {/* Main Split-Color Title */}
            <h2 className="font-heading font-semibold text-2xl md:text-4xl tracking-wider uppercase leading-tight">
              <span className="text-[#087EAA] block">Clarifying Our Operations</span>
              <span className="text-[#10202B] block">& Quality Assurance</span>
            </h2>

            {/* Bottom Context Description */}
            <p className="text-xs md:text-sm text-[#5D7180] font-sans max-w-md leading-relaxed pt-4">
              Beside are key insights regarding our operational model, batch certification framework, and B2B process water supply structure.
            </p>

          </div>

          {/* Right Column: Interactive Accordion List */}
          <div className="lg:col-span-7 space-y-3">
            {faqData.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-xl transition-all duration-200 overflow-hidden border ${
                    isOpen 
                      ? 'bg-[#EBF5F9] border-[#087EAA]/30 shadow-xs' 
                      : 'bg-[#EFEFEF] border-transparent hover:bg-[#E8E8E8]'
                  }`}
                >
                  {/* Accordion Header / Question */}
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full p-5 md:p-6 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  >
                    <span className={`font-sans font-semibold text-sm md:text-base leading-snug ${
                      isOpen ? 'text-[#063B5C]' : 'text-[#10202B]'
                    }`}>
                      {item.question}
                    </span>
                    <div className="shrink-0 p-1">
                      {isOpen ? (
                        <Minus className="w-5 h-5 text-[#087EAA]" />
                      ) : (
                        <Plus className="w-5 h-5 text-[#5D7180]" />
                      )}
                    </div>
                  </button>

                  {/* Accordion Body / Answer */}
                  {isOpen && (
                    <div className="px-5 pb-6 md:px-6 md:pb-6 pt-0">
                      <p className="text-xs md:text-sm text-[#5D7180] font-sans leading-relaxed border-t border-[#087EAA]/15 pt-4">
                        {item.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
export default FAQ;
