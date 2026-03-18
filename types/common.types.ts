// Common shared types used across the project

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  statusCode: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  label: string;
  value: string;
  icon?: string;
}

export interface Feature {
  title: string;
  description: string;
  icon?: string;
}

export interface Service {
  title: string;
  description: string;
  icon?: string;
  imageUrl?: string;
}
