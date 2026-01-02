'use client';

import { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FadeIn } from '../animations/FadeIn';
import { ScaleIn } from '../animations/ScaleIn';
import { Section } from '../layout/Section';
import { Button } from '../ui/Button';
import { IslamicStarIcon } from '../icons/IslamicStarIcon';
import { cn } from '../ui/cn';

const DONATION_AMOUNTS = [25, 50, 100];

export function Support() {
  const t = useTranslations('support');
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const finalAmount = isCustom ? parseInt(customAmount) || 0 : selectedAmount;

  const handleStripeCheckout = async () => {
    if (finalAmount < 1) {
      setError(t('errors.invalidAmount'));
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/donations/stripe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: finalAmount }),
      });

      const { url, error: apiError } = await response.json();

      if (apiError) {
        throw new Error(apiError);
      }

      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      setError(t('errors.paymentFailed'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Section id="support" className="bg-[#111] text-white pb-24" noBorder>
      <div className="max-w-4xl mx-auto text-center mb-16">
        <FadeIn>
          <IslamicStarIcon className="w-12 h-12 mx-auto mb-8 text-[#D4AF37]" />
          <blockquote className="font-sans text-2xl md:text-4xl font-bold uppercase leading-tight mb-8">
            &ldquo;{t('quote')}&rdquo;
          </blockquote>
          <cite className="not-italic font-mono text-[#D4AF37]">— {t('author')}</cite>
        </FadeIn>
      </div>

      <ScaleIn delay={0.2} className="border border-[#D4AF37]/30 p-8 md:p-12 max-w-5xl mx-auto bg-black/50 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div>
            <h3 className="font-sans text-3xl font-bold uppercase mb-2">{t('title')}</h3>
            <p className="font-mono text-sm text-zinc-500">{t('subtitle')}</p>
            <div className="flex gap-4 mt-2 font-mono text-xs text-[#D4AF37]">
              <span>{t('equipment')}</span>
              <span>{t('scholarships')}</span>
              <span>{t('expansion')}</span>
            </div>
          </div>
        </div>

        {/* Amount Selection */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {DONATION_AMOUNTS.map((amount) => (
            <button
              key={amount}
              onClick={() => {
                setSelectedAmount(amount);
                setIsCustom(false);
              }}
              className={cn(
                "py-4 border transition-all duration-300 font-mono font-bold uppercase tracking-wider relative overflow-hidden group active:scale-95",
                !isCustom && selectedAmount === amount
                  ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                  : "border-[#D4AF37]/30 text-[#D4AF37] hover:border-[#D4AF37]"
              )}
            >
              <span
                className={cn(
                  "absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  !isCustom && selectedAmount === amount ? "bg-white" : "bg-[#D4AF37]"
                )}
              />
              <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                ${amount}
              </span>
            </button>
          ))}
          <button
            onClick={() => setIsCustom(true)}
            className={cn(
              "py-4 border transition-all duration-300 font-mono font-bold uppercase tracking-wider relative overflow-hidden group active:scale-95",
              isCustom
                ? "bg-[#D4AF37] text-black border-[#D4AF37]"
                : "border-[#D4AF37]/30 text-[#D4AF37] hover:border-[#D4AF37]"
            )}
          >
            <span
              className={cn(
                "absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                isCustom ? "bg-white" : "bg-[#D4AF37]"
              )}
            />
            <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
              {t('custom')}
            </span>
          </button>
        </div>

        {/* Custom Amount Input */}
        {isCustom && (
          <div className="mb-8">
            <div className="flex items-center gap-2 max-w-xs mx-auto">
              <span className="text-2xl font-bold text-[#D4AF37]">$</span>
              <input
                type="number"
                min="1"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                placeholder={t('enterAmount')}
                className="w-full bg-transparent border-b-2 border-[#D4AF37] py-2 text-2xl font-mono text-center outline-none text-white placeholder:text-zinc-600"
              />
              <span className="text-sm font-mono text-zinc-500">CAD</span>
            </div>
          </div>
        )}

        {/* Payment Method Selection */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setPaymentMethod('stripe')}
            className={cn(
              "px-6 py-2 font-mono text-sm uppercase transition-colors",
              paymentMethod === 'stripe'
                ? "text-[#D4AF37] border-b-2 border-[#D4AF37]"
                : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            {t('card')}
          </button>
          <button
            onClick={() => setPaymentMethod('paypal')}
            className={cn(
              "px-6 py-2 font-mono text-sm uppercase transition-colors",
              paymentMethod === 'paypal'
                ? "text-[#D4AF37] border-b-2 border-[#D4AF37]"
                : "text-zinc-500 hover:text-zinc-300"
            )}
          >
            {t('paypal')}
          </button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded text-center">
            <p className="text-red-500 text-sm font-mono">{error}</p>
          </div>
        )}

        {/* Payment Buttons */}
        <div className="mt-8">
          {paymentMethod === 'stripe' ? (
            <Button
              onClick={handleStripeCheckout}
              disabled={isLoading || finalAmount < 1}
              className="w-full justify-center disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t('processing')}
                </>
              ) : (
                t('contribute', { amount: finalAmount })
              )}
            </Button>
          ) : (
            <PayPalScriptProvider
              options={{
                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
                currency: 'CAD',
              }}
            >
              <PayPalButtons
                style={{
                  layout: 'horizontal',
                  color: 'gold',
                  shape: 'rect',
                  label: 'donate',
                }}
                disabled={finalAmount < 1}
                createOrder={async () => {
                  try {
                    const response = await fetch('/api/donations/paypal', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ amount: finalAmount }),
                    });
                    const data = await response.json();
                    if (data.error) {
                      throw new Error(data.error);
                    }
                    return data.orderId;
                  } catch (err) {
                    console.error('Failed to create PayPal order:', err);
                    setError(t('errors.paypalFailed'));
                    throw err;
                  }
                }}
                onApprove={async (data) => {
                  try {
                    const response = await fetch('/api/donations/paypal/capture', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ orderId: data.orderID }),
                    });
                    const result = await response.json();
                    if (result.error) {
                      throw new Error(result.error);
                    }
                    alert(t('thankYou'));
                  } catch (err) {
                    console.error('Failed to capture PayPal order:', err);
                    setError(t('errors.paypalFailed'));
                  }
                }}
                onError={(err) => {
                  console.error('PayPal error:', err);
                  setError(t('errors.paypalFailed'));
                }}
              />
            </PayPalScriptProvider>
          )}
          <p className="mt-4 text-xs font-mono text-zinc-600 text-center">
            {t('securePayment')} {paymentMethod === 'stripe' ? 'Stripe' : 'PayPal'}.
          </p>
        </div>
      </ScaleIn>
    </Section>
  );
}
