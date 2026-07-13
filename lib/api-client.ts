import { apiUrl } from '@/lib/apiBase';

const REQUEST_TIMEOUT_MS = 30_000;

interface ApiSuccessResponse {
  success: true;
  message?: string;
  data?: unknown;
}

interface ApiErrorResponse {
  success?: false;
  message?: string;
  errors?: string[];
}

type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

export interface BookingEnquiryPayload {
  type: 'instant' | 'scheduled';
  pickup_location: string;
  destination: string;
  vehicle_type: string;
  booking_category: string;
  is_return_trip: boolean;
  return_date?: string;
  return_time?: string;
  passengers: number;
  name: string;
  email: string;
  phone: string;
  pickup_lng?: number;
  pickup_lat?: number;
  destination_lng?: number;
  destination_lat?: number;
  distance_km?: number;
  date?: string;
  time?: string;
}

export interface SpecialBookingPayload {
  first_name: string;
  last_name: string;
  company_name: string;
  email: string;
  phone: string;
  message: string;
}

class ApiClientError extends Error {
  readonly status?: number;
  readonly errors?: string[];

  constructor(message: string, options: { status?: number; errors?: string[] } = {}) {
    super(message);
    this.name = 'ApiClientError';
    this.status = options.status;
    this.errors = options.errors;
  }
}

function isErrorResponse(payload: ApiResponse | null): payload is ApiErrorResponse {
  return Boolean(payload && payload.success !== true);
}

function isSuccessResponse(payload: ApiResponse | null): payload is ApiSuccessResponse {
  return Boolean(payload && payload.success === true);
}

function getResponseMessage(payload: ApiResponse | null, fallback: string) {
  if (isErrorResponse(payload) && payload.errors?.length) {
    return payload.errors[0];
  }

  if (payload?.message) {
    return payload.message;
  }

  return fallback;
}

async function parseJsonResponse(response: Response): Promise<ApiResponse | null> {
  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as ApiResponse;
  } catch {
    return null;
  }
}

// These endpoints all create records, so a failed request is never safe to
// replay: the server may have committed before the client gave up.
async function postJson<TPayload>(path: string, payload: TPayload): Promise<ApiSuccessResponse> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(apiUrl(path), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    const result = await parseJsonResponse(response);

    if (!response.ok || result?.success === false) {
      throw new ApiClientError(
        getResponseMessage(result, 'Something went wrong. Please try again.'),
        { status: response.status, errors: isErrorResponse(result) ? result.errors : undefined },
      );
    }

    return {
      success: true,
      message: result?.message,
      data: isSuccessResponse(result) ? result.data : undefined,
    };
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error;
    }

    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiClientError(
        'The request timed out. Please check with us before submitting again.',
        { status: 408 },
      );
    }

    throw new ApiClientError('Network error. Please check your connection and try again.');
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export function submitBookingEnquiry(payload: BookingEnquiryPayload) {
  return postJson('/api/public/booking-enquiry', payload);
}

export function submitSpecialBooking(payload: SpecialBookingPayload) {
  return postJson('/api/public/special-booking', payload);
}
