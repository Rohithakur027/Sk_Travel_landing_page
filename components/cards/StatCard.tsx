interface StatCardProps {
  value: string | number;
  label: string;
  suffix?: string;
  className?: string;
}

export default function StatCard({ value, label, suffix = '', className = '' }: StatCardProps) {
  return (
    <div className={`text-center ${className}`}>
      <p className="text-4xl md:text-5xl font-extrabold text-blue-600">
        {value}{suffix}
      </p>
      <p className="mt-2 text-sm font-medium text-gray-500 uppercase tracking-wide">{label}</p>
    </div>
  );
}
