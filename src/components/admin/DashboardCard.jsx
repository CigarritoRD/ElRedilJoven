import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export function DashboardCard({ title, value, icon: Icon, trend, trendLabel, color = 'primary', className }) {
  const colors = {
    primary: 'bg-primary/10 text-primary',
    coral: 'bg-coral/10 text-coral',
    gold: 'bg-gold/10 text-gold-600',
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={cn('rounded-2xl bg-white p-6 shadow-card', className)}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
          {trendLabel && (
            <p className={cn('mt-1 text-xs font-medium', trend > 0 ? 'text-green-600' : 'text-red-600')}>
              {trend > 0 ? '+' : ''}{trend}% {trendLabel}
            </p>
          )}
        </div>
        <div className={cn('rounded-xl p-3', colors[color])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </motion.div>
  );
}
