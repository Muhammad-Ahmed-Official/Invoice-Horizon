import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  gradient?: string;
}

export default function StatCard({ title, value, icon: Icon, trend, trendUp, gradient = 'from-indigo-500 to-purple-600' }: StatCardProps) {
  return (
    <Card className={`overflow-hidden border-0 shadow-lg hover-lift bg-linear-to-br ${gradient} text-white`}>
        <div className='p-6 md:py-8'>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-white/80">{title}</p>
              <p className="mt-2 text-xl md:text-2xl font-bold">{value}</p>
              {trend && (
                <p className={`mt-2 text-sm font-medium ${trendUp ? 'text-green-200' : 'text-red-200'}`}>
                  {trend}
                </p>
              )}
            </div>
            <div className="rounded-xl bg-white/20 p-2 md:p-3 backdrop-blur-sm">
              <Icon className="h-4 w-4 md:h-7 md:w-7" />
            </div>
          </div>
        </div>
      </Card>
  );
}