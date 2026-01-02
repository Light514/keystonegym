'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto mb-8 border-2 border-[#D4AF37] rounded-full flex items-center justify-center">
          <span className="text-4xl text-[#D4AF37]">!</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
          Something went <span className="text-[#D4AF37]">wrong</span>
        </h1>
        <p className="text-xl text-zinc-400 mb-8">
          An unexpected error occurred.
        </p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-wide hover:bg-[#b8963a] transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
