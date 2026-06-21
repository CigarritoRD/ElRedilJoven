import { supabase, useMockData } from '../lib/supabase';
import { mockPageSections, getSection, getPageSections } from '../data/mockPageSections';

export const pageSectionService = {
  async getAll() {
    if (useMockData) return mockPageSections;
    const { data, error } = await supabase
      .from('page_sections')
      .select('*')
      .order('page', { ascending: true })
      .order('section_key', { ascending: true });
    if (error) throw error;
    return groupByPage(data);
  },

  async getByPage(page) {
    if (useMockData) return getPageSections(page);
    const { data, error } = await supabase
      .from('page_sections')
      .select('*')
      .eq('page', page)
      .order('section_key', { ascending: true });
    if (error) throw error;
    return indexByKey(data);
  },

  async getSection(page, sectionKey) {
    if (useMockData) return getSection(page, sectionKey);
    const { data, error } = await supabase
      .from('page_sections')
      .select('*')
      .eq('page', page)
      .eq('section_key', sectionKey)
      .single();
    if (error && error.code !== 'PGRST116') throw error;
    return data || null;
  },

  async upsert(page, sectionKey, updates) {
    if (useMockData) {
      if (!mockPageSections[page]) mockPageSections[page] = {};
      mockPageSections[page][sectionKey] = { ...mockPageSections[page][sectionKey], ...updates, page, section_key: sectionKey };
      return mockPageSections[page][sectionKey];
    }
    const { data, error } = await supabase
      .from('page_sections')
      .upsert(
        { page, section_key: sectionKey, ...updates, updated_at: new Date().toISOString() },
        { onConflict: 'page,section_key' }
      )
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, updates) {
    if (useMockData) return { id, ...updates };
    const { data, error } = await supabase
      .from('page_sections')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};

function indexByKey(rows) {
  return rows.reduce((acc, row) => {
    acc[row.section_key] = row;
    return acc;
  }, {});
}

function groupByPage(rows) {
  return rows.reduce((acc, row) => {
    if (!acc[row.page]) acc[row.page] = {};
    acc[row.page][row.section_key] = row;
    return acc;
  }, {});
}
