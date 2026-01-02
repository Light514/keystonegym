'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { RevealText } from '../animations/RevealText';
import { FadeIn } from '../animations/FadeIn';
import { Grid } from '../layout/Grid';
import { Button } from '../ui/Button';
import { KeystoneIcon } from '../icons/KeystoneIcon';
import { NavLink } from '../NavLink';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { MobileMenu } from '../MobileMenu';

export function Hero() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations('hero');
  const nav = useTranslations('nav');

  // Easter egg 🦅
  useEffect(() => {
    console.log(
      `%c🥊 KEYSTONE GYM 🥊%c
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
%cSend location. Montreal.%c
"If you know, you know."
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
%c🔍 Looking for work? We train warriors.%c
   keystonegym.com/#join`,
      'font-size: 20px; font-weight: bold; color: #D4AF37;',
      'color: #D4AF37;',
      'font-size: 14px; color: #fff;',
      'font-size: 12px; color: #888; font-style: italic;',
      'font-size: 11px; color: #D4AF37;',
      'font-size: 11px; color: #888;'
    );
  }, []);

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
        {/* Desktop Navigation */}
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden md:flex flex-col items-end gap-1 font-mono text-xs pointer-events-auto"
        >
          <div className="mb-2">
            <LanguageSwitcher />
          </div>
          <NavLink href="#philosophy">{nav('philosophy').toUpperCase()}</NavLink>
          <NavLink href="#coaches">{nav('coaches').toUpperCase()}</NavLink>
          <NavLink href="#training">{nav('training').toUpperCase()}</NavLink>
          <NavLink href="#join">{nav('join').toUpperCase()}</NavLink>
          <NavLink href="#support">{nav('support').toUpperCase()}</NavLink>
          <NavLink href="/auth/login">{nav('memberPortal').toUpperCase()}</NavLink>
        </motion.nav>

        {/* Mobile Hamburger Button */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden pointer-events-auto p-2 text-[#D4AF37] hover:text-white transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </motion.button>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-center md:justify-end pb-12 md:pb-24 px-4 md:px-8 pt-20 md:pt-32">
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
                {t('location')}
              </span>
            </RevealText>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="font-sans text-[15vw] md:text-[12vw] leading-[0.8] font-black uppercase tracking-tighter mb-8 text-white block"
              >
                {t('title1')}
              </motion.h1>
            </div>

            <div className="overflow-hidden -mt-4 md:-mt-8">
              <motion.h1
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
                className="font-sans text-[15vw] md:text-[12vw] leading-[0.8] font-black uppercase tracking-tighter mb-8 text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37] to-[#8C721F] block"
              >
                {t('title2')}
              </motion.h1>
            </div>
          </div>

          <div className="col-span-1 md:col-span-4 flex flex-col justify-end items-start md:pl-8">
            <FadeIn delay={0.8} className="space-y-8">
              <p className="text-xl md:text-2xl font-medium leading-tight max-w-md text-zinc-300">
                {t('tagline1')}<br />
                {t('tagline2')}<br />
                <span className="text-[#D4AF37]">{t('tagline3')}</span>
              </p>

              <div className="flex flex-col gap-4 w-full">
                <a href="#join">
                  <Button className="w-full justify-between">
                    {t('requestTrial')}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  </Button>
                </a>
                <a href="#philosophy" className="font-mono text-sm underline decoration-1 underline-offset-4 decoration-[#D4AF37] hover:text-[#D4AF37] transition-colors text-zinc-400">
                  {t('learnMore')}
                </a>
              </div>
            </FadeIn>
          </div>
        </Grid>
      </section>
    </>
  );
}
