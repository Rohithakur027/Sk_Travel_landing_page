import Image from 'next/image';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';
import type { Fleet } from '@/types/fleet.types';

interface FleetCardProps {
  vehicle: Fleet;
}

export default function FleetCard({ vehicle }: FleetCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 w-full bg-gray-100">
        {vehicle.image && (
          <Image src={vehicle.image} alt={vehicle.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900">{vehicle.name}</h3>
          <Badge variant="success">{vehicle.category}</Badge>
        </div>
        <p className="text-sm text-gray-500 mb-3">{vehicle.description}</p>
        <p className="text-xs text-gray-400 mb-4">Capacity: {vehicle.capacity} passengers</p>
        <Button variant="outline" size="sm" className="w-full">View Details</Button>
      </div>
    </div>
  );
}
