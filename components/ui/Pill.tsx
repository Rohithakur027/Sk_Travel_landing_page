interface PillProps {
  children: React.ReactNode;
  variant?: 'light' | 'dark';
  className?: string;
}

export default function Pill({ children, variant = 'light', className = '' }: PillProps) {
  const base =
    'inline-flex items-center justify-center rounded-full border px-6 py-2 text-sm font-bold';
  const variants = {
    light:
      'border-[rgba(255,210,63,0.3)] bg-[linear-gradient(168.37deg,rgba(255,210,63,0.15)_6.78%,rgba(255,210,63,0.08)_93.22%)] text-white',
    dark: 'border-[#FDE68A] bg-[#FFF9E6] text-[#1F2937]',
  };
  return <span className={`${base} ${variants[variant]} ${className}`}>{children}</span>;
}
