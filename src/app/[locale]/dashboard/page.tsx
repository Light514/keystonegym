import { createClient } from '@/lib/supabase/server';
import { CreditCard, Calendar, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch member data
  const { data: member } = await supabase
    .from('members')
    .select('*')
    .eq('email', user?.email)
    .single();

  return (
    <div className="pt-16">
      <h1 className="font-sans text-4xl font-black uppercase tracking-tighter mb-8">
        Dashboard
      </h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#0a0a0a] border border-zinc-800 p-6 rounded-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <p className="font-mono text-xs text-zinc-500 uppercase">Subscription</p>
              <p className="font-sans font-bold text-xl text-white capitalize">
                {member?.subscription_status || 'Inactive'}
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/subscription"
            className="flex items-center gap-2 text-[#D4AF37] font-mono text-sm hover:underline"
          >
            Manage <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-[#0a0a0a] border border-zinc-800 p-6 rounded-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <p className="font-mono text-xs text-zinc-500 uppercase">Training Days</p>
              <p className="font-sans font-bold text-xl text-white">
                Sat & Sun
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/schedule"
            className="flex items-center gap-2 text-[#D4AF37] font-mono text-sm hover:underline"
          >
            View Schedule <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="bg-[#0a0a0a] border border-zinc-800 p-6 rounded-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <p className="font-mono text-xs text-zinc-500 uppercase">Member Since</p>
              <p className="font-sans font-bold text-xl text-white">
                {member?.created_at
                  ? new Date(member.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      year: 'numeric',
                    })
                  : 'New Member'}
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-2 text-[#D4AF37] font-mono text-sm hover:underline"
          >
            View Profile <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Schedule Info */}
      <div className="bg-[#0a0a0a] border border-zinc-800 rounded-lg p-6">
        <h2 className="font-sans text-xl font-bold uppercase mb-6">Training Schedule</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
            <div>
              <p className="font-sans font-bold text-white">Saturday</p>
              <p className="font-mono text-sm text-zinc-500">Weekend Training</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[#D4AF37]">8:30 – 9:30</p>
              <p className="font-mono text-xs text-zinc-600">Coach Rustam</p>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg">
            <div>
              <p className="font-sans font-bold text-white">Sunday</p>
              <p className="font-mono text-sm text-zinc-500">Weekend Training</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[#D4AF37]">8:30 – 9:30</p>
              <p className="font-mono text-xs text-zinc-600">Coach Rustam</p>
            </div>
          </div>
        </div>

        <p className="mt-6 text-zinc-500 font-mono text-sm text-center">
          Just show up. No booking required.
        </p>
      </div>
    </div>
  );
}
