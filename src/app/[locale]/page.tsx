'use client';

import { Hero } from '@/components/sections/Hero';
import { Philosophy } from '@/components/sections/Philosophy';
import { Values } from '@/components/sections/Values';
import { Coaches } from '@/components/sections/Coaches';
import { Training } from '@/components/sections/Training';
import { TrialForm } from '@/components/sections/TrialForm';
import { Support } from '@/components/sections/Support';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden">
      <Hero />
      <Philosophy />
      <Values />
      <Coaches />
      <Training />
      <TrialForm />
      <Support />
      <Footer />
    </div>
  );
}
