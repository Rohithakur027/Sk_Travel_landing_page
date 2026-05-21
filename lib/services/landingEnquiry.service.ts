import { sheets } from '@/lib/googleSheets';
import transporter from '@/lib/mailer';
import { prisma } from '@/lib/prisma';
import axios from 'axios';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BaseEnquiryData {
  type: 'instant' | 'scheduled';
  pickup_location: string;
  destination: string;
  vehicle_type: string;
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

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getISTDateTime(): string {
  const now = new Date();
  const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
  const ist = new Date(now.getTime() + IST_OFFSET_MS);

  const day = ist.getUTCDate().toString().padStart(2, '0');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[ist.getUTCMonth()];
  const year = ist.getUTCFullYear();

  let hours = ist.getUTCHours();
  const minutes = ist.getUTCMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;

  return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
}

// ─── Google Sheets ────────────────────────────────────────────────────────────

const SHEET_ID = process.env.GOOGLE_SHEET_ID ?? '';

const INSTANT_TAB = 'Instant Bookings';
const SCHEDULED_TAB = 'Scheduled Bookings';
const GENERAL_ENQUIRIES_TAB = 'General Enquiries';

/**
 * Instant Bookings columns (A–K):
 *   Submitted At | Name | Email | Phone | Pickup | Destination | Vehicle Type | Passengers | Category | Return Trip | Return Date
 *
 * Scheduled Bookings columns (A–M):
 *   Submitted At | Name | Email | Phone | Pickup | Destination | Date | Time | Vehicle Type | Passengers | Category | Return Trip | Return Date
 *
 * General Enquiries columns (A–G):
 *   Submitted At | Name | Email | Mobile | Company | Message
 */
export async function appendToGoogleSheet(data: BookingEnquiryData): Promise<void> {
  const submittedAt = getISTDateTime();

  let sheetTab: string;
  let row: (string | number | boolean)[];

  if (data.type === 'instant') {
    sheetTab = INSTANT_TAB;
    row = [
      submittedAt,
      data.name,
      data.email,
      data.phone,
      data.pickup_location,
      data.destination,
      data.vehicle_type,
      data.passengers,
      data.booking_category ?? '',
      data.is_return_trip ? 'Yes' : 'No',
      data.is_return_trip && data.return_date ? data.return_date : '',
      data.is_return_trip && data.return_time ? data.return_time : '',
    ];
  } else if (data.type === 'scheduled') {
    sheetTab = SCHEDULED_TAB;
    row = [
      submittedAt,
      data.name,
      data.email,
      data.phone,
      data.pickup_location,
      data.destination,
      data.date ?? '',
      data.time ?? '',
      data.vehicle_type,
      data.passengers,
      data.booking_category ?? '',
      data.is_return_trip ? 'Yes' : 'No',
      data.is_return_trip && data.return_date ? data.return_date : '',
      data.is_return_trip && data.return_time ? data.return_time : '',
    ];
  } else {
    sheetTab = GENERAL_ENQUIRIES_TAB;
    row = [
      submittedAt,
      data.name,
      data.email,
      data.mobile,
      data.company_name,
      data.message,
    ];
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: `${sheetTab}!A1`,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [row] },
  });
}

// ─── Email notification ───────────────────────────────────────────────────────

