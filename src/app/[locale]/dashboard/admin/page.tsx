import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Users } from 'lucide-react';

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Check if user is admin
  const { data: currentMember } = await supabase
    .from('members')
    .select('role')
    .eq('email', user?.email)
    .single();

  if (currentMember?.role !== 'admin') {
    redirect('/dashboard');
  }

  // Fetch all members
  const { data: members } = await supabase
    .from('members')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="pt-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-sans text-4xl font-black uppercase tracking-tighter">
          All Members
        </h1>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 rounded-lg">
          <Users className="w-5 h-5 text-[#D4AF37]" />
          <span className="font-mono text-[#D4AF37]">{members?.length || 0} members</span>
        </div>
      </div>

      <div className="bg-[#0a0a0a] border border-zinc-800 rounded-lg overflow-hidden">
        {/* Table Header - Desktop Only */}
        <div className="hidden lg:grid grid-cols-4 gap-4 p-4 border-b border-zinc-800 font-mono text-xs uppercase text-zinc-500">
          <span>Name</span>
          <span>Email</span>
          <span>Status</span>
          <span>Member Since</span>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-zinc-800">
          {members && members.length > 0 ? (
            members.map((member) => (
              <div
                key={member.id}
                className="p-4 hover:bg-zinc-900/50 transition-colors"
              >
                {/* Desktop View - Table Row */}
                <div className="hidden lg:grid grid-cols-4 gap-4 items-center">
                  <div>
                    <span className="font-sans font-bold text-white">
                      {member.full_name}
                    </span>
                    {member.role === 'admin' && (
                      <span className="ml-2 px-2 py-0.5 text-xs font-mono bg-[#D4AF37] text-black rounded">
                        Admin
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-sm text-zinc-400">
                    {member.email}
                  </span>
                  <div>
                    {member.subscription_status === 'active' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-sm font-mono">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-500/10 text-zinc-500 rounded-full text-sm font-mono">
                        <span className="w-2 h-2 bg-zinc-500 rounded-full"></span>
                        Inactive
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-sm text-zinc-500">
                    {new Date(member.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                {/* Mobile/Tablet View - Card */}
                <div className="lg:hidden space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-sans font-bold text-white">
                        {member.full_name}
                      </span>
                      {member.role === 'admin' && (
                        <span className="px-2 py-0.5 text-xs font-mono bg-[#D4AF37] text-black rounded">
                          Admin
                        </span>
                      )}
                    </div>
                    {member.subscription_status === 'active' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-sm font-mono">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-500/10 text-zinc-500 rounded-full text-sm font-mono">
                        <span className="w-2 h-2 bg-zinc-500 rounded-full"></span>
                        Inactive
                      </span>
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs uppercase text-zinc-600">Email:</span>
                      <span className="font-mono text-sm text-zinc-400 truncate">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs uppercase text-zinc-600">Member Since:</span>
                      <span className="font-mono text-sm text-zinc-500">
                        {new Date(member.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-zinc-500 font-mono">
              No members found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
