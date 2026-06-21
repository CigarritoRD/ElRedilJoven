import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export const QUERY_KEYS = {
  EVENTS: ['events'],
  EVENT: (id) => ['events', id],
  FEATURED_EVENTS: ['events', 'featured'],
  UPCOMING_EVENTS: ['events', 'upcoming'],
  ANNOUNCEMENTS: ['announcements'],
  PUBLISHED_ANNOUNCEMENTS: ['announcements', 'published'],
  GALLERIES: ['galleries'],
  GALLERY: (id) => ['galleries', id],
  GALLERY_PHOTOS: (id) => ['galleries', id, 'photos'],
  SETTINGS: ['settings'],
  PROFILE: ['profile'],
};
