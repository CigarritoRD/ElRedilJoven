import { useState } from 'react';
import { uploadImage, deleteImage, SUPABASE_BUCKETS } from '../lib/supabase';
import { toast } from 'sonner';

export function useUploadImage() {
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function upload(bucket, file, folder = '') {
    setUploading(true);
    try {
      const url = await uploadImage(bucket, file, folder);
      toast.success('Imagen subida correctamente');
      return url;
    } catch (error) {
      toast.error('Error al subir la imagen');
      throw error;
    } finally {
      setUploading(false);
    }
  }

  async function remove(bucket, path) {
    setDeleting(true);
    try {
      await deleteImage(bucket, path);
      toast.success('Imagen eliminada');
    } catch (error) {
      toast.error('Error al eliminar la imagen');
      throw error;
    } finally {
      setDeleting(false);
    }
  }

  async function uploadEventImage(file) {
    return upload(SUPABASE_BUCKETS.EVENTS, file);
  }

  async function uploadGalleryImage(file) {
    return upload(SUPABASE_BUCKETS.GALLERIES, file);
  }

  async function uploadPhoto(file) {
    return upload(SUPABASE_BUCKETS.PHOTOS, file);
  }

  return {
    upload,
    remove,
    uploadEventImage,
    uploadGalleryImage,
    uploadPhoto,
    uploading,
    deleting,
  };
}
