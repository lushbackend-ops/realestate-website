// Vercel Serverless Function for Lead Routing
// Handles Site Visit Bookings and Brochure Downloads for Purandar Highlands

export interface LeadPayload {
  type: 'site_visit' | 'brochure_download';
  name: string;
  phone: string;
  email?: string;
  plot?: string;
  date?: string;
  message?: string;
  lang?: string;
  timestamp?: string;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body: LeadPayload = req.body || {};
    const { type, name, phone, email, plot, date, message, lang } = body;

    // Server-side validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ error: 'Valid full name is required' });
    }

    const cleanPhone = (phone || '').replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      return res.status(400).json({ error: 'Valid 10-digit mobile number is required' });
    }

    const timestamp = new Date().toISOString();
    const leadRecord = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      type: type || 'site_visit',
      name: name.trim(),
      phone: cleanPhone,
      email: email ? email.trim() : null,
      plot: plot || null,
      date: date || null,
      message: message ? message.trim() : null,
      lang: lang || 'en',
      timestamp,
      targetEmail: 'newpune712@gmail.com',
      targetAlertNumber: '+919028986499',
      status: 'received'
    };

    console.log('[PURANDAR HIGHLANDS LEAD RECORDED]:', JSON.stringify(leadRecord, null, 2));

    // Optional provider integration:
    // If SMTP_HOST, RESEND_API_KEY, or TWILIO_ACCOUNT_SID are configured in environment variables,
    // dispatch outbound notifications here.
    const hasResend = process.env.RESEND_API_KEY;
    const _hasSmtp = process.env.SMTP_HOST && process.env.SMTP_USER;

    if (hasResend) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'leads@newpune.com',
            to: 'newpune712@gmail.com',
            subject: `[New Lead - ${leadRecord.type === 'brochure_download' ? 'Brochure' : 'Site Visit'}] ${leadRecord.name}`,
            html: `
              <h2>Purandar Highlands Lead Alert</h2>
              <p><strong>Type:</strong> ${leadRecord.type}</p>
              <p><strong>Name:</strong> ${leadRecord.name}</p>
              <p><strong>Phone:</strong> ${leadRecord.phone}</p>
              <p><strong>Email:</strong> ${leadRecord.email || 'N/A'}</p>
              <p><strong>Plot Size:</strong> ${leadRecord.plot || 'N/A'}</p>
              <p><strong>Preferred Visit Date:</strong> ${leadRecord.date || 'N/A'}</p>
              <p><strong>Message:</strong> ${leadRecord.message || 'N/A'}</p>
              <p><strong>Language:</strong> ${leadRecord.lang}</p>
              <p><strong>Time:</strong> ${timestamp}</p>
            `
          })
        });
      } catch (e) {
        console.error('Error sending Resend email:', e);
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Lead received and queued successfully',
      leadId: leadRecord.id,
      timestamp
    });
  } catch (error: any) {
    console.error('Lead processing error:', error);
    return res.status(500).json({ error: 'Internal server error processing lead' });
  }
}
