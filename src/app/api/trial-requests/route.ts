import { NextRequest, NextResponse } from 'next/server';
import { trialRequestSchema } from '@/lib/validations';
import { createClient } from '@/lib/supabase/server';
import { notifyOwner } from '@/lib/twilio';

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

    // Store in database
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
      // Continue even if DB fails - we still want to notify
    }

    // Send WhatsApp/SMS notification to owner
    const notificationMessage = `🥊 New Trial Request!\n\nName: ${fullName}\nPhone: ${phone}\nEmail: ${email}${message ? `\n\nMessage: ${message}` : ''}`;

    try {
      await notifyOwner(notificationMessage);
    } catch (notifyError) {
      console.error('Notification error:', notifyError);
      // Continue even if notification fails
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Trial request error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
