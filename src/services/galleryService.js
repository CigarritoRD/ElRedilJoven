import { supabase, useMockData } from '../lib/supabase';
import { mockGalleries } from '../data/mockGallery';

export const galleryService = {
  async getAll() {
    if (useMockData) return mockGalleries;
    const { data, error } = await supabase
      .from('galleries')
      .select(`
        id, title, description, cover_image, event_id, created_at,
        photos (id, image_url, caption, created_at)
      `)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getById(id) {
    if (useMockData) return mockGalleries.find(g => g.id === id);
    const { data, error } = await supabase
      .from('galleries')
      .select(`
        id, title, description, cover_image, event_id, created_at, created_by,
        photos (id, image_url, caption, created_at)
      `)
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async getRecent(limit = 6) {
    if (useMockData) return mockGalleries.slice(0, limit);
    const { data, error } = await supabase
      .from('galleries')
      .select('id, title, description, cover_image, created_at')
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data;
  },

  async create(gallery) {
    if (useMockData) {
      return { ...gallery, id: Date.now().toString(), created_at: new Date().toISOString(), photos: [] };
    }
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('galleries')
      .insert([{ ...gallery, created_by: user?.id }])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, updates) {
    if (useMockData) {
      return { id, ...updates };
    }
    const { data, error } = await supabase
      .from('galleries')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async delete(id) {
    if (useMockData) return id;
    const { error } = await supabase
      .from('galleries')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return id;
  },

  async addPhoto(galleryId, photo) {
    if (useMockData) {
      return { ...photo, id: Date.now().toString(), gallery_id: galleryId, created_at: new Date().toISOString() };
    }
    const { data, error } = await supabase
      .from('photos')
      .insert([{ ...photo, gallery_id: galleryId }])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deletePhoto(photoId) {
    if (useMockData) return photoId;
    const { error } = await supabase
      .from('photos')
      .delete()
      .eq('id', photoId);
    if (error) throw error;
    return photoId;
  },
};
