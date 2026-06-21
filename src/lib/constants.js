export const SITE_NAME = 'El Redil Joven';
export const CHURCH_NAME = 'Iglesia El Redil';

export {
  EVENT_STATUSES,
  EVENT_CATEGORIES,
  ANNOUNCEMENT_IMPORTANCE,
  USER_ROLES,
  eventCategoryOptions,
  eventStatusOptions,
  announcementImportanceOptions,
} from '../schemas';

export const NAV_LINKS = [
  { label: 'Inicio', href: '/' },
  { label: 'Programa', href: '/programa' },
  { label: 'Actividades', href: '/actividades' },
  { label: 'Galería', href: '/galeria' },
  { label: 'Anuncios', href: '/anuncios' },
  { label: 'Nosotros', href: '/nosotros' },
  { label: 'Contacto', href: '/contacto' },
];

export const ADMIN_NAV_LINKS = [
  { label: 'Dashboard', href: '/admin', icon: 'LayoutDashboard' },
  { label: 'Actividades', href: '/admin/actividades', icon: 'Calendar' },
  { label: 'Programa', href: '/admin/programa', icon: 'CalendarDays' },
  { label: 'Galería', href: '/admin/galeria', icon: 'Images' },
  { label: 'Anuncios', href: '/admin/anuncios', icon: 'Megaphone' },
  { label: 'Contenido', href: '/admin/contenido', icon: 'FileText' },
  { label: 'Configuración', href: '/admin/configuracion', icon: 'Settings' },
];

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/elrediljoven',
  facebook: 'https://facebook.com/elrediljoven',
  whatsapp: 'https://wa.me/1234567890',
  youtube: 'https://youtube.com/@elrediljoven',
  tiktok: 'https://tiktok.com/@elrediljoven',
};

export const TAGLINE = 'Conectados en fe, unidos en propósito.';
export const WELCOME_TEXT = 'Un lugar para crecer, conectar y vivir la fe juntos.';
export const CALL_TO_ACTION = 'Sé parte de lo que Dios está haciendo en nuestra juventud.';
