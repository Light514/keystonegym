import { Calendar, Clock, User } from 'lucide-react';

const SCHEDULE = [
  { day: 'Saturday', time: '8:30 – 9:30', coach: 'Rustam' },
  { day: 'Sunday', time: '8:30 – 9:30', coach: 'Rustam' },
];

export default function SchedulePage() {
  return (
    <div className="pt-16">
      <h1 className="font-sans text-4xl font-black uppercase tracking-tighter mb-8">
        Training Schedule
      </h1>

      <div className="bg-[#0a0a0a] border border-zinc-800 rounded-lg overflow-hidden">
        <div className="grid grid-cols-3 gap-4 p-4 border-b border-zinc-800 font-mono text-xs uppercase text-zinc-500">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Day
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Time
          </span>
          <span className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Coach
          </span>
        </div>

        <div className="divide-y divide-zinc-800">
          {SCHEDULE.map((session) => (
            <div
              key={session.day}
              className="grid grid-cols-3 gap-4 p-6 items-center hover:bg-zinc-900/50 transition-colors"
            >
              <span className="font-sans font-bold text-lg text-white">
                {session.day}
              </span>
              <span className="font-mono text-[#D4AF37]">
                {session.time}
              </span>
              <span className="font-sans text-zinc-300">
                {session.coach}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-6 text-zinc-500 font-mono text-sm text-center">
        Just show up. No booking required.
      </p>
    </div>
  );
}
