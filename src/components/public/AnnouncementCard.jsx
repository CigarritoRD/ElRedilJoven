import { motion } from 'framer-motion';
import { Megaphone } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { formatDate } from '../../lib/utils';
import { ANNOUNCEMENT_IMPORTANCE } from '../../lib/constants';

export function AnnouncementCard({ announcement, index = 0 }) {
  const importanceConfig = {
    [ANNOUNCEMENT_IMPORTANCE.BAJA]: { variant: 'muted', label: 'Informativo' },
    [ANNOUNCEMENT_IMPORTANCE.NORMAL]: { variant: 'primary', label: 'Importante' },
    [ANNOUNCEMENT_IMPORTANCE.ALTA]: { variant: 'coral', label: 'Muy importante' },
  };

  const config = importanceConfig[announcement.importance] || importanceConfig.normal;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card glass className="h-full">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className={`flex-shrink-0 rounded-full p-3 ${
              announcement.importance === ANNOUNCEMENT_IMPORTANCE.ALTA
                ? 'bg-coral/10'
                : 'bg-primary-container/10'
            }`}>
              <Megaphone className={`h-5 w-5 ${
                announcement.importance === ANNOUNCEMENT_IMPORTANCE.ALTA
                  ? 'text-coral'
                  : 'text-primary'
              }`} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant={config.variant}>{config.label}</Badge>
                <span className="text-xs text-on-surface-variant">
                  {formatDate(announcement.created_at)}
                </span>
              </div>

              <h3 className="text-lg font-display font-bold text-white mb-2">
                {announcement.title}
              </h3>

              <p className="text-on-surface-variant text-sm leading-relaxed">
                {announcement.content}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
