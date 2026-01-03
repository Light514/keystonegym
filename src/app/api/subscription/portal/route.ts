import { NextRequest, NextResponse } from 'next/server';
import { getStripeClient } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const stripe = getStripeClient();

    // Find the Stripe customer
    const customers = await stripe.customers.list({ email: user.email!, limit: 1 });

    if (customers.data.length === 0) {
      return NextResponse.json({ error: 'No customer found' }, { status: 404 });
    }

    // Create billing portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customers.data[0].id,
      return_url: `${request.nextUrl.origin}/dashboard/subscription`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe portal error:', error);
    return NextResponse.json(
      { error: 'Failed to create portal session' },
      { status: 500 }
    );
  }
}
