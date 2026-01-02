'use client';

import { cn } from '../ui/cn';
import { RevealText } from '../animations/RevealText';

interface LabelProps {
  children: React.ReactNode;
  className?: string;
}

export function Label({ children, className }: LabelProps) {
  return (
    <RevealText className={cn("mb-4 block", className)}>
      <span className={cn("font-mono text-xs md:text-sm uppercase tracking-wider text-[#D4AF37]")}>
        {children}
      </span>
    </RevealText>
  );
}
