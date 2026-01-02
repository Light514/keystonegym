'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { loginSchema, type LoginInput } from '@/lib/validations';
import { Button } from '@/components/ui/Button';
import { KeystoneIcon } from '@/components/icons/KeystoneIcon';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (authError) {
        throw authError;
      }

      router.push(redirect);
      router.refresh();
    } catch (err) {
      setError('Invalid email or password');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-12">
        <Link href="/" className="inline-flex items-center gap-2 text-[#D4AF37] mb-8">
          <KeystoneIcon className="w-10 h-10" />
          <span className="font-sans font-black text-3xl tracking-tighter">KEYSTONE</span>
        </Link>
        <h1 className="font-sans text-4xl font-black uppercase tracking-tighter text-white">
          Member <span className="text-[#D4AF37]">Portal</span>
        </h1>
        <p className="mt-2 text-zinc-500 font-mono text-sm">
          Sign in to access your dashboard
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

        <div className="space-y-2">
          <label className="font-mono text-xs uppercase text-[#D4AF37]">Password</label>
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
              Signing in...
            </>
          ) : (
            'Sign In'
          )}
        </Button>
      </form>

      <div className="mt-8 text-center space-y-4">
        <Link
          href="/auth/forgot-password"
          className="block text-zinc-500 font-mono text-sm hover:text-[#D4AF37] transition-colors"
        >
          Forgot your password?
        </Link>
        <p className="text-zinc-600 font-mono text-sm">
          Not a member?{' '}
          <Link href="/auth/signup" className="text-[#D4AF37] hover:underline">
            Request access
          </Link>
        </p>
      </div>

      <div className="mt-12 text-center">
        <Link href="/" className="text-zinc-600 font-mono text-xs hover:text-zinc-400 transition-colors">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}

function LoginFormFallback() {
  return (
    <div className="w-full max-w-md flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
      <Suspense fallback={<LoginFormFallback />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
