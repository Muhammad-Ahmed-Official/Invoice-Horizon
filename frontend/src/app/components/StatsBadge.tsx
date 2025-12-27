import { cn } from '@/lib/utils';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: 'paid' | 'pending' | 'overdue';
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const icons = {
    paid: CheckCircle,
    pending: Clock,
    overdue: AlertCircle,
  };

  const Icon = icons[status];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-sm',
        status === 'paid' && 'bg-green-400 text-white',
        status === 'pending' && 'bg-amber-500 text-white',
        status === 'overdue' && 'bg-rose-600 text-white'
      )}
    >
      <Icon className="h-3 w-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}