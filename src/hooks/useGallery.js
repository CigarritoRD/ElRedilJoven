import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { galleryService } from '../services/galleryService';
import { QUERY_KEYS } from '../lib/queryClient';

export function useGalleries() {
  const queryClient = useQueryClient();

  const { data: galleries = [], isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.GALLERIES,
    queryFn: () => galleryService.getAll(),
  });

  const createMutation = useMutation({
    mutationFn: (newGallery) => galleryService.create(newGallery),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.GALLERIES });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, ...updates }) => galleryService.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.GALLERIES });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => galleryService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.GALLERIES });
    },
  });

  return {
    galleries,
    isLoading,
    error,
    createGallery: createMutation.mutate,
    updateGallery: updateMutation.mutate,
    deleteGallery: deleteMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}

export function useGallery(id) {
  const { data: gallery, isLoading } = useQuery({
    queryKey: QUERY_KEYS.GALLERY(id),
    queryFn: () => galleryService.getById(id),
    enabled: !!id,
  });

  return { gallery, isLoading };
}

export function useGalleryPhotos(galleryId) {
  const queryClient = useQueryClient();

  const { data: photos = [], isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.GALLERY_PHOTOS(galleryId),
    queryFn: () => galleryService.getById(galleryId).then(g => g?.photos || []),
    enabled: !!galleryId,
  });

  const addPhotoMutation = useMutation({
    mutationFn: ({ image_url, caption }) =>
      galleryService.addPhoto(galleryId, { image_url, caption }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.GALLERY_PHOTOS(galleryId) });
    },
  });

  const deletePhotoMutation = useMutation({
    mutationFn: (photoId) => galleryService.deletePhoto(photoId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.GALLERY_PHOTOS(galleryId) });
    },
  });

  return {
    photos,
    isLoading,
    error,
    addPhoto: addPhotoMutation.mutate,
    deletePhoto: deletePhotoMutation.mutate,
    isAdding: addPhotoMutation.isPending,
    isDeleting: deletePhotoMutation.isPending,
  };
}
