import apiClient from './api';
import { ENDPOINTS } from '@/constants/endpoints';
import { Vehicle, FleetFilter } from '@/types/fleet.types';
import { ApiResponse } from '@/types/common.types';

export const fleetApi = {
  /**
   * Get all vehicles, optionally filtered
   */
  getAll: async (filters?: FleetFilter): Promise<ApiResponse<Vehicle[]>> => {
    const response = await apiClient.get<ApiResponse<Vehicle[]>>(
      ENDPOINTS.FLEET.GET_ALL,
      { params: filters }
    );
    return response.data;
  },

  /**
   * Get vehicle by ID
   */
  getById: async (id: string): Promise<ApiResponse<Vehicle>> => {
    const response = await apiClient.get<ApiResponse<Vehicle>>(
      ENDPOINTS.FLEET.GET_BY_ID(id)
    );
    return response.data;
  },

  /**
   * Get available vehicles
   */
  getAvailable: async (): Promise<ApiResponse<Vehicle[]>> => {
    const response = await apiClient.get<ApiResponse<Vehicle[]>>(
      ENDPOINTS.FLEET.GET_AVAILABLE
    );
    return response.data;
  },
};
