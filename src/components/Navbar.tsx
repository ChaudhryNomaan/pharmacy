"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Pill, Phone, Menu, X, Upload, MessageCircle } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect for a cleaner UI
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Upload Rx', href: '/upload' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`sticky top-0 z-[100] transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 py-3 shadow-lg shadow-blue-900/5' 
        : 'bg-white/50 backdrop-blur-md border-b border-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex justify-between items-center">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="bg-blue-600 p-2 rounded-xl group-hover:rotate-[15deg] group-hover:scale-110 transition-all duration-300 shadow-lg shadow-blue-200">
            <Pill className="text-white" size={22} strokeWidth={3} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-slate-900 tracking-tighter leading-none">
              LIZA'S <span className="text-blue-600 italic">PHARMACY</span>
            </span>
            <span className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase leading-none mt-1">
              Personal Care
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                className={`relative text-sm font-black transition-all hover:text-blue-600 uppercase tracking-widest ${
                  pathname === link.href ? 'text-blue-600' : 'text-slate-500'
                }`}
              >
                {link.name}
                {pathname === link.href && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>
          
          <div className="h-6 w-px bg-slate-200"></div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <Link 
              href="tel:5551234567" 
              className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
              title="Call Us"
            >
              <Phone size={20} />
            </Link>
            <Link 
              href="/upload" 
              className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-200 transition-all active:scale-95 flex items-center gap-2"
            >
              <Upload size={16} strokeWidth={3} />
              Fast Refill
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden p-2 rounded-xl transition-colors ${isMobileMenuOpen ? 'bg-slate-100 text-blue-600' : 'text-slate-600'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl reveal">
          <div className="flex flex-col p-8 space-y-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-2xl font-black tracking-tighter ${
                  pathname === link.href ? 'text-blue-600' : 'text-slate-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="grid grid-cols-1 gap-4 pt-8 border-t border-slate-100">
              <Link 
                href="/upload"
                className="flex items-center justify-center gap-3 bg-blue-600 text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-blue-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Upload size={22} /> Upload Prescription
              </Link>
              <Link 
                href="https://wa.me/1234567890"
                className="flex items-center justify-center gap-3 bg-emerald-50 text-emerald-600 py-5 rounded-[2rem] font-black text-lg border border-emerald-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <MessageCircle size={22} /> Chat with Liza
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}