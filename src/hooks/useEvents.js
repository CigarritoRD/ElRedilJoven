import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { eventService } from '../services/eventService';
import { QUERY_KEYS } from '../lib/queryClient';

export function useEvents() {
  const queryClient = useQueryClient();

  const { data: events = [], isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.EVENTS,
    queryFn: () => eventService.getAll(),
  });

  const createMutation = useMutation({
    mutationFn: (newEvent) => eventService.create(newEvent),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EVENTS });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, ...updates }) => eventService.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EVENTS });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => eventService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.EVENTS });
    },
  });

  return {
    events,
    isLoading,
    error,
    createEvent: createMutation.mutate,
    updateEvent: updateMutation.mutate,
    deleteEvent: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}

export function useFeaturedEvents() {
  const { data: events = [], isLoading } = useQuery({
    queryKey: ['featured-events'],
    queryFn: () => eventService.getFeatured(),
  });

  return { featuredEvents: events, isLoading };
}

export function useUpcomingEvents() {
  const { data: events = [], isLoading } = useQuery({
    queryKey: ['upcoming-events'],
    queryFn: () => eventService.getUpcoming(10),
  });

  return { upcomingEvents: events, isLoading };
}

export function useEvent(id) {
  const { data: event, isLoading } = useQuery({
    queryKey: QUERY_KEYS.EVENT(id),
    queryFn: () => eventService.getById(id),
    enabled: !!id,
  });

  return { event, isLoading };
}
