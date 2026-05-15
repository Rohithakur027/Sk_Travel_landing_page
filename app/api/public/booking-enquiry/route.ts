import { NextRequest, NextResponse } from 'next/server';
import {
  appendToGoogleSheet,
  saveToDatabase,
  sendTeamNotification,
  sendToAdminAPI,
  type BookingEnquiryData,
  type ScheduledEnquiryData,
} from '@/lib/services/landingEnquiry.service';

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

  // Run DB write, Google Sheets, team email, and admin API in parallel.
  // These are non-critical — a failure in any must NOT block the response.
  const [dbResult, sheetsResult, emailResult, adminApiResult] = await Promise.allSettled([
    saveToDatabase(data),
    appendToGoogleSheet(data),
    sendTeamNotification(data),
    sendToAdminAPI(data),
  ]);

  if (dbResult.status === 'rejected') {
    console.error('[BookingEnquiry] DB insert failed:', dbResult.reason);
  }
  if (sheetsResult.status === 'rejected') {
    console.error('[BookingEnquiry] Google Sheets append failed:', sheetsResult.reason);
  }
  if (emailResult.status === 'rejected') {
    console.error('[BookingEnquiry] Team notification email failed:', emailResult.reason);
  }
  if (adminApiResult.status === 'rejected') {
    console.error('[BookingEnquiry] Admin API forward failed:', adminApiResult.reason);
  }

  return NextResponse.json(
    { success: true, message: 'Enquiry received' },
    { status: 200 },
  );
}
