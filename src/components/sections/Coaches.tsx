'use client';

import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { RevealText } from '../animations/RevealText';
import { Section } from '../layout/Section';
import { Grid } from '../layout/Grid';
import { Label } from '../layout/Label';

const coachKeys = ['rustam', 'vislan', 'wassim', 'ahmed'] as const;
const coachImages = {
  rustam: "https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/uploads/76a7e56e-c033-4e29-b2c2-a5c5d296ee5c/1767308593855-ded305dd/Rustam_Dudaiev.png",
  vislan: "https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/uploads/76a7e56e-c033-4e29-b2c2-a5c5d296ee5c/1767308593855-ded305dd/Rustam_Dudaiev.png",
  wassim: "https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/uploads/76a7e56e-c033-4e29-b2c2-a5c5d296ee5c/1767308593855-ded305dd/Rustam_Dudaiev.png",
  ahmed: "https://vgbujcuwptvheqijyjbe.supabase.co/storage/v1/object/public/hmac-uploads/uploads/76a7e56e-c033-4e29-b2c2-a5c5d296ee5c/1767308593855-ded305dd/Rustam_Dudaiev.png",
};

export function Coaches() {
  const t = useTranslations('coaches');

  return (
    <Section id="coaches" className="bg-[#111]">
      <Grid>
        <div className="col-span-1 sm:col-span-6 md:col-span-12 mb-12">
          <Label>{t('label')}</Label>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-6xl uppercase font-black leading-none max-w-4xl text-zinc-100">
            <RevealText delay={0.1}>{t('title1')}</RevealText>
            <RevealText delay={0.2}><span className="text-[#D4AF37]">{t('title2').split('.')[0]}.</span> {t('title2').split('.')[1]?.trim() || ''}</RevealText>
            <RevealText delay={0.3}>{t('title3')}</RevealText>
          </h2>
        </div>

        {coachKeys.map((key, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.8, delay: 0.2 + (i * 0.1) }}
            className="col-span-1 sm:col-span-3 md:col-span-3 min-h-[350px] sm:min-h-[400px] relative group overflow-hidden border border-zinc-800"
          >
            {/* Image Background */}
            <div className="absolute inset-0 bg-zinc-900">
              <img
                src={coachImages[key]}
                alt={t(`list.${key}.name`)}
                className="w-full h-full object-cover object-top opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <div className="flex justify-between items-end border-b border-[#D4AF37]/50 pb-4 mb-4">
                  <span className="font-mono text-xs text-[#D4AF37] opacity-80">{t('coach')} 0{i + 1}</span>
                  <Globe className="w-4 h-4 text-[#D4AF37] group-hover:rotate-45 transition-transform duration-500" />
                </div>

                <h3 className="font-sans text-3xl font-black uppercase leading-none mb-2 text-white">{t(`list.${key}.name`)}</h3>

                <div className="grid grid-cols-2 gap-y-2 mt-4 font-mono text-xs text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  <div className="flex flex-col">
                    <span className="text-zinc-500">{t('exp')}</span>
                    <span className="font-bold text-white">{t(`list.${key}.exp`)}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-zinc-500">{t('origin')}</span>
                    <span className="font-bold text-white">{t(`list.${key}.origin`)}</span>
                  </div>
                  <div className="flex flex-col col-span-2 mt-2 pt-2 border-t border-zinc-800">
                    <span className="text-zinc-500">{t('focus')}</span>
                    <span className="font-bold text-[#D4AF37] text-lg uppercase">{t(`list.${key}.discipline`)}</span>
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
  );
}
