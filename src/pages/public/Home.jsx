import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Users, Heart, Sparkles } from 'lucide-react';
import { Navbar } from '../../components/public/Navbar';
import { Footer } from '../../components/public/Footer';
import { Hero } from '../../components/public/Hero';
import { FeaturedEvents } from '../../components/public/FeaturedEvents';
import { AnnouncementCard } from '../../components/public/AnnouncementCard';
import { GalleryCard } from '../../components/public/GalleryCard';
import { SectionHeader } from '../../components/public/SectionHeader';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useHomeAnnouncements } from '../../hooks/useAnnouncements';
import { useGalleries } from '../../hooks/useGallery';
import { usePageSections } from '../../hooks/usePageSections';
import { AnnouncementSkeleton } from '../../components/ui/LoadingSkeleton';

export function Home() {
  const { announcements, isLoading: announcementsLoading } = useHomeAnnouncements();
  const { galleries, isLoading: galleriesLoading } = useGalleries();
  const { data: sections } = usePageSections();

  const homeSections = sections?.home || {};
  const announcementsTitle = homeSections.announcements_title || {};
  const devocionalSection = homeSections.devocional || {};
  const communitySection = homeSections.community_title || {};

  return (
    <div className="min-h-screen">
      <Navbar />

      <Hero />

      <FeaturedEvents />

      <section className="section-padding bg-surface-low">
        <div className="container-custom">
          <SectionHeader
            title={announcementsTitle.title || 'Anuncios Importantes'}
            subtitle={announcementsTitle.subtitle || 'Mantente informado de lo que está pasando'}
          />

          {announcementsLoading ? (
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <AnnouncementSkeleton key={i} />
              ))}
            </div>
          ) : announcements.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {announcements.slice(0, 4).map((announcement, index) => (
                <AnnouncementCard
                  key={announcement.id}
                  announcement={announcement}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-on-surface-variant">No hay anuncios recientes</p>
          )}

          <div className="mt-8 text-center">
            <Link to="/anuncios">
              <Button variant="secondary">
                Ver todos los anuncios
                <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Card glass className="mx-4 md:mx-auto my-12 max-w-3xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary-container/20 blur-[100px]" />
        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-tertiary/10 blur-[100px]" />
        <div className="relative z-10 text-center max-w-xl mx-auto">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
            {devocionalSection.title || 'Haz tu devocional con nosotros'}
          </h3>
          <p className="text-on-surface-variant mb-8">
            {devocionalSection.subtitle || 'Cada día ofrece una nueva reflexión para fortalecer tu relación con Dios.'}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={devocionalSection.cta_url || '/devocional'}>
              <Button>
                {devocionalSection.cta_label || 'Ver devocionales'}
              </Button>
            </Link>
            <Link to="/contacto">
              <Button variant="secondary">
                Enviar tema de oración
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      <section className="section-padding bg-surface-low">
        <div className="container-custom">
          <SectionHeader
            title={communitySection.title || 'Nuestra Comunidad'}
            subtitle={communitySection.subtitle || 'Lo que representa El Redil Joven'}
          />

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Users,
                title: 'Comunidad',
                description: 'Un lugar donde cada joven pertenece y puede conectar con otros que comparten su fe.',
              },
              {
                icon: Heart,
                title: 'Fe',
                description: 'Crecemos juntos en nuestra relación con Dios a través de la Palabra y la oración.',
              },
              {
                icon: Sparkles,
                title: 'Propósito',
                description: 'Descubrimos y vivimos el propósito que Dios tiene para cada uno de nosotros.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-container/20 border border-primary-container/30">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-display font-bold text-white">{item.title}</h3>
                <p className="text-on-surface-variant">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/nosotros">
              <Button>
                Conoce más sobre nosotros
                <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-custom">
          <SectionHeader
            title="Galería de Fotos"
            subtitle="Momentos especiales de nuestra comunidad"
          />

          {galleriesLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-80 animate-pulse rounded-2xl bg-surface-container" />
              ))}
            </div>
          ) : galleries.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {galleries.slice(0, 3).map((gallery, index) => (
                <GalleryCard key={gallery.id} gallery={gallery} index={index} />
              ))}
            </div>
          ) : (
            <p className="text-center text-on-surface-variant">No hay álbumes disponibles</p>
          )}

          <div className="mt-8 text-center">
            <Link to="/galeria">
              <Button variant="secondary">
                Ver toda la galería
                <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
