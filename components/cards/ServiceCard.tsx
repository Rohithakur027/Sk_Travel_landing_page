import Card from '@/components/common/Card';
import type { Service } from '@/types/common.types';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Card className="hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="text-4xl mb-4">{service.icon}</div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{service.description}</p>
    </Card>
  );
}
