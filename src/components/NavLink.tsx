'use client';

import { useState } from 'react';
import { cn } from './ui/cn';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  directTap?: boolean; // Skip tap-to-toggle, navigate directly on tap (for mobile menus)
}

export function NavLink({ href, children, className, onClick, directTap = false }: NavLinkProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <a
      href={href}
      className={cn("relative group flex items-center transition-colors active:scale-95 duration-100 touch-manipulation", className)}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onClick={(e) => {
        if (onClick) {
          onClick();
        }
        // Handle tap-to-toggle for mobile (unless directTap is enabled)
        if (!directTap && 'ontouchstart' in window) {
          e.preventDefault();
          if (isActive) {
            window.location.href = href;
          } else {
            setIsActive(true);
          }
        }
      }}
      onBlur={() => setIsActive(false)}
    >
      <span className={cn(
        "font-mono text-[#D4AF37] mr-2 inline-block transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shrink-0",
        isActive
          ? "opacity-100 translate-x-0 w-auto"
          : "opacity-0 -translate-x-2 w-0 overflow-hidden group-hover:opacity-100 group-hover:translate-x-0 group-hover:w-auto"
      )}>
        //
      </span>
      <span className={cn(
        "transition-colors duration-300 group-hover:text-[#D4AF37]",
        isActive ? "text-[#D4AF37]" : ""
      )}>
        {children}
      </span>
    </a>
  );
}
