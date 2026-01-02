'use client';

import { FadeIn } from '../animations/FadeIn';
import { ScaleIn } from '../animations/ScaleIn';
import { Section } from '../layout/Section';
import { Button } from '../ui/Button';
import { IslamicStarIcon } from '../icons/IslamicStarIcon';
import { cn } from '../ui/cn';

const donationAmounts = ['$25', '$50', '$100', 'CUSTOM'];

export function Support() {
  return (
    <Section id="support" className="bg-[#111] text-white pb-24" noBorder>
      <div className="max-w-4xl mx-auto text-center mb-16">
        <FadeIn>
          <IslamicStarIcon className="w-12 h-12 mx-auto mb-8 text-[#D4AF37]" />
          <blockquote className="font-sans text-2xl md:text-4xl font-bold uppercase leading-tight mb-8">
            &ldquo;We built this room for our sons—for every kid in this community who needs to learn what hard work and discipline really mean. The martial arts are just the tool. The lessons are what matter.&rdquo;
          </blockquote>
          <cite className="not-italic font-mono text-[#D4AF37]">— Walid, Founder</cite>
        </FadeIn>
      </div>

      <ScaleIn delay={0.2} className="border border-[#D4AF37]/30 p-8 md:p-12 max-w-5xl mx-auto bg-black/50 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div>
            <h3 className="font-sans text-3xl font-bold uppercase mb-2">Build the Next Generation</h3>
            <p className="font-mono text-sm text-zinc-500">Your support goes directly to:</p>
            <div className="flex gap-4 mt-2 font-mono text-xs text-[#D4AF37]">
              <span>// EQUIPMENT</span>
              <span>// SCHOLARSHIPS</span>
              <span>// EXPANSION</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {donationAmounts.map((amount, i) => (
            <button key={i} className={cn(
              "py-4 border transition-all duration-300 font-mono font-bold uppercase tracking-wider relative overflow-hidden group active:scale-95",
              i === 1 ? "bg-[#D4AF37] text-black border-[#D4AF37]" : "border-[#D4AF37]/30 text-[#D4AF37] hover:border-[#D4AF37]"
            )}>
              <span className={cn(
                "absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                i === 1 ? "bg-white" : "bg-[#D4AF37]"
              )} />
              <span className={cn(
                "relative z-10 transition-colors duration-300",
                i === 1 ? "group-hover:text-black" : "group-hover:text-black"
              )}>{amount}</span>
            </button>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button className="w-full justify-center">Contribute $50 CAD</Button>
          <p className="mt-4 text-xs font-mono text-zinc-600">Secure payment via Stripe.</p>
        </div>
      </ScaleIn>
    </Section>
  );
}
