import { NextRequest, NextResponse } from 'next/server';
import {
  saveToDatabase,
  type BookingEnquiryData,
  type ScheduledEnquiryData,
} from '@/lib/services/landingEnquiry.service';
import transporter from '@/lib/mailer';

// ─── In-memory rate limiter ───────────────────────────────────────────────────
// 10 requests per IP per 60-second window.
// NOTE: This is per-process. For multi-instance / edge deployments replace
//       this with a Redis-backed solution (e.g. @upstash/ratelimit).

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

  // type
  if (!body.type || !['instant', 'scheduled'].includes(body.type as string)) {
    errors.push('type must be "instant" or "scheduled"');
  }

  // required strings
  if (!body.pickup_location || typeof body.pickup_location !== 'string' || !body.pickup_location.trim()) {
    errors.push('pickup_location is required');
  }
  if (!body.destination || typeof body.destination !== 'string' || !body.destination.trim()) {
    errors.push('destination is required');
  }
  if (!body.vehicle_type || typeof body.vehicle_type !== 'string' || !body.vehicle_type.trim()) {
    errors.push('vehicle_type is required');
  }
  if (!body.name || typeof body.name !== 'string' || !body.name.trim()) {
    errors.push('name is required');
  }

  // email: must contain @ and .
  if (!body.email || typeof body.email !== 'string') {
    errors.push('email is required');
  } else if (!body.email.includes('@') || !body.email.includes('.')) {
    errors.push('email must be a valid email address');
  }

  // phone: at least 10 digits, allow symbols like +, -, spaces
  const phoneStr = String(body.phone || '');
  const digits = phoneStr.replace(/\D/g, '');
  if (!body.phone) {
    errors.push('phone is required');
  } else if (digits.length < 10) {
    errors.push('phone must contain at least 10 digits');
  }

  // passengers: integer between 1 and 10
  const passengers = Number(body.passengers);
  if (body.passengers === undefined || body.passengers === null || body.passengers === '') {
    errors.push('passengers is required');
  } else if (!Number.isInteger(passengers) || passengers < 1 || passengers > 10) {
    errors.push('passengers must be a whole number between 1 and 10');
  }

  // scheduled-only fields
  if (body.type === 'scheduled') {
    if (!body.date || typeof body.date !== 'string' || !body.date.trim()) {
      errors.push('date is required for scheduled bookings');
    }
    if (!body.time || typeof body.time !== 'string' || !body.time.trim()) {
      errors.push('time is required for scheduled bookings');
    }
  }

  return errors;
}

// ─── Route handler ────────────────────────────────────────────────────────────

