import { createClient } from '@/lib/supabase/server';
import { Calendar, Clock, User } from 'lucide-react';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default async function SchedulePage() {
  const supabase = await createClient();

  const { data: schedules } = await supabase
    .from('schedules')
    .select('*')
    .eq('is_active', true)
    .order('day_of_week', { ascending: true });

  // Group by day
  const schedulesByDay = DAYS.map((day, index) => ({
    day,
    sessions: schedules?.filter((s) => s.day_of_week === index) || [],
  }));

  return (
    <div className="pt-16">
      <h1 className="font-sans text-4xl font-black uppercase tracking-tighter mb-8">
        Training Schedule
      </h1>

      <div className="grid gap-4">
        {schedulesByDay.map(({ day, sessions }) => (
          <div key={day} className="bg-[#0a0a0a] border border-zinc-800 rounded-lg p-6">
            <h3 className="font-sans text-xl font-bold uppercase text-white mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#D4AF37]" />
              {day}
            </h3>

            {sessions.length > 0 ? (
              <div className="space-y-3">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between p-4 bg-zinc-900 rounded-lg group hover:border-[#D4AF37] border border-transparent transition-colors"
                  >
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="font-sans font-bold text-lg text-white">
                          {session.discipline}
                        </p>
                        <div className="flex items-center gap-4 mt-1 font-mono text-sm text-zinc-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {session.start_time} - {session.end_time}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {session.coach_name}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-mono text-sm text-zinc-500">
                        {session.max_capacity} spots
                      </p>
                      <button className="mt-2 px-4 py-2 bg-[#D4AF37] text-black font-bold text-sm rounded hover:bg-[#D4AF37]/90 transition-colors">
                        Book Session
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-zinc-600 font-mono text-sm">No sessions scheduled</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
