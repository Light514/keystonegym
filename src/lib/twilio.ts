import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

export const twilioClient = twilio(accountSid, authToken);

export async function sendWhatsApp(to: string, message: string) {
  try {
    const result = await twilioClient.messages.create({
      body: message,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${to}`,
    });
    return { success: true, sid: result.sid };
  } catch (error) {
    console.error('WhatsApp send failed:', error);
    return { success: false, error };
  }
}

export async function sendSMS(to: string, message: string) {
  try {
    const result = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    });
    return { success: true, sid: result.sid };
  } catch (error) {
    console.error('SMS send failed:', error);
    return { success: false, error };
  }
}

export async function notifyOwner(message: string) {
  const ownerPhone = process.env.OWNER_PHONE_NUMBER!;

  // Try WhatsApp first, fallback to SMS
  const whatsappResult = await sendWhatsApp(ownerPhone, message);
  if (whatsappResult.success) {
    return whatsappResult;
  }

  // Fallback to SMS
  return sendSMS(ownerPhone, message);
}
