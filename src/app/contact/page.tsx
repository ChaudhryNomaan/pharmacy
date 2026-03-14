"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Phone, MapPin, Clock, Send, Upload, CheckCircle, ShieldCheck, FileText, X, MessageCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  file: File | null;
}

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: 'Prescription Inquiry',
    message: '',
    file: null
  });

  // ENTER YOUR NUMBER HERE (International format, no + or spaces)
  const MY_WHATSAPP_NUMBER = "+92 312 1572571"; 

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Construct the message text
    const fileNote = formData.file ? `(File attached: ${formData.file.name})` : '';
    const text = `*New Pharmacy Inquiry*%0A` +
                 `*Name:* ${formData.name}%0A` +
                 `*Subject:* ${formData.subject}%0A` +
                 `*Email:* ${formData.email}%0A` +
                 `*Message:* ${formData.message}%0A` +
                 `${fileNote}`;

    const whatsappUrl = `https://wa.me/${MY_WHATSAPP_NUMBER}?text=${text}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');

    console.log("Form Data Submitted:", formData);
    setIsSubmitted(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, file: e.target.files?.[0] || null }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl text-center max-w-md border border-emerald-50">
          <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-emerald-600" size={40} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter">Redirecting...</h2>
          <p className="text-slate-500 mb-8 font-medium">
            Thank you, {formData.name.split(' ')[0]}. We are opening WhatsApp so you can chat with our clinical team.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl transition-all active:scale-95 shadow-xl shadow-emerald-100"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-left mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 px-4 py-2 rounded-full text-emerald-600 text-xs font-black uppercase tracking-widest mb-6 shadow-sm">
             <ShieldCheck size={14} /> HIPAA Protected Channel
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-6">
            How can we <br /><span className="text-emerald-600">help you today?</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl font-medium leading-relaxed">
            Refills, medical advice, or insurance questions—our team is standing by to provide the personal care you deserve.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Info & Map */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Direct Access</h2>
              
              <div className="space-y-8">
                <a href={`https://wa.me/${MY_WHATSAPP_NUMBER}`} target="_blank" className="flex items-center gap-6 group">
                  <div className="bg-emerald-50 p-4 rounded-2xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">WhatsApp Chat</p>
                    <p className="text-xl font-black text-slate-800 group-hover:text-emerald-600 transition-colors">Chat with us</p>
                  </div>
                </a>

                <div className="flex items-center gap-6">
                  <div className="bg-emerald-50 p-4 rounded-2xl text-emerald-600">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Visit Us</p>
                    <p className="text-xl font-black text-slate-800">456 Health Blvd, Downtown</p>
                  </div>
                </div>

                <div className="flex items-start gap-6 pt-6 border-t border-slate-50">
                  <div className="bg-slate-50 p-4 rounded-2xl text-slate-400">
                    <Clock size={24} />
                  </div>
                  <div className="flex-grow">
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-3">Hours of Operation</p>
                    <div className="space-y-2 text-sm font-bold text-slate-600">
                      <div className="flex justify-between"><span>Mon - Fri</span><span className="text-slate-900">9am - 8pm</span></div>
                      <div className="flex justify-between"><span>Saturday</span><span className="text-slate-900">10am - 5pm</span></div>
                      <div className="flex justify-between text-red-500"><span>Sunday</span><span>Closed</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="h-64 bg-slate-200 rounded-[2.5rem] shadow-inner relative flex items-center justify-center overflow-hidden border border-slate-100 group">
                <div className="absolute inset-0 opacity-60 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700"></div>
                <div className="relative z-10 bg-white shadow-xl px-6 py-3 rounded-2xl flex items-center gap-3 cursor-pointer">
                  <MapPin className="text-red-500 animate-bounce" size={20} />
                  <span className="text-sm font-black text-slate-900 uppercase tracking-tight">Open in Google Maps</span>
                </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-emerald-900/5 border border-slate-100">
            <h2 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Send a Secure Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    name="name" required 
                    onChange={handleInputChange}
                    type="text" placeholder="John Doe" 
                    className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none font-bold shadow-inner focus:shadow-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input 
                    name="email" required 
                    onChange={handleInputChange}
                    type="email" placeholder="john@example.com" 
                    className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none font-bold shadow-inner focus:shadow-none" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Inquiry Subject</label>
                <select 
                  name="subject"
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none font-bold text-slate-700 shadow-inner focus:shadow-none appearance-none"
                >
                  <option>Prescription Inquiry</option>
                  <option>Insurance Question</option>
                  <option>Vaccination Appointment</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Upload Feature */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Prescription Image (Optional)</label>
                {!formData.file ? (
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center hover:bg-emerald-50 hover:border-emerald-300 transition-all cursor-pointer relative group">
                    <Upload className="text-slate-300 group-hover:text-emerald-500 mb-2 transition-colors" size={24} />
                    <span className="text-xs font-bold text-slate-500">Click to upload photo or PDF</span>
                    <input 
                      type="file" 
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                      onChange={handleFileChange}
                      accept="image/*,.pdf"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-2xl border border-emerald-100 animate-in slide-in-from-top-2">
                    <div className="flex items-center gap-3">
                      <FileText className="text-emerald-600" />
                      <span className="text-xs font-black text-emerald-900 truncate max-w-[200px]">{formData.file.name}</span>
                    </div>
                    <button onClick={() => setFormData(prev => ({...prev, file: null}))} className="text-emerald-600 hover:bg-emerald-100 p-1 rounded-full">
                      <X size={18} strokeWidth={3} />
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Message Details</label>
                <textarea 
                  name="message" required
                  onChange={handleInputChange}
                  rows={4} 
                  placeholder="How can our clinical team help?" 
                  className="w-full p-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all outline-none font-bold shadow-inner focus:shadow-none" 
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 px-8 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-2xl shadow-emerald-200"
              >
                <MessageCircle size={20} strokeWidth={3} />
                Send Secure Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}