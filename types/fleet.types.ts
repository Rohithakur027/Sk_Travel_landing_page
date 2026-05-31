// Fleet / Vehicle-related TypeScript interfaces

export type VehicleCategory = 'Sedan' | 'SUV' | 'Hatchback' | 'Innova' | 'Tempo' | 'Mini';

export interface Vehicle {
  id: string;
  name: string;
  category: VehicleCategory;
  imageUrl: string;
  capacity: number;
  pricePerKm: number;
  pricePerHour?: number;
  features: string[];
  isAvailable: boolean;
  rating?: number;
  reviewCount?: number;
}

export interface FleetFilter {
  category?: VehicleCategory;
  minCapacity?: number;
  maxPrice?: number;
}
