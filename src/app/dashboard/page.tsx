import { createClient } from '@/lib/supabase/server';
import { Calendar, CreditCard, Clock, ArrowRight } from 'lucide-react';
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

  // Fetch upcoming bookings
  const { data: bookings } = await supabase
    .from('bookings')
    .select('*, schedules(*)')
    .eq('member_id', member?.id)
    .gte('booking_date', new Date().toISOString().split('T')[0])
    .order('booking_date', { ascending: true })
    .limit(3);

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
              <p className="font-mono text-xs text-zinc-500 uppercase">Upcoming Sessions</p>
              <p className="font-sans font-bold text-xl text-white">
                {bookings?.length || 0}
              </p>
            </div>
          </div>
          <Link
            href="/dashboard/schedule"
            className="flex items-center gap-2 text-[#D4AF37] font-mono text-sm hover:underline"
          >
            Book Session <ArrowRight className="w-4 h-4" />
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

      {/* Upcoming Bookings */}
      <div className="bg-[#0a0a0a] border border-zinc-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-sans text-xl font-bold uppercase">Upcoming Sessions</h2>
          <Link
            href="/dashboard/bookings"
            className="text-[#D4AF37] font-mono text-sm hover:underline"
          >
            View All
          </Link>
        </div>

        {bookings && bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg"
              >
                <div>
                  <p className="font-sans font-bold text-white">
                    {booking.schedules?.discipline}
                  </p>
                  <p className="font-mono text-sm text-zinc-500">
                    {new Date(booking.booking_date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm text-[#D4AF37]">
                    {booking.schedules?.start_time} - {booking.schedules?.end_time}
                  </p>
                  <p className="font-mono text-xs text-zinc-600">
                    Coach: {booking.schedules?.coach_name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-zinc-500 mb-4">No upcoming sessions booked</p>
            <Link
              href="/dashboard/schedule"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-black font-bold rounded-lg hover:bg-[#D4AF37]/90 transition-colors"
            >
              Book a Session <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
