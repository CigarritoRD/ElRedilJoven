import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ArrowLeft, Share2 } from 'lucide-react';
import { Navbar } from '../../components/public/Navbar';
import { Footer } from '../../components/public/Footer';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useEvent } from '../../hooks/useEvents';
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton';
import { formatDate, formatTime } from '../../lib/utils';
import { EVENT_STATUSES } from '../../lib/constants';

export function ActivityDetail() {
  const { id } = useParams();
  const { event, isLoading } = useEvent(id);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container-custom py-12">
          <LoadingSkeleton className="h-96 w-full rounded-2xl" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container-custom py-12 text-center">
          <h1 className="text-2xl font-display font-bold text-white mb-4">Actividad no encontrada</h1>
          <Link to="/actividades">
            <Button>Volver a actividades</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

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

  return (
    <div className="min-h-screen">
      <Navbar />

      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative h-[50vh] min-h-[400px]">
          <img
            src={event.image_url || 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1600'}
            alt={event.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-surface/40 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container-custom">
              <Link
                to="/actividades"
                className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary mb-4 transition"
              >
                <ArrowLeft className="h-5 w-5" />
                Volver a actividades
              </Link>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant={statusColors[event.status]}>
                  {statusLabels[event.status]}
                </Badge>
                <Badge variant="purple">{event.category}</Badge>
                {event.is_featured && <Badge variant="gold">Destacado</Badge>}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-white mb-4">
                {event.title}
              </h1>
            </div>
          </div>
        </div>

        <div className="bg-surface py-12">
          <div className="container-custom">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-2xl font-display font-bold text-white mb-4">Descripción</h2>
                  <p className="text-on-surface-variant leading-relaxed whitespace-pre-line">
                    {event.description}
                  </p>
                </motion.div>
              </div>

              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Card glass className="p-6">
                    <h3 className="text-lg font-display font-bold text-white mb-4">Detalles del evento</h3>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium text-white">{formatDate(event.event_date)}</p>
                          <p className="text-sm text-on-surface-variant">Fecha</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-secondary mt-0.5" />
                        <div>
                          <p className="font-medium text-white">{formatTime(event.event_time)}</p>
                          <p className="text-sm text-on-surface-variant">Hora</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-tertiary mt-0.5" />
                        <div>
                          <p className="font-medium text-white">{event.location}</p>
                          <p className="text-sm text-on-surface-variant">Lugar</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/10">
                      <Button className="w-full flex items-center justify-center gap-2">
                        <Share2 className="h-4 w-4" />
                        Compartir evento
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.article>

      <Footer />
    </div>
  );
}
