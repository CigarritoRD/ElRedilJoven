import { motion } from 'framer-motion';
import { Navbar } from '../../components/public/Navbar';
import { Footer } from '../../components/public/Footer';
import PageHero from '../../components/public/PageHero';
import { AnnouncementCard } from '../../components/public/AnnouncementCard';
import { usePublishedAnnouncements } from '../../hooks/useAnnouncements';
import { usePageSections } from '../../hooks/usePageSections';
import { AnnouncementSkeleton } from '../../components/ui/LoadingSkeleton';

export function Announcements() {
  const { announcements, isLoading } = usePublishedAnnouncements();
  const { data: sections } = usePageSections();
  const announcementSections = sections?.announcements || {};

  return (
    <div className="min-h-screen">
      <Navbar />

      <PageHero
        title={announcementSections.hero?.title || 'Anuncios'}
        subtitle={announcementSections.hero?.subtitle || 'Mantente informado de lo que está pasando en nuestra comunidad'}
      />

      <section className="section-padding bg-surface-low">
        <div className="container-custom">
          {isLoading ? (
            <div className="space-y-4 max-w-3xl mx-auto">
              {[...Array(4)].map((_, i) => (
                <AnnouncementSkeleton key={i} />
              ))}
            </div>
          ) : announcements.length > 0 ? (
            <div className="space-y-4 max-w-3xl mx-auto">
              {announcements.map((announcement, index) => (
                <AnnouncementCard
                  key={announcement.id}
                  announcement={announcement}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-on-surface-variant">No hay anuncios publicados</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
