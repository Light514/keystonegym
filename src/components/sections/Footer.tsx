import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utils ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Icons ---
export function KeystoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3L6 21H18L21 3H3Z" />
    </svg>
  );
}

// --- Sub-components ---
const NavLink = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <a 
      href={href} 
      className={cn("relative group flex items-center transition-colors active:scale-95 duration-100 w-fit", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={cn(
        "font-mono text-[#D4AF37] mr-2 inline-block transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0", 
        isHovered ? "opacity-100 translate-x-0 w-auto" : "opacity-0 -translate-x-2 w-0 overflow-hidden"
      )}>
        //
      </span>
      <span className={cn("transition-colors duration-300 group-hover:text-[#D4AF37]", isHovered ? "text-[#D4AF37]" : "text-inherit")}>
        {children}
      </span>
    </a>
  );
};

// --- Props ---
export interface FooterProps {
  description?: string;
  location?: string;
  menuItems?: { label: string; href: string }[];
  tagline?: string[];
  arabicQuote?: string;
  copyrightYear?: number;
}

// --- Main Component ---
export function Footer({
  description = "A selective martial arts training community in Montreal. Real training. Real coaches. Real standards.",
  location = "Saint Laurent, Montreal",
  menuItems = [
    { label: "Philosophy", href: "#philosophy" },
    { label: "Support", href: "#support" },
    { label: "The Room", href: "#coaches" },
    { label: "Member Portal", href: "/auth/login" },
    { label: "Training", href: "#training" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Join", href: "#join" },
    { label: "Terms of Service", href: "/terms" },
  ],
  tagline = ["Real Training.", "Real Standards.", "No Shortcuts."],
  arabicQuote = "الْمُؤْمِنُ لِلْمُؤْمِنِ كَالْبُنْيَانِ يَشُدُّ بَعْضُهُ بَعْضًا",
  copyrightYear = new Date().getFullYear(),
}: FooterProps) {
  
  return (
    <footer className="bg-black text-white px-5 sm:px-8 py-12 md:py-20 lg:py-24 relative overflow-hidden">
      {/* Top Border Animation */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 w-full h-px bg-[#D4AF37] origin-left"
      />
      
      {/* Main Grid Container */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-8 lg:gap-x-16 relative">
        
        {/* Branding - Left Column */}
        {/* Mobile: Full width, Tablet/Desktop: Span 4 */}
        <div className="col-span-1 md:col-span-4 flex flex-col items-start">
          <h2 className="font-sans font-black text-3xl sm:text-4xl mb-6 tracking-tighter text-[#D4AF37] flex items-center gap-3">
            <KeystoneIcon className="w-8 h-8 sm:w-10 sm:h-10 shrink-0" />
            KEYSTONE
          </h2>
          <p className="text-sm font-medium max-w-sm mb-8 text-zinc-400 leading-relaxed">
            {description}
          </p>
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-600 mt-auto">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>{location}</span>
          </div>
        </div>

        {/* Menu - Center Column */}
        {/* Mobile: Full width, Tablet/Desktop: Span 4 */}
        <div className="col-span-1 md:col-span-4 flex justify-start md:justify-center">
          <div className="w-full md:max-w-xs">
            <h4 className="font-bold mb-6 font-sans uppercase text-[#D4AF37] text-left">Menu</h4>
            <ul className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3 font-mono text-sm text-zinc-400">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <NavLink href={item.href} className="hover:text-[#D4AF37]">
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tagline - Right Column */}
        {/* Mobile: Full width (Left aligned), Tablet/Desktop: Span 4 (Right aligned) */}
        <div className="col-span-1 md:col-span-4 flex flex-col justify-end items-start md:items-end text-left md:text-right">
          <div className="font-sans font-bold text-xl sm:text-2xl uppercase leading-tight mb-4 text-white">
            {tagline.map((line, i) => (
              <React.Fragment key={i}>
                {line}<br />
              </React.Fragment>
            ))}
          </div>
          <p className="text-sm text-[#D4AF37] mt-2 mb-6 leading-relaxed font-serif" dir="rtl">
            {arabicQuote}
          </p>
          <p className="font-mono text-[10px] text-zinc-700">
            © {copyrightYear} Keystone Gym. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
