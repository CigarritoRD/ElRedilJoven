import { supabase, useMockData } from '../lib/supabase';
import { mockEvents } from '../data/mockEvents';

export const eventService = {
  async getAll() {
    if (useMockData) return mockEvents;
    const { data, error } = await supabase
      .from('events')
      .select('id, title, description, event_date, event_time, location, category, status, image_url, is_featured, created_at')
      .order('event_date', { ascending: true });
    if (error) throw error;
    return data;
  },

  async getById(id) {
    if (useMockData) return mockEvents.find(e => e.id === id);
    const { data, error } = await supabase
      .from('events')
      .select('id, title, description, event_date, event_time, location, category, status, image_url, is_featured, is_published, created_at, created_by')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  },

  async getFeatured() {
    if (useMockData) return mockEvents.filter(e => e.is_featured);
    const { data, error } = await supabase
      .from('events')
      .select('id, title, description, event_date, event_time, location, category, status, image_url, is_featured')
      .eq('is_featured', true)
      .eq('is_published', true)
      .order('event_date', { ascending: true })
      .limit(6);
    if (error) throw error;
    return data;
  },

  async getUpcoming(limit = 10) {
    if (useMockData) {
      return mockEvents
        .filter(e => e.status === 'upcoming')
        .sort((a, b) => new Date(a.event_date) - new Date(b.event_date))
        .slice(0, limit);
    }
    const { data, error } = await supabase
      .from('events')
      .select('id, title, event_date, event_time, location, category, status, image_url, is_featured')
      .eq('status', 'upcoming')
      .eq('is_published', true)
      .order('event_date', { ascending: true })
      .limit(limit);
    if (error) throw error;
    return data;
  },

  async create(event) {
    if (useMockData) {
      return { ...event, id: Date.now().toString() };
    }
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('events')
      .insert([{ ...event, created_by: user?.id }])
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
      .from('events')
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
      .from('events')
      .delete()
      .eq('id', id);
    if (error) throw error;
    return id;
  },
};
