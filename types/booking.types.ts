// Booking-related TypeScript interfaces

export type TripType = 'one-way' | 'round-trip' | 'hourly' | 'airport';

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'in-progress'
  | 'completed'
  | 'cancelled';

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  pickupLocation: string;
  dropLocation: string;
  pickupDate: string;
  pickupTime: string;
  returnDate?: string;
  tripType: TripType;
  vehicleId?: string;
  passengers: number;
  specialRequests?: string;
}

export interface Booking extends BookingFormData {
  id: string;
  status: BookingStatus;
  totalFare?: number;
  createdAt: string;
  updatedAt: string;
}
