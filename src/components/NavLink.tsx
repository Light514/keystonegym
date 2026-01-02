import { cn } from './ui/cn';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function NavLink({ href, children, className, onClick }: NavLinkProps) {
  return (
    <a
      href={href}
      className={cn("relative group flex items-center transition-colors active:scale-95 duration-100 touch-manipulation", className)}
      onClick={onClick}
    >
      <span className="font-mono text-[#D4AF37] mr-2 inline-block transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 -translate-x-2 w-0 overflow-hidden group-hover:opacity-100 group-hover:translate-x-0 group-hover:w-auto group-active:opacity-100 group-active:translate-x-0 group-active:w-auto">
        //
      </span>
      <span className="transition-colors duration-300 group-hover:text-[#D4AF37] group-active:text-[#D4AF37]">
        {children}
      </span>
    </a>
  );
}
