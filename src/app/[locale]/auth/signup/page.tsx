'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase/client';
import { signupSchema, type SignupInput } from '@/lib/validations';
import { Button } from '@/components/ui/Button';
import { KeystoneIcon } from '@/components/icons/KeystoneIcon';

export default function SignupPage() {
  const t = useTranslations('auth.signup');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            phone: data.phone,
          },
        },
      });

      if (authError) {
        throw authError;
      }

      setIsSuccess(true);
    } catch (err) {
      setError(t('error'));
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
            {t('checkEmail')}
          </h1>
          <p className="text-zinc-400 mb-8">
            {t('emailSent')}
          </p>
          <Link href="/auth/login">
            <Button className="w-full justify-center">{t('backLogin')}</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-[#D4AF37] mb-8">
            <KeystoneIcon className="w-10 h-10" />
            <span className="font-sans font-black text-3xl tracking-tighter">KEYSTONE</span>
          </Link>
          <h1 className="font-sans text-4xl font-black uppercase tracking-tighter text-white">
            {t('title')}
          </h1>
          <p className="mt-2 text-zinc-500 font-mono text-sm">
            {t('subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="font-mono text-xs uppercase text-[#D4AF37]">{t('fullName')}</label>
            <input
              {...register('fullName')}
              type="text"
              className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-[#D4AF37] py-4 text-xl font-sans outline-none text-white placeholder:text-zinc-700 uppercase"
              placeholder="ISLAM MAKHACHEV"
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs font-mono">{errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="font-mono text-xs uppercase text-[#D4AF37]">{t('email')}</label>
            <input
              {...register('email')}
              type="email"
              className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-[#D4AF37] py-4 text-xl font-sans outline-none text-white placeholder:text-zinc-700 uppercase"
              placeholder="SENDLOCATION@UFC.COM"
            />
            {errors.email && (
              <p className="text-red-500 text-xs font-mono">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="font-mono text-xs uppercase text-[#D4AF37]">{t('phone')}</label>
            <input
              {...register('phone')}
              type="tel"
              className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-[#D4AF37] py-4 text-xl font-sans outline-none text-white placeholder:text-zinc-700"
              placeholder="(555) 000-0000"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs font-mono">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="font-mono text-xs uppercase text-[#D4AF37]">{t('password')}</label>
            <input
              {...register('password')}
              type="password"
              className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-[#D4AF37] py-4 text-xl font-sans outline-none text-white placeholder:text-zinc-700 uppercase"
              placeholder="MIN 8 CHARACTERS"
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
              className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-[#D4AF37] py-4 text-xl font-sans outline-none text-white placeholder:text-zinc-700 uppercase"
              placeholder="REPEAT PASSWORD"
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
                {t('creating')}
              </>
            ) : (
              t('createAccount')
            )}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-zinc-600 font-mono text-sm">
            {t('alreadyAccount')}{' '}
            <Link href="/auth/login" className="text-[#D4AF37] hover:underline">
              {t('signIn')}
            </Link>
          </p>
        </div>

        <div className="mt-12 text-center">
          <Link href="/" className="text-zinc-600 font-mono text-xs hover:text-zinc-400 transition-colors">
            {t('backHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}
