import { NextRequest, NextResponse } from 'next/server';
import { getStripeClient } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';
import Stripe from 'stripe';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing signature' },
      { status: 400 }
    );
  }

  const stripe = getStripeClient();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;

      if (session.metadata?.type === 'donation') {
        await supabase.from('donations').insert({
          amount: session.amount_total,
          payment_provider: 'stripe',
          payment_id: session.id,
          status: 'completed',
          email: session.customer_email,
        });
      }
      break;
    }

    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const subscription = event.data.object;

      // Update member subscription status
      const customerId = subscription.customer as string;
      const customer = await stripe.customers.retrieve(customerId) as Stripe.Customer;

      if (customer.email) {
        // Get member ID
        const { data: member } = await supabase
          .from('members')
          .select('id')
          .eq('email', customer.email)
          .single();

        await supabase
          .from('members')
          .update({
            subscription_status: subscription.status === 'active' ? 'active' : 'inactive',
          })
          .eq('email', customer.email);

        // Get period dates from subscription object
        const subData = subscription as unknown as {
          current_period_start: number;
          current_period_end: number;
          items: { data: Array<{ price: { unit_amount: number | null } }> };
        };
        const periodStart = subData.current_period_start;
        const periodEnd = subData.current_period_end;
        const items = subData.items;

        // Update or create subscription record
        await supabase.from('subscriptions').upsert({
          stripe_subscription_id: subscription.id,
          stripe_customer_id: customerId,
          member_id: member?.id,
          status: subscription.status,
          current_period_start: new Date(periodStart * 1000).toISOString(),
          current_period_end: new Date(periodEnd * 1000).toISOString(),
          price_amount: items?.data[0]?.price.unit_amount || 0,
        });
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object;

      await supabase
        .from('subscriptions')
        .update({ status: 'cancelled' })
        .eq('stripe_subscription_id', subscription.id);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
