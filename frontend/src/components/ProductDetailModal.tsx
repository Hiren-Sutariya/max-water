import React, { useEffect } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import type { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onEnquireClick: (productName: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onEnquireClick,
}) => {
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 select-none">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-[#061824]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content Window */}
      <div className="relative bg-white rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl border border-white/10 z-10 animate-[modalScale_0.25s_ease-out]">
        
        <div className="grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Column: Brand, Description & Applications */}
          <div className="md:col-span-5 bg-[#063B5C] text-white p-5 sm:p-8 flex flex-col justify-between relative overflow-hidden min-h-[280px] md:min-h-[400px]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(25,184,200,0.12)_0%,transparent_80%)] pointer-events-none" />
            
            {/* Product Header & Summary */}
            <div className="space-y-4 relative z-10 text-left">
              <div>
                <span className="text-[#19B8C8] text-xs font-heading font-medium tracking-widest uppercase block mb-1">
                  {product.category}
                </span>
                <h3 className="text-white text-2xl md:text-3xl font-heading font-semibold tracking-wider uppercase leading-tight">
                  {product.name}
                </h3>
              </div>

              <p className="text-slate-200 text-xs md:text-sm font-sans font-normal leading-relaxed">
                {product.shortDescription}
              </p>
            </div>

            {/* Added Section: Key Applications / Uses */}
            <div className="space-y-3 relative z-10 text-left pt-6 border-t border-white/15">
              <span className="text-[#19B8C8] text-xs font-heading font-medium tracking-widest uppercase block">
                KEY APPLICATIONS / USES
              </span>
              <div className="flex flex-wrap gap-2">
                {product.applications.map((app) => (
                  <span
                    key={app}
                    className="bg-white/10 text-white border border-white/15 px-3 py-1.5 rounded-lg text-xs font-sans font-medium flex items-center gap-1.5"
                  >
                    <span className="text-[#19B8C8] text-xs">✓</span>
                    {app}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sizing & Action */}
          <div className="md:col-span-7 p-8 flex flex-col justify-between bg-white text-left relative min-h-[320px] md:min-h-[400px]">
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-[#10202B] hover:bg-slate-100 rounded-full transition-all z-20 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="space-y-6 pt-2">
              
              {/* Available Sizing & Packaging */}
              <div className="space-y-4">
                <span className="text-xs font-heading font-semibold tracking-widest text-[#10202B] uppercase block">
                  AVAILABLE PACKAGING & SIZING
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {product.quantities.map((qty) => (
                    <span
                      key={qty}
                      className="bg-[#F2FAFC] text-[#063B5C] border border-[#087EAA]/20 px-4.5 py-2.5 rounded-xl text-xs md:text-sm font-heading font-medium shadow-xs"
                    >
                      {qty}
                    </span>
                  ))}
                </div>
                {product.packagingDesc && (
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1 mt-2">
                    <span className="text-[11px] font-heading font-semibold text-[#087EAA] uppercase block">
                      PACKAGING DETAILS
                    </span>
                    <p className="text-xs text-slate-600 font-sans leading-relaxed">
                      {product.packagingDesc}
                    </p>
                  </div>
                )}
              </div>

            </div>

            {/* Bottom Action Row */}
            <div className="pt-6 border-t border-slate-200 flex items-center justify-between gap-4 mt-6">
              <span className="text-xs font-sans text-slate-500 font-normal">
                Batch Quality & CoA Certified
              </span>
              <button
                onClick={() => {
                  onClose();
                  onEnquireClick(product.name);
                }}
                className="bg-[#087EAA] hover:bg-[#063B5C] text-white font-heading font-medium text-xs md:text-sm tracking-wider px-8 py-3.5 rounded-none uppercase transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                Request Quote
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>

      <style>{`
        @keyframes modalScale {
          from { transform: scale(0.96); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
export default ProductDetailModal;
