import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Images, ImageOff } from 'lucide-react';
import { formatDate } from '../../lib/utils';

export function GalleryCard({ gallery, index = 0, variant = 'default' }) {
  const [imgError, setImgError] = useState(false);
  const photoCount = gallery.photos?.length || 0;
  const fallbackImg = 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=800';
  const imgSrc = imgError || !gallery.cover_image ? fallbackImg : gallery.cover_image;

  if (variant === 'featured') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="relative rounded-2xl overflow-hidden group"
      >
        <Link to={`/galeria?id=${gallery.id}`} className="block relative aspect-[21/9]">
          {imgSrc && !imgError ? (
            <img
              src={imgSrc}
              alt={gallery.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-container/40 to-surface-container flex items-center justify-center">
              <ImageOff className="h-16 w-16 text-primary/50" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-surface-dim/40 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                <Images className="h-4 w-4 text-primary" />
                <span className="text-sm text-white/90 font-label-sm">{photoCount} fotos</span>
              </div>
              <span className="text-xs text-white/60">{formatDate(gallery.created_at)}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-white mb-2">
              {gallery.title}
            </h2>
            <p className="text-white/70 text-sm max-w-xl line-clamp-2">
              {gallery.description}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-primary font-label-sm group-hover:gap-3 transition-all">
              Ver álbum
              <span>→</span>
            </div>
          </div>

          <div className="absolute top-4 right-4">
            <div className="bg-primary-container/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <span className="text-xs font-label-sm text-white">Álbum destacado</span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/galeria?id=${gallery.id}`} className="block">
        <div className="relative rounded-2xl overflow-hidden group glass-card hover:border-primary/50 transition-all duration-200 hover:scale-[1.02]">
          <div className="relative h-48 overflow-hidden">
            {imgSrc && !imgError ? (
              <img
                src={imgSrc}
                alt={gallery.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary-container/40 to-surface-container flex items-center justify-center">
                <ImageOff className="h-10 w-10 text-primary/50" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-surface-dim/80 via-transparent to-transparent" />

            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-1.5 bg-surface-dim/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
                <Images className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs text-white/90 font-label-sm">{photoCount}</span>
              </div>
            </div>
          </div>

          <div className="p-4">
            <h3 className="font-display font-bold text-lg text-white mb-1 group-hover:text-primary transition-colors line-clamp-1">
              {gallery.title}
            </h3>
            <p className="text-on-surface-variant text-sm line-clamp-2">
              {gallery.description}
            </p>
            <span className="text-xs text-on-surface-variant/60 mt-2 block">
              {formatDate(gallery.created_at)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
