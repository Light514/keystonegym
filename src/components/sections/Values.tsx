'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { RevealText } from '../animations/RevealText';
import { FadeIn } from '../animations/FadeIn';
import { ScaleIn } from '../animations/ScaleIn';
import { Grid } from '../layout/Grid';

const wantKeys = ['discipline', 'respect', 'rightReasons', 'protectors'] as const;
const rejectKeys = ['street', 'egos', 'disrespect'] as const;

export function Values() {
  const t = useTranslations('values');
  const [activeWant, setActiveWant] = useState<string | null>(null);
  const [activeReject, setActiveReject] = useState<string | null>(null);

  return (
    <section className="w-full bg-[#D4AF37] text-black px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 relative overflow-hidden">
      {/* Octagon pattern overlay */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')]"></div>

      <Grid className="relative z-10">
        <div className="col-span-1 sm:col-span-6 md:col-span-6 pr-0 sm:pr-8 md:pr-12 pb-12 sm:pb-0 md:pb-0 mb-12 sm:mb-0 md:mb-0 border-b sm:border-b-0 md:border-b-0 border-black/10">
          <div className="flex items-center gap-4 mb-12">
            <FadeIn><Check className="w-10 sm:w-12 h-10 sm:h-12 text-black" /></FadeIn>
            <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter">
              <RevealText>{t('weWant')}</RevealText>
            </h2>
          </div>
          <ul className="space-y-12">
            {wantKeys.map((key, i) => {
              const isActive = activeWant === key;
              return (
                <motion.li
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + (i * 0.1) }}
                  onClick={() => setActiveWant(isActive ? null : key)}
                  className={`flex gap-4 items-start group transition-transform duration-300 cursor-pointer ${
                    isActive ? 'translate-x-2' : 'hover:translate-x-2'
                  }`}
                >
                  <span className="font-mono text-black/50 mt-1">0{i + 1}</span>
                  <div>
                    <h3 className={`font-sans text-2xl sm:text-3xl md:text-4xl font-bold uppercase transition-colors ${
                      isActive ? 'text-white' : 'group-hover:text-white'
                    }`}>{t(`want.${key}.title`)}</h3>
                    <p className="text-black/60 font-mono text-sm mt-1 font-bold">{t(`want.${key}.subtitle`)}</p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>

        <div className="col-span-1 sm:col-span-6 md:col-span-6 sm:border-l md:border-l sm:border-black/10 md:border-black/10 sm:pl-8 md:pl-12">
          <div className="flex items-center gap-4 mb-12">
            <FadeIn delay={0.2}><X className="w-10 sm:w-12 h-10 sm:h-12 text-black" /></FadeIn>
            <h2 className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter">
              <RevealText delay={0.2}>{t('weReject')}</RevealText>
            </h2>
          </div>
          <ul className="space-y-12">
            {rejectKeys.map((key, i) => {
              const isActive = activeReject === key;
              return (
                <motion.li
                  key={key}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 + (i * 0.1) }}
                  onClick={() => setActiveReject(isActive ? null : key)}
                  className={`flex gap-4 items-start group transition-transform duration-300 cursor-pointer ${
                    isActive ? 'translate-x-2' : 'hover:translate-x-2'
                  }`}
                >
                  <span className="font-mono text-black/50 mt-1">0{i + 1}</span>
                  <div>
                    <h3 className={`font-sans text-2xl sm:text-3xl md:text-4xl font-bold uppercase transition-colors decoration-slice line-through decoration-black ${
                      isActive ? 'text-white' : 'group-hover:text-white'
                    }`}>{t(`reject.${key}.title`)}</h3>
                    <p className="text-black/60 font-mono text-sm mt-1 font-bold">{t(`reject.${key}.subtitle`)}</p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
          <ScaleIn delay={0.6} className="mt-16 p-6 border-2 border-black bg-black text-[#D4AF37]">
            <p className="font-sans text-xl uppercase tracking-wide text-center font-bold">
              {t('noExceptions')}
            </p>
          </ScaleIn>
        </div>
      </Grid>
    </section>
  );
}
