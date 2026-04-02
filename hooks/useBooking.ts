'use client';

import { useState, useCallback } from 'react';
import { bookingApi } from '@/lib/booking.api';
import { BookingFormData } from '@/types/booking.types';

interface UseBookingReturn {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  submitBooking: (data: BookingFormData) => Promise<void>;
  reset: () => void;
}

export function useBooking(): UseBookingReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitBooking = useCallback(async (data: BookingFormData) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    try {
      await bookingApi.create(data);
      setIsSuccess(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to submit booking.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsLoading(false);
    setIsSuccess(false);
    setError(null);
  }, []);

  return { isLoading, isSuccess, error, submitBooking, reset };
}
