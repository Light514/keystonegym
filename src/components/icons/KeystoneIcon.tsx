interface KeystoneIconProps {
  className?: string;
}

export function KeystoneIcon({ className }: KeystoneIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Keystone shape: wider top, narrower bottom */}
      <path d="M3 3L6 21H18L21 3H3Z" />
    </svg>
  );
}
