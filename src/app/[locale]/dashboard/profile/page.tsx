'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, Check } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';

interface ProfileForm {
  fullName: string;
  phone: string;
}

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const { register, handleSubmit, reset } = useForm<ProfileForm>();

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        reset({
          fullName: user.user_metadata?.full_name || '',
          phone: user.user_metadata?.phone || '',
        });
      }
      setIsLoading(false);
    }
    loadProfile();
  }, [reset]);

  const onSubmit = async (data: ProfileForm) => {
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const supabase = createClient();
      await supabase.auth.updateUser({
        data: {
          full_name: data.fullName,
          phone: data.phone,
        },
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="pt-16 flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
      </div>
    );
  }

  return (
    <div className="pt-16 max-w-2xl">
      <h1 className="font-sans text-4xl font-black uppercase tracking-tighter mb-8">
        Profile
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="bg-[#0a0a0a] border border-zinc-800 rounded-lg p-6 space-y-6">
          <div className="space-y-2">
            <label className="font-mono text-xs uppercase text-[#D4AF37]">Full Name</label>
            <input
              {...register('fullName')}
              type="text"
              className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-[#D4AF37] py-4 text-xl font-sans outline-none text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="font-mono text-xs uppercase text-[#D4AF37]">Phone</label>
            <input
              {...register('phone')}
              type="tel"
              className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-[#D4AF37] py-4 text-xl font-sans outline-none text-white"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button type="submit" disabled={isSaving} className="disabled:opacity-50">
            {isSaving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
          {saveSuccess && (
            <span className="flex items-center gap-2 text-green-500 font-mono text-sm">
              <Check className="w-4 h-4" /> Saved successfully
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
