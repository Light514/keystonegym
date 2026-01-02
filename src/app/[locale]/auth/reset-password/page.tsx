'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Check, AlertCircle } from 'lucide-react';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { KeystoneIcon } from '@/components/icons/KeystoneIcon';

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const t = useTranslations('auth.resetPassword');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isValidSession, setIsValidSession] = useState<boolean | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  useEffect(() => {
    const checkSession = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      setIsValidSession(!!session);
    };
    checkSession();
  }, []);

  const onSubmit = async (data: ResetPasswordInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: updateError } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (updateError) {
        throw updateError;
      }

      setIsSuccess(true);
    } catch (err) {
      setError(t('error'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isValidSession === null) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
        <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
      </div>
    );
  }

  if (!isValidSession) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <AlertCircle className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="font-sans text-4xl font-black uppercase tracking-tighter text-white mb-4">
            {t('invalidLink')}
          </h1>
          <p className="text-zinc-400 mb-8">
            {t('invalidLinkMessage')}
          </p>
          <Link href="/auth/forgot-password">
            <Button className="w-full justify-center">{t('requestNewLink')}</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
        <div className="w-full max-w-md text-center">
          <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-8">
            <Check className="w-10 h-10 text-black" />
          </div>
          <h1 className="font-sans text-4xl font-black uppercase tracking-tighter text-white mb-4">
            {t('successTitle')}
          </h1>
          <p className="text-zinc-400 mb-8">
            {t('successMessage')}
          </p>
          <Button onClick={() => router.push('/auth/login')} className="w-full justify-center">
            {t('goToLogin')}
          </Button>
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
            {t('title')} <span className="text-[#D4AF37]">{t('titleHighlight')}</span>
          </h1>
          <p className="mt-2 text-zinc-500 font-mono text-sm">
            {t('subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="font-mono text-xs uppercase text-[#D4AF37]">{t('newPassword')}</label>
            <input
              {...register('password')}
              type="password"
              className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-[#D4AF37] py-4 text-xl font-sans outline-none text-white placeholder:text-zinc-700"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-xs font-mono">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="font-mono text-xs uppercase text-[#D4AF37]">{t('confirmPassword')}</label>
            <input
              {...register('confirmPassword')}
              type="password"
              className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-[#D4AF37] py-4 text-xl font-sans outline-none text-white placeholder:text-zinc-700"
              placeholder="••••••••"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs font-mono">{errors.confirmPassword.message}</p>
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
                {t('updating')}
              </>
            ) : (
              t('updatePassword')
            )}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/auth/login" className="text-zinc-500 font-mono text-sm hover:text-[#D4AF37] transition-colors">
            {t('backToLogin')}
          </Link>
        </div>
      </div>
    </div>
  );
}
