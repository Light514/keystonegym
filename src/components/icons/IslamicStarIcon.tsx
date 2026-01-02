interface IslamicStarIconProps {
  className?: string;
}

export function IslamicStarIcon({ className }: IslamicStarIconProps) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Rub el Hizb (Two overlapping squares) */}
      <rect x="5" y="5" width="14" height="14" transform="rotate(45 12 12)" />
      <rect x="5" y="5" width="14" height="14" />
    </svg>
  );
}
