import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Phone, MapPin, Mail, ShieldCheck, AlertCircle, ArrowUpCircle } from "lucide-react";
import Link from "next/link";

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: '--font-jakarta',
  display: 'swap', // Ensures text remains visible during font load
});

export const metadata: Metadata = {
  title: {
    default: "Liza's Local Pharmacy | Clinical Excellence & Fast Refills",
    template: "%s | Liza's Pharmacy"
  },
  description: "Your trusted neighborhood pharmacy in Downtown. Secure prescription uploads, free local delivery, and professional health consultations.",
  keywords: ["Pharmacy Downtown", "Prescription Refill Online", "Local Pharmacist", "Medicine Delivery", "HIPAA Secure Pharmacy"],
  authors: [{ name: "Liza's Pharmacy Team" }],
  metadataBase: new URL('https://lizaspharmacy.com'), // Replace with your actual domain
  openGraph: {
    title: "Liza's Local Pharmacy | Trusted Community Care",
    description: "Personalized pharmacy services with the convenience of digital refills and local delivery.",
    url: 'https://lizaspharmacy.com',
    siteName: "Liza's Pharmacy",
    images: [
      {
        url: '/og-image.jpg', // Ensure you have this in your public folder
        width: 1200,
        height: 630,
        alt: "Liza's Local Pharmacy Entrance",
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

  // Structured Data for Local SEO (Google loves this for pharmacies)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Pharmacy",
    "name": "Liza's Local Pharmacy",
    "image": "https://lizaspharmacy.com/logo.png",
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
        
        {/* Emergency/Announcement Bar */}
        <div className="bg-blue-900 text-white py-2 px-6 text-center text-xs font-bold tracking-wide">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
            <AlertCircle size={14} className="text-blue-300" />
            <span>Fast Refills: Most prescriptions ready in 15 minutes or less.</span>
            <span className="hidden md:inline opacity-50">|</span>
            <Link href="/upload" className="underline hover:text-blue-200 hidden md:inline">
              Upload Prescription Now
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <Navbar />

        {/* Main Content Area */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
              
              {/* Brand Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black italic">L</div>
                  <h3 className="text-xl font-black text-blue-900 tracking-tighter uppercase">Liza's Pharmacy</h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Your local health partner. We combine modern technology with old-fashioned community care to keep you healthy.
                </p>
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs bg-emerald-50 w-fit px-3 py-1 rounded-full border border-emerald-100">
                  <ShieldCheck size={14} />
                  <span>Licensed & HIPAA Compliant</span>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Patient Portal</h4>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li><Link href="/" className="hover:text-blue-600 transition-colors">Home Dashboard</Link></li>
                  <li><Link href="/services" className="hover:text-blue-600 transition-colors">Pharmacy Services</Link></li>
                  <li><Link href="/upload" className="hover:text-blue-600 transition-colors font-bold text-blue-700">Refill a Prescription</Link></li>
                  <li><Link href="/contact" className="hover:text-blue-600 transition-colors">Ask a Pharmacist</Link></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Visit Us</h4>
                <div className="space-y-4 text-sm text-slate-600">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-blue-600 shrink-0" />
                    <span className="leading-relaxed">456 Health Boulevard,<br />Downtown, Health City 12345</span>
                  </div>
                  <a href="tel:5550123456" className="flex items-center gap-3 hover:text-blue-600 transition-colors">
                    <Phone size={18} className="text-blue-600 shrink-0" />
                    <span className="font-bold text-slate-800">(555) 012-3456</span>
                  </a>
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-blue-600 shrink-0" />
                    <span>care@lizaspharmacy.com</span>
                  </div>
                </div>
              </div>

              {/* Hours of Operation */}
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Store Hours</h4>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span>Mon - Fri</span>
                    <span className="font-bold text-slate-800">9am - 8pm</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span>Saturday</span>
                    <span className="font-bold text-slate-800">10am - 5pm</span>
                  </div>
                  <div className="flex justify-between text-red-500">
                    <span className="font-medium">Sunday</span>
                    <span className="font-black uppercase">Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
              <p>© {currentYear} Liza's Local Pharmacy. Built for Health.</p>
              <div className="flex gap-6">
                <Link href="#" className="hover:text-blue-600">Privacy</Link>
                <Link href="#" className="hover:text-blue-600">Terms</Link>
                <Link href="#" className="hover:text-blue-600">Accessibility</Link>
                <Link href="#" className="hover:text-blue-600">Notice of Privacy Practices</Link>
              </div>
            </div>
          </div>
        </footer>

        {/* Floating Action Button (Optional but handy) */}
        <Link 
          href="#top" 
          className="fixed bottom-6 right-6 p-3 bg-white border border-slate-200 rounded-full shadow-xl text-blue-600 hover:bg-blue-50 transition-all z-50 md:hidden"
        >
          <ArrowUpCircle size={24} />
        </Link>
      </body>
    </html>
  );
}