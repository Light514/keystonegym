import { NextRequest, NextResponse } from 'next/server';

// Use PAYPAL_MODE env var to control sandbox vs live, defaults to sandbox for safety
const PAYPAL_MODE = process.env.PAYPAL_MODE || 'sandbox';
const PAYPAL_API_URL = PAYPAL_MODE === 'live'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com';

async function getAccessToken() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('PayPal credentials not configured');
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('PayPal auth error:', data);
    throw new Error(data.error_description || 'Failed to authenticate with PayPal');
  }

  return data.access_token;
}

export async function POST(request: NextRequest) {
  try {
    const { orderId } = await request.json();

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID required' },
        { status: 400 }
      );
    }

    const accessToken = await getAccessToken();

    const response = await fetch(
      `${PAYPAL_API_URL}/v2/checkout/orders/${orderId}/capture`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const captureData = await response.json();

    if (!response.ok) {
      console.error('PayPal capture error:', captureData);
      return NextResponse.json(
        { error: captureData.message || 'Failed to capture PayPal order' },
        { status: response.status }
      );
    }

    // Try to store in database (non-blocking)
    if (captureData.status === 'COMPLETED') {
      try {
        const { createClient } = await import('@/lib/supabase/server');
        const supabase = await createClient();
        const amount = parseFloat(
          captureData.purchase_units[0].payments.captures[0].amount.value
        );

        await supabase.from('donations').insert({
          amount: Math.round(amount * 100),
          payment_provider: 'paypal',
          payment_id: orderId,
          status: 'completed',
          email: captureData.payer?.email_address || null,
        });
      } catch (dbError) {
        console.error('Failed to store donation:', dbError);
        // Continue - payment was successful
      }
    }

    return NextResponse.json({ success: true, data: captureData });
  } catch (error) {
    console.error('PayPal capture error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to capture PayPal order' },
      { status: 500 }
    );
  }
}
