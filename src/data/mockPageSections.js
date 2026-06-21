export const mockPageSections = {
  home: {
    hero: {
      page: 'home',
      section_key: 'hero',
      title: 'Actividades Destacadas',
      subtitle: 'No te pierdas nuestras próximas actividades',
      cta_label: 'Ver todas las actividades',
      cta_url: '/actividades',
    },
    devocional: {
      page: 'home',
      section_key: 'devocional',
      title: 'Haz tu devocional con nosotros',
      subtitle: 'Cada día ofrece una nueva reflexión para fortalecer tu relación con Dios.',
      cta_label: 'Ver devocionales',
      cta_url: '/devocional',
    },
    community_title: {
      page: 'home',
      section_key: 'community_title',
      title: 'Nuestra Comunidad',
      subtitle: 'Lo que representa El Redil Joven',
    },
    announcements_title: {
      page: 'home',
      section_key: 'announcements_title',
      title: 'Anuncios Importantes',
      subtitle: 'Mantente informado de lo que está pasando',
      cta_label: 'Ver todos los anuncios',
      cta_url: '/anuncios',
    },
  },
  about: {
    hero: {
      page: 'about',
      section_key: 'hero',
      title: 'Sobre',
      highlight: 'Nosotros',
      subtitle: 'Conectados en fe, unidos en propósito. Somos el ministerio juvenil de la Iglesia El Redil.',
    },
    welcome_title: {
      page: 'about',
      section_key: 'welcome_title',
      title: 'Bienvenido a El Redil Joven',
      cta_label: 'Contáctanos',
      cta_url: '/contacto',
    },
    values_title: {
      page: 'about',
      section_key: 'values_title',
      title: 'Nuestros Valores',
      subtitle: 'Lo que nos define como comunidad',
    },
    cta_title: {
      page: 'about',
      section_key: 'cta_title',
      title: '¿Quieres ser parte?',
      body: 'Nos encantaría conocerte. Visítanos cualquier domingo o contáctanos para más información sobre cómo puedes involucrarte en El Redil Joven.',
      cta_label: 'Ver programa',
      cta_url: '/programa',
    },
  },
  contact: {
    hero: {
      page: 'contact',
      section_key: 'hero',
      title: 'Contáctanos',
      subtitle: '¿Tienes preguntas o quieres saber más? Estamos aquí para ayudarte',
    },
    form_title: {
      page: 'contact',
      section_key: 'form_title',
      title: 'Envíanos un mensaje',
    },
    info_title: {
      page: 'contact',
      section_key: 'info_title',
      title: 'Información de contacto',
    },
  },
  gallery: {
    hero: {
      page: 'gallery',
      section_key: 'hero',
      title: 'Galería de Fotos',
      subtitle: 'Revive los momentos especiales de nuestra comunidad',
    },
  },
  program: {
    hero: {
      page: 'program',
      section_key: 'hero',
      title: 'Próximos Encuentros',
      subtitle: 'Explora nuestra programación mensual diseñada para conectar, crecer y celebrar juntos.',
    },
  },
  activities: {
    hero: {
      page: 'activities',
      section_key: 'hero',
      title: 'Nuestras Actividades',
      subtitle: 'Cada encuentro es una oportunidad para crecer en fe y comunidad',
    },
  },
  announcements: {
    hero: {
      page: 'announcements',
      section_key: 'hero',
      title: 'Anuncios',
      subtitle: 'Mantente informado de lo que está pasando en nuestra comunidad',
    },
  },
};

export function getSection(page, sectionKey) {
  return mockPageSections[page]?.[sectionKey] || null;
}

export function getPageSections(page) {
  return mockPageSections[page] || {};
}
