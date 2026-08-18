import React, { useState, useRef, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ChevronDown } from 'lucide-react';

interface ContactPageProps {
  onBackToHome: () => void;
  selectedProduct?: string;
}

// Custom UI Dropdown Component
interface CustomSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (val: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-2 text-left relative" ref={dropdownRef}>
      <label className="font-heading font-semibold text-[#10202B] uppercase tracking-wider text-xs block">
        {label} *
      </label>
      
      {/* Trigger Box */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#F4F8FA] border border-[#EBEBEB] p-3.5 text-[#10202B] font-sans text-xs md:text-sm flex items-center justify-between cursor-pointer hover:border-[#087EAA] transition-colors"
      >
        <span className="truncate">{value}</span>
        <ChevronDown className={`w-4 h-4 text-[#087EAA] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </div>

      {/* Custom Floating Options Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-[#087EAA]/30 shadow-xl z-50 py-1 font-sans text-xs md:text-sm text-[#10202B] animate-fade-in max-h-60 overflow-y-auto">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              className={`p-3.5 hover:bg-[#087EAA] hover:text-white transition-colors cursor-pointer flex items-center justify-between ${
                opt === value ? 'bg-[#087EAA]/10 text-[#087EAA] font-semibold' : ''
              }`}
            >
              <span>{opt}</span>
              {opt === value && <span className="text-xs">✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const ContactPage: React.FC<ContactPageProps> = ({ selectedProduct }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    product: selectedProduct || 'Deionized (DI) Water (TDS < 1 ppm)',
    quantity: '1,000 Litre IBC Totes',
    city: 'Surat',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const quantityOptions = [
    '5 Litre Bottles',
    '20 Litre Carboys',
    '200 Litre HDPE Drums',
    '1,000 Litre IBC Totes',
    '10,000L+ Bulk Tanker Fleet',
  ];

  const cityOptions = [
    'Surat',
    'Bharuch',
    'Ankleshwar',
    'Navsari',
    'Bardoli',
    'Dahej',
    'Other Gujarat Location',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    // 1. Instantly send inquiry to backend API (Guaranteed Admin Panel saving on button click)
    const apiUrl = window.location.hostname === 'localhost' 
      ? 'http://localhost:5001/api/contact'
      : (window.location.hostname.includes('maxwater.in') ? '/api/contact' : 'https://max-water.onrender.com/api/contact');

    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      keepalive: true,
    }).then((res) => res.json())
      .then((data) => {
        console.log('Inquiry saved to Admin Panel immediately:', data);
      })
      .catch((err) => {
        console.log('Backend API offline notice:', err);
      });

    // 2. Open WhatsApp synchronously so browser popup blockers never block it on live sites
    let messageText = `*MAX WATER - B2B SUPPLY INQUIRY*\n`;
    messageText += `----------------------------------------\n`;
    messageText += `Hello Max Water team, I would like to inquire about industrial process water bulk supply.\n\n`;
    messageText += `*Client Name:* ${formData.name.trim()}\n`;
    if (formData.company && formData.company.trim()) {
      messageText += `*Company / Plant:* ${formData.company.trim()}\n`;
    }
    messageText += `*Phone:* ${formData.phone.trim()}\n`;
    if (formData.email && formData.email.trim()) {
      messageText += `*Email:* ${formData.email.trim()}\n`;
    }
    messageText += `*Packaging:* ${formData.quantity}\n`;
    messageText += `*Delivery City / Hub:* ${formData.city}\n`;
    if (formData.message && formData.message.trim()) {
      messageText += `*Specific Notes:* ${formData.message.trim()}\n`;
    }
    messageText += `----------------------------------------`;

    const encodedMessage = encodeURIComponent(messageText);
    window.open(`https://wa.me/919825537382?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="w-full min-h-screen bg-white select-none pt-20 md:pt-24">
      
      {/* Contact Page Hero Banner */}
      <section className="w-full bg-[#10202B] text-white py-16 md:py-24 border-b border-[#1E3442] relative overflow-hidden">
        <div className="max-w-[94%] lg:max-w-[92%] mx-auto px-4 md:px-8 space-y-6 relative z-10 text-left">
          
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-[#19B8C8]" />
            <span className="font-heading font-semibold text-[#19B8C8] text-xs md:text-sm tracking-widest uppercase">
              CONTACT MAX WATER DESK
            </span>
          </div>

          <h1 className="font-heading font-semibold text-3xl md:text-5xl lg:text-6xl tracking-wider uppercase leading-tight text-white max-w-4xl">
            GET IN TOUCH WITH OUR <span className="text-[#19B8C8]">INDUSTRIAL FACILITY DESK.</span>
          </h1>

          <p className="text-slate-300 text-sm md:text-base lg:text-lg font-sans max-w-3xl leading-relaxed">
            Have a bulk supply inquiry, sample request, or technical specification question? Speak directly with our B2B logistics team for instant factory quotes and dispatch schedules.
          </p>

        </div>
      </section>

      {/* Form & Contact Details Section */}
      <section id="contact-form-section" className="w-full py-12 md:py-24 bg-[#F4F8FA] border-b border-[#EBEBEB] scroll-mt-24 md:scroll-mt-28">
        <div className="max-w-[96%] sm:max-w-[94%] lg:max-w-[92%] mx-auto px-2 sm:px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-left">
            
            {/* Left Side: B2B Inquiry Form (lg:col-span-7) */}
            <div className="lg:col-span-7 bg-white border border-[#EBEBEB] p-4 sm:p-7 md:p-12 shadow-xs space-y-6">
              
              <div>
                <span className="text-xs font-heading font-semibold text-[#087EAA] tracking-widest uppercase block mb-1">
                  DIRECT FACTORY QUOTE FORM
                </span>
                <h2 className="font-heading font-semibold text-2xl md:text-3xl text-[#10202B] uppercase tracking-wider">
                  REQUEST A B2B SUPPLY CONTRACT
                </h2>
              </div>

              {isSubmitted ? (
                <div className="p-8 bg-[#F2FAFC] border border-[#087EAA]/30 text-center space-y-4 my-8">
                  <CheckCircle2 className="w-12 h-12 text-[#087EAA] mx-auto" />
                  <h3 className="font-heading font-semibold text-xl text-[#10202B] uppercase">
                    INQUIRY DISPATCHED!
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 font-sans max-w-md mx-auto">
                    Your inquiry details have been transmitted. Our industrial sales team will respond within 30 minutes.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-[#087EAA] text-white font-heading font-medium text-xs px-6 py-2.5 uppercase tracking-wider mt-2"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 font-sans text-xs md:text-sm">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-heading font-semibold text-[#10202B] uppercase tracking-wider text-xs block">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="e.g. Hiren Sutariya"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-[#F4F8FA] border border-[#EBEBEB] p-3.5 focus:outline-none focus:border-[#087EAA] text-[#10202B]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-heading font-semibold text-[#10202B] uppercase tracking-wider text-xs block">
                        Company / Plant Name *
                      </label>
                      <input
                        type="text"
                        name="company"
                        required
                        placeholder="e.g. Digiscale Infotech"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full bg-[#F4F8FA] border border-[#EBEBEB] p-3.5 focus:outline-none focus:border-[#087EAA] text-[#10202B]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-heading font-semibold text-[#10202B] uppercase tracking-wider text-xs block">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+91 98255 37382"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-[#F4F8FA] border border-[#EBEBEB] p-3.5 focus:outline-none focus:border-[#087EAA] text-[#10202B]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="font-heading font-semibold text-[#10202B] uppercase tracking-wider text-xs block">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="maxwater08@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-[#F4F8FA] border border-[#EBEBEB] p-3.5 focus:outline-none focus:border-[#087EAA] text-[#10202B]"
                      />
                    </div>
                  </div>

                  {/* Custom UI Dropdown Selects */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <CustomSelect
                      label="Packaging Sizing"
                      options={quantityOptions}
                      value={formData.quantity}
                      onChange={(val) => setFormData({ ...formData, quantity: val })}
                    />

                    <CustomSelect
                      label="Delivery City / GIDC Hub"
                      options={cityOptions}
                      value={formData.city}
                      onChange={(val) => setFormData({ ...formData, city: val })}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="font-heading font-semibold text-[#10202B] uppercase tracking-wider text-xs block">
                      Specific Requirements / Delivery Schedule
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Specify your required delivery schedule, CoA requirements, or recurring contract frequency..."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-[#F4F8FA] border border-[#EBEBEB] p-3.5 focus:outline-none focus:border-[#087EAA] text-[#10202B]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#087EAA] hover:bg-[#063B5C] text-white font-heading font-medium text-xs md:text-sm tracking-wider py-4 flex items-center justify-center gap-2 uppercase transition-all shadow-md cursor-pointer"
                  >
                    Submit B2B Quote Inquiry
                    <Send className="w-4 h-4" />
                  </button>

                </form>
              )}

            </div>

            {/* Right Side: Industrial Desk Details (lg:col-span-5) */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-[#10202B] text-white p-8 md:p-10 space-y-8">
                <div>
                  <span className="text-xs font-heading font-semibold text-[#19B8C8] tracking-widest uppercase block mb-1">
                    MAX & CO. HEADQUARTERS
                  </span>
                  <h3 className="font-heading font-semibold text-xl md:text-2xl text-white uppercase tracking-wider">
                    FACILITY DESK DETAILS
                  </h3>
                </div>

                <div className="space-y-6 font-sans text-xs md:text-sm text-slate-300">
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/5 border border-white/10 shrink-0 mt-1">
                      <MapPin className="w-5 h-5 text-[#19B8C8]" />
                    </div>
                    <div>
                      <strong className="text-white block uppercase font-heading text-xs mb-1">Manufacturing Plant:</strong>
                      <span>Max & Co., G.I.D.C. Pandesara, Surat, Gujarat - 394221.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/5 border border-white/10 shrink-0 mt-1">
                      <Phone className="w-5 h-5 text-[#19B8C8]" />
                    </div>
                    <div>
                      <strong className="text-white block uppercase font-heading text-xs mb-1">Phone & WhatsApp:</strong>
                      <span>+91 98255 37382</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/5 border border-white/10 shrink-0 mt-1">
                      <Mail className="w-5 h-5 text-[#19B8C8]" />
                    </div>
                    <div>
                      <strong className="text-white block uppercase font-heading text-xs mb-1">Email Sales Desk:</strong>
                      <span>maxwater08@gmail.com</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/5 border border-white/10 shrink-0 mt-1">
                      <Clock className="w-5 h-5 text-[#19B8C8]" />
                    </div>
                    <div>
                      <strong className="text-white block uppercase font-heading text-xs mb-1">Operating Hours:</strong>
                      <span>Mon - Sat: 8:00 AM - 8:00 PM<br />(24/7 Bulk Tanker Emergency Dispatch)</span>
                    </div>
                  </div>

                </div>

                <div className="pt-4 border-t border-white/10 text-xs font-mono text-[#19B8C8]">
                  ESTABLISHED 2006 • CoA BATCH CERTIFIED
                </div>

              </div>

              {/* Direct WhatsApp Callout Card */}
              <div className="bg-white border border-[#EBEBEB] p-8 space-y-4 text-left shadow-xs">
                <h4 className="font-heading font-semibold text-base text-[#10202B] uppercase">
                  NEED IMMEDIATE TANKER DISPATCH?
                </h4>
                <p className="text-xs text-[#5D7180] font-sans leading-relaxed">
                  For urgent factory shutdowns, boiler refills, or instant CoA verification, connect directly with our emergency dispatch desk on WhatsApp.
                </p>
                <button
                  onClick={() => window.open('https://wa.me/919825537382?text=Urgent%20Process%20Water%20Dispatch%20Inquiry', '_blank')}
                  className="w-full bg-[#087EAA] hover:bg-[#19B8C8] hover:text-[#10202B] text-white font-heading font-medium text-xs tracking-wider py-3.5 uppercase transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
                >
                  Instant WhatsApp Desk ↗
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
export default ContactPage;
