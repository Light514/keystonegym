'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, CreditCard, Calendar, Clock, Receipt } from 'lucide-react';
import { cn } from '@/components/ui/cn';
import { KeystoneIcon } from '@/components/icons/KeystoneIcon';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: Home },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
  { href: '/dashboard/subscription', label: 'Subscription', icon: CreditCard },
  { href: '/dashboard/schedule', label: 'Schedule', icon: Calendar },
  { href: '/dashboard/bookings', label: 'My Bookings', icon: Clock },
  { href: '/dashboard/payments', label: 'Payments', icon: Receipt },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0a0a0a] border-r border-zinc-800 p-6">
      <Link href="/" className="flex items-center gap-2 text-[#D4AF37] mb-12">
        <KeystoneIcon className="w-8 h-8" />
        <span className="font-sans font-black text-xl tracking-tighter">KEYSTONE</span>
      </Link>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg font-mono text-sm transition-all",
                isActive
                  ? "bg-[#D4AF37] text-black"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
