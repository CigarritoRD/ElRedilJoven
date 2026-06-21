import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { useSettings } from '../../hooks/useSettings';

export function Hero() {
  const { data: settings, isLoading } = useSettings();
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = settings?.hero_images?.length > 0
    ? settings.hero_images
    : settings?.hero_image
      ? [settings.hero_image]
      : [];

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  if (isLoading) {
    return (
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-surface">
        <div className="container-custom relative z-10 py-20">
          <div className="h-16 w-64 animate-pulse rounded bg-surface-container" />
          <div className="h-8 w-96 animate-pulse rounded bg-surface-container mt-4" />
          <div className="flex gap-4 mt-8">
            <div className="h-12 w-48 animate-pulse rounded-full bg-surface-container" />
            <div className="h-12 w-48 animate-pulse rounded-full bg-surface-container" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        {images.length > 0 ? (
          images.map((img, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-1000"
              style={{
                opacity: i === currentIndex ? 1 : 0,
                backgroundImage: `url(${img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          ))
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-container to-surface" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-surface/60 to-primary/30" />
      </div>

      {images.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === currentIndex
                  ? 'w-8 bg-primary shadow-[0_0_10px_rgba(210,187,255,0.6)]'
                  : 'w-2 bg-white/30'
              }`}
              aria-label={`Ir a imagen ${i + 1}`}
            />
          ))}
        </div>
      )}

      <div className="container-custom relative z-10 py-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-label-sm mb-4 border border-primary/20">
              Ministerio Juvenil
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white mb-4 leading-tight">
              {settings?.hero_title || 'El Redil Joven'}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl md:text-2xl text-on-surface-variant mb-8"
          >
            {settings?.hero_subtitle || 'Conectados en fe, unidos en propósito'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/programa">
              <Button size="lg">
                Ver programa
                <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/nosotros">
              <Button variant="secondary" size="lg">
                Conoce más
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-surface to-transparent" />
    </section>
  );
}
