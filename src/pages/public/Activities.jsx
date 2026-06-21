import { useState } from 'react';
import { Navbar } from '../../components/public/Navbar';
import { Footer } from '../../components/public/Footer';
import PageHero from '../../components/public/PageHero';
import { EventCard } from '../../components/public/EventCard';
import { useEvents } from '../../hooks/useEvents';
import { usePageSections } from '../../hooks/usePageSections';
import { EventCardSkeleton } from '../../components/ui/LoadingSkeleton';
import { EVENT_STATUSES, EVENT_CATEGORIES } from '../../lib/constants';

const statusFilters = [
  { value: 'all', label: 'Todos' },
  { value: EVENT_STATUSES.UPCOMING, label: 'Próximos' },
  { value: EVENT_STATUSES.ACTIVE, label: 'En curso' },
  { value: EVENT_STATUSES.COMPLETED, label: 'Finalizados' },
];

const categoryFilters = [
  { value: 'all', label: 'Todas las categorías' },
  ...Object.entries(EVENT_CATEGORIES).map(([key, value]) => ({
    value,
    label: value.charAt(0).toUpperCase() + value.slice(1),
  })),
];

export function Activities() {
  const { events, isLoading } = useEvents();
  const { data: sections } = usePageSections();
  const activitySections = sections?.activities || {};
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredEvents = events.filter(event => {
    const matchesStatus = statusFilter === 'all' || event.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
    return matchesStatus && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      <Navbar />

      <PageHero
        title={activitySections.hero?.title || 'Nuestras Actividades'}
        subtitle={activitySections.hero?.subtitle || 'Cada encuentro es una oportunidad para crecer en fe y comunidad'}
      />

      <section className="section-padding bg-surface-low">
        <div className="container-custom">
          <div className="flex flex-wrap gap-4 mb-8">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-outline bg-surface-container px-4 py-2 text-sm text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {statusFilters.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-xl border border-outline bg-surface-container px-4 py-2 text-sm text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {categoryFilters.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <EventCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No hay actividades que coincidan con los filtros</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