export async function POST(request: NextRequest): Promise<NextResponse> {
  // Rate limiting
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    '127.0.0.1';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, message: 'Too many requests. Please try again in a minute.' },
      { status: 429 },
    );
  }

  // Parse body
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, errors: ['Request body must be valid JSON'] },
      { status: 400 },
    );
  }

  // Validate
  const errors = validate(body);
  if (errors.length > 0) {
    return NextResponse.json({ success: false, errors }, { status: 400 });
  }

  // Shape the validated data
  const base = {
    type: body.type as 'instant' | 'scheduled',
    pickup_location: (body.pickup_location as string).trim(),
    destination: (body.destination as string).trim(),
    vehicle_type: (body.vehicle_type as string).trim(),
    passengers: Number(body.passengers),
    name: (body.name as string).trim(),
    email: (body.email as string).trim(),
    phone: (body.phone as string).trim(),
    ...(typeof body.booking_category === 'string' && body.booking_category.trim() && { booking_category: (body.booking_category as string).trim() }),
    ...(typeof body.is_return_trip === 'boolean' && { is_return_trip: body.is_return_trip }),
    ...(typeof body.return_date === 'string' && body.return_date.trim() && { return_date: (body.return_date as string).trim() }),
    ...(typeof body.return_time === 'string' && body.return_time.trim() && { return_time: (body.return_time as string).trim() }),
    ...(typeof body.pickup_lat === 'number' && { pickup_lat: body.pickup_lat }),
    ...(typeof body.pickup_lng === 'number' && { pickup_lng: body.pickup_lng }),
    ...(typeof body.destination_lat === 'number' && { destination_lat: body.destination_lat }),
    ...(typeof body.destination_lng === 'number' && { destination_lng: body.destination_lng }),
    ...(typeof body.distance_km === 'number' && { distance_km: body.distance_km }),
  };

  const rawScheduled = body as unknown as ScheduledEnquiryData;
  const data: BookingEnquiryData =
    base.type === 'scheduled'
      ? {
          ...base,
          type: 'scheduled',
          date: String(rawScheduled.date).trim(),
          time: String(rawScheduled.time).trim(),
        }
      : { ...base, type: 'instant' };

  try {
    await saveToDatabase(data);
  } catch (err) {
    console.error('[BookingEnquiry] DB insert failed:', err);
    return NextResponse.json({ success: false, message: 'Failed to save enquiry. Please try again.' }, { status: 500 });
  }

  // Send email confirmation
  try {
    const formattedCategory = data.booking_category 
      ? data.booking_category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      : '';

    await transporter.sendMail({
      from: `"SK Voyages" <${process.env.SMTP_USER}>`,
      to: data.email,
      subject: `Booking Enquiry Received - SK Voyages`,
      text: `Dear ${data.name},\n\nThank you for reaching out to SK Voyages. We have successfully received your booking enquiry.\n\nSummary of your request:\n- Pickup: ${data.pickup_location}\n- Destination: ${data.destination}\n- Vehicle Type: ${data.vehicle_type}\n- Passengers: ${data.passengers}\n${data.type === 'scheduled' ? `- Date & Time: ${(data as any).date}, ${(data as any).time}\n` : ''}${data.booking_category ? `- Booking Type: ${formattedCategory}\n` : ''}${data.is_return_trip ? `- Return Trip: Yes (Date: ${data.return_date || 'N/A'}, Time: ${data.return_time || 'N/A'})\n` : ''}${data.distance_km ? `- Distance: ${data.distance_km} km\n` : ''}\nAn executive will contact you shortly at ${data.phone} to confirm availability and provide a quotation.\n\nWarm regards,\nSK Voyages Team`,
      html: `
        <div style="font-family: 'Inter', 'Segoe UI', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #ffffff; border: 1px solid #eef2f6; border-radius: 12px; color: #1e293b; line-height: 1.6;">
          <div style="text-align: center; border-bottom: 2px solid #ffc839; padding-bottom: 20px; margin-bottom: 25px;">
            <h2 style="color: #0f172a; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">SK VOYAGES</h2>
            <p style="color: #64748b; margin: 5px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Premium Travel & Chauffeur Services</p>
          </div>
          
          <p style="font-size: 16px; margin-top: 0;">Dear <strong>${data.name}</strong>,</p>
          
          <p style="font-size: 15px;">Thank you for reaching out to <strong>SK Voyages</strong>. We are pleased to inform you that we have successfully received your booking enquiry. Our team is currently reviewing your request to verify vehicle availability and secure your booking.</p>
          
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 25px 0;">
            <h3 style="margin-top: 0; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; font-size: 16px;">Enquiry Summary</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left;">
              <tr>
                <td style="padding: 6px 0; color: #64748b; width: 35%;"><strong>Service Type</strong></td>
                <td style="padding: 6px 0; color: #0f172a;">${data.type === 'scheduled' ? 'Scheduled Chauffeur' : 'Instant Ride'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Pickup Location</strong></td>
                <td style="padding: 6px 0; color: #0f172a;">${data.pickup_location}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Destination</strong></td>
                <td style="padding: 6px 0; color: #0f172a;">${data.destination}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Vehicle Preference</strong></td>
                <td style="padding: 6px 0; color: #0f172a;">${data.vehicle_type}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Passengers</strong></td>
                <td style="padding: 6px 0; color: #0f172a;">${data.passengers}</td>
              </tr>
              ${data.type === 'scheduled' ? `
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Date & Time</strong></td>
                <td style="padding: 6px 0; color: #0f172a;">${(data as any).date}, ${(data as any).time}</td>
              </tr>
              ` : ''}
              ${data.booking_category ? `
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Booking Type</strong></td>
                <td style="padding: 6px 0; color: #0f172a;">${formattedCategory}</td>
              </tr>
              ` : ''}
              ${data.is_return_trip ? `
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Return Trip</strong></td>
                <td style="padding: 6px 0; color: #0f172a;">Yes (Date: ${data.return_date || 'N/A'}, Time: ${data.return_time || 'N/A'})</td>
              </tr>
              ` : ''}
              ${data.distance_km ? `
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Estimated Distance</strong></td>
                <td style="padding: 6px 0; color: #0f172a;">${data.distance_km} km</td>
              </tr>
              ` : ''}
            </table>
          </div>
          
          <p style="font-size: 15px;"><strong>What happens next?</strong></p>
          <p style="font-size: 14px; margin-bottom: 20px;">A reservation executive will contact you shortly at <strong>${data.phone}</strong> or via email to confirm the booking details, provide the pricing quotation, and complete the reservation.</p>
          
          <p style="font-size: 14px; color: #64748b; margin-bottom: 30px;">If you have any urgent changes or questions in the meantime, feel free to contact our round-the-clock desk on WhatsApp at <a href="https://wa.me/917807818119" style="color: #ffc839; text-decoration: none; font-weight: bold;">+91 7807818119</a>.</p>
          
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 25px 0;" />
          
          <p style="font-size: 13px; color: #94a3b8; text-align: center; margin: 0;">This is an automated confirmation email for your booking enquiry. Please do not reply directly to this message.<br />&copy; 2026 SK Voyages. All rights reserved.</p>
        </div>
      `,
    });
  } catch (mailErr) {
    console.error('[BookingEnquiry] Failed to send confirmation email:', mailErr);
  }

  // Send email notification to the company
  const companyEmail = process.env.COMPANY_EMAIL || 'srihemanth451@gmail.com';
  try {
    const formattedCategory = data.booking_category 
      ? data.booking_category.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
      : '';

    await transporter.sendMail({
      from: `"SK Voyages System" <${process.env.SMTP_USER}>`,
      to: companyEmail,
      subject: `[New Booking Enquiry] - ${data.name} (${data.type === 'scheduled' ? 'Scheduled Chauffeur' : 'Instant Ride'})`,
      text: `Hello Team,\n\nA new booking enquiry has been received via the landing page.\n\nSummary of details:\n- Name: ${data.name}\n- Email: ${data.email}\n- Phone: ${data.phone}\n- Pickup: ${data.pickup_location}\n- Destination: ${data.destination}\n- Vehicle Type: ${data.vehicle_type}\n- Passengers: ${data.passengers}\n${data.type === 'scheduled' ? `- Date & Time: ${(data as any).date}, ${(data as any).time}\n` : ''}${data.booking_category ? `- Booking Type: ${formattedCategory}\n` : ''}${data.is_return_trip ? `- Return Trip: Yes (Date: ${data.return_date || 'N/A'}, Time: ${data.return_time || 'N/A'})\n` : ''}${data.distance_km ? `- Distance: ${data.distance_km} km\n` : ''}\nPlease review this request in the administration panel and follow up with the client at your earliest convenience.\n\nBest regards,\nSK Voyages Booking System`,
      html: `
        <div style="font-family: 'Inter', 'Segoe UI', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background-color: #ffffff; border: 1px solid #eef2f6; border-radius: 12px; color: #1e293b; line-height: 1.6;">
          <div style="text-align: center; border-bottom: 2px solid #ef4444; padding-bottom: 20px; margin-bottom: 25px;">
            <h2 style="color: #0f172a; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">NEW BOOKING ENQUIRY</h2>
            <p style="color: #ef4444; margin: 5px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; font-weight: bold;">Action Required - Follow up with Client</p>
          </div>
          
          <p style="font-size: 15px; margin-top: 0;">Hello Team,</p>
          <p style="font-size: 15px;">A new customer has submitted a booking enquiry on the website. Here are the details of the request:</p>
          
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 25px 0;">
            <h3 style="margin-top: 0; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; font-size: 16px;">Client & Contact Details</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left; margin-bottom: 20px;">
              <tr>
                <td style="padding: 6px 0; color: #64748b; width: 35%;"><strong>Client Name</strong></td>
                <td style="padding: 6px 0; color: #0f172a; font-weight: bold;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Client Email</strong></td>
                <td style="padding: 6px 0; color: #0f172a;"><a href="mailto:${data.email}" style="color: #3b82f6; text-decoration: none;">${data.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Client Phone</strong></td>
                <td style="padding: 6px 0; color: #0f172a;"><a href="tel:${data.phone}" style="color: #3b82f6; text-decoration: none;">${data.phone}</a></td>
              </tr>
            </table>

            <h3 style="margin-top: 0; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; font-size: 16px;">Ride Parameters</h3>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; text-align: left;">
              <tr>
                <td style="padding: 6px 0; color: #64748b; width: 35%;"><strong>Service Type</strong></td>
                <td style="padding: 6px 0; color: #0f172a;">${data.type === 'scheduled' ? 'Scheduled Chauffeur' : 'Instant Ride'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Pickup Location</strong></td>
                <td style="padding: 6px 0; color: #0f172a;">${data.pickup_location}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Destination</strong></td>
                <td style="padding: 6px 0; color: #0f172a;">${data.destination}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Vehicle Type</strong></td>
                <td style="padding: 6px 0; color: #0f172a;">${data.vehicle_type}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Passengers</strong></td>
                <td style="padding: 6px 0; color: #0f172a;">${data.passengers}</td>
              </tr>
              ${data.type === 'scheduled' ? `
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Date & Time</strong></td>
                <td style="padding: 6px 0; color: #0f172a;">${(data as any).date}, ${(data as any).time}</td>
              </tr>
              ` : ''}
              ${data.booking_category ? `
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Booking Type</strong></td>
                <td style="padding: 6px 0; color: #0f172a;">${formattedCategory}</td>
              </tr>
              ` : ''}
              ${data.is_return_trip ? `
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Return Trip</strong></td>
                <td style="padding: 6px 0; color: #0f172a;">Yes (Date: ${data.return_date || 'N/A'}, Time: ${data.return_time || 'N/A'})</td>
              </tr>
              ` : ''}
              ${data.distance_km ? `
              <tr>
                <td style="padding: 6px 0; color: #64748b;"><strong>Estimated Distance</strong></td>
                <td style="padding: 6px 0; color: #0f172a;">${data.distance_km} km</td>
              </tr>
              ` : ''}
            </table>
          </div>
          
          <p style="font-size: 14px; margin-bottom: 20px;">Please contact the client at your earliest convenience to lock in the quote and finalize their booking.</p>
          
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 25px 0;" />
          
          <p style="font-size: 13px; color: #94a3b8; text-align: center; margin: 0;">This is an automated operational notification sent by SK Voyages Server. Do not reply to this email.</p>
        </div>
      `,
    });
  } catch (companyMailErr) {
    console.error('[BookingEnquiry] Failed to send company notification email:', companyMailErr);
  }

  return NextResponse.json(
    { success: true, message: 'Enquiry received' },
    { status: 200 },
  );
}
