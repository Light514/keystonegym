import { createClient } from '@/lib/supabase/server';
import { CreditCard, Check, AlertCircle } from 'lucide-react';

export default async function SubscriptionPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: member } = await supabase
    .from('members')
    .select('*')
    .eq('email', user?.email)
    .single();

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('member_id', member?.id)
    .single();

  const isActive = member?.subscription_status === 'active';

  return (
    <div className="pt-16 max-w-4xl">
      <h1 className="font-sans text-4xl font-black uppercase tracking-tighter mb-8">
        Subscription
      </h1>

      {/* Current Plan */}
      <div className="bg-[#0a0a0a] border border-zinc-800 rounded-lg p-8 mb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="font-mono text-xs text-zinc-500 uppercase mb-2">Current Plan</p>
            <h2 className="font-sans text-3xl font-bold text-white">Keystone Membership</h2>
          </div>
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
            isActive ? 'bg-green-500/10 text-green-500' : 'bg-zinc-800 text-zinc-400'
          }`}>
            {isActive ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            <span className="font-mono text-sm uppercase">
              {member?.subscription_status || 'Inactive'}
            </span>
          </div>
        </div>

        <div className="flex items-baseline gap-2 mb-6">
          <span className="text-5xl font-sans font-bold text-[#D4AF37]">$100</span>
          <span className="font-mono text-zinc-500">CAD / month</span>
        </div>

        <ul className="space-y-3 mb-8">
          {[
            'Unlimited training sessions',
            'Access to all disciplines',
            'Train with real coaches',
            'Part of the brotherhood',
          ].map((feature, i) => (
            <li key={i} className="flex items-center gap-3 text-zinc-300">
              <Check className="w-5 h-5 text-[#D4AF37]" />
              {feature}
            </li>
          ))}
        </ul>

        {subscription && (
          <div className="border-t border-zinc-800 pt-6">
            <div className="grid grid-cols-2 gap-4 font-mono text-sm">
              <div>
                <p className="text-zinc-500">Current Period</p>
                <p className="text-white">
                  {new Date(subscription.current_period_start).toLocaleDateString()} -{' '}
                  {new Date(subscription.current_period_end).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-zinc-500">Next Billing Date</p>
                <p className="text-white">
                  {new Date(subscription.current_period_end).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Payment Method */}
      <div className="bg-[#0a0a0a] border border-zinc-800 rounded-lg p-8">
        <h3 className="font-sans text-xl font-bold uppercase mb-6">Payment Method</h3>

        <div className="flex items-center gap-4 p-4 bg-zinc-900 rounded-lg">
          <CreditCard className="w-8 h-8 text-[#D4AF37]" />
          <div>
            <p className="font-sans font-bold text-white">•••• •••• •••• 4242</p>
            <p className="font-mono text-sm text-zinc-500">Expires 12/25</p>
          </div>
        </div>

        <button className="mt-4 font-mono text-sm text-[#D4AF37] hover:underline">
          Update payment method
        </button>
      </div>
    </div>
  );
}
