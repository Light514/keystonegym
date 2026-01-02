'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { RevealText } from '../animations/RevealText';
import { FadeIn } from '../animations/FadeIn';
import { Grid } from '../layout/Grid';
import { Button } from '../ui/Button';
import { KeystoneIcon } from '../icons/KeystoneIcon';
import { NavLink } from '../NavLink';

export function Hero() {
  return (
    <>
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
                Send location. Montreal.<br />
                Real training. Real standards.<br />
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
    </>
  );
}
