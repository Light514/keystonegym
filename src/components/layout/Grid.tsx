import { cn } from '../ui/cn';

interface GridProps {
  children: React.ReactNode;
  className?: string;
}

export function Grid({ children, className }: GridProps) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-6 md:grid-cols-12 gap-y-12 sm:gap-x-6 md:gap-x-8", className)}>
      {children}
    </div>
  );
}
