'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { RevealText } from '../animations/RevealText';
import { FadeIn } from '../animations/FadeIn';
import { ScaleIn } from '../animations/ScaleIn';
import { Grid } from '../layout/Grid';

const weWant = [
  { title: "Discipline", subtitle: "The foundation of everything" },
  { title: "Respect", subtitle: "For the room, the coaches, each other" },
  { title: "Right Reasons", subtitle: "Growth, not ego" },
  { title: "Protectors", subtitle: "Those who guard the structure" }
];

const weReject = [
  { title: "Street Mentality", subtitle: "We train warriors, not troublemakers" },
  { title: "Unchecked Egos", subtitle: "Leave it at the door or don't enter" },
  { title: "Disrespect", subtitle: "To anyone in this room" }
];

export function Values() {
  return (
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
            {weWant.map((item, i) => (
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
            {weReject.map((item, i) => (
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
  );
}
