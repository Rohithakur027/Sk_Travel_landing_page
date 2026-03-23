import apiClient from './api';
import { ENDPOINTS } from '@/constants/endpoints';
import { ApiResponse } from '@/types/common.types';

export interface ContactFormData {
  contact_first_name: string;
  contact_last_name: string;
  company_name: string;
  contact_email: string;
  contact_phone: string;
  message: string;
}

export const contactApi = {
  /**
   * Send contact form submission as a company enquiry
   */
  send: async (data: ContactFormData): Promise<ApiResponse<null>> => {
    const response = await apiClient.post<ApiResponse<null>>(
      ENDPOINTS.CONTACT.SEND,
      data
    );
    return response.data;
  },
};
