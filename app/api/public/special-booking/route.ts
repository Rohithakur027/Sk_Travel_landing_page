import { NextRequest, NextResponse } from 'next/server';
import {
  appendToGoogleSheet,
  sendTeamNotification,
  type SpecialBookingData,
} from '@/lib/services/landingEnquiry.service';

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
  if (!body.first_name || typeof body.first_name !== 'string' || !body.first_name.trim()) {
    errors.push('First name is required');
  }
  if (!body.last_name || typeof body.last_name !== 'string' || !body.last_name.trim()) {
    errors.push('Last name is required');
  }
  if (!body.email || !String(body.email).includes('@')) {
    errors.push('Valid email is required');
  }
  // Loose phone validation: digits only, at least 10
  const digits = String(body.phone || '').replace(/\D/g, '');
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
    console.warn('[SpecialBooking] Validation failed:', errors, 'Body:', body);
    return NextResponse.json({ success: false, errors }, { status: 400 });
  }

  const data: SpecialBookingData = {
    type: 'special_booking',
    first_name: String(body.first_name).trim(),
    last_name: String(body.last_name).trim(),
    email: String(body.email).trim(),
    phone: String(body.phone).trim(),
    company_name: String(body.company_name).trim(),
    message: String(body.message || '').trim(),
  };

  const [sheetsResult, emailResult] = await Promise.allSettled([
    appendToGoogleSheet(data),
    sendTeamNotification(data),
  ]);

  if (sheetsResult.status === 'rejected') {
    console.error('[SpecialBooking] Sheets failed:', sheetsResult.reason);
  }
  if (emailResult.status === 'rejected') {
    console.error('[SpecialBooking] Email failed:', emailResult.reason);
  }

  return NextResponse.json({ success: true, message: 'Special booking received' });
}
