import { prisma } from '@/lib/prisma';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BaseEnquiryData {
  type: 'instant' | 'scheduled';
  pickup_location: string;
  destination: string;
  vehicle_type: string;
  vehicle_label?: string;
  passengers: number;
  name: string;
  email: string;
  phone: string;
  pickup_lat?: number;
  pickup_lng?: number;
  destination_lat?: number;
  destination_lng?: number;
  distance_km?: number;
  booking_category?: string;
  is_return_trip?: boolean;
  return_date?: string;
  return_time?: string;
}

export interface InstantEnquiryData extends BaseEnquiryData {
  type: 'instant';
  time?: string;
}

export interface ScheduledEnquiryData extends BaseEnquiryData {
  type: 'scheduled';
  date: string;
  time: string;
}

export interface GeneralEnquiryData {
  type: 'general_enquiry';
  name: string;
  email: string;
  mobile: string;
  company_name: string;
  message: string;
}

export type BookingEnquiryData = InstantEnquiryData | ScheduledEnquiryData | GeneralEnquiryData;

// kept for backward-compat with special-booking route import
export type SpecialBookingData = GeneralEnquiryData;

// ─── Supabase (Prisma) ────────────────────────────────────────────────────────

export async function saveToDatabase(data: BookingEnquiryData): Promise<void> {
  if (data.type === 'general_enquiry') {
    await prisma.website_general_enquiries.create({
      data: {
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        company_name: data.company_name,
        message: data.message,
      },
    });
    return;
  }

  // Build pickup_date_time for both booking types, treating input as IST (UTC+5:30)
  let pickupDateTime: Date | null = null;
  if (data.type === 'scheduled' && data.date && data.time) {
    const t = data.time.slice(0, 5);
    const parsed = new Date(`${data.date}T${t}:00+05:30`);
    if (!isNaN(parsed.getTime())) pickupDateTime = parsed;
  } else if (data.type === 'instant') {
    const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
    const istNow = new Date(Date.now() + IST_OFFSET_MS);
    const today = istNow.toISOString().split('T')[0];
    const t = data.time ? data.time.slice(0, 5) : '00:00';
    const parsed = new Date(`${today}T${t}:00+05:30`);
    if (!isNaN(parsed.getTime())) pickupDateTime = parsed;
  }

  let returnDateTime: Date | null = null;
  if (data.is_return_trip && data.return_date) {
    const timeStr = data.return_time
      ? (data.return_time.length === 5 ? data.return_time : data.return_time.slice(0, 5))
      : '00:00';
    const parsed = new Date(`${data.return_date}T${timeStr}:00+05:30`);
    if (!isNaN(parsed.getTime())) returnDateTime = parsed;
  }

  await prisma.website_booking_enquiries.create({
    data: {
      is_scheduled: data.type === 'scheduled',
      booking_type: data.type,
      booking_category: data.booking_category ?? null,
      is_return_trip: data.is_return_trip ?? false,
      return_date_time: returnDateTime,
      pickup_location: data.pickup_location,
      destination: data.destination,
      passengers: data.passengers,
      vehicle_type: data.vehicle_type,
      vehicle_label: data.vehicle_label ?? null,
      customer_name: data.name,
      customer_email: data.email,
      customer_mobile: data.phone,
      pickup_date_time: pickupDateTime,
      status: 'new',
      pickup_lat: data.pickup_lat ?? null,
      pickup_lng: data.pickup_lng ?? null,
      destination_lat: data.destination_lat ?? null,
      destination_lng: data.destination_lng ?? null,
      distance_km: data.distance_km ?? null,
    },
  });
}
