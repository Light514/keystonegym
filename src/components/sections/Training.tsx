'use client';

import { motion } from 'framer-motion';
import { Calendar, Shield } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { RevealText } from '../animations/RevealText';
import { FadeIn } from '../animations/FadeIn';
import { ScaleIn } from '../animations/ScaleIn';
import { Section } from '../layout/Section';
import { Grid } from '../layout/Grid';
import { Label } from '../layout/Label';

export function Training() {
  const t = useTranslations('training');
  const disciplines = t.raw('disciplineList') as string[];
  const [activeDay, setActiveDay] = useState<string | null>(null);
  const [activeDiscipline, setActiveDiscipline] = useState<string | null>(null);
  const [isGymImageActive, setIsGymImageActive] = useState(false);

  return (
    <Section id="training">
      <Grid>
        <div className="col-span-1 sm:col-span-6 md:col-span-5">
          <Label>{t('label')}</Label>
          <div className="mb-8 text-white text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-sans font-black uppercase tracking-tighter leading-[0.9]">
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

        <div className="col-span-1 sm:col-span-6 md:col-span-7">
          <div className="space-y-0 relative">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="absolute top-0 left-0 w-full h-px bg-[#D4AF37] origin-left"
            />

            {/* Schedule Table */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 border-b border-[#D4AF37]">
              <div className="p-6 sm:p-8 border-b sm:border-b-0 border-[#D4AF37] sm:border-r">
                <h4 className="font-sans text-xl font-bold uppercase mb-4 flex items-center gap-2 text-[#D4AF37]">
                  <Calendar className="w-5 h-5" /> {t('schedule')}
                </h4>
                <ul className="space-y-4 font-mono text-sm text-zinc-300">
                  <li
                    onClick={() => setActiveDay(activeDay === 'saturday' ? null : 'saturday')}
                    className="flex justify-between items-center group cursor-pointer"
                  >
                    <span className={`font-bold transition-colors ${activeDay === 'saturday' ? 'text-[#D4AF37]' : 'group-hover:text-[#D4AF37]'}`}>{t('saturday')}</span>
                    <span>{t('time')}</span>
                  </li>
                  <li className="text-right text-zinc-500 text-xs">{t('wrestling')}</li>
                  <li
                    onClick={() => setActiveDay(activeDay === 'sunday' ? null : 'sunday')}
                    className="flex justify-between items-center border-t border-[#D4AF37]/20 pt-2 group cursor-pointer"
                  >
                    <span className={`font-bold transition-colors ${activeDay === 'sunday' ? 'text-[#D4AF37]' : 'group-hover:text-[#D4AF37]'}`}>{t('sunday')}</span>
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
                    <span
                      key={d}
                      onClick={() => setActiveDiscipline(activeDiscipline === d ? null : d)}
                      className={`px-3 py-1 border border-[#D4AF37] text-xs font-bold uppercase transition-colors cursor-pointer ${
                        activeDiscipline === d
                          ? 'bg-[#D4AF37] text-black'
                          : 'bg-black text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black'
                      }`}
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Gym Floor Image */}
          <ScaleIn delay={0.5}>
            <div
              onClick={() => setIsGymImageActive(!isGymImageActive)}
              className="w-full h-64 md:h-80 bg-zinc-900 mt-8 relative overflow-hidden group border border-[#D4AF37]/50 cursor-pointer"
            >
              <img
                src="/images/gym-floor.webp"
                alt={t('gymFloor')}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isGymImageActive
                    ? 'opacity-100 grayscale-0 scale-105'
                    : 'grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105'
                }`}
              />
            </div>
          </ScaleIn>
        </div>
      </Grid>
    </Section>
  );
}
