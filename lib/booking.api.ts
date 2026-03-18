import apiClient from './api';
import { ENDPOINTS } from '@/constants/endpoints';
import { Booking, BookingFormData } from '@/types/booking.types';
import { ApiResponse } from '@/types/common.types';

export const bookingApi = {
  /**
   * Create a new booking
   */
  create: async (data: BookingFormData): Promise<ApiResponse<Booking>> => {
    const response = await apiClient.post<ApiResponse<Booking>>(
      ENDPOINTS.BOOKING.CREATE,
      data
    );
    return response.data;
  },

  /**
   * Get all bookings
   */
  getAll: async (): Promise<ApiResponse<Booking[]>> => {
    const response = await apiClient.get<ApiResponse<Booking[]>>(
      ENDPOINTS.BOOKING.GET_ALL
    );
    return response.data;
  },

  /**
   * Get booking by ID
   */
  getById: async (id: string): Promise<ApiResponse<Booking>> => {
    const response = await apiClient.get<ApiResponse<Booking>>(
      ENDPOINTS.BOOKING.GET_BY_ID(id)
    );
    return response.data;
  },

  /**
   * Cancel a booking
   */
  cancel: async (id: string): Promise<ApiResponse<Booking>> => {
    const response = await apiClient.patch<ApiResponse<Booking>>(
      ENDPOINTS.BOOKING.CANCEL(id)
    );
    return response.data;
  },
};
