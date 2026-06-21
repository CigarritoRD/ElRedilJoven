import { supabase, useMockData } from '../lib/supabase';
import { mockSettings } from '../data/mockGallery';

const SETTINGS_ID = '00000000-0000-0000-0000-000000000001';

export const settingsService = {
  async get() {
    if (useMockData) return mockSettings;
    const { data, error } = await supabase
      .from('settings')
      .select('id, hero_title, hero_subtitle, hero_image, hero_images, welcome_text, contact_phone, contact_email, instagram_url, facebook_url, whatsapp_url, youtube_url, tiktok_url, address, about_hero_image, about_community_image_1, about_community_image_2, updated_at')
      .eq('id', SETTINGS_ID)
      .single();
    if (error && error.code !== 'PGRST116') throw error;
    return data || mockSettings;
  },

  async update(updates) {
    if (useMockData) {
      return { ...mockSettings, ...updates };
    }
    const { data, error } = await supabase
      .from('settings')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', SETTINGS_ID)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};
