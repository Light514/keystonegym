'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { routing } from '@/i18n/routing';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    // Remove current locale prefix and add new one
    const pathWithoutLocale = pathname.replace(/^\/(en|fr)/, '') || '/';
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="flex items-center gap-1 font-mono text-xs">
      {routing.locales.map((loc, index) => (
        <span key={loc} className="flex items-center">
          {index > 0 && <span className="mx-1 text-zinc-600">|</span>}
          <button
            onClick={() => switchLocale(loc)}
            className={`uppercase transition-colors ${
              locale === loc
                ? 'text-[#D4AF37] font-bold'
                : 'text-zinc-500 hover:text-white'
            }`}
          >
            {loc}
          </button>
        </span>
      ))}
    </div>
  );
}
