"use client";
import React, { useState, useRef, ChangeEvent, FormEvent, useEffect } from 'react';
import { 
  Upload, FileText, CheckCircle2, ShieldCheck, 
  Phone, User, ArrowLeft, X, ImageIcon, Loader2 
} from 'lucide-react';
import Link from 'next/link';

export default function UploadPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  // YOUR WHATSAPP NUMBER (International format without + or spaces)
  const MY_WHATSAPP_NUMBER = "923121572571";

  // Cleanup preview URL to avoid memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, '');
    const zip = input.substring(0, 3);
    const middle = input.substring(3, 6);
    const last = input.substring(6, 10);

    if (input.length > 6) {setPhone(`(${zip}) ${middle}-${last}`);}
    else if (input.length > 3) {setPhone(`(${zip}) ${middle}`);}
    else if (input.length > 0) {setPhone(`(${zip}`);}
    else {setPhone("");}
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) processFile(selectedFile);
  };

  const processFile = (selectedFile: File) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(selectedFile);
    if (selectedFile.type.startsWith('image/')) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    const patientName = nameRef.current?.value || "Patient";
    
    // Construct the WhatsApp Message
    const message = `*New Prescription Upload*%0A` +
                    `--------------------------%0A` +
                    `*Name:* ${patientName}%0A` +
                    `*Phone:* ${phone}%0A` +
                    `*File:* ${file?.name}%0A` +
                    `--------------------------%0A` +
                    `I am sending my prescription for review.`;

    // WhatsApp API Link
    const whatsappUrl = `https://wa.me/${MY_WHATSAPP_NUMBER}?text=${message}`;

    // Simulate "Encryption" delay for UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Redirect to WhatsApp
    window.open(whatsappUrl, '_blank');

    setIsUploading(false);
    setSubmitted(true);
    // Don't clear file immediately so user sees what they sent if needed,
    // but in this flow we clear it for a fresh state.
    setFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-10">
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl w-full max-w-xl border border-emerald-50">
        
        {!submitted && (
          <div className="text-center mb-10">
            <div className="bg-emerald-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg shadow-emerald-200">
              <Upload size={32} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Upload Prescription</h1>
            <p className="text-slate-500 font-medium">Send via secure WhatsApp encrypted chat.</p>
          </div>
        )}
        
        {submitted ? (
          <div className="text-center py-6 animate-in fade-in zoom-in duration-500">
            <div className="bg-emerald-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
              <CheckCircle2 size={56} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tighter">Chat Started!</h2>
            <p className="text-slate-500 mb-8 leading-relaxed text-lg font-medium">
              We've opened WhatsApp. Please <b>attach your file</b> in the chat and send the pre-filled message.
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => { setSubmitted(false); setPhone(""); }} 
                className="bg-emerald-600 text-white font-black py-4 rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 active:scale-95"
              >
                Send Another
              </button>
              <Link href="/" className="text-slate-400 font-black hover:text-emerald-600 py-2 transition flex items-center justify-center gap-2 uppercase text-xs tracking-widest">
                <ArrowLeft size={18} /> Back to Homepage
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                  <User size={14} /> Patient Name
                </label>
                <input 
                  type="text" 
                  required 
                  ref={nameRef}
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white outline-none transition-all font-bold text-slate-700" 
                  placeholder="Jane Smith" 
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                  <Phone size={14} /> Contact Number
                </label>
                <input 
                  type="tel" 
                  required 
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 focus:bg-white outline-none transition-all font-bold text-slate-700" 
                  placeholder="(555) 000-0000" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                <FileText size={14} /> Prescription Document
              </label>
              
              <div 
                onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('border-emerald-500', 'bg-emerald-50'); }}
                onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('border-emerald-500', 'bg-emerald-50'); }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove('border-emerald-500', 'bg-emerald-50');
                  const droppedFile = e.dataTransfer.files[0];
                  if (droppedFile) processFile(droppedFile);
                }}
                onClick={() => fileInputRef.current?.click()}
                className={`group relative cursor-pointer border-2 border-dashed rounded-[2rem] p-10 text-center transition-all min-h-[200px] flex flex-col items-center justify-center ${
                  file ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-200 bg-slate-50 hover:border-emerald-400 hover:bg-emerald-50'
                }`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                  required 
                  className="hidden" 
                />

                {file ? (
                  <div className="space-y-4 w-full animate-in zoom-in duration-200">
                    {previewUrl ? (
                      <div className="relative inline-block">
                        <img src={previewUrl} alt="Preview" className="h-32 w-32 object-cover rounded-2xl shadow-md border-2 border-white" />
                        <button type="button" onClick={removeFile} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600">
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-emerald-100">
                        <FileText className="text-emerald-600" />
                        <span className="font-black text-sm text-slate-700 truncate max-w-[200px]">{file.name}</span>
                        <X onClick={removeFile} className="text-slate-400 hover:text-red-500 cursor-pointer" size={18} />
                      </div>
                    )}
                    <p className="text-sm font-black text-emerald-600 uppercase tracking-tighter">File selected</p>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                      <ImageIcon className="text-slate-400 group-hover:text-emerald-500 transition-colors" size={28} />
                    </div>
                    <p className="text-base font-black text-slate-700">Drag photo here or click to browse</p>
                    <p className="text-xs text-slate-400 mt-2 font-medium">Attach file to continue</p>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-start gap-4 bg-slate-900 p-6 rounded-[2rem] text-white shadow-2xl">
              <ShieldCheck size={24} className="text-emerald-400 shrink-0" />
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-1.5">WhatsApp Secure Link</p>
                <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                  Clicking send will open a chat with our pharmacist. Please make sure to attach the selected file in the WhatsApp window.
                </p>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isUploading || !file}
              className={`w-full py-5 rounded-2xl font-black text-lg transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95 ${
                isUploading || !file 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' 
                : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200'
              }`}
            >
              {isUploading ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  Opening WhatsApp...
                </>
              ) : "Send via WhatsApp"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
