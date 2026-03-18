// API endpoint constants
// Values are populated from environment variables

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const ENDPOINTS = {
  // Booking
  BOOKING: {
    CREATE: `${BASE_URL}/bookings`,
    GET_ALL: `${BASE_URL}/bookings`,
    GET_BY_ID: (id: string) => `${BASE_URL}/bookings/${id}`,
    UPDATE: (id: string) => `${BASE_URL}/bookings/${id}`,
    CANCEL: (id: string) => `${BASE_URL}/bookings/${id}/cancel`,
  },

  // Fleet
  FLEET: {
    GET_ALL: `${BASE_URL}/fleet`,
    GET_BY_ID: (id: string) => `${BASE_URL}/fleet/${id}`,
    GET_AVAILABLE: `${BASE_URL}/fleet/available`,
  },

  // Contact
  CONTACT: {
    SEND: `${BASE_URL}/contact`,
  },
} as const;
