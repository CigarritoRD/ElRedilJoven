import { z } from 'zod';

export const EVENT_STATUSES = {
  UPCOMING: 'upcoming',
  ACTIVE: 'active',
  COMPLETED: 'completed',
};

export const EVENT_CATEGORIES = {
  CULTO_JUVENIL: 'culto juvenil',
  REUNION: 'reunión',
  RETIRO: 'retiro',
  EVANGELISMO: 'evangelismo',
  ENSAYO: 'ensayo',
  CAPACITACION: 'capacitación',
  CONFRATERNIDAD: 'confraternidad',
  SALIDA: 'salida',
  SERVICIO: 'servicio',
};

export const ANNOUNCEMENT_IMPORTANCE = {
  BAJA: 'baja',
  NORMAL: 'normal',
  ALTA: 'alta',
};

export const USER_ROLES = {
  ADMIN: 'admin',
  EDITOR: 'editor',
};

export const eventSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  event_date: z.string().min(1, 'La fecha es obligatoria'),
  event_time: z.string().min(1, 'La hora es obligatoria'),
  location: z.string().min(3, 'El lugar es obligatorio'),
  category: z.enum(Object.values(EVENT_CATEGORIES), {
    errorMap: () => ({ message: 'Selecciona una categoría válida' }),
  }),
  status: z.enum(Object.values(EVENT_STATUSES)),
  image_url: z.string().url('URL inválida').optional().or(z.literal('')),
  is_featured: z.boolean().default(false),
  is_published: z.boolean().default(false),
});

export const eventUpdateSchema = eventSchema.partial();

export const announcementSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  content: z.string().min(10, 'El contenido debe tener al menos 10 caracteres'),
  importance: z.enum(Object.values(ANNOUNCEMENT_IMPORTANCE)),
  is_published: z.boolean().default(false),
  show_on_home: z.boolean().default(false),
});

export const announcementUpdateSchema = announcementSchema.partial();

export const gallerySchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  cover_image: z.string().url('URL inválida').optional().or(z.literal('')),
  event_id: z.string().uuid('ID inválido').optional().or(z.literal('')),
});

export const galleryUpdateSchema = gallerySchema.partial();

export const settingsSchema = z.object({
  hero_title: z.string().min(3, 'El título es obligatorio'),
  hero_subtitle: z.string().min(3, 'El subtítulo es obligatorio'),
  hero_image: z.string().url('URL inválida').optional().or(z.literal('')),
  hero_images: z.array(z.string()).optional().default([]),
  welcome_text: z.string().min(10, 'El texto de bienvenida es obligatorio'),
  contact_phone: z.string().optional(),
  contact_email: z.string().email('Email inválido').optional().or(z.literal('')),
  instagram_url: z.string().url('URL inválida').optional().or(z.literal('')),
  facebook_url: z.string().url('URL inválida').optional().or(z.literal('')),
  whatsapp_url: z.string().optional(),
  youtube_url: z.string().url('URL inválida').optional().or(z.literal('')),
  tiktok_url: z.string().optional(),
  address: z.string().optional(),
  about_hero_image: z.string().url('URL inválida').optional().or(z.literal('')),
  about_community_image_1: z.string().url('URL inválida').optional().or(z.literal('')),
  about_community_image_2: z.string().url('URL inválida').optional().or(z.literal('')),
});

export const settingsUpdateSchema = settingsSchema.partial();

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const eventCategoryOptions = Object.entries(EVENT_CATEGORIES).map(([, value]) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

export const eventStatusOptions = [
  { value: EVENT_STATUSES.UPCOMING, label: 'Próximo' },
  { value: EVENT_STATUSES.ACTIVE, label: 'En curso' },
  { value: EVENT_STATUSES.COMPLETED, label: 'Finalizado' },
];

export const announcementImportanceOptions = [
  { value: ANNOUNCEMENT_IMPORTANCE.BAJA, label: 'Baja' },
  { value: ANNOUNCEMENT_IMPORTANCE.NORMAL, label: 'Normal' },
  { value: ANNOUNCEMENT_IMPORTANCE.ALTA, label: 'Alta' },
];
