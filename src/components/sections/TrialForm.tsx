'use client';

import { ArrowRight } from 'lucide-react';
import { RevealText } from '../animations/RevealText';
import { FadeIn } from '../animations/FadeIn';
import { Section } from '../layout/Section';
import { Grid } from '../layout/Grid';
import { Label } from '../layout/Label';
import { Button } from '../ui/Button';

export function TrialForm() {
  return (
    <Section id="join" className="bg-[#0a0a0a] text-white" noBorder>
      <Grid>
        <div className="col-span-1 md:col-span-5">
          <Label className="text-[#D4AF37]">04 • Step Into The Room</Label>
          <div className="font-sans text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.85] text-white">
            <RevealText>Prove</RevealText>
            <RevealText delay={0.1}><span className="text-[#D4AF37]">Yourself</span></RevealText>
          </div>
          <FadeIn delay={0.2}>
            <p className="text-xl font-medium max-w-sm text-zinc-400">
              See if this is your brotherhood. We&apos;ll train together, then both sides decide.
            </p>
          </FadeIn>
        </div>

        <div className="col-span-1 md:col-span-7">
          <FadeIn delay={0.4}>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 group">
                  <label className="font-mono text-xs uppercase opacity-80 text-[#D4AF37] group-focus-within:opacity-100 transition-opacity">Full Name *</label>
                  <input type="text" className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-[#D4AF37] py-4 text-2xl font-sans outline-none placeholder:text-zinc-800 transition-colors text-white" placeholder="JOHN DOE" />
                </div>
                <div className="space-y-2 group">
                  <label className="font-mono text-xs uppercase opacity-80 text-[#D4AF37] group-focus-within:opacity-100 transition-opacity">Phone *</label>
                  <input type="tel" className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-[#D4AF37] py-4 text-2xl font-sans outline-none placeholder:text-zinc-800 transition-colors text-white" placeholder="(555) 000-0000" />
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="font-mono text-xs uppercase opacity-80 text-[#D4AF37] group-focus-within:opacity-100 transition-opacity">Email *</label>
                <input type="email" className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-[#D4AF37] py-4 text-2xl font-sans outline-none placeholder:text-zinc-800 transition-colors text-white" placeholder="EMAIL@ADDRESS.COM" />
              </div>

              <div className="space-y-2 group">
                <label className="font-mono text-xs uppercase opacity-80 text-[#D4AF37] group-focus-within:opacity-100 transition-opacity">Why do you want to train with us?</label>
                <textarea rows={3} className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-[#D4AF37] py-4 text-xl font-sans outline-none placeholder:text-zinc-800 transition-colors resize-none text-white" placeholder="BE HONEST."></textarea>
              </div>

              <Button className="w-full justify-center mt-8 shadow-[0px_0px_20px_0px_rgba(212,175,55,0.3)] hover:shadow-[0px_0px_30px_0px_rgba(212,175,55,0.5)]">
                Submit Request <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
              </Button>
            </form>
          </FadeIn>
        </div>
      </Grid>
    </Section>
  );
}
