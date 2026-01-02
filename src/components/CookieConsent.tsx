'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = (accepted: boolean) => {
    localStorage.setItem('cookie-consent', accepted ? 'accepted' : 'rejected');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-black border-t border-[#D4AF37]/30">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-zinc-400 text-center sm:text-left">
          We use cookies to improve your experience.{' '}
          <Link href="/privacy" className="text-[#D4AF37] hover:underline">
            Learn more
          </Link>
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => handleConsent(false)}
            className="px-6 py-2 border border-zinc-600 text-zinc-400 font-bold text-sm uppercase tracking-wide hover:border-zinc-400 hover:text-white transition-colors whitespace-nowrap"
          >
            Reject
          </button>
          <button
            onClick={() => handleConsent(true)}
            className="px-6 py-2 bg-[#D4AF37] text-black font-bold text-sm uppercase tracking-wide hover:bg-[#b8963a] transition-colors whitespace-nowrap"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
