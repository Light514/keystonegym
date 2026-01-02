import { NextRequest, NextResponse } from 'next/server';
import { trialRequestSchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const result = trialRequestSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { fullName, phone, email, message } = result.data;

    // Try to store in database (non-blocking - form works even if DB fails)
    try {
      const { createClient } = await import('@/lib/supabase/server');
      const supabase = await createClient();
      const { error: dbError } = await supabase.from('trial_requests').insert({
        full_name: fullName,
        phone,
        email,
        message: message || null,
        status: 'pending',
      });

      if (dbError) {
        console.error('Database error:', dbError);
      }
    } catch (dbErr) {
      console.error('Database connection error:', dbErr);
      // Continue - form still works via WhatsApp
    }

    // Try to send notification (non-blocking)
    try {
      const { notifyOwner } = await import('@/lib/twilio');
      const notificationMessage = `🥊 New Trial Request!\n\nName: ${fullName}\nPhone: ${phone}\nEmail: ${email}${message ? `\n\nMessage: ${message}` : ''}`;
      await notifyOwner(notificationMessage);
    } catch (notifyError) {
      console.error('Notification error:', notifyError);
      // Continue - form still works via WhatsApp
    }

    // Always return success - the client-side WhatsApp will handle notification
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Trial request error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
