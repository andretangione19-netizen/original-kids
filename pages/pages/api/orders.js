

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, phone, orderId, total } = req.body;
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;

  if (!token || !phoneId) {
    console.error('Missing WHATSAPP_TOKEN or WHATSAPP_PHONE_ID');
    return res.status(500).json({ success: false, error: 'WhatsApp not configured' });
  }

  const msg = `🎉 Olá ${name}! Seu pedido #${orderId} foi confirmado. Total: R$ ${total.toFixed(2)}. Obrigado por comprar na Original Kids! 👶💛`;

  try {
    const response = await fetch(`https://graph.facebook.com/v16.0/${phoneId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: phone,
        type: 'text',
        text: { body: msg }
      })
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('WhatsApp API error:', text);
      return res.status(500).json({ success: false, error: 'WhatsApp API error', detail: text });
    }

    const data = await response.json();
    return res.status(200).json({ success: true, data });
  } catch (e) {
    console.error('Error sending WhatsApp message:', e);
    return res.status(500).json({ success: false, error: 'Internal error' });
  }
}
