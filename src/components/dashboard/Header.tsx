'use client';

import { useRouter } from 'next/navigation';
import { LogOut, User as UserIcon } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

interface DashboardHeaderProps {
  user: User;
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Member';

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-[#0a0a0a] border-b border-zinc-800 px-8 flex items-center justify-between z-40">
      <div>
        <h2 className="font-mono text-sm text-zinc-500">Welcome back,</h2>
        <p className="font-sans font-bold text-white">{displayName}</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded-lg">
          <UserIcon className="w-4 h-4 text-[#D4AF37]" />
          <span className="font-mono text-sm text-zinc-300">{user.email}</span>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 px-4 py-2 text-zinc-400 hover:text-white transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="font-mono text-sm">Sign out</span>
        </button>
      </div>
    </header>
  );
}
