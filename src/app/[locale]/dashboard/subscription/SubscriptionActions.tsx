'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

interface SubscriptionActionsProps {
  isActive: boolean;
  hasSubscription: boolean;
}

export function SubscriptionActions({ isActive, hasSubscription }: SubscriptionActionsProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/subscription/checkout', {
        method: 'POST',
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Failed to create checkout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleManage = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/subscription/portal', {
        method: 'POST',
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Failed to open portal:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isActive) {
    return (
      <button
        onClick={handleManage}
        disabled={isLoading}
        className="mt-6 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-mono text-sm uppercase tracking-wider transition-colors disabled:opacity-50 flex items-center gap-2"
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        Manage Subscription
      </button>
    );
  }

  return (
    <button
      onClick={handleSubscribe}
      disabled={isLoading}
      className="mt-6 px-8 py-4 bg-[#D4AF37] hover:bg-[#B8962E] text-black font-sans font-bold text-lg uppercase tracking-wider transition-colors disabled:opacity-50 flex items-center gap-2"
    >
      {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
      Subscribe Now
    </button>
  );
}
