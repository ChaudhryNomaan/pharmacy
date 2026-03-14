"use client";
import React from 'react';
import { MapPin, Phone, Clock, ExternalLink, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function ContactInfo() {
  const [copied, setCopied] = useState(false);

  const copyAddress = (e: React.MouseEvent, text: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const contactDetails = [
    {
      icon: <MapPin className="text-blue-600" size={20} />,
      label: "Our Pharmacy",
      value: "456 Health Boulevard, Downtown",
      action: "Directions",
      link: "https://www.google.com/maps/search/?api=1&query=456+Health+Boulevard+Downtown",
      isCopyable: true
    },
    {
      icon: <Phone className="text-emerald-600" size={20} />,
      label: "Pharmacy Line",
      value: "(555) 012-3456",
      action: "Call Now",
      link: "tel:03121572571",
      isCopyable: false
    },
    {
      icon: <Clock className="text-amber-600" size={20} />,
      label: "Current Hours",
      value: "Mon - Fri: 9am - 8pm",
      action: "Full Schedule",
      link: "/contact",
      isCopyable: false
    }
  ];

  return (
    <div className="grid gap-4 w-full max-w-md mx-auto reveal">
      {contactDetails.map((item, index) => (
        <a 
          key={index}
          href={item.link}
          target={item.link.startsWith('http') ? "_blank" : "_self"}
          rel="noopener noreferrer"
          className="group flex items-center justify-between p-5 bg-white border border-slate-100 rounded-[1.5rem] shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-200 transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-blue-50 group-hover:scale-110 transition-all duration-300">
              {item.icon}
            </div>
            <div className="text-left">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
                {item.label}
              </p>
              <p className="text-slate-800 font-bold text-sm md:text-base">
                {item.value}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-1">
            {/* Copy Button for Address */}
            {item.isCopyable && (
              <button 
                onClick={(e) => copyAddress(e, item.value)}
                className="p-2 text-slate-300 hover:text-blue-600 transition-colors"
                title="Copy Address"
              >
                {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
              </button>
            )}
            
            <div className="flex items-center gap-1 text-blue-600 text-[11px] font-black uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
              {item.action}
              <ExternalLink size={12} strokeWidth={3} />
            </div>
          </div>
        </a>
      ))}

      {/* Quick Emergency Note */}
      <div className="mt-2 p-4 rounded-2xl bg-slate-50 border border-slate-100">
        <p className="text-[11px] text-slate-500 leading-relaxed italic text-center">
          For after-hours prescription questions, please leave a message and a pharmacist will return your call by 9:30 AM the next business day.
        </p>
      </div>
    </div>
  );
}