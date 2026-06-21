import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import { Navbar } from '../../components/public/Navbar';
import { Footer } from '../../components/public/Footer';
import PageHero from '../../components/public/PageHero';
import { GalleryCard } from '../../components/public/GalleryCard';
import { useGalleries, useGallery } from '../../hooks/useGallery';
import { GalleryEmpty } from '../../components/ui/EmptyState';
import { ImageOff } from 'lucide-react';
import { usePageSections } from '../../hooks/usePageSections';

export function Gallery() {
  const [searchParams] = useSearchParams();
  const galleryId = searchParams.get('id');
  const { galleries, isLoading } = useGalleries();
  const { gallery } = useGallery(galleryId);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const { data: sections } = usePageSections();
  const gallerySections = sections?.gallery || {};

  const selectedGallery = galleryId ? gallery : null;
  const photos = selectedGallery?.photos || [];

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (galleryId && selectedGallery) {
    return (
      <div className="min-h-screen">
        <Navbar />

        <section className="relative pt-32 md:pt-36 pb-8 overflow-hidden bg-surface">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-container/10 to-transparent" />
          <div className="container-custom relative z-10">
            <button
              onClick={() => window.history.back()}
              className="mb-4 inline-flex items-center gap-2 text-primary hover:text-primary/80 transition"
            >
              <span className="text-xl">←</span>
              <span>Volver a álbumes</span>
            </button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8"
            >
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-display font-extrabold text-white mb-2">
                  {selectedGallery.title}
                </h1>
                <p className="text-on-surface-variant max-w-2xl">
                  {selectedGallery.description}
                </p>
              </div>
              <div className="flex items-center gap-2 text-primary font-label-sm">
                <span>{photos.length} fotos</span>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-surface-low">
          <div className="container-custom py-8">
            {photos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {photos.map((photo, index) => (
                  <motion.button
                    key={photo.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.03, duration: 0.3 }}
                    onClick={() => openLightbox(index)}
                    className="relative group aspect-square overflow-hidden rounded-xl cursor-pointer"
                  >
                    {photo.image_url ? (
                      <img
                        src={photo.image_url}
                        alt={photo.caption || `Foto ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div
                      className="hidden absolute inset-0 bg-gradient-to-br from-primary-container/40 to-surface-container items-center justify-center"
                      style={{ display: photo.image_url ? 'none' : 'flex' }}
                    >
                      <ImageOff className="h-8 w-8 text-primary/50" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-dim/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {photo.caption && (
                        <p className="text-xs text-white/90 truncate">{photo.caption}</p>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-on-surface-variant">Este álbum no tiene fotos aún</p>
              </div>
            )}
          </div>
        </section>

        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={photos.map((p) => ({
            src: p.image_url,
            caption: p.caption,
          }))}
          plugins={[Captions, Thumbnails, Zoom]}
          styles={{
            container: { backgroundColor: 'rgba(0, 0, 0, 0.95)' },
          }}
          captions={{ showToggle: true }}
          thumbnails={{ position: 'bottom' }}
          zoom={{ maxZoom: 5 }}
        />

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <PageHero
        title={gallerySections.hero?.title || 'Galería de Fotos'}
        subtitle={gallerySections.hero?.subtitle || 'Revive los momentos especiales de nuestra comunidad'}
      />

      <section className="section-padding bg-surface-low">
        <div className="container-custom">
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-80 animate-pulse rounded-2xl bg-surface-container" />
              ))}
            </div>
          ) : galleries.length > 0 ? (
            <div className="space-y-8">
              {galleries.map((gallery, index) => (
                <GalleryCard
                  key={gallery.id}
                  gallery={gallery}
                  index={index}
                  variant={index === 0 ? 'featured' : 'default'}
                />
              ))}
            </div>
          ) : (
            <GalleryEmpty />
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
