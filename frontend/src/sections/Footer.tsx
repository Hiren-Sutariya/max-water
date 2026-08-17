import React from 'react';
import { ArrowUpRight, Mail, MessageCircle, Globe, Share2, Send } from 'lucide-react';
import MaxWaterLogo from '../components/MaxWaterLogo';

interface FooterProps {
  onPageChange?: (page: 'home' | 'contact', targetHref?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onPageChange }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    if (onPageChange) {
      onPageChange('home', href);
    }

    setTimeout(() => {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        const navbarHeight = window.innerWidth >= 768 ? 96 : 80;
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 60);
  };

  const handleWhatsAppRedirect = () => {
    window.open(
      'https://wa.me/919825537382?text=Hello%20Max%20Water,%20I%20would%20like%20to%20inquire%20about%20industrial%20process%20water%20bulk%20supply.',
      '_blank'
    );
  };

  return (
    <footer id="footer" className="w-full bg-[#041018] text-white border-t border-white/10 relative z-20 select-none">
      
      {/* Top CTA Banner */}
      <div className="w-full border-b border-white/10 py-16 md:py-20 bg-[#061824]">
        <div className="max-w-[98%] sm:max-w-[94%] lg:max-w-[92%] mx-auto px-2 sm:px-4 md:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-2 max-w-2xl text-left">
            <span className="text-xs font-heading font-medium tracking-widest text-[#19B8C8] uppercase block">
              ESTABLISHED 2006 • GUJARAT B2B LOGISTICS
            </span>
            <h2 className="font-heading font-semibold text-2xl md:text-4xl tracking-wider text-white uppercase leading-tight">
              HIGH-PURITY PROCESS WATER. ENGINEERED FOR SCALE.
            </h2>
          </div>
          <button
            onClick={handleWhatsAppRedirect}
            className="bg-[#087EAA] hover:bg-[#19B8C8] hover:text-[#061824] text-white font-heading font-medium text-xs md:text-sm tracking-wider px-8 py-4 flex items-center justify-center gap-2 transition-all uppercase shrink-0 shadow-lg cursor-pointer"
          >
            Discuss Bulk Supply Contract
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-[98%] sm:max-w-[94%] lg:max-w-[92%] mx-auto px-2 sm:px-4 md:px-8 py-16 md:py-24 bg-[#041018]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start">
          
          {/* Left Side: Brand Logo & Profile (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <MaxWaterLogo variant="light" size="lg" />

            <p className="text-slate-300 font-sans text-sm md:text-base leading-relaxed max-w-lg">
              Max Water (Max & Co.) supplies specialized batch-certified distilled water, deionized water, demineralized water, and engine thermal radiator coolants across South Gujarat & West India industrial belts.
            </p>
          </div>

          {/* Right Side: Quick Navigation & Contact & Follow (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row justify-between lg:justify-end gap-12 lg:gap-24 text-left">
            
            {/* Quick Navigation Column */}
            <div className="space-y-5 min-w-[200px]">
              <h4 className="font-heading font-semibold text-sm md:text-base uppercase tracking-widest text-[#19B8C8]">
                QUICK NAVIGATION
              </h4>
              <ul className="space-y-3.5 font-sans text-sm md:text-base text-slate-300">
                <li>
                  <a href="#products" onClick={(e) => handleLinkClick(e, '#products')} className="hover:text-[#19B8C8] transition-colors">
                    Industrial Water Grades
                  </a>
                </li>
                <li>
                  <a href="#about" onClick={(e) => handleLinkClick(e, '#about')} className="hover:text-[#19B8C8] transition-colors">
                    About Max Water
                  </a>
                </li>
                <li>
                  <a href="#cities" onClick={(e) => handleLinkClick(e, '#cities')} className="hover:text-[#19B8C8] transition-colors">
                    Cities & Hubs Served
                  </a>
                </li>
                <li>
                  <a href="#why-us" onClick={(e) => handleLinkClick(e, '#why-us')} className="hover:text-[#19B8C8] transition-colors">
                    Why Choose Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: CONTACT & FOLLOW */}
            <div className="space-y-5 min-w-[240px]">
              <h4 className="font-heading font-semibold text-[#19B8C8] text-sm md:text-base uppercase tracking-widest">
                CONTACT & FOLLOW
              </h4>
              <div className="space-y-4 font-sans text-sm md:text-base">
                
                {/* Phone / WhatsApp */}
                <div 
                  onClick={handleWhatsAppRedirect}
                  className="flex items-center gap-3 text-slate-200 hover:text-[#25D366] transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-6 h-6 text-[#25D366] shrink-0 fill-[#25D366]/20" />
                  <span className="font-sans text-base md:text-lg font-semibold text-[#25D366]">+91 98255 37382</span>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3 text-slate-300">
                  <Mail className="w-5 h-5 text-slate-400 shrink-0" />
                  <span className="text-sm md:text-base">maxwater08@gmail.com</span>
                </div>

                {/* 4 Circular Social/Contact Icons */}
                <div className="flex items-center gap-3.5 pt-3">
                  <a
                    href="https://wa.me/919825537382"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3.5 bg-white/10 hover:bg-[#25D366] hover:text-white rounded-full text-white transition-all cursor-pointer shadow-md"
                    aria-label="WhatsApp"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                  <a
                    href="mailto:maxwater08@gmail.com"
                    className="p-3.5 bg-white/10 hover:bg-[#19B8C8] hover:text-[#041018] rounded-full text-white transition-all cursor-pointer shadow-md"
                    aria-label="Email"
                  >
                    <Send className="w-5 h-5" />
                  </a>
                  <a
                    href="#home"
                    onClick={(e) => handleLinkClick(e, '#home')}
                    className="p-3.5 bg-white/10 hover:bg-[#19B8C8] hover:text-[#041018] rounded-full text-white transition-all cursor-pointer shadow-md"
                    aria-label="Website"
                  >
                    <Globe className="w-5 h-5" />
                  </a>
                  <a
                    href="#contact"
                    onClick={(e) => handleLinkClick(e, '#contact')}
                    className="p-3.5 bg-white/10 hover:bg-[#19B8C8] hover:text-[#041018] rounded-full text-white transition-all cursor-pointer shadow-md"
                    aria-label="Share"
                  >
                    <Share2 className="w-5 h-5" />
                  </a>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Footer Bottom Legal Bar */}
      <div className="w-full border-t border-white/10 py-9 bg-[#020B10]">
        <div className="max-w-[94%] lg:max-w-[92%] mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-sans text-slate-300">
          <p>© {new Date().getFullYear()} MAX WATER (MAX & CO.). ALL RIGHTS RESERVED.</p>
          <p className="font-mono text-xs md:text-sm text-[#19B8C8] font-medium tracking-wide">
            STRICTLY INDUSTRIAL PROCESS SOLVENTS • NOT FOR DRINKING
          </p>
        </div>
      </div>

    </footer>
  );
};
export default Footer;
