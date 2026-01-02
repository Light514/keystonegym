import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, X, Check, Globe, Shield, User, Clock, Calendar, Mail, Phone, ChevronRight } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utils ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Animation Components ---

const RevealText = ({ children, className, delay = 0, yOffset = "100%" }: { children: React.ReactNode; className?: string; delay?: number; yOffset?: string }) => (
  <div className={cn("overflow-hidden", className)}>
    <motion.div
      initial={{ y: yOffset }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  </div>
);

const FadeIn = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const ScaleIn = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

// --- Micro-Interaction Components ---

const NavLink = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <a 
      href={href} 
      className={cn("relative group flex items-center transition-colors active:scale-95 duration-100", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={cn(
        "font-mono text-[#D4AF37] mr-2 inline-block transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]", 
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

// --- Layout Components ---

const Section = ({ children, className, id, noBorder = false }: { children: React.ReactNode; className?: string; id?: string; noBorder?: boolean }) => (
  <section id={id} className={cn("w-full px-4 md:px-8 py-16 md:py-24 relative", className)}>
    {!noBorder && (
       <motion.div 
         initial={{ scaleX: 0 }}
         whileInView={{ scaleX: 1 }}
         viewport={{ once: true, margin: "-20%" }}
         transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
         className="absolute bottom-0 left-0 w-full h-px bg-[#D4AF37] origin-left z-10"
       />
    )}
    {children}
  </section>
);

const Grid = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn("grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-8", className)}>
    {children}
  </div>
);

const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <RevealText className={cn("mb-4 block", className)}>
    <span className={cn("font-mono text-xs md:text-sm uppercase tracking-wider text-[#D4AF37]")}>
      {children}
    </span>
  </RevealText>
);

const Button = ({ children, variant = 'primary', className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'outline' | 'ghost' }) => {
  const baseStyles = "px-8 py-4 font-sans font-bold uppercase tracking-tight text-lg flex items-center gap-2 relative overflow-hidden group transition-all duration-200 active:scale-[0.98]";
  
  const variants = {
    primary: "bg-[#D4AF37] text-black",
    outline: "border-2 border-[#D4AF37] text-[#D4AF37] hover:border-[#D4AF37]", 
    ghost: "text-white hover:text-[#D4AF37] p-0 active:scale-100 overflow-visible"
  };

  if (variant === 'ghost') {
    return (
      <button className={cn(baseStyles, variants[variant], className)} {...props}>
        {children}
      </button>
    );
  }

  return (
    <button className={cn(baseStyles, variants[variant], className)} {...props}>
      {/* "Chamber Load" Background Effect */}
      <span className={cn(
        "absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        variant === 'outline' && "bg-[#D4AF37]" 
      )} />
      
      {/* Content */}
      <span className={cn(
        "relative z-10 flex items-center gap-2 transition-colors duration-300",
        variant === 'primary' && "group-hover:text-black",
        variant === 'outline' && "group-hover:text-black"
      )}>
        {children}
      </span>
    </button>
  );
};

// --- Main Component ---

export default function KeystoneLandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#D4AF37] selection:text-black overflow-x-hidden cursor-crosshair">
      
      {/* HEADER / NAV */}
      <header className="fixed top-0 left-0 w-full z-50 mix-blend-difference text-white px-4 md:px-8 py-6 flex justify-between items-start pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-sans font-black text-2xl tracking-tighter pointer-events-auto text-[#D4AF37] flex items-center gap-2"
        >
          <KeystoneIcon className="w-8 h-8" />
          KEYSTONE
        </motion.div>
        <motion.nav 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden md:flex flex-col items-end gap-1 font-mono text-xs pointer-events-auto"
        >
          <NavLink href="#philosophy">PHILOSOPHY</NavLink>
          <NavLink href="#coaches">THE ROOM</NavLink>
          <NavLink href="#training">TRAINING</NavLink>
          <NavLink href="#join">JOIN</NavLink>
          <NavLink href="#support">SUPPORT</NavLink>
          <NavLink href="#portal">MEMBER PORTAL</NavLink>
        </motion.nav>
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-end pb-12 md:pb-24 px-4 md:px-8 pt-32">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#111] -z-10 hidden md:block border-l border-[#D4AF37]/20"></div>
        {/* Subtle noise texture */}
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        
        {/* Animated Bottom Border */}
        <motion.div 
           initial={{ scaleX: 0 }}
           animate={{ scaleX: 1 }}
           transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
           className="absolute bottom-0 left-0 w-full h-px bg-[#D4AF37] origin-left"
         />

        <Grid>
          <div className="col-span-1 md:col-span-8 overflow-hidden">
            <RevealText delay={0.2}>
              <span className="font-mono text-xs md:text-sm uppercase tracking-wider block mb-4 text-[#D4AF37]">
                Montreal, QC • 45.5017° N, 73.5673° W
              </span>
            </RevealText>
            
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="font-sans text-[15vw] md:text-[12vw] leading-[0.8] font-black uppercase tracking-tighter mb-8 text-white block"
              >
                Key
              </motion.h1>
            </div>
            
            <div className="overflow-hidden -mt-4 md:-mt-8">
               <motion.h1 
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
                className="font-sans text-[15vw] md:text-[12vw] leading-[0.8] font-black uppercase tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37] to-[#8C721F] block"
              >
                Stone
              </motion.h1>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-4 flex flex-col justify-end items-start md:pl-8">
            <FadeIn delay={0.8} className="space-y-8">
              <p className="text-xl md:text-2xl font-medium leading-tight max-w-md text-zinc-300">
                Send location. Montreal.<br/>
                Real training. Real standards.<br/>
                <span className="text-[#D4AF37]">No shortcuts.</span>
              </p>
              
              <div className="flex flex-col gap-4 w-full">
                <Button className="w-full justify-between">
                  Request Trial 
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </Button>
                <a href="#philosophy" className="font-mono text-sm underline decoration-1 underline-offset-4 decoration-[#D4AF37] hover:text-[#D4AF37] transition-colors text-zinc-400">
                  Learn More →
                </a>
              </div>
            </FadeIn>
          </div>
        </Grid>
      </section>

      {/* SECTION 01: PHILOSOPHY */}
      <Section id="philosophy">
        <Grid>
          <div className="col-span-1 md:col-span-4">
            <Label>01 • Philosophy</Label>
            <div className="text-6xl md:text-7xl mb-8 font-sans font-black uppercase tracking-tighter leading-[0.85] text-white">
              <RevealText delay={0.1}>If You</RevealText>
              <RevealText delay={0.2}>Know,</RevealText>
              <RevealText delay={0.3}>You Know</RevealText>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            {[
              { title: "We Don't Recruit", desc: "You request a trial session. We train together. Both sides evaluate. If it fits, welcome. If not, respectful goodbye." },
              { title: "Protection First", desc: "We screen carefully to protect the people already here. The selectivity isn't elitism - it's protection." },
              { title: "Real Training", desc: "This is a fighting camp, not a fitness class. Our coaches come from Chechnya, Dagestan. Real lineage, real training." },
              { title: "Brotherhood", desc: "Every member is a keystone - the wedge-shaped stone that holds the arch together. Remove one, the structure weakens." }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: 0.2 + (i * 0.1) }}
                className="relative pt-4"
              >
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.0, delay: 0.2 + (i * 0.1) }}
                  className="absolute top-0 left-0 w-full h-px bg-[#D4AF37] origin-left"
                />
                <span className="font-mono text-xs mb-2 block text-zinc-500">0{i + 1}</span>
                <h3 className="font-sans text-2xl font-bold uppercase mb-2 text-[#D4AF37]">{item.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </Grid>
      </Section>

      {/* VALUES SECTION - INVERTED */}
      <section className="w-full bg-[#D4AF37] text-black px-4 md:px-8 py-24 relative overflow-hidden">
        {/* Octagon pattern overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')]"></div>
        
        <Grid className="relative z-10">
          <div className="col-span-1 md:col-span-6 pr-0 md:pr-12 pb-12 md:pb-0 mb-12 md:mb-0 border-b md:border-b-0 border-black/10">
            <div className="flex items-center gap-4 mb-12">
              <FadeIn><Check className="w-12 h-12 text-black" /></FadeIn>
              <h2 className="font-sans text-6xl md:text-8xl font-black uppercase tracking-tighter overflow-hidden">
                <RevealText>We Want</RevealText>
              </h2>
            </div>
            <ul className="space-y-12">
              {[
                { title: "Discipline", subtitle: "The foundation of everything" },
                { title: "Respect", subtitle: "For the room, the coaches, each other" },
                { title: "Right Reasons", subtitle: "Growth, not ego" },
                { title: "Protectors", subtitle: "Those who guard the structure" }
              ].map((item, i) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + (i * 0.1) }}
                  className="flex gap-4 items-start group hover:translate-x-2 transition-transform duration-300"
                >
                  <span className="font-mono text-black/50 mt-1">0{i + 1}</span>
                  <div>
                    <h3 className="font-sans text-3xl md:text-4xl font-bold uppercase group-hover:text-white transition-colors">{item.title}</h3>
                    <p className="text-black/60 font-mono text-sm mt-1 font-bold">{item.subtitle}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-6 md:border-l md:border-black/10 md:pl-12">
            <div className="flex items-center gap-4 mb-12">
              <FadeIn delay={0.2}><X className="w-12 h-12 text-black" /></FadeIn>
              <h2 className="font-sans text-6xl md:text-8xl font-black uppercase tracking-tighter overflow-hidden">
                <RevealText delay={0.2}>We Reject</RevealText>
              </h2>
            </div>
            <ul className="space-y-12">
              {[
                { title: "Street Mentality", subtitle: "We train warriors, not troublemakers" },
                { title: "Unchecked Egos", subtitle: "Leave it at the door or don't enter" },
                { title: "Disrespect", subtitle: "To anyone in this room" }
              ].map((item, i) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + (i * 0.1) }}
                  className="flex gap-4 items-start group hover:translate-x-2 transition-transform duration-300"
                >
                  <span className="font-mono text-black/50 mt-1">0{i + 1}</span>
                  <div>
                    <h3 className="font-sans text-3xl md:text-4xl font-bold uppercase group-hover:text-white transition-colors decoration-slice line-through decoration-black">{item.title}</h3>
                    <p className="text-black/60 font-mono text-sm mt-1 font-bold">{item.subtitle}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
            <ScaleIn delay={0.6} className="mt-16 p-6 border-2 border-black bg-black text-[#D4AF37]">
              <p className="font-sans text-xl uppercase tracking-wide text-center font-bold">
                No exceptions. No second chances.
              </p>
            </ScaleIn>
          </div>
        </Grid>
      </section>

      {/* SECTION 02: COACHES */}
      <Section id="coaches" className="bg-[#111]">
        <Grid>
          <div className="col-span-1 md:col-span-12 mb-12">
             <Label>02 • The Room</Label>
             <h2 className="font-sans text-4xl md:text-6xl uppercase font-black leading-none max-w-4xl text-zinc-100">
               <RevealText delay={0.1}>Not franchise gym instructors.</RevealText>
               <RevealText delay={0.2}><span className="text-[#D4AF37]">Real lineage.</span> Real experience.</RevealText>
               <RevealText delay={0.3}>Real standards.</RevealText>
             </h2>
          </div>
          
          {[
            { name: "Rustam Dudaiev", exp: "20+ Years", origin: "Chechnya", disc: "Wrestling", img: "https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/uploads/76a7e56e-c033-4e29-b2c2-a5c5d296ee5c/1767308593855-ded305dd/Rustam_Dudaiev.png" },
            { name: "Vislan Dalkhaev", exp: "15+ Years", origin: "Dagestan", disc: "Boxing", img: "https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/uploads/76a7e56e-c033-4e29-b2c2-a5c5d296ee5c/1767308593855-ded305dd/Rustam_Dudaiev.png" },
            { name: "Wassim", exp: "7+ Years", origin: "Morocco", disc: "Kickboxing", img: "https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/uploads/76a7e56e-c033-4e29-b2c2-a5c5d296ee5c/1767308593855-ded305dd/Rustam_Dudaiev.png" },
            { name: "Ahmed", exp: "7+ Years", origin: "Morocco", disc: "Grappling", img: "https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/uploads/76a7e56e-c033-4e29-b2c2-a5c5d296ee5c/1767308593855-ded305dd/Rustam_Dudaiev.png" }
          ].map((coach, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.8, delay: 0.2 + (i * 0.1) }}
              className="col-span-1 md:col-span-3 min-h-[400px] relative group overflow-hidden border border-zinc-800"
            >
              {/* Image Background */}
              <div className="absolute inset-0 bg-zinc-900">
                <img 
                  src={coach.img} 
                  alt={coach.name}
                  className="w-full h-full object-cover object-top opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
              </div>
              
              {/* Content Overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                  <div className="flex justify-between items-end border-b border-[#D4AF37]/50 pb-4 mb-4">
                     <span className="font-mono text-xs text-[#D4AF37] opacity-80">COACH 0{i+1}</span>
                     <Globe className="w-4 h-4 text-[#D4AF37] group-hover:rotate-45 transition-transform duration-500" />
                  </div>
                  
                  <h3 className="font-sans text-3xl font-black uppercase leading-none mb-2 text-white">{coach.name}</h3>
                  
                  <div className="grid grid-cols-2 gap-y-2 mt-4 font-mono text-xs text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <div className="flex flex-col">
                      <span className="text-zinc-500">EXP</span>
                      <span className="font-bold text-white">{coach.exp}</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-zinc-500">ORIGIN</span>
                      <span className="font-bold text-white">{coach.origin}</span>
                    </div>
                    <div className="flex flex-col col-span-2 mt-2 pt-2 border-t border-zinc-800">
                      <span className="text-zinc-500">FOCUS</span>
                      <span className="font-bold text-[#D4AF37] text-lg uppercase">{coach.disc}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </Grid>
      </Section>

      {/* SECTION 03: TRAINING */}
      <Section id="training">
        <Grid>
          <div className="col-span-1 md:col-span-5">
            <Label>03 • Training</Label>
            <div className="mb-8 text-white text-5xl md:text-6xl lg:text-7xl font-sans font-black uppercase tracking-tighter leading-[0.85]">
              <RevealText>Small &</RevealText>
              <RevealText delay={0.1}>Deliberate</RevealText>
            </div>
            <FadeIn delay={0.3}>
              <p className="text-xl leading-relaxed max-w-md text-zinc-400">
                We're not trying to be the biggest gym in Montreal. We're building the right community.
              </p>
            </FadeIn>
            
            <ScaleIn delay={0.4} className="mt-12 p-8 bg-[#D4AF37] text-black block w-full border border-black hover:scale-[1.02] transition-transform duration-300 cursor-pointer shadow-[0px_10px_30px_-10px_rgba(212,175,55,0.3)]">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-sans font-bold">$100</span>
                <span className="font-mono text-sm text-black/70">CAD / MONTH</span>
              </div>
              <p className="font-mono text-xs mt-4 text-black/70 border-t border-black/20 pt-4 font-bold">
                NO HIDDEN FEES. NO CONTRACTS.<br/>
                JUST TRAINING.
              </p>
            </ScaleIn>
          </div>
          
          <div className="col-span-1 md:col-span-7">
            <div className="space-y-0 relative">
               <motion.div 
                 initial={{ scaleX: 0 }}
                 whileInView={{ scaleX: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 1.2 }}
                 className="absolute top-0 left-0 w-full h-px bg-[#D4AF37] origin-left"
               />
              
              {/* Schedule Table */}
              <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#D4AF37]">
                <div className="p-8 border-b md:border-b-0 border-[#D4AF37] md:border-r">
                  <h4 className="font-sans text-xl font-bold uppercase mb-4 flex items-center gap-2 text-[#D4AF37]">
                    <Calendar className="w-5 h-5" /> Schedule
                  </h4>
                  <ul className="space-y-4 font-mono text-sm text-zinc-300">
                    <li className="flex justify-between items-center group cursor-default">
                      <span className="font-bold group-hover:text-[#D4AF37] transition-colors">SATURDAY</span>
                      <span>8:30 AM - 9:30 AM</span>
                    </li>
                    <li className="text-right text-zinc-500 text-xs">WRESTLING</li>
                    <li className="flex justify-between items-center border-t border-[#D4AF37]/20 pt-2 group cursor-default">
                      <span className="font-bold group-hover:text-[#D4AF37] transition-colors">SUNDAY</span>
                      <span>8:30 AM - 9:30 AM</span>
                    </li>
                    <li className="text-right text-zinc-500 text-xs">WRESTLING</li>
                  </ul>
                </div>
                
                <div className="p-8 bg-[#111]">
                  <h4 className="font-sans text-xl font-bold uppercase mb-4 flex items-center gap-2 text-[#D4AF37]">
                    <Shield className="w-5 h-5" /> Disciplines
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['Wrestling', 'Boxing', 'Kickboxing', 'Grappling'].map((d) => (
                      <span key={d} className="px-3 py-1 border border-[#D4AF37] text-xs font-bold uppercase bg-black text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors cursor-default">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Image Placeholder */}
            <ScaleIn delay={0.5}>
              <div className="w-full h-64 md:h-80 bg-zinc-900 mt-8 relative overflow-hidden group border border-[#D4AF37]/50">
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <span className="font-sans font-black text-4xl uppercase text-white drop-shadow-md group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">Gym Floor</span>
                </div>
                <img 
                  src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2069&auto=format&fit=crop" 
                  alt="Gym Floor" 
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
              </div>
            </ScaleIn>
          </div>
        </Grid>
      </Section>

      {/* SECTION 04: FORM */}
      <Section id="join" className="bg-[#0a0a0a] text-white" noBorder>
        <Grid>
          <div className="col-span-1 md:col-span-5">
            <Label className="text-[#D4AF37]">04 • Step Into The Room</Label>
            <div className="font-sans text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.85] text-white">
              <RevealText>Prove</RevealText>
              <RevealText delay={0.1}><span className="text-[#D4AF37]">Yourself</span></RevealText>
            </div>
            <FadeIn delay={0.2}>
              <p className="text-xl font-medium max-w-sm text-zinc-400">
                See if this is your brotherhood. We'll train together, then both sides decide.
              </p>
            </FadeIn>
          </div>
          
          <div className="col-span-1 md:col-span-7">
            <FadeIn delay={0.4}>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 group">
                    <label className="font-mono text-xs uppercase opacity-80 text-[#D4AF37] group-focus-within:opacity-100 transition-opacity">Full Name *</label>
                    <input type="text" className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-[#D4AF37] py-4 text-2xl font-sans outline-none placeholder:text-zinc-800 transition-colors text-white" placeholder="JOHN DOE" />
                  </div>
                  <div className="space-y-2 group">
                    <label className="font-mono text-xs uppercase opacity-80 text-[#D4AF37] group-focus-within:opacity-100 transition-opacity">Phone *</label>
                    <input type="tel" className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-[#D4AF37] py-4 text-2xl font-sans outline-none placeholder:text-zinc-800 transition-colors text-white" placeholder="(555) 000-0000" />
                  </div>
                </div>
                
                <div className="space-y-2 group">
                  <label className="font-mono text-xs uppercase opacity-80 text-[#D4AF37] group-focus-within:opacity-100 transition-opacity">Email *</label>
                  <input type="email" className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-[#D4AF37] py-4 text-2xl font-sans outline-none placeholder:text-zinc-800 transition-colors text-white" placeholder="EMAIL@ADDRESS.COM" />
                </div>
                
                <div className="space-y-2 group">
                  <label className="font-mono text-xs uppercase opacity-80 text-[#D4AF37] group-focus-within:opacity-100 transition-opacity">Why do you want to train with us?</label>
                  <textarea rows={3} className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-[#D4AF37] py-4 text-xl font-sans outline-none placeholder:text-zinc-800 transition-colors resize-none text-white" placeholder="BE HONEST."></textarea>
                </div>
                
                <Button className="w-full justify-center mt-8 shadow-[0px_0px_20px_0px_rgba(212,175,55,0.3)] hover:shadow-[0px_0px_30px_0px_rgba(212,175,55,0.5)]">
                  Submit Request <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                </Button>
              </form>
            </FadeIn>
          </div>
        </Grid>
      </Section>

      {/* SECTION 05: DONATION */}
      <Section className="bg-[#111] text-white pb-24" noBorder>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <FadeIn>
            <IslamicStarIcon className="w-12 h-12 mx-auto mb-8 text-[#D4AF37]" />
            <blockquote className="font-sans text-2xl md:text-4xl font-bold uppercase leading-tight mb-8">
              "We built this room for our sons—for every kid in this community who needs to learn what hard work and discipline really mean. The martial arts are just the tool. The lessons are what matter."
            </blockquote>
            <cite className="not-italic font-mono text-[#D4AF37]">— Walid, Founder</cite>
          </FadeIn>
        </div>
        
        <ScaleIn delay={0.2} className="border border-[#D4AF37]/30 p-8 md:p-12 max-w-5xl mx-auto bg-black/50 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div>
              <h3 className="font-sans text-3xl font-bold uppercase mb-2">Build the Next Generation</h3>
              <p className="font-mono text-sm text-zinc-500">Your support goes directly to:</p>
              <div className="flex gap-4 mt-2 font-mono text-xs text-[#D4AF37]">
                <span>// EQUIPMENT</span>
                <span>// SCHOLARSHIPS</span>
                <span>// EXPANSION</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['$25', '$50', '$100', 'CUSTOM'].map((amount, i) => (
              <button key={i} className={cn(
                "py-4 border transition-all duration-300 font-mono font-bold uppercase tracking-wider relative overflow-hidden group active:scale-95",
                i === 1 ? "bg-[#D4AF37] text-black border-[#D4AF37]" : "border-[#D4AF37]/30 text-[#D4AF37] hover:border-[#D4AF37]"
              )}>
                 <span className={cn(
                   "absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                   i === 1 ? "bg-white" : "bg-[#D4AF37]"
                 )} />
                 <span className={cn(
                   "relative z-10 transition-colors duration-300",
                   i === 1 ? "group-hover:text-black" : "group-hover:text-black"
                 )}>{amount}</span>
              </button>
            ))}
          </div>
          
          <div className="mt-8 text-center">
             <Button className="w-full justify-center">Contribute $50 CAD</Button>
             <p className="mt-4 text-xs font-mono text-zinc-600">Secure payment via Stripe.</p>
          </div>
        </ScaleIn>
      </Section>

      {/* FOOTER */}
      <footer className="bg-black text-white px-4 md:px-8 py-12 md:py-24 relative">
        <motion.div 
           initial={{ scaleX: 0 }}
           whileInView={{ scaleX: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
           className="absolute top-0 left-0 w-full h-px bg-[#D4AF37] origin-left"
         />
        <Grid>
          <div className="col-span-1 md:col-span-4">
            <h2 className="font-sans font-black text-4xl mb-6 tracking-tighter text-[#D4AF37] flex items-center gap-3">
              <KeystoneIcon className="w-10 h-10" />
              KEYSTONE
            </h2>
            <p className="text-sm font-medium max-w-xs mb-8 text-zinc-400">
              A selective martial arts training community in Montreal. Real training. Real coaches. Real standards.
            </p>
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-600">
              <MapPin className="w-4 h-4" />
              <span>Saint Laurent, Montreal</span>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-bold mb-6 font-sans uppercase text-[#D4AF37]">Menu</h4>
            <ul className="space-y-3 font-mono text-sm text-zinc-400">
              <li><NavLink href="#" className="hover:text-[#D4AF37]">Philosophy</NavLink></li>
              <li><NavLink href="#" className="hover:text-[#D4AF37]">Coaches</NavLink></li>
              <li><NavLink href="#" className="hover:text-[#D4AF37]">Training</NavLink></li>
              <li><NavLink href="#join" className="hover:text-[#D4AF37]">Join</NavLink></li>
              <li><NavLink href="#support" className="hover:text-[#D4AF37]">Support</NavLink></li>
              <li><NavLink href="#portal" className="hover:text-[#D4AF37]">Member Portal</NavLink></li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-3">
            <h4 className="font-bold mb-6 font-sans uppercase text-[#D4AF37]">Contact</h4>
            <ul className="space-y-3 font-mono text-sm text-zinc-400">
              <li className="flex items-center gap-2 group hover:text-[#D4AF37] transition-colors"><Phone className="w-4 h-4" /> (438) 622-7226</li>
              <li className="flex items-center gap-2 group hover:text-[#D4AF37] transition-colors"><Mail className="w-4 h-4" /> ahmed.faraj2204@gmail.com</li>
              <li className="flex items-center gap-2 group hover:text-[#D4AF37] transition-colors"><Clock className="w-4 h-4" /> Sat & Sun 8:30 AM</li>
            </ul>
          </div>
          
          <div className="col-span-1 md:col-span-3 flex flex-col justify-end items-start md:items-end text-left md:text-right">
             <div className="font-sans font-bold text-xl uppercase leading-none mb-2 text-white">
               Real Training.<br/>
               Real Standards.<br/>
               No Shortcuts.
             </div>
             <p className="font-mono text-[10px] text-zinc-700 mt-8">
               © 2025 Keystone Martial Arts. All rights reserved.
             </p>
          </div>
        </Grid>
      </footer>
    </div>
  );
}

// Icon component specifically for this file
function IslamicStarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Rub el Hizb (Two overlapping squares) */}
      <path d="M12 2.5L14.5 7.5H19.5L15.5 10.5L17.5 15.5L12 12.5L6.5 15.5L8.5 10.5L4.5 7.5H9.5L12 2.5Z" style={{ display: 'none' }} /> {/* Removed junk paths */}
      <rect x="5" y="5" width="14" height="14" transform="rotate(45 12 12)" />
      <rect x="5" y="5" width="14" height="14" />
    </svg>
  )
}

function KeystoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Keystone shape: wider top, narrower bottom */}
      <path d="M3 3L6 21H18L21 3H3Z" />
    </svg>
  )
}