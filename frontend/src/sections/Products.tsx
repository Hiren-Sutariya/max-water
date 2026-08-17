import React, { useState } from 'react';
import type { Product } from '../types';
import ProductDetailModal from '../components/ProductDetailModal';

interface ProductsProps {
  onProductSelect: (productName: string) => void;
}

export const Products: React.FC<ProductsProps> = ({ onProductSelect }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const productData: (Product & { bgImage: string })[] = [
    {
      id: 'distilled',
      name: 'Distilled Water',
      tagline: 'Pure condensation evaporated water for lab testing, autoclaves, and precision equipment.',
      category: 'Industrial / Process Water',
      shortDescription: 'Thermally evaporated and condensed water designed for laboratory tests, autoclaves, battery testing, and industrial equipment requiring strict mineral separation.',
      quantities: ['5 L', '20 L', '200 L', '1,000 L', '10,000 L'],
      applications: ['Laboratory Testing', 'Chemical Blending', 'Boiler Feed Water', 'Precision Cleaning', 'Battery Maintenance'],
      specifications: {
        'Purity Level': 'Distilled Condensation (TDS < 2 ppm)',
        'pH Range': '5.5 - 7.0 (Typical)',
        'Electrical Conductivity': '< 5.0 µS/cm',
        'Chemical Properties': 'Free of dissolved metals and solids',
        'Legal Class': 'NOT FOR DRINKING (Strictly Industrial)'
      },
      packagingDesc: 'Clear Bottles (5L), Industrial Jerry Cans (20L), Drums (200L), IBC Tanks (1,000L), and Tanker Logistics (10,000L).',
      visualType: 'distilled',
      bgImage: '/products/distilled.jpg',
    },
    {
      id: 'deionized',
      name: 'Deionized (DI) Water',
      tagline: 'Ion-extracted high-accuracy water for chemical synthesis, electronics, and PCB operations.',
      category: 'Scientific / Processing Water',
      shortDescription: 'Purified via twin-bed or mixed-bed deionization. Designed for chemical synthesis, pharmaceutical operations, electronics manufacturing, and printed circuit board cleaning.',
      quantities: ['5 L', '20 L', '200 L', '1,000 L', '10,000 L'],
      applications: ['Electronics Assembly', 'PCB Cleaning', 'Pharmaceutical Pre-treatment', 'High-purity Assays', 'Chemical Formulations'],
      specifications: {
        'Purity Level': 'Resin Deionization (TDS < 1 ppm)',
        'pH Range': '6.0 - 7.0 (Neutral)',
        'Electrical Conductivity': '< 1.0 µS/cm',
        'Resistivity Value': '> 1.0 MΩ-cm',
        'Legal Class': 'NOT FOR DRINKING (Strictly Industrial)'
      },
      packagingDesc: 'Secure B2B Containers (5L, 20L, 200L, 1,000L) and Tanker Logistics (10,000L).',
      visualType: 'deionized',
      bgImage: '/products/deionized.jpg',
    },
    {
      id: 'demineralized',
      name: 'Demineralized (DM) Water',
      tagline: 'Mineral-removed heavy industrial water for power plant boilers and machinery washing.',
      category: 'Processing / Wash Water',
      shortDescription: 'DM Water processed through advanced filtration and ion exchange systems. Ideal for heavy manufacturing washers, generator sets, cooling jackets, and laser cutters.',
      quantities: ['5 L', '20 L', '200 L', '1,000 L', '10,000 L'],
      applications: ['Heavy Machinery Washing', 'Power Generation Boilers', 'Glass Rinse Operations', 'Laser Cutting Fluid', 'Automotive Assemblies'],
      specifications: {
        'Purity Level': 'Mineral Extraction (TDS < 5 ppm)',
        'pH Range': '5.5 - 7.5',
        'Electrical Conductivity': '< 10.0 µS/cm',
        'Water Hardness': 'Zero (Calcium and Magnesium removed)',
        'Legal Class': 'NOT FOR DRINKING (Strictly Industrial)'
      },
      packagingDesc: 'Clear 5L packs, Heavy Duty Jerry Cans (20L), Blue Drums (200L), IBC Tanks (1,000L), and Tanker Logistics (10,000L).',
      visualType: 'demineralized',
      bgImage: '/products/demineralized.jpg',
    },
    {
      id: 'coolant',
      name: 'Radiator Coolant',
      tagline: 'High-performance engine thermal fluid for diesel generators and heavy fleet radiators.',
      category: 'Automotive & Heavy Industry Coolants',
      shortDescription: 'Formulated with active anti-rust inhibitors and temperature stabilizers. Engineered to keep diesel generator radiators and heavy fleet engines running smoothly in extreme hot climates.',
      quantities: ['5 L', '10 L', '20 L', '200 L'],
      applications: ['DG Sets Cooling', 'Heavy Equipment Fleet', 'Industrial Heat Exchangers', 'HVAC Glycol Networks', 'Automotive Radiators'],
      specifications: {
        'Chemical Base': 'Monoethylene Glycol (MEG)',
        'Corrosion Inhibitors': 'Active silicate/carboxylate inhibitors',
        'Boiling Point': '105°C - 110°C (Typical at standard pressure)',
        'Color Rating': 'Bright Green (Fluorescent dye)',
        'Legal Class': 'Chemical Product / Toxic / NOT FOR DRINKING'
      },
      packagingDesc: 'Sealed Containers (5L, 10L, 20L) and Drums (200L). Available in concentrated or pre-mixed dilutions.',
      visualType: 'coolant',
      bgImage: '/products/coolant.jpg',
    },
  ];

  return (
    <section id="products" className="w-full bg-[#F4F8FA] py-16 md:py-24 border-b border-[#EBEBEB] select-none scroll-mt-24 md:scroll-mt-28">
      <div className="max-w-[94%] lg:max-w-[92%] mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="mb-12 space-y-3 text-left">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-[#087EAA]" />
            <h2 className="font-heading font-semibold text-2xl md:text-4xl tracking-wider text-[#10202B] uppercase">
              INDUSTRIAL WATER & COOLANT GRADES
            </h2>
          </div>
          <p className="text-sm md:text-base font-sans max-w-3xl leading-relaxed">
            <span className="text-[#087EAA] font-medium">Batch-certified industrial water & coolants</span>{' '}
            <span className="text-[#5D7180]">
              engineered for high-precision manufacturing, thermal systems, and heavy power generation.
            </span>
          </p>
        </div>

        {/* 4-Card Navy Blue Grid with Bottle Imagery (Top-left corner icons removed) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {productData.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="group relative h-[381px] aspect-[427/381] max-w-[427px] w-full mx-auto rounded-none overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300 bg-[#063B5C]"
            >
              {/* Bottle Background Image (Semantic img for Google Image Search SEO) */}
              <img
                src={product.bgImage}
                alt={`${product.name} - Max Water Industrial B2B Packaging`}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Brand Navy Blue Tinted Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#063B5C]/95 via-[#063B5C]/45 to-black/20 group-hover:from-[#063B5C] group-hover:via-[#063B5C]/70 transition-all duration-300" />

              {/* Bottom Area: Heading Title + Hover Sub-details reveal */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10 flex flex-col justify-end text-left">
                {/* Main Heading Title (Always visible) */}
                <h3 className="font-heading font-semibold text-lg md:text-xl text-white tracking-wider uppercase leading-snug drop-shadow-sm">
                  {product.name}
                </h3>

                {/* Sub-details (Revealed smoothly on hover) */}
                <div className="max-h-0 opacity-0 group-hover:max-h-36 group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden pt-0 group-hover:pt-3">
                  <p className="text-xs text-slate-200 font-sans font-normal leading-relaxed">
                    {product.tagline}
                  </p>
                  <span className="text-[11px] font-heading font-medium text-[#19B8C8] uppercase tracking-wider block pt-2">
                    Click to view specs & sizing ↗
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Product Specification & Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onEnquireClick={(productName: string) => {
          onProductSelect(productName);
        }}
      />
    </section>
  );
};
export default Products;
