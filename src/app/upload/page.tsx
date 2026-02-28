"use client";
import { useState, useRef, ChangeEvent, FormEvent } from 'react';
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

  // Auto-format phone number as (XXX) XXX-XXXX
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
    if (selectedFile) {
      processFile(selectedFile);
    }
  };

  const processFile = (selectedFile: File) => {
    setFile(selectedFile);
    if (selectedFile.type.startsWith('image/')) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null); // It's a PDF
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    
    // Simulate secure API call to a backend like Supabase or AWS
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsUploading(false);
    setSubmitted(true);
    setFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-10">
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl w-full max-w-xl border border-blue-50">
        
        {/* Header */}
        {!submitted && (
          <div className="text-center mb-10">
            <div className="bg-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg shadow-blue-200">
              <Upload size={32} />
            </div>
            <h1 className="text-3xl font-black text-blue-900 mb-2">Upload Prescription</h1>
            <p className="text-gray-500 font-medium">Safe, encrypted, and processed in minutes.</p>
          </div>
        )}
        
        {submitted ? (
          <div className="text-center py-6 animate-in fade-in zoom-in duration-500">
            <div className="bg-emerald-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
              <CheckCircle2 size={56} />
            </div>
            <h2 className="text-3xl font-black text-gray-800 mb-3">Submission Received!</h2>
            <p className="text-gray-600 mb-8 leading-relaxed text-lg">
              Our pharmacists are reviewing your file. We'll call you at <span className="font-bold text-blue-600">{phone}</span> shortly.
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => { setSubmitted(false); setPhone(""); }} 
                className="bg-blue-600 text-white font-bold py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-95"
              >
                Upload Another
              </button>
              <Link href="/" className="text-gray-400 font-semibold hover:text-blue-600 py-2 transition flex items-center justify-center gap-2">
                <ArrowLeft size={18} /> Back to Homepage
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-gray-400 ml-1">
                  <User size={14} /> Patient Name
                </label>
                <input 
                  type="text" 
                  required 
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium" 
                  placeholder="Jane Smith" 
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-gray-400 ml-1">
                  <Phone size={14} /> Contact Number
                </label>
                <input 
                  type="tel" 
                  required 
                  value={phone}
                  onChange={handlePhoneChange}
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all font-medium" 
                  placeholder="(555) 000-0000" 
                />
              </div>
            </div>

            {/* Enhanced File Upload Area */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-gray-400 ml-1">
                <FileText size={14} /> Prescription Document
              </label>
              
              <div 
                onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('border-blue-500', 'bg-blue-50'); }}
                onDragLeave={(e) => { e.preventDefault(); e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50'); }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.currentTarget.classList.remove('border-blue-500', 'bg-blue-50');
                  const droppedFile = e.dataTransfer.files[0];
                  if (droppedFile) processFile(droppedFile);
                }}
                onClick={() => fileInputRef.current?.click()}
                className={`group relative cursor-pointer border-2 border-dashed rounded-3xl p-10 text-center transition-all min-h-[200px] flex flex-col items-center justify-center ${
                  file ? 'border-blue-200 bg-blue-50/30' : 'border-gray-200 bg-gray-50 hover:border-blue-400 hover:bg-blue-50'
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
                        <button onClick={removeFile} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600">
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3 bg-white p-4 rounded-2xl shadow-sm border border-blue-100">
                        <FileText className="text-blue-600" />
                        <span className="font-bold text-sm text-gray-700 truncate max-w-[200px]">{file.name}</span>
                        <X onClick={removeFile} className="text-gray-400 hover:text-red-500 cursor-pointer" size={18} />
                      </div>
                    )}
                    <p className="text-sm font-bold text-blue-600">File attached successfully</p>
                  </div>
                ) : (
                  <>
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                      <ImageIcon className="text-gray-400 group-hover:text-blue-500" size={28} />
                    </div>
                    <p className="text-base font-bold text-gray-700">Drag photo here or click to browse</p>
                    <p className="text-xs text-gray-400 mt-2">Maximum file size: 10MB (JPG, PNG, PDF)</p>
                  </>
                )}
              </div>
            </div>

            {/* Security Notice */}
            <div className="flex items-start gap-3 bg-slate-900 p-4 rounded-2xl text-white shadow-lg">
              <ShieldCheck size={20} className="text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-blue-400 mb-1">Bank-Level Security</p>
                <p className="text-[11px] text-slate-300 leading-normal">
                  Data is encrypted via AES-256. Files are automatically deleted from our server once processed by our pharmacists.
                </p>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isUploading || !file}
              className={`w-full py-5 rounded-2xl font-black text-lg transition-all shadow-xl flex items-center justify-center gap-3 ${
                isUploading || !file 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' 
                : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95 shadow-blue-200'
              }`}
            >
              {isUploading ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  Encrypting & Sending...
                </>
              ) : "Send to Pharmacist"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}