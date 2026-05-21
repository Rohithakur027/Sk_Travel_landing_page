import { NextRequest, NextResponse } from 'next/server';
import {
  saveToDatabase,
  type GeneralEnquiryData,
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

  return NextResponse.json({ success: true, message: 'Enquiry received' });
}
