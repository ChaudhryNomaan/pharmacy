"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface ServiceProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  link?: string;
  ctaText?: string;
  tag?: string; // e.g., "Popular" or "Free"
}

export default function ServiceCard({ 
  title, 
  description, 
  icon, 
  link = "/contact", 
  ctaText = "Learn More",
  tag
}: ServiceProps) {
  return (
    <div className="group relative bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-2 transition-all duration-500 flex flex-col h-full overflow-hidden">
      
      {/* Subtle background glow on hover */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Top Row: Icon & Tag */}
      <div className="flex justify-between items-start mb-8 relative z-10">
        {icon && (
          <div className="p-4 bg-slate-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 shadow-sm">
            {React.cloneElement(icon as React.ReactElement, { size: 28, strokeWidth: 2.5 })}
          </div>
        )}
        {tag && (
          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
            {tag}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 flex-grow">
        <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tighter leading-none">
          {title}
        </h3>
        <p className="text-slate-500 font-medium leading-relaxed mb-8">
          {description}
        </p>
      </div>

      {/* Action Link */}
      <Link 
        href={link}
        className="relative z-10 mt-auto inline-flex items-center gap-3 w-fit"
      >
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
          <ArrowRight size={18} strokeWidth={3} className="group-hover:translate-x-0.5 transition-transform" />
        </div>
        <span className="text-sm font-black text-slate-900 uppercase tracking-wider group-hover:text-blue-600 transition-colors">
          {ctaText}
        </span>
      </Link>
    </div>
  );
}