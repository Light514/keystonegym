'use client';

import { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Loader2 } from 'lucide-react';
import { FadeIn } from '../animations/FadeIn';
import { ScaleIn } from '../animations/ScaleIn';
import { Section } from '../layout/Section';
import { Button } from '../ui/Button';
import { IslamicStarIcon } from '../icons/IslamicStarIcon';
import { cn } from '../ui/cn';

const DONATION_AMOUNTS = [25, 50, 100];

export function Support() {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const finalAmount = isCustom ? parseInt(customAmount) || 0 : selectedAmount;

  const handleStripeCheckout = async () => {
    if (finalAmount < 1) {
      setError('Please enter a valid amount');
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
      setError('Failed to process payment. Please try again.');
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
            &ldquo;We built this room for our sons—for every kid in this community who needs to learn what hard work and discipline really mean. The martial arts are just the tool. The lessons are what matter.&rdquo;
          </blockquote>
          <cite className="not-italic font-mono text-[#D4AF37]">— Waled Al-Shabi, Founder</cite>
        </FadeIn>
      </div>

      <ScaleIn delay={0.2} className="border border-[#D4AF37]/30 p-8 md:p-12 max-w-5xl mx-auto bg-black/50 backdrop-blur-sm">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div>
            <h3 className="font-sans text-3xl font-bold uppercase mb-2">Build the Next Generation</h3>
            <p className="font-mono text-sm text-zinc-500">Your support goes directly to:</p>
            <div className="flex gap-4 mt-2 font-mono text-xs text-[#D4AF37]">
              <span>// EQUIPMENT</span>
              <span>// SCHOLARSHIPS</span>
              <span>// EXPANSION</span>
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
              CUSTOM
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
                placeholder="Enter amount"
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
            Card
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
            PayPal
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
                  Processing...
                </>
              ) : (
                `Contribute $${finalAmount} CAD`
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
                createOrder={(_data, actions) => {
                  return actions.order.create({
                    intent: 'CAPTURE',
                    purchase_units: [
                      {
                        amount: {
                          currency_code: 'CAD',
                          value: finalAmount.toString(),
                        },
                        description: 'Keystone Gym Donation',
                      },
                    ],
                  });
                }}
                onApprove={async (_data, actions) => {
                  await actions.order?.capture();
                  alert('Thank you for your donation!');
                }}
                onError={(err) => {
                  console.error('PayPal error:', err);
                  setError('PayPal payment failed. Please try again.');
                }}
              />
            </PayPalScriptProvider>
          )}
          <p className="mt-4 text-xs font-mono text-zinc-600 text-center">
            Secure payment via {paymentMethod === 'stripe' ? 'Stripe' : 'PayPal'}.
          </p>
        </div>
      </ScaleIn>
    </Section>
  );
}
