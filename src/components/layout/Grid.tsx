import { cn } from '../ui/cn';

interface GridProps {
  children: React.ReactNode;
  className?: string;
}

export function Grid({ children, className }: GridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-8", className)}>
      {children}
    </div>
  );
}
