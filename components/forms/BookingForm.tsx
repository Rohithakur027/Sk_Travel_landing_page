'use client';

import { useState } from 'react';
import Input from '@/components/common/Input';
import Select from '@/components/common/Select';
import Button from '@/components/common/Button';
import { useBooking } from '@/hooks/useBooking';
import type { BookingFormData, TripType } from '@/types/booking.types';

const tripTypeOptions = [
  { value: '', label: 'Select Trip Type' },
  { value: 'one-way', label: 'One Way' },
  { value: 'round-trip', label: 'Round Trip' },
  { value: 'hourly', label: 'Hourly Rental' },
  { value: 'airport', label: 'Airport Transfer' },
];

const passengerOptions = [
  { value: '1', label: '1 Passenger' },
  { value: '2', label: '2 Passengers' },
  { value: '3', label: '3 Passengers' },
  { value: '4', label: '4 Passengers' },
  { value: '5', label: '5 Passengers' },
  { value: '6', label: '6 Passengers' },
  { value: '7', label: '7+ Passengers' },
];

const INITIAL_STATE: BookingFormData = {
  name: '',
  email: '',
  phone: '',
  pickupLocation: '',
  dropLocation: '',
  pickupDate: '',
  pickupTime: '',
  returnDate: '',
  tripType: '' as TripType,
  vehicleId: '',
  passengers: 1,
  specialRequests: '',
};

export default function BookingForm() {
  const { submitBooking, isLoading, isSuccess, error, reset } = useBooking();
  const [formData, setFormData] = useState<BookingFormData>(INITIAL_STATE);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'passengers' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitBooking(formData);
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center space-y-4">
        <p className="text-2xl">✅</p>
        <h3 className="text-xl font-semibold text-gray-900">Booking Confirmed!</h3>
        <p className="text-gray-500">
          We&apos;ve received your booking. Our team will reach out to you shortly.
        </p>
        <Button variant="outline" onClick={reset}>
          Book Another Ride
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 bg-white rounded-2xl shadow-lg p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Personal Details */}
        <Input
          id="name"
          name="name"
          label="Full Name"
          placeholder="John Doe"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          id="phone"
          name="phone"
          type="tel"
          label="Phone"
          placeholder="+91 99999 00000"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        {/* Trip Type */}
        <Select
          id="tripType"
          name="tripType"
          label="Trip Type"
          options={tripTypeOptions}
          value={formData.tripType}
          onChange={handleChange}
          required
        />

        {/* Locations */}
        <Input
          id="pickupLocation"
          name="pickupLocation"
          label="Pickup Location"
          placeholder="Enter pickup address"
          value={formData.pickupLocation}
          onChange={handleChange}
          required
        />
        <Input
          id="dropLocation"
          name="dropLocation"
          label="Drop-off Location"
          placeholder="Enter drop-off address"
          value={formData.dropLocation}
          onChange={handleChange}
          required
        />

        {/* Date & Time */}
        <Input
          id="pickupDate"
          name="pickupDate"
          type="date"
          label="Pickup Date"
          value={formData.pickupDate}
          onChange={handleChange}
          required
        />
        <Input
          id="pickupTime"
          name="pickupTime"
          type="time"
          label="Pickup Time"
          value={formData.pickupTime}
          onChange={handleChange}
          required
        />

        {/* Return date — only shown for round-trip */}
        {formData.tripType === 'round-trip' && (
          <Input
            id="returnDate"
            name="returnDate"
            type="date"
            label="Return Date"
            value={formData.returnDate ?? ''}
            onChange={handleChange}
            required
          />
        )}

        {/* Passengers */}
        <Select
          id="passengers"
          name="passengers"
          label="Passengers"
          options={passengerOptions}
          value={String(formData.passengers)}
          onChange={handleChange}
          required
        />
      </div>

      {/* Special Requests */}
      <div className="flex flex-col gap-1">
        <label htmlFor="specialRequests" className="text-sm font-medium text-gray-700">
          Special Requests <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          id="specialRequests"
          name="specialRequests"
          rows={3}
          placeholder="Any special requirements or notes..."
          value={formData.specialRequests ?? ''}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, specialRequests: e.target.value }))
          }
          className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-200 resize-none"
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 px-4 py-2 rounded-lg">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
        {isLoading ? 'Submitting...' : 'Confirm Booking'}
      </Button>
    </form>
  );
}
