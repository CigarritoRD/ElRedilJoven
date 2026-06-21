import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { FaInstagram, FaFacebook, FaYoutube, FaTiktok } from 'react-icons/fa';
import { SITE_NAME, CHURCH_NAME, NAV_LINKS } from '../../lib/constants';
import { useSettings } from '../../hooks/useSettings';

export function Footer() {
  const { data: settings } = useSettings();

  return (
    <footer className="bg-surface-low text-on-background border-t border-white/5">
      <div className="container-custom py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white overflow-hidden shadow-lg shadow-primary/20 ring-1 ring-white/20">
                <img src="/logo-lamb.png" alt={SITE_NAME} className="w-full h-full object-contain scale-[1.4] origin-center" />
              </div>
              <span className="font-display font-extrabold text-xl text-white">{SITE_NAME}</span>
            </Link>
            <p className="text-on-surface-variant mb-6 max-w-md">
              {CHURCH_NAME}. Un lugar para crecer, conectar y vivir la fe juntos.
            </p>
            <div className="flex gap-3">
              {settings?.instagram_url && (
                <a
                  href={settings.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-high border border-white/10 transition-all hover:border-primary hover:text-primary hover:scale-110"
                >
                  <FaInstagram className="h-5 w-5" />
                </a>
              )}
              {settings?.facebook_url && (
                <a
                  href={settings.facebook_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-high border border-white/10 transition-all hover:border-secondary hover:text-secondary hover:scale-110"
                >
                  <FaFacebook className="h-5 w-5" />
                </a>
              )}
              {settings?.youtube_url && (
                <a
                  href={settings.youtube_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-high border border-white/10 transition-all hover:border-error hover:text-error hover:scale-110"
                >
                  <FaYoutube className="h-5 w-5" />
                </a>
              )}
              {settings?.tiktok_url && (
                <a
                  href={settings.tiktok_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-high border border-white/10 transition-all hover:border-tertiary hover:text-tertiary hover:scale-110"
                >
                  <FaTiktok className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-4">Navegación</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-on-surface-variant transition hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-4">Contacto</h3>
            <ul className="space-y-3">
              {settings?.address && (
                <li className="flex items-start gap-2 text-on-surface-variant">
                  <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                  <span>{settings.address}</span>
                </li>
              )}
              {settings?.contact_phone && (
                <li className="flex items-center gap-2 text-on-surface-variant">
                  <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span>{settings.contact_phone}</span>
                </li>
              )}
              {settings?.contact_email && (
                <li className="flex items-center gap-2 text-on-surface-variant">
                  <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span>{settings.contact_email}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center text-on-surface-variant text-sm">
          <p>&copy; {new Date().getFullYear()} {CHURCH_NAME}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
