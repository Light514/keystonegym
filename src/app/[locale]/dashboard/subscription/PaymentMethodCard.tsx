'use client';

import { useEffect, useState } from 'react';
import { CreditCard, Loader2 } from 'lucide-react';

interface PaymentMethod {
  brand: string;
  last4: string;
  expMonth: number;
  expYear: number;
}

interface PaymentMethodCardProps {
  hasSubscription: boolean;
}

export function PaymentMethodCard({ hasSubscription }: PaymentMethodCardProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!hasSubscription) {
      setIsLoading(false);
      return;
    }

    async function fetchPaymentMethod() {
      try {
        const response = await fetch('/api/stripe/payment-method');
        const data = await response.json();
        setPaymentMethod(data.paymentMethod);
      } catch (error) {
        console.error('Failed to fetch payment method:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPaymentMethod();
  }, [hasSubscription]);

  const formatBrand = (brand: string) => {
    return brand.charAt(0).toUpperCase() + brand.slice(1);
  };

  return (
    <div className="bg-[#0a0a0a] border border-zinc-800 rounded-lg p-8">
      <h3 className="font-sans text-xl font-bold uppercase mb-6">Payment Method</h3>

      {isLoading ? (
        <div className="flex items-center gap-4 p-4 bg-zinc-900 rounded-lg">
          <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
          <p className="font-mono text-sm text-zinc-500">Loading payment method...</p>
        </div>
      ) : paymentMethod ? (
        <div className="flex items-center gap-4 p-4 bg-zinc-900 rounded-lg">
          <CreditCard className="w-8 h-8 text-[#D4AF37]" />
          <div>
            <p className="font-sans font-bold text-white">
              {formatBrand(paymentMethod.brand)} •••• {paymentMethod.last4}
            </p>
            <p className="font-mono text-sm text-zinc-500">
              Expires {paymentMethod.expMonth.toString().padStart(2, '0')}/{paymentMethod.expYear.toString().slice(-2)}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4 p-4 bg-zinc-900 rounded-lg">
          <CreditCard className="w-8 h-8 text-zinc-600" />
          <p className="font-mono text-sm text-zinc-500">No payment method on file</p>
        </div>
      )}
    </div>
  );
}
