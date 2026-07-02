import { NextRequest, NextResponse } from 'next/server';
import {
  saveToDatabase,
  type GeneralEnquiryData,
} from '@/lib/services/landingEnquiry.service';
import transporter from '@/lib/mailer';

// ─── In-memory rate limiter ───────────────────────────────────────────────────
interface RateLimitEntry {
  count: number;
  resetAt: number;
}
const rateLimitStore = new Map<string, RateLimitEntry>();
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count += 1;
  return false;
}

// ─── Validation ───────────────────────────────────────────────────────────────
function validate(body: Record<string, unknown>): string[] {
  const errors: string[] = [];

  // Accept either a combined `name` or separate `first_name` + `last_name`
  const hasName = typeof body.name === 'string' && (body.name as string).trim().length > 0;
  const hasFirstLast =
    typeof body.first_name === 'string' && (body.first_name as string).trim().length > 0;

  if (!hasName && !hasFirstLast) {
    errors.push('Name is required');
  }

  if (!body.email || !String(body.email).includes('@')) {
    errors.push('Valid email is required');
  }

  // Accept `mobile` or `phone`
  const phoneVal = String(body.mobile || body.phone || '');
  const digits = phoneVal.replace(/\D/g, '');
  if (digits.length < 10) {
    errors.push('Phone must contain at least 10 digits');
  }

  if (!body.company_name || !String(body.company_name).trim()) {
    errors.push('Company name is required');
  }

  return errors;
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(request: NextRequest): Promise<NextResponse> {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? '127.0.0.1';
  if (isRateLimited(ip)) {
    return NextResponse.json({ success: false, message: 'Too many requests' }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, errors: ['Invalid JSON'] }, { status: 400 });
  }

  const errors = validate(body);
  if (errors.length > 0) {
    console.warn('[GeneralEnquiry] Validation failed:', errors);
    return NextResponse.json({ success: false, errors }, { status: 400 });
  }

  // Resolve name: prefer combined `name`, else join first_name + last_name
  const resolvedName =
    typeof body.name === 'string' && body.name.trim()
      ? body.name.trim()
      : `${String(body.first_name ?? '').trim()} ${String(body.last_name ?? '').trim()}`.trim();

  // Resolve mobile: prefer `mobile`, fall back to `phone`
  const resolvedMobile = String(body.mobile || body.phone || '').trim();

  const data: GeneralEnquiryData = {
    type: 'general_enquiry',
    name: resolvedName,
    email: String(body.email).trim(),
    mobile: resolvedMobile,
    company_name: String(body.company_name).trim(),
    message: String(body.message || '').trim(),
  };

  try {
    await saveToDatabase(data);
  } catch (err) {
    console.error('[GeneralEnquiry] DB failed:', err);
    return NextResponse.json({ success: false, message: 'Failed to save enquiry. Please try again.' }, { status: 500 });
  }

  // Send confirmation email to the customer
  try {
    await transporter.sendMail({
      from: `"SK Voyages" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: `Special Booking Enquiry Received - SK Voyages`,
      text: `Dear ${data.name},\n\nThank you for reaching out to SK Voyages. We have successfully received your special booking enquiry.\n\nSummary of your request:\n- Company: ${data.company_name}\n- Mobile: ${data.mobile}\n${data.message ? `- Message: ${data.message}\n` : ''}\nAn executive will contact you shortly to understand your requirements and prepare a tailored proposal.\n\nWarm regards,\nSK Voyages Team`,
      html: `
        <div style="font-family: 'Inter', 'Segoe UI', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #ffffff; border: 1px solid #eef2f6; border-radius: 12px; color: #1e293b; line-height: 1.6;">
          <div style="text-align: center; border-bottom: 2px solid #ffc839; padding-bottom: 20px; margin-bottom: 25px;">
            <h2 style="color: #0f172a; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">SK VOYAGES</h2>
            <p style="color: #64748b; margin: 5px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Premium Travel &amp; Chauffeur Services</p>
          </div>

          <p style="font-size: 16px; margin-top: 0;">Dear <strong>${data.name}</strong>,</p>

          <p style="font-size: 15px;">Thank you for reaching out to <strong>SK Voyages</strong>. We are pleased to confirm that we have successfully received your special booking enquiry. Our team is reviewing your requirements and will prepare a tailored proposal for you.</p>

          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 25px 0;">
            <h3 style="margin-top: 0; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; font-size: 16px;">Enquiry Summary</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left;">
              <tr>
                <td style="padding: 6px 0; color: #64748b; width: 35%;"><strong>Company</strong></td>
                <td style="padding: 6px 0; color: #0f172a;">${data.company_name}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Mobile</strong></td>
                <td style="padding: 6px 0; color: #0f172a;">${data.mobile}</td>
              </tr>
              ${data.message ? `
              <tr>
                <td style="padding: 6px 0; color: #64748b; vertical-align: top;"><strong>Message</strong></td>
                <td style="padding: 6px 0; color: #0f172a; white-space: pre-wrap;">${data.message}</td>
              </tr>
              ` : ''}
            </table>
          </div>

          <p style="font-size: 15px;"><strong>What happens next?</strong></p>
          <p style="font-size: 14px; margin-bottom: 20px;">A reservation executive will contact you shortly to understand your requirements in detail and provide a customised quotation.</p>

          <p style="font-size: 14px; color: #64748b; margin-bottom: 30px;">If you have any urgent changes or questions in the meantime, feel free to contact our round-the-clock desk on WhatsApp at <a href="https://wa.me/919886897555" style="color: #ffc839; text-decoration: none; font-weight: bold;">+91 9886897555</a>.</p>

          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 25px 0;" />

          <p style="font-size: 13px; color: #94a3b8; text-align: center; margin: 0;">This is an automated confirmation email for your special booking enquiry. Please do not reply directly to this message.<br />&copy; 2026 SK Voyages. All rights reserved.</p>
        </div>
      `,
    });
  } catch (mailErr) {
    console.error('[GeneralEnquiry] Failed to send confirmation email:', mailErr);
  }

  return NextResponse.json({ success: true, message: 'Enquiry received' });
}
