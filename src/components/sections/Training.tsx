'use client';

import { motion } from 'framer-motion';
import { Calendar, Shield } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { RevealText } from '../animations/RevealText';
import { FadeIn } from '../animations/FadeIn';
import { ScaleIn } from '../animations/ScaleIn';
import { Section } from '../layout/Section';
import { Grid } from '../layout/Grid';
import { Label } from '../layout/Label';

export function Training() {
  const t = useTranslations('training');
  const disciplines = t.raw('disciplineList') as string[];

  return (
    <Section id="training">
      <Grid>
        <div className="col-span-1 md:col-span-5">
          <Label>{t('label')}</Label>
          <div className="mb-8 text-white text-5xl md:text-6xl lg:text-7xl font-sans font-black uppercase tracking-tighter leading-[0.85]">
            <RevealText>{t('title1')}</RevealText>
            <RevealText delay={0.1}>{t('title2')}</RevealText>
          </div>
          <FadeIn delay={0.3}>
            <p className="text-xl leading-relaxed max-w-md text-zinc-400">
              {t('description')}
            </p>
          </FadeIn>

          <ScaleIn delay={0.4} className="mt-12 p-8 bg-[#D4AF37] text-black block w-full border border-black hover:scale-[1.02] transition-transform duration-300 cursor-pointer shadow-[0px_10px_30px_-10px_rgba(212,175,55,0.3)]">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-sans font-bold">{t('price')}</span>
              <span className="font-mono text-sm text-black/70">{t('currency')}</span>
            </div>
            <p className="font-mono text-xs mt-4 text-black/70 border-t border-black/20 pt-4 font-bold">
              {t('noFees')}<br />
              {t('justTraining')}
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
                  <Calendar className="w-5 h-5" /> {t('schedule')}
                </h4>
                <ul className="space-y-4 font-mono text-sm text-zinc-300">
                  <li className="flex justify-between items-center group cursor-default">
                    <span className="font-bold group-hover:text-[#D4AF37] transition-colors">{t('saturday')}</span>
                    <span>{t('time')}</span>
                  </li>
                  <li className="text-right text-zinc-500 text-xs">{t('wrestling')}</li>
                  <li className="flex justify-between items-center border-t border-[#D4AF37]/20 pt-2 group cursor-default">
                    <span className="font-bold group-hover:text-[#D4AF37] transition-colors">{t('sunday')}</span>
                    <span>{t('time')}</span>
                  </li>
                  <li className="text-right text-zinc-500 text-xs">{t('wrestling')}</li>
                </ul>
              </div>

              <div className="p-8 bg-[#111]">
                <h4 className="font-sans text-xl font-bold uppercase mb-4 flex items-center gap-2 text-[#D4AF37]">
                  <Shield className="w-5 h-5" /> {t('disciplines')}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {disciplines.map((d) => (
                    <span key={d} className="px-3 py-1 border border-[#D4AF37] text-xs font-bold uppercase bg-black text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors cursor-default">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Gym Floor Image */}
          <ScaleIn delay={0.5}>
            <div className="w-full h-64 md:h-80 bg-zinc-900 mt-8 relative overflow-hidden group border border-[#D4AF37]/50">
              <img
                src="/images/gym-floor.webp"
                alt={t('gymFloor')}
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
            </div>
          </ScaleIn>
        </div>
      </Grid>
    </Section>
  );
}
