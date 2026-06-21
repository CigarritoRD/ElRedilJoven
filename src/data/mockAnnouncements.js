import { ANNOUNCEMENT_IMPORTANCE } from '../lib/constants';

export const mockAnnouncements = [
  {
    id: '1',
    title: 'Inscripciones abiertas para el Retiro de Primavera',
    content: 'Las inscripciones para el retiro de primavera ya están abiertas. El costo es de $50 e incluye transporte, alimentación y materiales. Puedes inscribirte en la oficina de la iglesia o con cualquier líder juvenil. ¡No te quedes fuera!',
    importance: ANNOUNCEMENT_IMPORTANCE.ALTA,
    is_published: true,
    show_on_home: true,
    created_at: '2026-06-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Nuevo grupo de discipulado',
    content: 'Estamos iniciando un nuevo grupo de discipulado para jóvenes de 15 a 25 años. Nos reuniremos los miércoles a las 7pm. El objetivo es crecer en conocimiento bíblico y en comunidad. Inscríbete con el pastor.',
    importance: ANNOUNCEMENT_IMPORTANCE.NORMAL,
    is_published: true,
    show_on_home: true,
    created_at: '2026-06-10T14:00:00Z',
  },
  {
    id: '3',
    title: 'Se necesitan voluntarios para el evento de evangelismo',
    content: 'Para la noche de evangelismo del 28 de julio necesitamos voluntarios para diferentes áreas: música, oración, logística y seguimiento. Si quieres participar, comunícate con nosotros.',
    importance: ANNOUNCEMENT_IMPORTANCE.NORMAL,
    is_published: true,
    show_on_home: false,
    created_at: '2026-06-20T09:00:00Z',
  },
];
