'use client';

import { motion } from 'framer-motion';
import { cn } from '../ui/cn';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  noBorder?: boolean;
}

export function Section({ children, className, id, noBorder = false }: SectionProps) {
  return (
    <section id={id} className={cn("w-full px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 relative", className)}>
      {!noBorder && (
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 left-0 w-full h-px bg-[#D4AF37] origin-left z-10"
        />
      )}
      {children}
    </section>
  );
}
