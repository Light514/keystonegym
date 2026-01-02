import Link from 'next/link';
import { KeystoneIcon } from '@/components/icons/KeystoneIcon';

export const metadata = {
  title: 'Privacy Policy | Keystone Gym',
  description: 'Privacy policy for Keystone Gym members and website visitors.',
};

export default function PrivacyPage() {
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
          Privacy <span className="text-[#D4AF37]">Policy</span>
        </h1>

        <div className="prose prose-invert prose-zinc max-w-none space-y-8">
          <p className="text-zinc-400 text-lg">
            Last updated: January 2025
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#D4AF37]">Information We Collect</h2>
            <p className="text-zinc-300">
              When you request a trial session or become a member, we collect:
            </p>
            <ul className="list-disc list-inside text-zinc-300 space-y-2">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Any additional information you provide in your trial request</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#D4AF37]">How We Use Your Information</h2>
            <p className="text-zinc-300">
              We use your information to:
            </p>
            <ul className="list-disc list-inside text-zinc-300 space-y-2">
              <li>Process your trial request and membership</li>
              <li>Communicate with you about training schedules and gym updates</li>
              <li>Process payments for memberships and donations</li>
              <li>Improve our services</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#D4AF37]">Third-Party Services</h2>
            <p className="text-zinc-300">
              We use the following third-party services:
            </p>
            <ul className="list-disc list-inside text-zinc-300 space-y-2">
              <li><strong>Supabase</strong> - For secure data storage and authentication</li>
              <li><strong>Stripe</strong> - For processing payments</li>
              <li><strong>PayPal</strong> - For processing donations</li>
              <li><strong>Vercel</strong> - For website hosting and analytics</li>
            </ul>
            <p className="text-zinc-300">
              Each of these services has their own privacy policy governing the data they process.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#D4AF37]">Data Security</h2>
            <p className="text-zinc-300">
              We implement appropriate security measures to protect your personal information.
              All data is encrypted in transit and at rest. We do not sell or share your
              personal information with third parties except as necessary to provide our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#D4AF37]">Your Rights</h2>
            <p className="text-zinc-300">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-zinc-300 space-y-2">
              <li>Access your personal data</li>
              <li>Request correction of your data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[#D4AF37]">Contact Us</h2>
            <p className="text-zinc-300">
              For any privacy-related questions or requests, contact us at:{' '}
              <a href="mailto:ahmed.faraj2204@gmail.com" className="text-[#D4AF37] hover:underline">
                ahmed.faraj2204@gmail.com
              </a>
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-800">
          <Link href="/" className="text-[#D4AF37] hover:underline">
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
