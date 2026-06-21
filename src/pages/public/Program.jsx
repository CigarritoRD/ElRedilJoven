import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/public/Navbar';
import { Footer } from '../../components/public/Footer';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { ImageOff, MapPin } from 'lucide-react';
import { useEvents } from '../../hooks/useEvents';
import { LoadingSkeleton } from '../../components/ui/LoadingSkeleton';
import { usePageSections } from '../../hooks/usePageSections';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { formatTime } from '../../lib/utils';
import { EVENT_STATUSES } from '../../lib/constants';
import { Link } from 'react-router-dom';

export function Program() {
  const { events, isLoading } = useEvents();
  const { data: sections } = usePageSections();
  const programSections = sections?.program || {};

  const timelineItems = useMemo(() => {
    const sorted = [...events].sort((a, b) =>
      new Date(a.event_date) - new Date(b.event_date)
    );

    const items = [];
    let currentMonth = '';

    sorted.forEach((event, index) => {
      const date = parseISO(event.event_date);
      const monthYear = format(date, 'MMMM yyyy', { locale: es });

      if (monthYear !== currentMonth) {
        currentMonth = monthYear;
        items.push({ type: 'month', label: monthYear });
      }

      items.push({ type: 'event', event, eventIndex: index });
    });

    return items;
  }, [events]);

  const dotColor = (status) => {
    if (status === EVENT_STATUSES.UPCOMING) return 'bg-tertiary shadow-[0_0_15px_rgba(164,214,76,0.6)]';
    if (status === EVENT_STATUSES.ACTIVE) return 'bg-secondary shadow-[0_0_15px_rgba(173,198,255,0.6)]';
    return 'bg-on-surface-variant shadow-[0_0_15px_rgba(204,195,216,0.3)]';
  };

  const statusColor = (status) => {
    if (status === EVENT_STATUSES.UPCOMING) return 'text-tertiary';
    if (status === EVENT_STATUSES.ACTIVE) return 'text-secondary';
    return 'text-on-surface-variant';
  };

  const eventCount = events.length;

  const EventImage = ({ event }) => (
    <div className="w-full aspect-video rounded-2xl overflow-hidden glass-card">
      {event.image_url ? (
        <img
          src={event.image_url}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="h-full w-full bg-gradient-to-br from-primary-container/40 to-surface-container flex items-center justify-center">
          <ImageOff className="h-12 w-12 text-primary/50" />
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="relative pt-32 md:pt-36 pb-12 overflow-hidden bg-surface">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-container/10 to-transparent" />
        <div className="container-custom relative z-10">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-label-sm mb-4 border border-primary/20">
            Calendario 2026
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-4">
            {programSections.hero?.title || 'Próximos'} <span className="text-gradient">Encuentros</span>
          </h1>
          <p className="text-on-surface-variant text-lg max-w-2xl">
            {programSections.hero?.subtitle || 'Explora nuestra programación mensual diseñada para conectar, crecer y celebrar juntos.'}
          </p>
        </div>
      </section>

      <main className="relative container-custom mx-auto py-8">
        {isLoading ? (
          <div className="space-y-12">
            {[...Array(3)].map((_, i) => (
              <LoadingSkeleton key={i} className="h-48 bg-surface-container" />
            ))}
          </div>
        ) : (
          <div className="relative">
            <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-container via-tertiary to-transparent hidden md:block" />

            <div className="space-y-12">
              {timelineItems.map((item, idx) => {
                if (item.type === 'month') {
                  return (
                    <h2
                      key={`month-${item.label}`}
                      className="font-display font-bold text-2xl text-white capitalize pt-4"
                    >
                      {item.label}
                    </h2>
                  );
                }

                const { event, eventIndex } = item;
                const isEven = eventIndex % 2 === 0;
                const isLast = eventIndex === eventCount - 1;

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: eventIndex * 0.05 }}
                  >
                    <div className={`relative grid grid-cols-[24px_1fr] md:grid-cols-[1fr_48px_1fr] gap-4 md:gap-0 items-center`}>
                      <div
                        className={`absolute left-[20px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full ${dotColor(event.status)} z-20 ${
                          isEven ? 'md:order-2' : 'md:order-2'
                        }`}
                      />

                      {isEven ? (
                        <>
                          <div className="md:col-start-1 md:col-end-2 md:pr-6 md:text-right ml-12 md:ml-0">
                            <Card glass className="w-full p-6 hover:border-primary/50 transition-all duration-200 hover:scale-[1.02]">
                              <span className={`font-label-sm font-semibold mb-2 block ${statusColor(event.status)}`}>
                                {format(parseISO(event.event_date), "d 'de' MMMM", { locale: es })} · {formatTime(event.event_time)}
                              </span>
                              <h3 className="font-display font-bold text-xl text-white mb-2">{event.title}</h3>
                              <p className="text-on-surface-variant text-sm mb-4 line-clamp-3">{event.description}</p>
                              <div className="flex flex-wrap gap-2 mb-4">
                                <Badge variant="purple">{event.category}</Badge>
                                {event.is_featured && <Badge variant="gold">Destacado</Badge>}
                              </div>
                              <div className="flex items-center gap-4 text-on-surface-variant text-xs mb-4">
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {event.location}
                                </span>
                              </div>
                              <div className={isEven ? 'md:flex md:justify-end' : ''}>
                                <Link to={`/actividades/${event.id}`}>
                                  <Button variant="secondary" size="sm">
                                    Ver detalles
                                  </Button>
                                </Link>
                              </div>
                            </Card>
                          </div>

                          <div className="hidden md:block md:col-start-3 md:col-end-4 md:pl-6">
                            <EventImage event={event} />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="hidden md:block md:col-start-1 md:col-end-2 md:pr-6">
                            <EventImage event={event} />
                          </div>

                          <div className="ml-12 md:ml-0 md:col-start-3 md:col-end-4 md:pl-6">
                            <Card glass className="w-full p-6 hover:border-primary/50 transition-all duration-200 hover:scale-[1.02]">
                              <span className={`font-label-sm font-semibold mb-2 block ${statusColor(event.status)}`}>
                                {format(parseISO(event.event_date), "d 'de' MMMM", { locale: es })} · {formatTime(event.event_time)}
                              </span>
                              <h3 className="font-display font-bold text-xl text-white mb-2">{event.title}</h3>
                              <p className="text-on-surface-variant text-sm mb-4 line-clamp-3">{event.description}</p>
                              <div className="flex flex-wrap gap-2 mb-4">
                                <Badge variant="purple">{event.category}</Badge>
                                {event.is_featured && <Badge variant="gold">Destacado</Badge>}
                              </div>
                              <div className="flex items-center gap-4 text-on-surface-variant text-xs mb-4">
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {event.location}
                                </span>
                              </div>
                              <Link to={`/actividades/${event.id}`}>
                                <Button variant="secondary" size="sm">
                                  Ver detalles
                                </Button>
                              </Link>
                            </Card>
                          </div>
                        </>
                      )}

                      {!isLast && (
                        <div className="hidden md:block absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-transparent to-primary-container/30" />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {!isLoading && timelineItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-on-surface-variant text-lg">No hay actividades programadas</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
