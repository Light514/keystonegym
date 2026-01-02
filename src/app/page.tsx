"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function Home() {
  const gsapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gsapRef.current) {
      gsap.fromTo(
        gsapRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-12 p-8">
      <h1 className="text-4xl font-bold">Next.js Template</h1>
      
      <div className="flex flex-col items-center gap-8">
        {/* GSAP Example */}
        <div
          ref={gsapRef}
          className="rounded-xl bg-emerald-500 px-6 py-4 text-white"
        >
          Animated with GSAP
        </div>

        {/* Framer Motion Example */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="rounded-xl bg-violet-500 px-6 py-4 text-white"
        >
          Animated with Framer Motion
        </motion.div>
      </div>

      <p className="max-w-md text-center text-zinc-500">
        Edit <code className="text-zinc-800 dark:text-zinc-200">src/app/page.tsx</code> to get started
      </p>
    </main>
  );
}
