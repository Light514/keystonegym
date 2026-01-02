'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { KeystoneIcon } from '@/components/icons/KeystoneIcon';

export default function TermsPage() {
  const t = useTranslations('legal.terms');

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <header className="px-4 md:px-8 py-6 border-b border-zinc-800">
        <Link href="/" className="font-sans font-black text-2xl tracking-tighter text-[#D4AF37] flex items-center gap-2">
          <KeystoneIcon className="w-8 h-8" />
          KEYSTONE
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-4 md:px-8 py-16">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8">
          {t('title')} <span className="text-[#D4AF37]">{t('titleHighlight')}</span>
        </h1>

        <div className="prose prose-invert prose-zinc max-w-none space-y-8">
          <p className="text-zinc-400 text-lg">
            {t('lastUpdated')}
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#D4AF37]">Membership Terms</h2>
            <p className="text-zinc-300">
              Keystone Gym operates on a selective membership basis. Membership is granted
              at our sole discretion following a trial session. Membership costs $100 CAD
              per month with no hidden fees and no long-term contracts.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#D4AF37]">Trial Sessions</h2>
            <p className="text-zinc-300">
              Trial sessions are by request only. Both the gym and the prospective member
              evaluate fit during the trial. Acceptance is not guaranteed.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#D4AF37]">Assumption of Risk</h2>
            <p className="text-zinc-300">
              Martial arts training involves inherent risks including but not limited to:
            </p>
            <ul className="list-disc list-inside text-zinc-300 space-y-2">
              <li>Physical injury including sprains, strains, and fractures</li>
              <li>Contact with other participants</li>
              <li>Equipment-related injuries</li>
            </ul>
            <p className="text-zinc-300">
              By participating in training at Keystone Gym, you acknowledge and accept these
              risks. You confirm that you are physically fit to participate and have consulted
              with a physician if necessary.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#D4AF37]">Code of Conduct</h2>
            <p className="text-zinc-300">
              All members must adhere to our code of conduct:
            </p>
            <ul className="list-disc list-inside text-zinc-300 space-y-2">
              <li>Respect coaches, fellow members, and the training space</li>
              <li>No ego-driven or reckless behavior</li>
              <li>No street mentality or disrespect</li>
              <li>Maintain proper hygiene and clean training gear</li>
              <li>Follow all safety instructions from coaches</li>
            </ul>
            <p className="text-zinc-300">
              Violations may result in immediate termination of membership without refund.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#D4AF37]">Cancellation Policy</h2>
            <p className="text-zinc-300">
              You may cancel your membership at any time. Cancellations take effect at the
              end of your current billing period. No refunds are provided for partial months.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#D4AF37]">Donations</h2>
            <p className="text-zinc-300">
              All donations are voluntary and non-refundable. Donations support the gym&apos;s
              operations and community initiatives.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#D4AF37]">Changes to Terms</h2>
            <p className="text-zinc-300">
              We reserve the right to modify these terms at any time. Continued use of our
              services constitutes acceptance of updated terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#D4AF37]">Contact</h2>
            <p className="text-zinc-300">
              Questions about these terms? Contact us at:{' '}
              <a href="mailto:ahmed.faraj2204@gmail.com" className="text-[#D4AF37] hover:underline">
                ahmed.faraj2204@gmail.com
              </a>
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-800">
          <Link href="/" className="text-[#D4AF37] hover:underline">
            {t('backHome')}
          </Link>
        </div>
      </main>
    </div>
  );
}
