"use client";
import React, { useState } from 'react';
import { MessageCircle, Search, Pill, Plus, Minus, Info } from 'lucide-react';

const MEDICINES = [
  { id: 1, name: "Paracetamol", price: 5.50, category: "Pain Relief", strength: "500mg" },
  { id: 2, name: "Ibuprofen", price: 7.25, category: "Anti-inflammatory", strength: "200mg" },
  { id: 3, name: "Amoxicillin", price: 12.00, category: "Antibiotics", strength: "250mg" },
  { id: 4, name: "Cetirizine", price: 8.50, category: "Allergy", strength: "10mg" },
  { id: 5, name: "Vitamin C", price: 15.00, category: "Supplements", strength: "1000mg" },
  { id: 6, name: "Metformin", price: 20.00, category: "Diabetes", strength: "500mg" },
];

export default function MedicineSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState<{ [key: number]: number }>(
    Object.fromEntries(MEDICINES.map(m => [m.id, 1]))
  );

  const pharmacyPhone = "+923121572571"; 

  const updateQty = (id: number, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  const sendWhatsAppOrder = (med: typeof MEDICINES[0]) => {
    const qty = quantities[med.id];
    const message = `Hello! 👋\n\nI'd like to order:\n📦 *Item:* ${med.name}\n🧪 *Strength:* ${med.strength}\n🔢 *Quantity:* ${qty}\n💰 *Approx. Total:* $${(med.price * qty).toFixed(2)}\n\nPlease let me know when I can collect this!`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${pharmacyPhone}?text=${encodedMessage}`, '_blank');
  };

  const filteredMeds = MEDICINES.filter(med => 
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <div className="bg-emerald-50 text-emerald-600 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest w-fit">
              Direct Dispensing
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
              Quick <span className="text-emerald-600">Catalog</span>
            </h2>
            <p className="text-slate-500 font-medium max-w-md">
              Select your essentials and checkout instantly via WhatsApp for priority preparation.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search by name or category..."
              className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-[2rem] focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all font-medium"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Medicine Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMeds.map((med) => (
            <div key={med.id} className="group p-8 bg-slate-50 rounded-[2.5rem] border border-transparent hover:border-emerald-100 hover:bg-white hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-white p-4 rounded-2xl shadow-sm text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                  <Pill size={28} />
                </div>
                <span className="text-[10px] font-black text-slate-400 bg-white px-3 py-1.5 rounded-full border border-slate-100 uppercase tracking-[0.15em]">
                  {med.category}
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-800 tracking-tight">{med.name}</h3>
              <p className="text-slate-500 font-bold text-sm mb-6 flex items-center gap-2">
                <Info size={14} className="text-emerald-400" />
                {med.strength}
              </p>
              
              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-8 bg-white w-fit p-1 rounded-2xl border border-slate-100">
                <button 
                  onClick={() => updateQty(med.id, -1)}
                  className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400 hover:text-emerald-600"
                >
                  <Minus size={18} />
                </button>
                <span className="w-8 text-center font-black text-slate-800">{quantities[med.id]}</span>
                <button 
                  onClick={() => updateQty(med.id, 1)}
                  className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-400 hover:text-emerald-600"
                >
                  <Plus size={18} />
                </button>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-slate-400 uppercase">Price per unit</span>
                  <span className="text-2xl font-black text-emerald-900">${med.price.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => sendWhatsAppOrder(med)}
                  className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-4 rounded-2xl font-black hover:bg-emerald-600 active:scale-95 transition-all shadow-xl shadow-emerald-200"
                >
                  <MessageCircle size={20} fill="currentColor" />
                  Order
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredMeds.length === 0 && (
          <div className="text-center py-24 bg-slate-50 rounded-[3.5rem] border-2 border-dashed border-slate-200">
            <Pill className="mx-auto text-slate-300 mb-4" size={48} />
            <p className="text-slate-500 font-black text-xl">Medicine not in catalog?</p>
            <p className="text-slate-400 font-medium mb-8 text-sm">We likely have it in stock. Just ask our pharmacist!</p>
            <button 
              onClick={() => window.open(`https://wa.me/${pharmacyPhone}?text=Hi! I am looking for a medicine not in your online list...`, '_blank')}
              className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
            >
              Inquire via WhatsApp
            </button>
          </div>
        )}
      </div>
    </section>
  );
}