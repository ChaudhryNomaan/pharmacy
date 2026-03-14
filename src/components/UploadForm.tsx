"use client";
import { useState, useRef } from 'react';
import { Upload, CheckCircle2, FileText, X, Loader2, ShieldCheck, Lock, Smartphone } from 'lucide-react';

export default function UploadForm() {
  const [sent, setSent] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selectedFile: File) => {
    if (selectedFile.type.includes('image/') || selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert("Please upload an image or PDF file.");
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    // Simulate secure HIPAA-compliant transfer
    setTimeout(() => {
      setIsUploading(false);
      setSent(true);
    }, 2500);
  };

  return (
    <div className="max-w-md mx-auto relative">
      {/* Background Glow */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-emerald-50 rounded-[3rem] blur-2xl opacity-50 -z-10"></div>

      <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-slate-100 transition-all reveal">
        {sent ? (
          <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-20"></div>
              <div className="relative bg-emerald-500 text-white w-24 h-24 rounded-full flex items-center justify-center shadow-lg shadow-emerald-200">
                <CheckCircle2 size={48} strokeWidth={2.5} />
              </div>
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tighter">Rx Received!</h3>
            <p className="text-slate-500 mb-8 font-medium leading-relaxed">
              Our team has received your prescription. We'll verify your insurance and call you within <span className="text-blue-600 font-bold">15-30 minutes</span>.
            </p>
            <button 
              onClick={() => { setSent(false); setFile(null); }}
              className="bg-slate-100 text-slate-600 px-8 py-4 rounded-2xl font-black hover:bg-slate-200 transition-all"
            >
              Upload Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center text-center mb-8">
              <div className="bg-blue-50 text-blue-600 p-3 rounded-2xl mb-4">
                <Lock size={24} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Secure Transfer</h2>
              <p className="text-slate-500 text-sm font-medium">Encrypted & HIPAA Compliant</p>
            </div>

            <div className="space-y-4">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="Jane Doe" 
                    required 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white transition-all outline-none font-bold text-slate-700" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                  <div className="relative">
                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="tel" 
                      placeholder="(555) 000-0000" 
                      required 
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none font-bold text-slate-700" 
                    />
                  </div>
                </div>
              </div>

              {/* Enhanced File Upload Area */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Upload Rx</label>
                {!file ? (
                  <div 
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-[2rem] p-10 text-center transition-all cursor-pointer group relative overflow-hidden ${
                      dragActive ? 'border-blue-500 bg-blue-50' : 'border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/50'
                    }`}
                  >
                    <Upload className={`mx-auto mb-4 transition-all duration-300 ${dragActive ? 'text-blue-600 scale-125' : 'text-slate-300 group-hover:text-blue-500'}`} size={40} />
                    <p className="text-sm font-black text-slate-700">Drop your file here</p>
                    <p className="text-xs text-slate-400 mt-1 font-medium">Or click to browse storage</p>
                    
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={(e) => e.target.files && handleFile(e.target.files[0])}
                      accept="image/*,.pdf"
                      required 
                      className="hidden" 
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-5 bg-blue-600 text-white rounded-2xl animate-in slide-in-from-bottom-2 duration-300 shadow-xl shadow-blue-200">
                    <div className="flex items-center gap-4 overflow-hidden">
                      <div className="bg-white/20 p-2 rounded-lg">
                        <FileText size={20} />
                      </div>
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-xs font-black truncate">{file.name}</span>
                        <span className="text-[10px] opacity-70 font-bold uppercase tracking-tight">Ready to send</span>
                      </div>
                    </div>
                    <button onClick={() => setFile(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                      <X size={20} strokeWidth={3} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Privacy Shield */}
            <div className="flex items-start gap-4 bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100">
              <ShieldCheck className="text-emerald-600 shrink-0" size={20} />
              <p className="text-[11px] text-emerald-800/70 leading-relaxed font-bold">
                We use end-to-end 256-bit encryption. Your data is deleted from our web servers immediately after being processed by our pharmacist.
              </p>
            </div>

            <button 
              type="submit" 
              disabled={isUploading || !file}
              className={`w-full py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-2xl ${
                isUploading || !file
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' 
                : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-200 active:scale-95'
              }`}
            >
              {isUploading ? (
                <>
                  <Loader2 size={24} className="animate-spin" />
                  Encrypting...
                </>
              ) : (
                <>
                  <span>Send to Pharmacy</span>
                  <Upload size={20} strokeWidth={3} />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}