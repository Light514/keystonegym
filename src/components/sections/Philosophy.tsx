'use client';

import { motion } from 'framer-motion';
import { RevealText } from '../animations/RevealText';
import { Section } from '../layout/Section';
import { Grid } from '../layout/Grid';
import { Label } from '../layout/Label';

const philosophyItems = [
  { title: "We Don't Recruit", desc: "You request a trial session. We train together. Both sides evaluate. If it fits, welcome. If not, respectful goodbye." },
  { title: "Protection First", desc: "We screen carefully to protect the people already here. The selectivity isn't elitism - it's protection." },
  { title: "Real Training", desc: "This is a fighting camp, not a fitness class. Our coaches come from Chechnya, Dagestan. Real lineage, real training." },
  { title: "Brotherhood", desc: "Every member is a keystone - the wedge-shaped stone that holds the arch together. Remove one, the structure weakens." }
];

export function Philosophy() {
  return (
    <Section id="philosophy">
      <Grid>
        <div className="col-span-1 md:col-span-4">
          <Label>01 • Philosophy</Label>
          <div className="text-6xl md:text-7xl mb-8 font-sans font-black uppercase tracking-tighter leading-[0.85] text-white">
            <RevealText delay={0.1}>If You</RevealText>
            <RevealText delay={0.2}>Know,</RevealText>
            <RevealText delay={0.3}>You Know</RevealText>
          </div>
        </div>

        <div className="col-span-1 md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          {philosophyItems.map((item, i) => (
            <motion.div
              key={i}
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
              <h3 className="font-sans text-2xl font-bold uppercase mb-2 text-[#D4AF37]">{item.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </Grid>
    </Section>
  );
}
