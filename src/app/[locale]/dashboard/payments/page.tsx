import { createClient } from '@/lib/supabase/server';
import { Receipt, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export default async function PaymentsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: member } = await supabase
    .from('members')
    .select('id')
    .eq('email', user?.email)
    .single();

  const { data: payments } = await supabase
    .from('payment_history')
    .select('*')
    .eq('member_id', member?.id)
    .order('payment_date', { ascending: false })
    .limit(20);

  return (
    <div className="pt-16">
      <h1 className="font-sans text-4xl font-black uppercase tracking-tighter mb-8">
        Payment History
      </h1>

      <div className="bg-[#0a0a0a] border border-zinc-800 rounded-lg overflow-hidden">
        <div className="grid grid-cols-4 gap-4 p-4 border-b border-zinc-800 font-mono text-xs uppercase text-zinc-500">
          <span>Date</span>
          <span>Description</span>
          <span>Method</span>
          <span className="text-right">Amount</span>
        </div>

        {payments && payments.length > 0 ? (
          <div className="divide-y divide-zinc-800">
            {payments.map((payment) => (
              <div key={payment.id} className="grid grid-cols-4 gap-4 p-4 items-center">
                <span className="font-mono text-sm text-zinc-400">
                  {new Date(payment.payment_date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
                <span className="font-sans text-white">{payment.description}</span>
                <span className="font-mono text-sm text-zinc-500">
                  {payment.payment_method}
                </span>
                <span className="font-mono text-right text-[#D4AF37]">
                  ${(payment.amount / 100).toFixed(2)} CAD
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <Receipt className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
            <p className="text-zinc-500 font-mono">No payment history yet</p>
          </div>
        )}
      </div>
    </div>
  );
}
