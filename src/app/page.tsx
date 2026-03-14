"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import MedicineSection from '../components/MedicineSection';
import { 
  Zap, 
  Stethoscope, 
  Truck, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  UserCheck,
  CheckCircle,
  Activity
} from 'lucide-react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hour = new Date().getHours();
    setIsOpen(hour >= 9 && hour < 20);
  }, []);

  const features = [
    {
      icon: <Zap size={28} />,
      title: "Rapid Refills",
      desc: "Ready in 15 mins or less",
      color: "text-amber-500",
      bg: "bg-amber-50"
    },
    {
      icon: <UserCheck size={28} />,
      title: "Clinical Consults",
      desc: "Talk to a pharmacist today",
      color: "text-teal-600",
      bg: "bg-teal-50"
    },
    {
      icon: <Truck size={28} />,
      title: "Home Delivery",
      desc: "Free for local residents",
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    }
  ];

  const trustPoints = [
    { icon: <ShieldCheck className="text-emerald-500" />, text: "HIPAA Compliant Care" },
    { icon: <Clock className="text-teal-500" />, text: "Automated Reminders" },
    { icon: <CheckCircle className="text-emerald-500" />, text: "Insurance Direct-Billing" },
    { icon: <Stethoscope className="text-teal-500" />, text: "Private Consult Room" },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* 1. Hero Section - Updated to Sea Green */}
      <section className="relative bg-emerald-900 text-white pt-24 pb-40 px-6 overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]"></div>
        </div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500 rounded-full blur-[120px] opacity-20 animate-pulse"></div>

        <div className="relative z-10 max-w-6xl mx-auto text-center reveal">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-8 border transition-colors ${
            isOpen ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
          }`}>
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isOpen ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isOpen ? 'bg-emerald-500' : 'bg-amber-400'}`}></span>
            </span>
            {isOpen ? 'Open Now: Visit us until 8:00 PM' : 'Closed: We open at 9:00 AM'}
          </div>

          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[1.1]">
            Modern Care, <br />
            <span className="text-emerald-400">Local Heart.</span>
          </h1>
          
          <p className="text-xl mb-12 text-emerald-100 max-w-2xl mx-auto font-medium leading-relaxed opacity-90">
            Professional pharmacy services with 
            <span className="text-white font-bold italic"> 15-minute pickup </span> 
            and free local delivery for your peace of mind.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <Link 
              href="/upload" 
              className="bg-white text-emerald-900 px-10 py-5 rounded-2xl font-black shadow-2xl hover:scale-105 transition-all text-lg flex items-center justify-center gap-2 group"
            >
              Upload Prescription
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link 
              href="/services" 
              className="bg-emerald-800/40 backdrop-blur-md border-2 border-white/20 px-10 py-5 rounded-2xl font-bold hover:bg-white/10 transition-all text-lg text-center"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Quick Feature Cards */}
      <section className="max-w-7xl mx-auto -mt-20 px-6 relative z-20">
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((item) => (
            <div 
              key={item.title}
              className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-emerald-900/5 border border-slate-100 flex flex-col items-start group hover:-translate-y-2 transition-all duration-300"
            >
              <div className={`${item.bg} ${item.color} p-4 rounded-2xl mb-6 transition-transform group-hover:rotate-3`}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">{item.title}</h3>
              <p className="text-slate-500 mt-2 font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Medicine Catalog Section */}
      <div className="mt-24 py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">Essentials & OTC</h2>
          <p className="text-slate-500 font-medium">Browse our most popular health products</p>
        </div>
        <MedicineSection />
      </div>

      {/* 4. About / Trust Section */}
      <section className="py-32 px-6 bg-white border-y border-slate-100 relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="reveal">
            <div className="flex items-center gap-2 text-emerald-600 font-bold mb-4 uppercase tracking-widest text-sm">
              <Activity size={18} />
              <span>Why Our Pharmacy</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-tight tracking-tighter">
              Your Health <br />
              <span className="text-emerald-600">Is Personal.</span>
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed mb-10">
              Big chains see you as a number. We see you as a neighbor. Our team provides 
              tailored wellness plans and careful medication reviews to ensure you're always on the right track.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {trustPoints.map((feature) => (
                <div key={feature.text} className="flex items-center gap-3 text-slate-800 font-bold text-lg">
                  <div className="bg-slate-50 p-2 rounded-lg">{feature.icon}</div>
                  {feature.text}
                </div>
              ))}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-emerald-50 rounded-[4rem] rotate-2 transition-transform group-hover:rotate-0"></div>
            <div className="relative bg-emerald-600 rounded-[3.5rem] aspect-square overflow-hidden flex flex-col items-center justify-center text-white p-12 shadow-2xl">
               <Stethoscope size={140} className="text-emerald-300 opacity-50 mb-6" strokeWidth={1} />
               <div className="text-center">
                 <p className="text-4xl font-black mb-2">Since 2024</p>
                 <p className="text-emerald-200 font-medium italic">Dedicated Downtown Healthcare</p>
               </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
