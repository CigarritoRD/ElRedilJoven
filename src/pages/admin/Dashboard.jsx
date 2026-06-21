import { Link } from 'react-router-dom';
import { Calendar, Megaphone, Images, TrendingUp, ArrowRight } from 'lucide-react';
import { DashboardCard } from '../../components/admin/DashboardCard';
import { useEvents } from '../../hooks/useEvents';
import { useAnnouncements } from '../../hooks/useAnnouncements';
import { useGalleries } from '../../hooks/useGallery';
import { Card } from '../../components/ui/Card';
import { formatDate } from '../../lib/utils';

export function Dashboard() {
  const { events } = useEvents();
  const { announcements } = useAnnouncements();
  const { galleries } = useGalleries();

  const upcomingEvents = events.filter(e => e.status === 'upcoming').length;
  const publishedAnnouncements = announcements.filter(a => a.is_published).length;
  const totalPhotos = galleries.reduce((acc, g) => acc + (g.photos?.length || 0), 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-white/60">Resumen de tu portal juvenil</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link to="/admin/actividades">
          <DashboardCard
            title="Actividades"
            value={events.length}
            icon={Calendar}
            color="primary"
          />
        </Link>
        <Link to="/admin/actividades">
          <DashboardCard
            title="Próximos eventos"
            value={upcomingEvents}
            icon={TrendingUp}
            color="coral"
          />
        </Link>
        <Link to="/admin/anuncios">
          <DashboardCard
            title="Anuncios"
            value={publishedAnnouncements}
            icon={Megaphone}
            color="gold"
          />
        </Link>
        <Link to="/admin/galeria">
          <DashboardCard
            title="Fotos"
            value={totalPhotos}
            icon={Images}
            color="green"
          />
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Próximas actividades</h2>
            <Link to="/admin/actividades" className="text-sm text-primary hover:underline flex items-center gap-1">
              Ver todas <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {events.filter(e => e.status === 'upcoming').slice(0, 5).map(event => (
              <div key={event.id} className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{event.title}</p>
                  <p className="text-sm text-white/60">{formatDate(event.event_date)}</p>
                </div>
              </div>
            ))}
            {events.filter(e => e.status === 'upcoming').length === 0 && (
              <p className="text-white/60 text-center py-4">No hay actividades próximas</p>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Anuncios recientes</h2>
            <Link to="/admin/anuncios" className="text-sm text-primary hover:underline flex items-center gap-1">
              Ver todos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {announcements.slice(0, 5).map(announcement => (
              <div key={announcement.id} className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-coral/10 flex items-center justify-center">
                  <Megaphone className="h-6 w-6 text-coral" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">{announcement.title}</p>
                  <p className="text-sm text-white/60">{announcement.importance}</p>
                </div>
              </div>
            ))}
            {announcements.length === 0 && (
              <p className="text-white/60 text-center py-4">No hay anuncios</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
