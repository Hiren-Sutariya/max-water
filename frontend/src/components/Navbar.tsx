import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import MaxWaterLogo from './MaxWaterLogo';

interface NavbarProps {
  currentPage?: 'home' | 'contact';
  onPageChange?: (page: 'home' | 'contact', targetHref?: string) => void;
  onQuoteClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  currentPage = 'home', 
  onPageChange,
  onQuoteClick,
}) => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const isNavClickRef = useRef<boolean>(false);
  const navClickTargetRef = useRef<string | null>(null);
  const navLockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (currentPage === 'contact') {
      setActiveSection('contact');
      return;
    }

    const handleScroll = () => {
      // Keep highlight strictly locked on clicked tab during smooth scrolling
      if (isNavClickRef.current && navClickTargetRef.current) {
        setActiveSection(navClickTargetRef.current);
        return;
      }

      const sections = ['home', 'products', 'about', 'cities', 'why-us', 'faq', 'footer'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section === 'cities' ? 'why-us' : section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const navLinks = [
    { label: 'HOME', href: '#home', key: 'home' },
    { label: 'PRODUCT', href: '#products', key: 'products' },
    { label: 'ABOUT', href: '#about', key: 'about' },
    { label: 'WHY US', href: '#why-us', key: 'why-us' },
    { label: 'CONTACT US', href: '#contact', key: 'contact' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, key: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    // Immediately lock active section box onto clicked tab
    setActiveSection(key);
    navClickTargetRef.current = key;
    isNavClickRef.current = true;

    if (navLockTimerRef.current) {
      clearTimeout(navLockTimerRef.current);
    }

    if (key === 'contact') {
      if (onPageChange) onPageChange('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (onPageChange) onPageChange('home', href);
      
      if (key === 'home' || href === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
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
      }
    }

    // Release scroll lock after smooth scrolling completes
    navLockTimerRef.current = setTimeout(() => {
      isNavClickRef.current = false;
      navClickTargetRef.current = null;
    }, 1200);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-[#EBEBEB] h-20 md:h-24 flex items-center justify-between px-6 md:px-12 select-none">
        
        {/* Left Side: Max Water Industrial Brand Logo */}
        <a 
          href="#home" 
          onClick={(e) => handleLinkClick(e, '#home', 'home')} 
          className="shrink-0 cursor-pointer"
        >
          <MaxWaterLogo variant="dark" size="lg" />
        </a>

        {/* Center: Full-height Brand Blue Block Nav Tabs with Smooth Transitions */}
        <nav className="hidden md:flex items-center h-full">
          {navLinks.map((link) => {
            const isActive = activeSection === link.key;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href, link.key)}
                className={`flex items-center justify-center h-full px-6 lg:px-8 font-heading text-sm md:text-[15px] font-semibold tracking-wider transition-colors duration-200 ease-in-out ${
                  isActive 
                    ? 'bg-[#087EAA] text-white' 
                    : 'text-[#10202B] hover:text-[#087EAA]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Side: Industrial Chamfered Action Button in Website Brand Blue */}
        <div className="hidden md:flex items-center shrink-0">
          <button
            onClick={onQuoteClick}
            style={{ clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))' }}
            className="bg-[#087EAA] hover:bg-[#063B5C] text-white font-heading font-medium text-xs md:text-sm tracking-wider px-7 py-3.5 flex items-center gap-2.5 transition-all uppercase cursor-pointer shadow-md hover:shadow-lg"
          >
            REQUEST A CALL
            <ArrowUpRight className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-[#10202B] hover:text-[#087EAA] focus:outline-none shrink-0"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-white md:hidden transition-transform duration-500 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full justify-between p-8 pt-24 text-[#10202B]">
          <div className="flex flex-col gap-6 text-left">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href, link.key)}
                className={`text-xl font-heading font-medium tracking-wider p-3 border-l-4 transition-colors ${
                  activeSection === link.key 
                    ? 'border-[#087EAA] bg-[#087EAA]/5 text-[#087EAA]' 
                    : 'border-transparent hover:border-[#087EAA] hover:bg-[#087EAA]/5'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (onQuoteClick) onQuoteClick();
              }}
              style={{ clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))' }}
              className="w-full bg-[#087EAA] hover:bg-[#063B5C] text-white font-heading font-medium py-4 flex items-center justify-center gap-2 transition-all uppercase text-sm tracking-wider shadow-md cursor-pointer"
            >
              REQUEST A CALL
              <ArrowUpRight className="w-4 h-4 text-white" />
            </button>
            <div className="text-center text-xs text-[#5D7180] mt-4 font-mono">
              ESTD. 2006
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Navbar;
