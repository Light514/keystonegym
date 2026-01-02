'use client';

import { motion } from 'framer-motion';
import { cn } from '../ui/cn';

interface RevealTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  yOffset?: string;
}

export function RevealText({ children, className, delay = 0, yOffset = "100%" }: RevealTextProps) {
  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        initial={{ y: yOffset }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}