export async function sendTeamNotification(data: BookingEnquiryData): Promise<void> {
  const submittedAt = getISTDateTime();

  let subject: string;
  if (data.type === 'instant') {
    subject = `New Instant Booking — ${data.name} | ${data.vehicle_type}`;
  } else if (data.type === 'scheduled') {
    subject = `New Scheduled Booking — ${data.name} | ${data.date} ${data.time}`;
  } else {
    subject = `New General Enquiry — ${data.name} | ${data.company_name}`;
  }

  const d = data as BaseEnquiryData;
  const returnTripRows =
    data.type !== 'general_enquiry' && d.booking_category === 'airport_taxis' && d.is_return_trip
      ? `
    <tr style="background:#fff3e0;">
      <td><strong>Return Trip</strong></td><td><strong>Yes</strong></td>
    </tr>
    <tr style="background:#fff3e0;">
      <td><strong>Return Date</strong></td>
      <td><strong>${d.return_date ?? '—'}</strong></td>
    </tr>
    <tr style="background:#fff3e0;">
      <td><strong>Return Time</strong></td>
      <td><strong>${d.return_time ?? '—'}</strong></td>
    </tr>`
      : '';

  const bodyRows =
    data.type !== 'general_enquiry'
      ? `
      <tr><td>Name</td><td>${data.name}</td></tr>
      <tr><td>Email</td><td>${data.email}</td></tr>
      <tr><td>Phone</td><td>${data.phone}</td></tr>
      <tr><td>Pickup</td><td>${data.pickup_location}</td></tr>
      <tr><td>Destination</td><td>${data.destination}</td></tr>
      <tr><td>Category</td><td>${(data as BaseEnquiryData).booking_category ?? '—'}</td></tr>
      <tr><td>Vehicle</td><td>${data.vehicle_type}</td></tr>
      <tr><td>Passengers</td><td>${data.passengers}</td></tr>
      ${returnTripRows}
    `
      : `
      <tr><td>Name</td><td>${data.name}</td></tr>
      <tr><td>Email</td><td>${data.email}</td></tr>
      <tr><td>Mobile</td><td>${data.mobile}</td></tr>
      <tr><td>Company</td><td>${data.company_name}</td></tr>
      <tr><td>Message</td><td style="white-space:pre-wrap;">${data.message}</td></tr>
    `;

  const scheduledRows =
    data.type === 'scheduled'
      ? `
    <tr style="background:#fff8e1;">
      <td><strong>Date</strong></td><td><strong>${data.date}</strong></td>
    </tr>
    <tr style="background:#fff8e1;">
      <td><strong>Time</strong></td><td><strong>${data.time}</strong></td>
    </tr>`
      : '';

  const label =
    data.type === 'instant' ? 'Instant Booking' :
    data.type === 'scheduled' ? 'Scheduled Booking' : 'General Enquiry';

  const badgeBg = data.type === 'general_enquiry' ? '#fce4ec' : data.type === 'instant' ? '#e8f5e9' : '#e3f2fd';
  const badgeColor = data.type === 'general_enquiry' ? '#c62828' : data.type === 'instant' ? '#2e7d32' : '#1565c0';

  const recipientEmails = process.env.NOTIFY_EMAIL?.split(',').map(e => e.trim()) || [];

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="font-family:Arial,sans-serif;color:#333;max-width:600px;margin:0 auto;padding:20px;">
  <h2 style="color:#1a1a2e;border-bottom:2px solid #e0e0e0;padding-bottom:8px;">
    New Enquiry Received
  </h2>
  <p style="margin:4px 0 16px;">
    <span style="display:inline-block;padding:3px 10px;border-radius:4px;
      background:${badgeBg};color:${badgeColor};font-weight:bold;font-size:13px;">
      ${label}
    </span>
  </p>
  <table style="width:100%;border-collapse:collapse;font-size:14px;">
    <thead>
      <tr style="background:#f5f5f5;">
        <th style="text-align:left;padding:8px 12px;border:1px solid #ddd;width:40%;">Field</th>
        <th style="text-align:left;padding:8px 12px;border:1px solid #ddd;">Value</th>
      </tr>
    </thead>
    <tbody>
      ${scheduledRows}
      ${bodyRows}
    </tbody>
  </table>
  <p style="margin-top:24px;font-size:12px;color:#888;border-top:1px solid #eee;padding-top:12px;">
    Submitted at ${submittedAt} IST via SK Travels Landing Page
  </p>
</body>
</html>
  `.trim();

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: recipientEmails.length > 0 ? recipientEmails.join(', ') : process.env.NOTIFY_EMAIL,
    subject,
    html,
  });
}

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

  let scheduledDateTime: Date | null = null;
  if (data.type === 'scheduled' && data.date && data.time) {
    const iso = `${data.date}T${data.time.length === 5 ? data.time : data.time.slice(0, 5)}:00+05:30`;
    const parsed = new Date(iso);
    if (!isNaN(parsed.getTime())) scheduledDateTime = parsed;
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
      customer_name: data.name,
      customer_email: data.email,
      customer_mobile: data.phone,
      scheduled_date_time: scheduledDateTime,
      status: 'new',
      pickup_lat: data.pickup_lat ?? null,
      pickup_lng: data.pickup_lng ?? null,
      destination_lat: data.destination_lat ?? null,
      destination_lng: data.destination_lng ?? null,
      distance_km: data.distance_km ?? null,
    },
  });
}

// ─── Admin API forward ────────────────────────────────────────────────────────

export async function sendToAdminAPI(data: BookingEnquiryData): Promise<void> {
  const adminApiUrl = process.env.ADMIN_API_URL;
  if (!adminApiUrl) return;

  try {
    await axios.post(adminApiUrl, data, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 5000,
    });
  } catch (err: any) {
    console.error('[AdminAPI] Request failed:', err.response?.data || err.message);
  }
}
