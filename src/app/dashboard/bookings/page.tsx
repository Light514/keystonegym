import { createClient } from '@/lib/supabase/server';
import { Calendar, Clock, X } from 'lucide-react';

export default async function BookingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: member } = await supabase
    .from('members')
    .select('id')
    .eq('email', user?.email)
    .single();

  const { data: bookings } = await supabase
    .from('bookings')
    .select('*, schedules(*)')
    .eq('member_id', member?.id)
    .order('booking_date', { ascending: true });

  const upcomingBookings = bookings?.filter(
    (b) => new Date(b.booking_date) >= new Date()
  );
  const pastBookings = bookings?.filter(
    (b) => new Date(b.booking_date) < new Date()
  );

  return (
    <div className="pt-16">
      <h1 className="font-sans text-4xl font-black uppercase tracking-tighter mb-8">
        My Bookings
      </h1>

      {/* Upcoming */}
      <div className="mb-12">
        <h2 className="font-sans text-xl font-bold uppercase text-[#D4AF37] mb-4">
          Upcoming Sessions
        </h2>

        {upcomingBookings && upcomingBookings.length > 0 ? (
          <div className="space-y-4">
            {upcomingBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-[#0a0a0a] border border-zinc-800 rounded-lg p-6 flex items-center justify-between"
              >
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-lg flex flex-col items-center justify-center">
                    <span className="font-mono text-xs text-[#D4AF37]">
                      {new Date(booking.booking_date).toLocaleDateString('en-US', {
                        month: 'short',
                      })}
                    </span>
                    <span className="font-sans text-2xl font-bold text-white">
                      {new Date(booking.booking_date).getDate()}
                    </span>
                  </div>
                  <div>
                    <p className="font-sans font-bold text-lg text-white">
                      {booking.schedules?.discipline}
                    </p>
                    <div className="flex items-center gap-4 mt-1 font-mono text-sm text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(booking.booking_date).toLocaleDateString('en-US', {
                          weekday: 'long',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {booking.schedules?.start_time}
                      </span>
                    </div>
                  </div>
                </div>

                <button className="flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-500/10 rounded transition-colors font-mono text-sm">
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-lg p-12 text-center">
            <p className="text-zinc-500 font-mono">No upcoming bookings</p>
          </div>
        )}
      </div>

      {/* Past */}
      <div>
        <h2 className="font-sans text-xl font-bold uppercase text-zinc-500 mb-4">
          Past Sessions
        </h2>

        {pastBookings && pastBookings.length > 0 ? (
          <div className="space-y-4">
            {pastBookings.slice(0, 5).map((booking) => (
              <div
                key={booking.id}
                className="bg-[#0a0a0a] border border-zinc-800/50 rounded-lg p-4 flex items-center gap-4 opacity-60"
              >
                <div className="w-12 h-12 bg-zinc-900 rounded-lg flex flex-col items-center justify-center">
                  <span className="font-mono text-xs text-zinc-500">
                    {new Date(booking.booking_date).toLocaleDateString('en-US', {
                      month: 'short',
                    })}
                  </span>
                  <span className="font-sans text-lg font-bold text-zinc-400">
                    {new Date(booking.booking_date).getDate()}
                  </span>
                </div>
                <div>
                  <p className="font-sans font-bold text-zinc-400">
                    {booking.schedules?.discipline}
                  </p>
                  <p className="font-mono text-sm text-zinc-600">
                    {booking.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-zinc-600 font-mono text-sm">No past sessions</p>
        )}
      </div>
    </div>
  );
}
