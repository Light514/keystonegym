'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { RevealText } from '../animations/RevealText';
import { FadeIn } from '../animations/FadeIn';
import { Section } from '../layout/Section';
import { Grid } from '../layout/Grid';
import { Label } from '../layout/Label';
import { Button } from '../ui/Button';
import { trialRequestSchema, type TrialRequestInput } from '@/lib/validations';

export function TrialForm() {
  const t = useTranslations('trial');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TrialRequestInput>({
    resolver: zodResolver(trialRequestSchema),
  });

  const sendWhatsAppNotification = (data: TrialRequestInput) => {
    const phone = '14386227226'; // (438) 622-7226
    const message = `🥊 NEW TRIAL REQUEST

Name: ${data.fullName}
Phone: ${data.phone}
Email: ${data.email}
${data.message ? `\nMessage: ${data.message}` : ''}

Submitted via keystonegym.com`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank');
  };

  const onSubmit = async (data: TrialRequestInput) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/trial-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit request');
      }

      // Send WhatsApp notification
      sendWhatsAppNotification(data);

      // Easter egg 🦅
      console.log('%c"Alhamdulillah, brother. You know this." - Your request was sent! 🦅', 'color: #D4AF37; font-size: 12px;');

      setIsSuccess(true);
      reset();
    } catch (err) {
      setError(t('error'));
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Section id="join" className="bg-[#0a0a0a] text-white" noBorder>
        <Grid>
          <div className="col-span-1 md:col-span-12 text-center py-16">
            <FadeIn>
              <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-8">
                <Check className="w-10 h-10 text-black" />
              </div>
              <h2 className="font-sans text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 text-white">
                {t('success.title')} <span className="text-[#D4AF37]">{t('success.titleHighlight')}</span>
              </h2>
              <p className="text-xl text-zinc-400 max-w-md mx-auto">
                {t('success.message')}
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="mt-8 font-mono text-sm text-[#D4AF37] underline underline-offset-4"
              >
                {t('success.submitAnother')}
              </button>
            </FadeIn>
          </div>
        </Grid>
      </Section>
    );
  }

  return (
    <Section id="join" className="bg-[#0a0a0a] text-white" noBorder>
      <Grid>
        <div className="col-span-1 md:col-span-5">
          <Label className="text-[#D4AF37]">{t('label')}</Label>
          <div className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.9] text-white">
            <RevealText>{t('title1')}</RevealText>
            <RevealText delay={0.1}><span className="text-[#D4AF37]">{t('title2')}</span></RevealText>
          </div>
          <FadeIn delay={0.2}>
            <p className="text-xl font-medium max-w-sm text-zinc-400">
              {t('subtitle')}
            </p>
          </FadeIn>
        </div>

        <div className="col-span-1 md:col-span-7">
          <FadeIn delay={0.4}>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2 group">
                  <label className="font-mono text-xs uppercase opacity-80 text-[#D4AF37] group-focus-within:opacity-100 transition-opacity">
                    {t('fullName')}
                  </label>
                  <input
                    {...register('fullName')}
                    type="text"
                    className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-[#D4AF37] py-3 sm:py-4 text-xl sm:text-2xl font-sans outline-none placeholder:text-zinc-800 transition-colors text-white"
                    placeholder={t('placeholders.name')}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs font-mono">{errors.fullName.message}</p>
                  )}
                </div>
                <div className="space-y-2 group">
                  <label className="font-mono text-xs uppercase opacity-80 text-[#D4AF37] group-focus-within:opacity-100 transition-opacity">
                    {t('phone')}
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-[#D4AF37] py-3 sm:py-4 text-xl sm:text-2xl font-sans outline-none placeholder:text-zinc-800 transition-colors text-white"
                    placeholder={t('placeholders.phone')}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs font-mono">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="font-mono text-xs uppercase opacity-80 text-[#D4AF37] group-focus-within:opacity-100 transition-opacity">
                  {t('email')}
                </label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-[#D4AF37] py-3 sm:py-4 text-xl sm:text-2xl font-sans outline-none placeholder:text-zinc-800 transition-colors text-white"
                  placeholder={t('placeholders.email')}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs font-mono">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2 group">
                <label className="font-mono text-xs uppercase opacity-80 text-[#D4AF37] group-focus-within:opacity-100 transition-opacity">
                  {t('whyTrain')}
                </label>
                <textarea
                  {...register('message')}
                  rows={3}
                  className="w-full bg-transparent border-b-2 border-zinc-800 focus:border-[#D4AF37] py-3 sm:py-4 text-lg sm:text-xl font-sans outline-none placeholder:text-zinc-800 transition-colors resize-none text-white"
                  placeholder={t('placeholders.message')}
                />
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded">
                  <p className="text-red-500 text-sm font-mono">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full justify-center mt-8 shadow-[0px_0px_20px_0px_rgba(212,175,55,0.3)] hover:shadow-[0px_0px_30px_0px_rgba(212,175,55,0.5)] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    {t('submitting')}
                  </>
                ) : (
                  <>
                    {t('submit')}
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  </>
                )}
              </Button>
            </form>
          </FadeIn>
        </div>
      </Grid>
    </Section>
  );
}
