import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, Clock, MapPin, Edit } from 'lucide-react';
import { useEvents } from '../../hooks/useEvents';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { formatDate, formatTime } from '../../lib/utils';
import { EVENT_STATUSES } from '../../lib/constants';

export function AdminProgram() {
  const { events, isLoading } = useEvents();

  const groupedEvents = useMemo(() => {
    const groups = {};
    events.forEach(event => {
      const date = parseISO(event.event_date);
      const monthYear = format(date, 'MMMM yyyy', { locale: es });
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(event);
    });
    return groups;
  }, [events]);

  const statusColors = {
    [EVENT_STATUSES.UPCOMING]: 'green',
    [EVENT_STATUSES.ACTIVE]: 'blue',
    [EVENT_STATUSES.COMPLETED]: 'default',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Programa Mensual</h1>
        <p className="text-white/60">Vista general del programa de actividades</p>
      </div>

      {isLoading ? (
        <div className="space-y-8">
          {[...Array(2)].map((_, i) => (
            <div key={i}>
              <div className="h-8 w-48 bg-white/10 rounded mb-4 animate-pulse" />
              <div className="grid gap-4 md:grid-cols-2">
                {[...Array(2)].map((_, j) => (
                  <div key={j} className="h-32 animate-pulse rounded-xl bg-white/10" />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        Object.entries(groupedEvents).map(([monthYear, monthEvents]) => (
          <div key={monthYear}>
            <h2 className="text-xl font-bold text-white mb-4 capitalize">{monthYear}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {monthEvents.map((event) => (
                <Card key={event.id} className="p-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-20 h-20 rounded-xl bg-primary/10 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-primary">
                        {format(parseISO(event.event_date), 'd')}
                      </span>
                      <span className="text-xs text-primary uppercase">
                        {format(parseISO(event.event_date), 'EEE', { locale: es })}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-white mb-1">{event.title}</h3>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/60">
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {formatTime(event.event_time)}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              {event.location}
                            </span>
                          </div>
                        </div>
                        <Badge variant={statusColors[event.status]} className="text-xs">
                          {event.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))
      )}

      {!isLoading && Object.keys(groupedEvents).length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-white/30 mx-auto mb-4" />
          <p className="text-white/60">No hay actividades programadas</p>
          <Link to="/admin/actividades" className="text-primary hover:underline text-sm">
            Crear primera actividad
          </Link>
        </div>
      )}
    </div>
  );
}
