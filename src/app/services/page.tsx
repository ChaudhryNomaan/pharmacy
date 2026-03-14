"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Pill, Syringe, HeartPulse, MessageSquare, 
  Truck, Clock, ShieldCheck, BadgeCheck, 
  Search, ArrowRight, AlertCircle, PhoneCall
} from 'lucide-react';

// --- Sub-component: ServiceCard ---
const ServiceCard = ({ title, description, icon, link, ctaText }: any) => (
  <div className="group bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/5 hover:-translate-y-2 transition-all duration-500 flex flex-col h-full relative overflow-hidden">
    {/* Decorative background shape changed to Emerald */}
    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50/50 rounded-bl-[3rem] -z-10 group-hover:bg-emerald-600 transition-colors duration-500"></div>
    
    <div className="bg-emerald-50 w-16 h-16 rounded-2xl flex items-center justify-center text-emerald-600 mb-8 group-hover:bg-white group-hover:scale-110 transition-all duration-500 shadow-sm">
      {React.cloneElement(icon, { size: 32, strokeWidth: 2.5 })}
    </div>
    
    <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tighter leading-tight">
      {title}
    </h3>
    <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-grow">
      {description}
    </p>
    
    <Link 
      href={link} 
      className="inline-flex items-center gap-3 text-emerald-600 font-black text-sm uppercase tracking-widest group/link"
    >
      <span className="group-hover/link:mr-2 transition-all">{ctaText}</span>
      <div className="p-2 bg-emerald-50 rounded-full group-hover/link:bg-emerald-600 group-hover/link:text-white transition-all">
        <ArrowRight size={16} strokeWidth={3} />
      </div>
    </Link>
  </div>
);

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateStatus = () => {
      const now = new Date();
      const hour = now.getHours();
      setIsOpen(hour >= 9 && hour < 20);
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };

    updateStatus();
    const timer = setInterval(updateStatus, 60000);
    return () => clearInterval(timer);
  }, []);

  const services = [
    { 
      title: "Prescription Refills", 
      desc: "Fast, accurate dispensing with automated monthly refill options and SMS notifications.",
      icon: <Pill />,
      link: "/upload",
      cta: "Upload Rx",
      category: "medication"
    },
    { 
      title: "Vaccinations", 
      desc: "Stay protected with flu shots, COVID boosters, and travel immunizations administered by our clinical team.",
      icon: <Syringe />,
      link: "/contact",
      cta: "View Schedule",
      category: "clinical"
    },
    { 
      title: "Health Screenings", 
      desc: "On-site blood pressure, glucose, and cholesterol screenings with instant results and guidance.",
      icon: <HeartPulse />,
      link: "/contact",
      cta: "Book Appointment",
      category: "clinical"
    },
    { 
      title: "Clinical Consult", 
      desc: "Private one-on-one sessions to review medication interactions and holistic wellness plans.",
      icon: <MessageSquare />,
      link: "/contact",
      cta: "Start Chat",
      category: "consultation"
    }
  ];

  const filteredServices = services.filter(s => 
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      
      {/* Hero Header */}
      <div className="bg-white pt-32 pb-20 border-b border-slate-100 relative overflow-hidden">
        {/* Swapped blue-50 for emerald-50 */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-50/30 skew-x-12 translate-x-20"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="max-w-3xl">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl mb-8 text-xs font-black uppercase tracking-[0.2em] shadow-sm ${isOpen ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></span>
                {isOpen ? `Open Today until 8:00 PM` : `Closed • Opens at 9:00 AM`}
                <span className="mx-2 text-slate-300">|</span>
                <span className="text-slate-500 italic lowercase font-bold">{currentTime}</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                Care that <br />
                <span className="text-emerald-600">moves with you.</span>
              </h1>
            </div>

            <div className="relative w-full md:w-80 group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={20} />
              <input 
                type="text"
                placeholder="Search services..."
                className="w-full pl-14 pr-6 py-5 rounded-[2rem] border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-bold text-slate-700 shadow-inner"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredServices.map((service, index) => (
              <div key={index}>
                <ServiceCard {...service} ctaText={service.cta} description={service.desc} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] p-20 text-center border border-dashed border-slate-200">
             <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Search size={40} />
             </div>
             <h3 className="text-2xl font-black text-slate-800 tracking-tight">No services found for "{searchTerm}"</h3>
             <p className="text-slate-500 font-medium mt-2">Try searching for "refills" or "vaccines"</p>
          </div>
        )}

        {/* Home Delivery CTA - Swapped blue-600 for emerald-600 */}
        <div className="mt-20 bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-600 skew-x-[25deg] translate-x-32 hidden lg:block"></div>
          <div className="relative z-10 grid lg:grid-cols-2 items-center gap-12">
            <div>
              <div className="flex items-center gap-4 mb-6">
                 <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                    <Truck size={32} />
                 </div>
                 <span className="text-xs font-black uppercase tracking-[0.3em] text-emerald-300">Downtown Exclusive</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter leading-none">
                Zero Stress.<br /><span className="text-emerald-400 italic">Free Delivery.</span>
              </h2>
              <p className="text-lg text-slate-300 font-medium max-w-md leading-relaxed">
                Stay in your pajamas. We deliver all prescriptions within a 5-mile radius of Downtown for free.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
               <Link href="/contact" className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-black hover:bg-emerald-50 transition-all text-center flex items-center justify-center gap-2">
                 Check Eligibility <ArrowRight size={20} />
               </Link>
               <a href="tel:5550123456" className="px-10 py-5 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-all text-center flex items-center justify-center gap-2">
                  <PhoneCall size={20} /> Call for Info
               </a>
            </div>
          </div>
        </div>

        {/* Final Trust Markers */}
        <div className="mt-32 grid md:grid-cols-3 gap-16">
            {[
                { icon: <Clock />, title: "Ready in 15", text: "No more pharmacy lines. We guarantee pickup within 15 minutes of your arrival." },
                { icon: <ShieldCheck />, title: "All Insurances", text: "We accept 99% of major insurance plans and help coordinate prior auths." },
                { icon: <BadgeCheck />, title: "Clinical Support", text: "Direct lines to your doctors for fast refill approvals and dosage adjustments." }
            ].map((item, i) => (
                <div key={i} className="group text-left">
                    <div className="text-emerald-600 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform inline-block">
                      {React.cloneElement(item.icon, { size: 40, strokeWidth: 1.5 })}
                    </div>
                    <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tighter uppercase text-sm">{item.title}</h4>
                    <p className="text-slate-500 font-medium leading-relaxed">{item.text}</p>
                </div>
            ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-32 p-10 bg-white rounded-[2rem] border border-slate-100 flex flex-col items-center text-center">
            <AlertCircle className="text-red-500 mb-4" size={32} />
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest max-w-2xl leading-loose">
              If you are experiencing a medical emergency, please call 911 immediately. 
              Our services are for general health management and non-emergency pharmacy care only.
            </p>
        </div>
      </div>
    </div>
  );
}