import { supabase, useMockData } from '../lib/supabase';
import { mockAnnouncements } from '../data/mockAnnouncements';

export const announcementService = {
  async getAll() {
    if (useMockData) return mockAnnouncements;
    const { data, error } = await supabase
      .from('announcements')
      .select('id, title, content, importance, is_published, show_on_home, created_at')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async getPublished(limit = 20) {
    if (useMockData) return mockAnnouncements.filter(a => a.is_published).slice(0, limit);
    const { data, error } = await supabase
      .from('announcements')
      .select('id, title, content, importance, is_published, show_on_home, created_at')
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data;
  },

  async getForHome(limit = 4) {
    if (useMockData) {
      return mockAnnouncements.filter(a => a.is_published && a.show_on_home).slice(0, limit);
    }
    const { data, error } = await supabase
      .from('announcements')
      .select('id, title, content, importance, is_published, show_on_home, created_at')
      .eq('is_published', true)
      .eq('show_on_home', true)
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data;
  },

  async getById(id) {
    if (useMockData) return mockAnnouncements.find(a => a.id === id);
    const { data, error } = await supabase
      .from('announcements')
      .select('id, title, content, importance, is_published, show_on_home, created_at, created_by')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async create(announcement) {
    if (useMockData) {
      return { ...announcement, id: Date.now().toString(), created_at: new Date().toISOString() };
    }
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('announcements')
      .insert([{ ...announcement, created_by: user?.id }])
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
      .from('announcements')
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
      .from('announcements')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return id;
  },
};
