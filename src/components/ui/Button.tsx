'use client';

import { cn } from './cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
}

export function Button({ children, variant = 'primary', className, ...props }: ButtonProps) {
  const baseStyles = "px-8 py-4 font-sans font-bold uppercase tracking-tight text-lg flex items-center gap-2 relative overflow-hidden group transition-all duration-200 active:scale-[0.98]";

  const variants = {
    primary: "bg-[#D4AF37] text-black",
    outline: "border-2 border-[#D4AF37] text-[#D4AF37] hover:border-[#D4AF37]",
    ghost: "text-white hover:text-[#D4AF37] p-0 active:scale-100 overflow-visible"
  };

  if (variant === 'ghost') {
    return (
      <button className={cn(baseStyles, variants[variant], className)} {...props}>
        {children}
      </button>
    );
  }

  return (
    <button className={cn(baseStyles, variants[variant], className)} {...props}>
      {/* "Chamber Load" Background Effect */}
      <span className={cn(
        "absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        variant === 'outline' && "bg-[#D4AF37]"
      )} />

      {/* Content */}
      <span className={cn(
        "relative z-10 flex items-center gap-2 transition-colors duration-300",
        variant === 'primary' && "group-hover:text-black",
        variant === 'outline' && "group-hover:text-black"
      )}>
        {children}
      </span>
    </button>
  );
}
