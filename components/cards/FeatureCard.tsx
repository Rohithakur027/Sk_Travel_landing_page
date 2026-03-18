import Card from '@/components/common/Card';
import type { Feature } from '@/types/common.types';

interface FeatureCardProps {
  feature: Feature;
}

export default function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <Card className="hover:shadow-xl transition-shadow duration-300">
      <div className="text-3xl mb-4">{feature.icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
    </Card>
  );
}
