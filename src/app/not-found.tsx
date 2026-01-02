import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-[20vw] md:text-[15vw] font-black leading-none tracking-tighter">
          <span className="text-white">4</span>
          <span className="text-[#D4AF37]">0</span>
          <span className="text-white">4</span>
        </h1>
        <p className="text-xl md:text-2xl text-zinc-400 mt-4 mb-8">
          This page doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] text-black font-bold uppercase tracking-wide hover:bg-[#b8963a] transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
