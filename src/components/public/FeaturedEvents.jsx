import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { ChevronRight } from 'lucide-react';
import { EventCard } from './EventCard';
import { Button } from '../ui/Button';
import { SectionHeader } from './SectionHeader';
import { useFeaturedEvents, useUpcomingEvents } from '../../hooks/useEvents';
import { EventCardSkeleton } from '../ui/LoadingSkeleton';

import 'swiper/css';
import 'swiper/css/pagination';

export function FeaturedEvents() {
  const { featuredEvents, isLoading: isFeaturedLoading } = useFeaturedEvents();
  const { upcomingEvents, isLoading: isUpcomingLoading } = useUpcomingEvents();

  const isLoading = isFeaturedLoading || isUpcomingLoading;
  const events = [
    ...featuredEvents,
    ...upcomingEvents.filter(
      (event) => !featuredEvents.some((featured) => featured.id === event.id)
    ),
  ].slice(0, 4);

  return (
    <section className="section-padding bg-surface">
      <div className="mx-auto max-w-[1500px] px-margin-mobile md:px-gutter">
        <SectionHeader
          title="Actividades Destacadas"
          subtitle="No te pierdas nuestras próximas actividades"
        />

        {isLoading ? (
          <div className="grid gap-8 sm:grid-cols-2 2xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : events.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 2xl:grid-cols-4">
            {events.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        ) : null}

        <div className="mt-8 text-center">
          <Link to="/actividades">
            <Button variant="secondary">
              Ver todas las actividades
              <ChevronRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
