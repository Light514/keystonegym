import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { DashboardSidebar } from '@/components/dashboard/Sidebar';
import { DashboardHeader } from '@/components/dashboard/Header';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Fetch user's role
  const { data: member } = await supabase
    .from('members')
    .select('role')
    .eq('email', user.email)
    .single();

  const isAdmin = member?.role === 'admin';

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <DashboardHeader user={user} />
      <div className="flex">
        <DashboardSidebar isAdmin={isAdmin} />
        <main className="flex-1 p-8 ml-64">
          {children}
        </main>
      </div>
    </div>
  );
}
