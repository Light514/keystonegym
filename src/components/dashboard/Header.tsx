'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { LogOut, User as UserIcon, Menu, X, Home, CreditCard, Calendar, Receipt, Users } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { KeystoneIcon } from '@/components/icons/KeystoneIcon';
import { cn } from '@/components/ui/cn';
import type { User } from '@supabase/supabase-js';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: Home },
  { href: '/dashboard/profile', label: 'Profile', icon: UserIcon },
  { href: '/dashboard/subscription', label: 'Subscription', icon: CreditCard },
  { href: '/dashboard/schedule', label: 'Schedule', icon: Calendar },
  { href: '/dashboard/payments', label: 'Payments', icon: Receipt },
];

const adminItems = [
  { href: '/dashboard/admin', label: 'All Members', icon: Users },
];

interface DashboardHeaderProps {
  user: User;
  isAdmin?: boolean;
}

export function DashboardHeader({ user, isAdmin = false }: DashboardHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Member';

  return (
    <>
      <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-[#0a0a0a] border-b border-zinc-800 px-4 sm:px-6 lg:px-8 flex items-center justify-between z-40">
        {/* Mobile Menu Button & Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 text-[#D4AF37] hover:text-white transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link href="/" className="lg:hidden flex items-center gap-2 text-[#D4AF37]">
            <KeystoneIcon className="w-6 h-6" />
            <span className="font-sans font-black text-lg tracking-tighter">KEYSTONE</span>
          </Link>
          <div className="hidden lg:block">
            <h2 className="font-mono text-sm text-zinc-500">Welcome back,</h2>
            <p className="font-sans font-bold text-white">{displayName}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 sm:px-4 py-2 bg-zinc-800 rounded-lg">
            <UserIcon className="w-4 h-4 text-[#D4AF37]" />
            <span className="font-mono text-xs sm:text-sm text-zinc-300 truncate max-w-[120px] sm:max-w-none">{user.email}</span>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 text-zinc-400 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="font-mono text-sm hidden sm:inline">Sign out</span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Slide-out Menu */}
          <div className="absolute left-0 top-0 h-full w-64 bg-[#0a0a0a] border-r border-zinc-800 p-6">
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="flex items-center gap-2 text-[#D4AF37]">
                <KeystoneIcon className="w-8 h-8" />
                <span className="font-sans font-black text-xl tracking-tighter">KEYSTONE</span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
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

              {isAdmin && (
                <>
                  <div className="pt-4 pb-2">
                    <span className="px-4 font-mono text-xs uppercase text-zinc-600">Admin</span>
                  </div>
                  {adminItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
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
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
