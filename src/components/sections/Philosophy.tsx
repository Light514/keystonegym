'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { RevealText } from '../animations/RevealText';
import { Section } from '../layout/Section';
import { Grid } from '../layout/Grid';
import { Label } from '../layout/Label';

const itemKeys = ['noRecruit', 'protection', 'realTraining', 'brotherhood'] as const;

export function Philosophy() {
  const t = useTranslations('philosophy');

  return (
    <Section id="philosophy">
      <Grid>
        <div className="col-span-1 sm:col-span-6 md:col-span-4">
          <Label>{t('label')}</Label>
          <div className="text-5xl sm:text-6xl md:text-7xl mb-8 font-sans font-black uppercase tracking-tighter leading-[0.85] text-white">
            <RevealText delay={0.1}>{t('title1')}</RevealText>
            <RevealText delay={0.2}>{t('title2')}</RevealText>
            <RevealText delay={0.3}>{t('title3')}</RevealText>
          </div>
        </div>

        <div className="col-span-1 sm:col-span-6 md:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
          {itemKeys.map((key, i) => (
            <motion.div
              key={key}
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
              <h3 className="font-sans text-2xl font-bold uppercase mb-2 text-[#D4AF37]">{t(`items.${key}.title`)}</h3>
              <p className="text-zinc-400 leading-relaxed">{t(`items.${key}.desc`)}</p>
            </motion.div>
          ))}
        </div>
      </Grid>
    </Section>
  );
}
