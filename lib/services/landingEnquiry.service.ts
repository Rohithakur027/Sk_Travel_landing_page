import { sheets } from '@/lib/googleSheets';
import transporter from '@/lib/mailer';

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
}

export interface InstantEnquiryData extends BaseEnquiryData {
  type: 'instant';
}

export interface ScheduledEnquiryData extends BaseEnquiryData {
  type: 'scheduled';
  date: string;
  time: string;
}

export type BookingEnquiryData = InstantEnquiryData | ScheduledEnquiryData;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Returns current date-time formatted as "14 Apr 2026, 10:30 AM" in IST (UTC+5:30).
 */
function getISTDateTime(): string {
  const now = new Date();
  // Shift to IST by adding the UTC+5:30 offset manually so the result is
  // environment-independent (server may run in any TZ).
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

/**
 * Appends one row to the correct tab based on booking type.
 *
 * Instant Bookings columns (A–H):
 *   Submitted At | Name | Email | Phone | Pickup | Destination | Vehicle Type | Passengers
 *
 * Scheduled Bookings columns (A–J):
 *   Submitted At | Name | Email | Phone | Pickup | Destination | Date | Time | Vehicle Type | Passengers
 */
export async function appendToGoogleSheet(
  data: BookingEnquiryData,
): Promise<void> {
  const submittedAt = getISTDateTime();

  let sheetTab: string;
  let row: (string | number)[];

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
    ];
  } else {
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
    ];
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    // Using the tab name as the range tells the API to find the next empty row.
    range: `${sheetTab}!A1`,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [row],
    },
  });
}

// ─── Email notification ───────────────────────────────────────────────────────

/**
 * Sends a plain-HTML notification email to the SK Travels team.
 * No customer confirmation email is sent anywhere.
 */
export async function sendTeamNotification(
  data: BookingEnquiryData,
): Promise<void> {
  const submittedAt = getISTDateTime();

  // ── Subject ──────────────────────────────────────────────────────────────
  const subject =
    data.type === 'instant'
      ? `New Instant Booking Enquiry — ${data.name} | ${data.vehicle_type}`
      : `New Scheduled Booking — ${data.name} | ${(data as ScheduledEnquiryData).date} ${(data as ScheduledEnquiryData).time}`;

  // ── HTML body ─────────────────────────────────────────────────────────────
  const commonRows = `
    <tr><td>Name</td><td>${data.name}</td></tr>
    <tr><td>Email</td><td>${data.email}</td></tr>
    <tr><td>Phone</td><td>${data.phone}</td></tr>
    <tr><td>Pickup Location</td><td>${data.pickup_location}</td></tr>
    <tr><td>Destination</td><td>${data.destination}</td></tr>
    <tr><td>Vehicle Type</td><td>${data.vehicle_type}</td></tr>
    <tr><td>Passengers</td><td>${data.passengers}</td></tr>
  `;

  const scheduledRows =
    data.type === 'scheduled'
      ? `
    <tr style="background:#fff8e1;">
      <td><strong>Date</strong></td>
      <td><strong>${(data as ScheduledEnquiryData).date}</strong></td>
    </tr>
    <tr style="background:#fff8e1;">
      <td><strong>Time</strong></td>
      <td><strong>${(data as ScheduledEnquiryData).time}</strong></td>
    </tr>`
      : '';

  const bookingTypeLabel =
    data.type === 'instant' ? 'Instant Booking' : 'Scheduled Booking';

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /></head>
<body style="font-family:Arial,sans-serif;color:#333;max-width:600px;margin:0 auto;padding:20px;">
  <h2 style="color:#1a1a2e;border-bottom:2px solid #e0e0e0;padding-bottom:8px;">
    New Booking Enquiry Received
  </h2>
  <p style="margin:4px 0 16px;">
    <span style="display:inline-block;padding:3px 10px;border-radius:4px;
      background:${data.type === 'instant' ? '#e8f5e9' : '#e3f2fd'};
      color:${data.type === 'instant' ? '#2e7d32' : '#1565c0'};
      font-weight:bold;font-size:13px;">
      ${bookingTypeLabel}
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
      ${commonRows}
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
    to: process.env.NOTIFY_EMAIL,
    subject,
    html,
  });
}
