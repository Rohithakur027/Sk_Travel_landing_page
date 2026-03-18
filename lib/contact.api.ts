import apiClient from './api';
import { ENDPOINTS } from '@/constants/endpoints';
import { ApiResponse } from '@/types/common.types';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export const contactApi = {
  /**
   * Send contact form submission
   */
  send: async (data: ContactFormData): Promise<ApiResponse<null>> => {
    const response = await apiClient.post<ApiResponse<null>>(
      ENDPOINTS.CONTACT.SEND,
      data
    );
    return response.data;
  },
};
