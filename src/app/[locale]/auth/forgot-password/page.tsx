'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Check } from 'lucide-react';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { KeystoneIcon } from '@/components/icons/KeystoneIcon';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        data.email,
        {
          redirectTo: `${window.location.origin}/auth/reset-password`,
        }
      );

      if (resetError) {
        throw resetError;
      }

      setIsSuccess(true);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="w-10 h-10 text-black" />
          </div>
          <h1 className="font-sans text-4xl font-black uppercase tracking-tighter text-white mb-4">
            Check Your <span className="text-[#D4AF37]">Email</span>
          </h1>
          <p className="text-zinc-400 mb-8">
            We&apos;ve sent a password reset link to your email address.
          </p>
          <Link href="/auth/login">
            <Button className="w-full justify-center">Back to Login</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-[#D4AF37] mb-8">
            <KeystoneIcon className="w-10 h-10" />
            <span className="font-sans font-black text-3xl tracking-tighter">KEYSTONE</span>
          </Link>
          <h1 className="font-sans text-4xl font-black uppercase tracking-tighter text-white">
            Reset <span className="text-[#D4AF37]">Password</span>
          </h1>
          <p className="mt-2 text-zinc-500 font-mono text-sm">
            Enter your email to receive a reset link
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="font-mono text-xs uppercase text-[#D4AF37]">Email</label>
            <input
              {...register('email')}
              type="email"
              className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-[#D4AF37] py-4 text-xl font-sans outline-none text-white placeholder:text-zinc-700"
              placeholder="your@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs font-mono">{errors.email.message}</p>
            )}
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded">
              <p className="text-red-500 text-sm font-mono">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full justify-center disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Sending...
              </>
            ) : (
              'Send Reset Link'
            )}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/auth/login" className="text-zinc-500 font-mono text-sm hover:text-[#D4AF37] transition-colors">
            ← Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
