'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Grid } from '../layout/Grid';
import { KeystoneIcon } from '../icons/KeystoneIcon';
import { NavLink } from '../NavLink';

export function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');

  return (
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
            {t('description')}
          </p>
          <div className="flex items-center gap-2 font-mono text-xs text-zinc-600">
            <MapPin className="w-4 h-4" />
            <span>{t('location')}</span>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2">
          <h4 className="font-bold mb-6 font-sans uppercase text-[#D4AF37]">{t('menu')}</h4>
          <ul className="space-y-3 font-mono text-sm text-zinc-400">
            <li><NavLink href="#philosophy" className="hover:text-[#D4AF37]">{nav('philosophy')}</NavLink></li>
            <li><NavLink href="#coaches" className="hover:text-[#D4AF37]">{nav('coaches')}</NavLink></li>
            <li><NavLink href="#training" className="hover:text-[#D4AF37]">{nav('training')}</NavLink></li>
            <li><NavLink href="#join" className="hover:text-[#D4AF37]">{nav('join')}</NavLink></li>
            <li><NavLink href="#support" className="hover:text-[#D4AF37]">{nav('support')}</NavLink></li>
            <li><NavLink href="/auth/login" className="hover:text-[#D4AF37]">{nav('memberPortal')}</NavLink></li>
          </ul>
        </div>

        <div className="col-span-1 md:col-span-1">
          <h4 className="font-bold mb-6 font-sans uppercase text-[#D4AF37]">{t('legal')}</h4>
          <ul className="space-y-3 font-mono text-sm text-zinc-400">
            <li><NavLink href="/privacy" className="hover:text-[#D4AF37]">{t('privacy')}</NavLink></li>
            <li><NavLink href="/terms" className="hover:text-[#D4AF37]">{t('terms')}</NavLink></li>
          </ul>
        </div>

        <div className="col-span-1 md:col-span-3">
          <h4 className="font-bold mb-6 font-sans uppercase text-[#D4AF37]">{t('contact')}</h4>
          <ul className="space-y-3 font-mono text-sm text-zinc-400">
            <li>
              <a href="tel:+14386227226" className="flex items-center gap-2 group hover:text-[#D4AF37] transition-colors">
                <Phone className="w-4 h-4" /> (438) 622-7226
              </a>
            </li>
            <li>
              <a href="mailto:ahmed.faraj2204@gmail.com" className="flex items-center gap-2 group hover:text-[#D4AF37] transition-colors">
                <Mail className="w-4 h-4" /> ahmed.faraj2204@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2 group hover:text-[#D4AF37] transition-colors">
              <Clock className="w-4 h-4" /> Sat & Sun 8:30 AM
            </li>
          </ul>
        </div>

        <div className="col-span-1 md:col-span-2 flex flex-col justify-end items-start md:items-end text-left md:text-right">
          <div className="font-sans font-bold text-xl uppercase leading-none mb-2 text-white">
            {t('tagline1')}<br />
            {t('tagline2')}<br />
            {t('tagline3')}
          </div>
          <p className="text-sm text-[#D4AF37] mt-4 leading-relaxed" dir="rtl">
            الْمُؤْمِنُ لِلْمُؤْمِنِ كَالْبُنْيَانِ يَشُدُّ بَعْضُهُ بَعْضًا
          </p>
          <p className="font-mono text-[10px] text-zinc-700 mt-4">
            © {new Date().getFullYear()} Keystone Gym. All rights reserved.
          </p>
        </div>
      </Grid>
    </footer>
  );
}
