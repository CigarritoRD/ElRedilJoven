import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ImageOff } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { formatDate, formatTime } from '../../lib/utils';
import { EVENT_STATUSES } from '../../lib/constants';

export function EventCard({ event, index = 0 }) {
  const [imgError, setImgError] = useState(false);

  const statusColors = {
    [EVENT_STATUSES.UPCOMING]: 'lime',
    [EVENT_STATUSES.ACTIVE]: 'cyan',
    [EVENT_STATUSES.COMPLETED]: 'muted',
  };

  const statusLabels = {
    [EVENT_STATUSES.UPCOMING]: 'Próximo',
    [EVENT_STATUSES.ACTIVE]: 'En curso',
    [EVENT_STATUSES.COMPLETED]: 'Finalizado',
  };

  const fallbackImg = 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800';
  const imgSrc = imgError || !event.image_url ? fallbackImg : event.image_url;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/actividades/${event.id}`}>
        <Card glass hover className="h-full overflow-hidden group">
          <div className="relative h-56 overflow-hidden">
            {imgError || !event.image_url ? (
              <div className="h-full w-full bg-gradient-to-br from-primary-container/40 to-surface-container flex items-center justify-center">
                <ImageOff className="h-12 w-12 text-primary/50" />
              </div>
            ) : (
              <img
                src={imgSrc}
                alt={event.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={() => setImgError(true)}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-surface-dim/80 to-transparent" />
            <div className="absolute top-4 left-4">
              <Badge variant={statusColors[event.status]}>
                {statusLabels[event.status]}
              </Badge>
            </div>
            {event.is_featured && (
              <div className="absolute top-4 right-4">
                <Badge variant="gold">Destacado</Badge>
              </div>
            )}
          </div>

          <div className="p-6">
            <Badge variant="purple" className="mb-3">
              {event.category}
            </Badge>

            <h3 className="text-xl font-display font-bold text-white mb-3 group-hover:text-primary transition-colors">
              {event.title}
            </h3>

            <p className="text-on-surface-variant text-sm mb-4 line-clamp-2">
              {event.description}
            </p>

            <div className="space-y-2 text-sm text-on-surface-variant">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{formatDate(event.event_date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-secondary" />
                <span>{formatTime(event.event_time)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-tertiary" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
