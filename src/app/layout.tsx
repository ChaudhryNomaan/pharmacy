import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Phone, MapPin, Mail, ShieldCheck, AlertCircle, ArrowUpCircle } from "lucide-react";
import Link from "next/link";

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Local Pharmacy | Clinical Excellence & Fast Refills",
    template: "%s | Local Pharmacy"
  },
  description: "Your trusted neighborhood pharmacy in Downtown. Secure prescription uploads, free local delivery, and professional health consultations.",
  keywords: ["Pharmacy Downtown", "Prescription Refill Online", "Local Pharmacist", "Medicine Delivery", "HIPAA Secure Pharmacy"],
  authors: [{ name: "Pharmacy Team" }],
  metadataBase: new URL('https://yourpharmacy.com'), 
  openGraph: {
    title: "Local Pharmacy | Trusted Community Care",
    description: "Personalized pharmacy services with the convenience of digital refills and local delivery.",
    url: 'https://yourpharmacy.com',
    siteName: "Local Pharmacy",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Local Pharmacy Entrance",
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Pharmacy",
    "name": "Local Pharmacy",
    "image": "https://yourpharmacy.com/logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "456 Health Boulevard",
      "addressLocality": "Downtown",
      "addressRegion": "HC",
      "postalCode": "12345",
      "addressCountry": "US"
    },
    "telephone": "+1-555-012-3456",
    "openingHours": "Mo-Fr 09:00-20:00, Sa 10:00-17:00",
    "priceRange": "$$"
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${jakarta.variable} font-sans antialiased bg-slate-50 text-slate-900 flex flex-col min-h-screen`}>
        
        {/* Themed Top Alert Bar */}
        <div className="bg-slate-900 text-white py-2.5 px-6 text-center text-[10px] font-black uppercase tracking-[0.15em]">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
            <AlertCircle size={14} className="text-emerald-400" />
            <span className="opacity-90">Fast Refills: Most prescriptions ready in 15 minutes or less.</span>
            <span className="hidden md:inline opacity-30">|</span>
            <Link href="/upload" className="text-emerald-400 hover:text-emerald-300 transition-colors hidden md:inline underline underline-offset-4 decoration-emerald-400/30">
              Upload Prescription Now
            </Link>
          </div>
        </div>

        <Navbar />

        <main className="flex-grow" id="top">
          {children}
        </main>

        <footer className="bg-white border-t border-slate-200 pt-20 pb-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
              
              {/* Brand Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black italic shadow-lg shadow-emerald-200">P</div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase">Local Pharmacy</h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  Your local health partner. We combine modern technology with old-fashioned community care to keep you healthy.
                </p>
                <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-wider bg-emerald-50 w-fit px-4 py-2 rounded-full border border-emerald-100 shadow-sm">
                  <ShieldCheck size={14} strokeWidth={3} />
                  <span>Licensed & HIPAA Compliant</span>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-8">Patient Portal</h4>
                <ul className="space-y-4 text-sm font-bold text-slate-500">
                  <li><Link href="/" className="hover:text-emerald-600 transition-colors">Home Dashboard</Link></li>
                  <li><Link href="/services" className="hover:text-emerald-600 transition-colors">Pharmacy Services</Link></li>
                  <li><Link href="/upload" className="text-emerald-600 hover:text-emerald-700 font-black transition-colors">Refill a Prescription</Link></li>
                  <li><Link href="/contact" className="hover:text-emerald-600 transition-colors">Ask a Pharmacist</Link></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-8">Visit Us</h4>
                <div className="space-y-5 text-sm font-bold text-slate-500">
                  <div className="flex items-start gap-4">
                    <MapPin size={20} className="text-emerald-600 shrink-0" />
                    <span className="leading-relaxed">456 Health Boulevard,<br />Downtown, Health City 12345</span>
                  </div>
                  <a href="tel:5550123456" className="flex items-center gap-4 hover:text-emerald-600 transition-colors group">
                    <Phone size={20} className="text-emerald-600 shrink-0" />
                    <span className="text-slate-800 group-hover:text-emerald-600 transition-colors font-black">(555) 012-3456</span>
                  </a>
                  <div className="flex items-center gap-4">
                    <Mail size={20} className="text-emerald-600 shrink-0" />
                    <span>care@yourpharmacy.com</span>
                  </div>
                </div>
              </div>

              {/* Hours of Operation */}
              <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-inner">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] mb-6">Store Hours</h4>
                <div className="space-y-4 text-xs font-bold text-slate-500">
                  <div className="flex justify-between border-b border-slate-200 pb-3">
                    <span className="uppercase tracking-widest text-[10px]">Mon - Fri</span>
                    <span className="text-slate-900">9am - 8pm</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-3">
                    <span className="uppercase tracking-widest text-[10px]">Saturday</span>
                    <span className="text-slate-900">10am - 5pm</span>
                  </div>
                  <div className="flex justify-between text-red-500">
                    <span className="uppercase tracking-widest text-[10px]">Sunday</span>
                    <span className="font-black uppercase">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-100 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              <p>© {currentYear} Local Pharmacy. Built for Health.</p>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="#" className="hover:text-emerald-600 transition-colors">Privacy</Link>
                <Link href="#" className="hover:text-emerald-600 transition-colors">Terms</Link>
                <Link href="#" className="hover:text-emerald-600 transition-colors">Notice of Privacy Practices</Link>
              </div>
            </div>
          </div>
        </footer>

        {/* Back to top FAB */}
        <Link 
          href="#top" 
          className="fixed bottom-8 right-8 p-4 bg-white border border-slate-200 rounded-2xl shadow-2xl text-emerald-600 hover:bg-emerald-50 hover:scale-110 active:scale-90 transition-all z-50 md:flex hidden items-center justify-center"
        >
          <ArrowUpCircle size={24} strokeWidth={2.5} />
        </Link>
      </body>
    </html>
  );
}