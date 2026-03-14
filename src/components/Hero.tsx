import Link from 'next/link';
import { Upload, ArrowRight, ShieldCheck, Clock, CheckCircle2, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white pt-32 pb-24 px-6">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[140px] opacity-20 pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500 rounded-full blur-[120px] opacity-10 pointer-events-none"></div>
      
      {/* Fine Grid Overlay for a "Medical Tech" feel */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')]"></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Left Content: Text & CTA */}
        <div className="text-left space-y-8 reveal">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-blue-200 text-xs font-black uppercase tracking-widest">
            <Sparkles size={14} className="text-blue-400" />
            Downtown's #1 Rated Pharmacy
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black leading-[1.05] tracking-tighter">
            Better Care, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Starts Here.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 max-w-lg leading-relaxed font-medium">
            Fast prescription processing, expert guidance, and 
            <span className="text-white font-bold"> free home delivery</span>. Experience pharmacy the way it should be.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link 
              href="/upload" 
              className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black shadow-2xl shadow-blue-900/40 hover:bg-blue-500 hover:scale-105 transition-all flex items-center justify-center gap-3 group text-lg"
            >
              <Upload size={22} strokeWidth={3} />
              Upload Prescription
            </Link>
            <Link 
              href="/services" 
              className="bg-white/5 backdrop-blur-md border border-white/10 px-10 py-5 rounded-2xl font-bold hover:bg-white/10 transition-all text-center text-lg"
            >
              Explore Services
            </Link>
          </div>

          {/* Mini Trust Bar */}
          <div className="flex items-center gap-6 pt-4 border-t border-white/5 w-fit">
             <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                <CheckCircle2 size={16} className="text-emerald-500" />
                HIPAA SECURE
             </div>
             <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                <CheckCircle2 size={16} className="text-emerald-500" />
                LICENSED 2026
             </div>
          </div>
        </div>

        {/* Right Content: Modern Stats & Trust Grid */}
        <div className="hidden lg:grid grid-cols-2 gap-4 reveal" style={{ animationDelay: '0.2s' }}>
          <div className="space-y-4 pt-12">
            <div className="card-glass p-8 rounded-[2.5rem] group hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                <Clock size={28} />
              </div>
              <h3 className="font-black text-xl mb-2">15 Min</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">Average wait time for in-store pickups.</p>
            </div>
            
            <div className="card-glass p-8 rounded-[2.5rem] group hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 transition-transform">
                <ShieldCheck size={28} />
              </div>
              <h3 className="font-black text-xl mb-2">Secure</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">End-to-end encrypted medical data.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-10 rounded-[2.5rem] shadow-2xl flex flex-col justify-between h-full border border-blue-400/20">
              <div className="space-y-2">
                <div className="text-6xl font-black text-white tracking-tighter italic">99%</div>
                <p className="text-sm font-black text-blue-200 uppercase tracking-widest leading-tight">
                  Patient <br />Satisfaction
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-2xl mt-8">
                 <p className="text-xs font-medium text-blue-100">"The fastest service in the city, hands down."</p>
                 <p className="text-[10px] font-black mt-2 text-white uppercase">— Local Resident</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
