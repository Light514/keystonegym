'use client';

import { useState } from 'react';
import { cn } from './ui/cn';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function NavLink({ href, children, className, onClick }: NavLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      className={cn("relative group flex items-center transition-colors active:scale-95 duration-100", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <span className={cn(
        "font-mono text-[#D4AF37] mr-2 inline-block transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        isHovered ? "opacity-100 translate-x-0 w-auto" : "opacity-0 -translate-x-2 w-0 overflow-hidden"
      )}>
        //
      </span>
      <span className={cn("transition-colors duration-300 group-hover:text-[#D4AF37]", isHovered ? "text-[#D4AF37]" : "text-inherit")}>
        {children}
      </span>
    </a>
  );
}
