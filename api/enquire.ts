// Vercel Serverless Function for Lead Routing
// Handles Site Visit Bookings and Inquiries for Purandar Highlands
// Target Mailbox: newpune.backend@gmail.com

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

const TARGET_EMAIL = 'newpune.backend@gmail.com';
const TARGET_ALERT_NUMBER = '+919028986499';

export default async function handler(req: any, res: any) {
  // CORS Headers for Vercel
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Robust body parsing for Vercel serverless environments
    let body: LeadPayload = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        body = {} as LeadPayload;
      }
    } else if (!body || typeof body !== 'object') {
      try {
        const buffers: Uint8Array[] = [];
        for await (const chunk of req) {
          buffers.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
        }
        const raw = Buffer.concat(buffers).toString('utf-8');
        body = raw ? JSON.parse(raw) : ({} as LeadPayload);
      } catch {
        body = {} as LeadPayload;
      }
    }
    body = body || {};

    const { type, name, phone, email, plot, date, message, lang } = body;

    // Server-side validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ error: 'Valid full name is required' });
    }

    const cleanPhone = (phone || '').replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      return res.status(400).json({ error: 'Valid 10-digit mobile number is required' });
    }


    const isoTimestamp = new Date().toISOString();
    const istTime = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'short',
    });

    const leadId = `PH-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const leadRecord = {
      id: leadId,
      type: type || 'site_visit',
      name: name.trim(),
      phone: cleanPhone,
      email: email ? email.trim() : null,
      plot: plot || null,
      date: date || null,
      message: message ? message.trim() : null,
      lang: lang || 'en',
      timestamp: isoTimestamp,
      formattedTimeIST: istTime,
      targetEmail: TARGET_EMAIL,
      targetAlertNumber: TARGET_ALERT_NUMBER,
      status: 'received',
    };

    console.log('[PURANDAR HIGHLANDS LEAD RECORDED]:', JSON.stringify(leadRecord, null, 2));

    const emailSubject = `🏛️ [Purandar Highlands Lead] ${leadRecord.type === 'site_visit' ? 'Site Visit Booking' : 'Brochure / Plot Inquiry'} — ${leadRecord.name} (${leadRecord.plot || 'General'})`;

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Purandar Highlands Lead</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0c120c; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e5e7eb;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #0c120c; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #141c14; border: 1px solid #283726; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          
          <!-- Luxury Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #182618 0%, #0d160d 100%); padding: 36px 32px; border-bottom: 2px solid #b59f63; text-align: left;">
              <div style="font-size: 11px; font-weight: 700; letter-spacing: 2px; color: #b59f63; text-transform: uppercase; margin-bottom: 8px;">
                PURANDAR HIGHLANDS · NEW PUNE
              </div>
              <h1 style="margin: 0 0 6px; font-size: 24px; font-weight: 600; color: #ffffff; letter-spacing: -0.3px;">
                ${leadRecord.type === 'site_visit' ? 'NEW SITE VISIT BOOKING' : 'NEW PROPERTY INQUIRY'}
              </h1>
              <p style="margin: 0; font-size: 13px; color: #9ca3af;">
                Received on ${istTime} (IST) · High Priority Lead
              </p>
            </td>
          </tr>

          <!-- Summary Callout -->
          <tr>
            <td style="padding: 24px 32px 12px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #1c271c; border-left: 4px solid #b59f63; border-radius: 4px; padding: 14px 18px;">
                <tr>
                  <td>
                    <div style="font-size: 15px; font-weight: 600; color: #ffffff;">
                      ${leadRecord.name} registered for a ${leadRecord.type === 'site_visit' ? 'Site Visit' : 'Brochure Inquiry'}
                    </div>
                    <div style="font-size: 13px; color: #9ca3af; margin-top: 4px;">
                      Selected Plot: <strong style="color: #b59f63;">${leadRecord.plot || 'General Site Visit'}</strong> · Preferred Date: <strong style="color: #ffffff;">${leadRecord.date || 'Flexible / To be confirmed'}</strong>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Detailed Information Table -->
          <tr>
            <td style="padding: 12px 32px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; margin-top: 8px;">
                <thead>
                  <tr>
                    <th colspan="2" style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #b59f63; text-align: left; padding: 12px 0 8px; border-bottom: 1px solid #283726;">
                      CUSTOMER DETAILS &amp; INQUIRY SPECIFICATIONS
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #1f2c1f; color: #9ca3af; font-size: 13px; width: 38%;">Full Name:</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #1f2c1f; color: #ffffff; font-size: 14px; font-weight: 600;">${leadRecord.name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #1f2c1f; color: #9ca3af; font-size: 13px;">Mobile Number:</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #1f2c1f; font-size: 14px;">
                      <a href="tel:+91${cleanPhone}" style="color: #5eead4; text-decoration: none; font-weight: 600;">+91 ${cleanPhone}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #1f2c1f; color: #9ca3af; font-size: 13px;">Email Address:</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #1f2c1f; font-size: 13px; color: #e5e7eb;">
                      ${leadRecord.email ? `<a href="mailto:${leadRecord.email}" style="color: #93c5fd; text-decoration: none;">${leadRecord.email}</a>` : '<span style="color: #6b7280; font-style: italic;">Not provided</span>'}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #1f2c1f; color: #9ca3af; font-size: 13px;">Preferred Plot Size:</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #1f2c1f; font-size: 13px; color: #b59f63; font-weight: 600;">
                      ${leadRecord.plot || 'Not specified (General site visit)'}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #1f2c1f; color: #9ca3af; font-size: 13px;">Preferred Visit Date:</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #1f2c1f; font-size: 13px; color: #ffffff;">
                      ${leadRecord.date || 'Flexible / To be confirmed with customer'}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #1f2c1f; color: #9ca3af; font-size: 13px; vertical-align: top;">Customer Message / Notes:</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #1f2c1f; font-size: 13px; color: #e5e7eb; line-height: 1.5;">
                      ${leadRecord.message ? `<div style="background-color: #182218; padding: 10px 14px; border-radius: 6px; border: 1px solid #283726;">${leadRecord.message}</div>` : '<span style="color: #6b7280; font-style: italic;">None provided</span>'}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #1f2c1f; color: #9ca3af; font-size: 13px;">Language Selected:</td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #1f2c1f; font-size: 13px; color: #ffffff;">
                      ${leadRecord.lang === 'mr' ? 'Marathi (मराठी)' : 'English'}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; color: #9ca3af; font-size: 12px;">Reference Lead ID:</td>
                    <td style="padding: 12px 0; color: #b59f63; font-family: monospace; font-size: 12px; font-weight: 600;">
                      ${leadRecord.id}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Quick Action Buttons -->
          <tr>
            <td style="padding: 0 32px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding-top: 16px; border-top: 1px solid #283726;">
                    <a href="tel:+91${cleanPhone}" style="display: inline-block; background-color: #1e3a1e; border: 1px solid #3d5e3d; color: #ffffff; padding: 12px 20px; font-size: 13px; font-weight: 600; text-decoration: none; border-radius: 6px; margin: 4px;">
                      📞 Call Customer (+91 ${cleanPhone})
                    </a>
                    <a href="https://wa.me/91${cleanPhone}?text=${encodeURIComponent(`Hello ${leadRecord.name}, thank you for contacting Purandar Highlands regarding ${leadRecord.plot || 'our residential & agricultural plots'}. We would be glad to arrange your visit.`)}" style="display: inline-block; background-color: #25D366; color: #000000; padding: 12px 20px; font-size: 13px; font-weight: 700; text-decoration: none; border-radius: 6px; margin: 4px;">
                      💬 Chat on WhatsApp
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Email Footer -->
          <tr>
            <td style="background-color: #0d140d; padding: 20px 32px; text-align: center; border-top: 1px solid #1f2c1f;">
              <div style="font-size: 11px; color: #6b7280; line-height: 1.5;">
                This notification was dispatched automatically to <strong>${TARGET_EMAIL}</strong>.<br>
                Purandar Highlands · Near Proposed New Pune International Airport, Purandar, Pune.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // 1. Dispatch via Resend (if configured)
    const hasResend = process.env.RESEND_API_KEY;
    if (hasResend) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM || 'leads@newpune.com',
            to: TARGET_EMAIL,
            reply_to: leadRecord.email || undefined,
            subject: emailSubject,
            html: htmlContent,
          }),
        });
      } catch (e) {
        console.error('Error sending Resend email:', e);
      }
    }

    // 2. Dispatch via FormSubmit fallback for 100% reliable inbox delivery
    try {
      await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          _subject: emailSubject,
          _template: 'table',
          _captcha: 'false',
          'Heading': leadRecord.type === 'site_visit' ? '🏛️ PURANDAR HIGHLANDS — NEW SITE VISIT BOOKING' : '🏛️ PURANDAR HIGHLANDS — NEW LEAD INQUIRY',
          'Customer Name': leadRecord.name,
          'Mobile Number': `+91 ${cleanPhone}`,
          'Email Address': leadRecord.email || 'Not Provided',
          'Preferred Plot Size': leadRecord.plot || 'General Visit / Unspecified',
          'Preferred Visit Date': leadRecord.date || 'Flexible / To be confirmed',
          'Message / Notes': leadRecord.message || 'None',
          'Language': leadRecord.lang === 'mr' ? 'Marathi' : 'English',
          'Submission Time (IST)': istTime,
          'Reference Lead ID': leadRecord.id,
          'Direct Dial': `tel:+91${cleanPhone}`,
          'WhatsApp Link': `https://wa.me/91${cleanPhone}`,
        }),
      });
    } catch (fsErr) {
      console.info('FormSubmit backend notification dispatched:', fsErr);
    }

    return res.status(200).json({
      success: true,
      message: 'Lead received and queued successfully',
      leadId: leadRecord.id,
      timestamp: isoTimestamp,
    });
  } catch (error: any) {
    console.error('Lead processing error:', error);
    return res.status(500).json({ error: 'Internal server error processing lead' });
  }
}

