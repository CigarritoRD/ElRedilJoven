import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { announcementService } from '../services/announcementService';
import { QUERY_KEYS } from '../lib/queryClient';

export function useAnnouncements() {
  const queryClient = useQueryClient();

  const { data: announcements = [], isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.ANNOUNCEMENTS,
    queryFn: () => announcementService.getAll(),
  });

  const createMutation = useMutation({
    mutationFn: (newAnnouncement) => announcementService.create(newAnnouncement),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ANNOUNCEMENTS });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, ...updates }) => announcementService.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ANNOUNCEMENTS });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => announcementService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ANNOUNCEMENTS });
    },
  });

  return {
    announcements,
    isLoading,
    error,
    createAnnouncement: createMutation.mutate,
    updateAnnouncement: updateMutation.mutate,
    deleteAnnouncement: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}

export function usePublishedAnnouncements() {
  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ['published-announcements'],
    queryFn: () => announcementService.getPublished(20),
  });

  return { announcements, isLoading };
}

export function useHomeAnnouncements() {
  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ['home-announcements'],
    queryFn: () => announcementService.getForHome(4),
  });

  return { announcements, isLoading };
}
