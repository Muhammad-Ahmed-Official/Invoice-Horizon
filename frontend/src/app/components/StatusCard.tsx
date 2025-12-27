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
    <Card className="overflow-hidden border-0 shadow-lg hover-lift">
      {/* <CardContent className="p-0"> */}
        <div className={`bg-linear-to-br ${gradient} p-6 text-white`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-white/80">{title}</p>
              <p className="mt-2 text-3xl font-bold">{value}</p>
              {trend && (
                <p className={`mt-2 text-sm font-medium ${trendUp ? 'text-green-200' : 'text-red-200'}`}>
                  {trend}
                </p>
              )}
            </div>
            <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
              <Icon className="h-7 w-7" />
            </div>
          </div>
        </div>
      {/* </CardContent> */}
    </Card>
  );
}