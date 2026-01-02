import { NextRequest, NextResponse } from 'next/server';
import { getStripeClient } from '@/lib/stripe';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get member's subscription with stripe_customer_id
    const { data: member } = await supabase
      .from('members')
      .select('id')
      .eq('email', user.email)
      .single();

    if (!member) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('stripe_subscription_id, stripe_customer_id')
      .eq('member_id', member.id)
      .single();

    if (!subscription?.stripe_subscription_id) {
      return NextResponse.json({ paymentMethod: null });
    }

    const stripe = getStripeClient();

    // Fetch the subscription from Stripe to get the default payment method
    const stripeSubscription = await stripe.subscriptions.retrieve(
      subscription.stripe_subscription_id,
      { expand: ['default_payment_method'] }
    );

    const paymentMethod = stripeSubscription.default_payment_method;

    if (!paymentMethod || typeof paymentMethod === 'string') {
      // No payment method or only ID returned
      return NextResponse.json({ paymentMethod: null });
    }

    // Return card details
    if (paymentMethod.type === 'card' && paymentMethod.card) {
      return NextResponse.json({
        paymentMethod: {
          brand: paymentMethod.card.brand,
          last4: paymentMethod.card.last4,
          expMonth: paymentMethod.card.exp_month,
          expYear: paymentMethod.card.exp_year,
        },
      });
    }

    return NextResponse.json({ paymentMethod: null });
  } catch (error) {
    console.error('Error fetching payment method:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payment method' },
      { status: 500 }
    );
  }
}
