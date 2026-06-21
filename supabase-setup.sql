-- =============================================
-- El Redil Joven - Supabase Setup
-- Based on supabase-postgres-best-practices skill
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- ENUMS (create before tables so CHECK constraints can reference them)
-- =============================================

DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('admin', 'editor');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE event_status AS ENUM ('upcoming', 'active', 'completed');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE announcement_importance AS ENUM ('baja', 'normal', 'alta');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- =============================================
-- TABLES
-- =============================================

CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'editor',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,
  location TEXT NOT NULL,
  category TEXT NOT NULL,
  status event_status NOT NULL DEFAULT 'upcoming',
  image_url TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS announcements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  importance announcement_importance NOT NULL DEFAULT 'normal',
  is_published BOOLEAN DEFAULT FALSE,
  show_on_home BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS galleries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  cover_image TEXT,
  event_id UUID REFERENCES events(id) ON DELETE SET NULL,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS photos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  gallery_id UUID NOT NULL REFERENCES galleries(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  hero_title TEXT,
  hero_subtitle TEXT,
  hero_image TEXT,
  hero_images JSONB DEFAULT '[]'::jsonb,
  welcome_text TEXT,
  contact_phone TEXT,
  contact_email TEXT,
  instagram_url TEXT,
  facebook_url TEXT,
  whatsapp_url TEXT,
  youtube_url TEXT,
  tiktok_url TEXT,
  address TEXT,
  about_hero_image TEXT,
  about_community_image_1 TEXT,
  about_community_image_2 TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT settings_singleton CHECK (id = '00000000-0000-0000-0000-000000000001'::uuid)
);

CREATE TABLE IF NOT EXISTS page_sections (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  page TEXT NOT NULL,
  section_key TEXT NOT NULL,
  title TEXT,
  subtitle TEXT,
  body TEXT,
  cta_label TEXT,
  cta_url TEXT,
  image_url TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(page, section_key)
);

-- =============================================
-- INDEXES
-- Foreign key columns (required for FK lookups and cascade performance)
-- =============================================

CREATE INDEX IF NOT EXISTS page_sections_page_idx ON page_sections (page);
CREATE INDEX IF NOT EXISTS events_created_by_idx ON events (created_by);
CREATE INDEX IF NOT EXISTS announcements_created_by_idx ON announcements (created_by);
CREATE INDEX IF NOT EXISTS galleries_created_by_idx ON galleries (created_by);
CREATE INDEX IF NOT EXISTS galleries_event_id_idx ON galleries (event_id);
CREATE INDEX IF NOT EXISTS photos_gallery_id_idx ON photos (gallery_id);

-- Common query patterns (for public read queries)
CREATE INDEX IF NOT EXISTS events_status_date_idx ON events (status, event_date DESC);
CREATE INDEX IF NOT EXISTS events_featured_idx ON events (is_featured) WHERE is_featured = TRUE;
CREATE INDEX IF NOT EXISTS announcements_published_home_idx ON announcements (is_published, show_on_home) WHERE is_published = TRUE;
CREATE INDEX IF NOT EXISTS galleries_created_at_idx ON galleries (created_at DESC);

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;

-- =============================================
-- PRIVATE HELPERS (security definer for RLS performance)
-- Based on supabase-postgres-best-practices: security-rls-performance
-- =============================================

CREATE SCHEMA IF NOT EXISTS private;

CREATE OR REPLACE FUNCTION private.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = (SELECT auth.uid())
      AND role::text = 'admin'
  );
$$;

CREATE OR REPLACE FUNCTION private.is_editor_or_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = (SELECT auth.uid())
      AND role::text IN ('admin', 'editor')
  );
$$;

-- Revoke execution from public roles (only app should call these)
REVOKE EXECUTE ON FUNCTION private.is_admin() FROM PUBLIC, anon, authenticated, service_role;
REVOKE EXECUTE ON FUNCTION private.is_editor_or_admin() FROM PUBLIC, anon, authenticated, service_role;

-- =============================================
-- PROFILES POLICIES
-- Only owner and admins can see own profile; admins see all
-- =============================================

DROP POLICY IF EXISTS "profiles_select_policy" ON profiles;
CREATE POLICY "profiles_select_policy" ON profiles
  FOR SELECT
  USING (
    (SELECT auth.uid()) = id
    OR (SELECT private.is_admin())
  );

DROP POLICY IF EXISTS "profiles_update_policy" ON profiles;
CREATE POLICY "profiles_update_policy" ON profiles
  FOR UPDATE
  USING ((SELECT auth.uid()) = id);

DROP POLICY IF EXISTS "profiles_admin_insert_policy" ON profiles;
CREATE POLICY "profiles_admin_insert_policy" ON profiles
  FOR INSERT
  WITH CHECK ((SELECT private.is_admin()));

-- =============================================
-- EVENTS POLICIES
-- Public can read published events; editors/admins can manage
-- =============================================

DROP POLICY IF EXISTS "events_public_read_policy" ON events;
CREATE POLICY "events_public_read_policy" ON events
  FOR SELECT
  USING (is_published = TRUE OR (SELECT private.is_editor_or_admin()));

DROP POLICY IF EXISTS "events_editor_insert_policy" ON events;
CREATE POLICY "events_editor_insert_policy" ON events
  FOR INSERT
  WITH CHECK ((SELECT private.is_editor_or_admin()));

DROP POLICY IF EXISTS "events_editor_update_policy" ON events;
CREATE POLICY "events_editor_update_policy" ON events
  FOR UPDATE
  USING ((SELECT private.is_editor_or_admin()));

DROP POLICY IF EXISTS "events_admin_delete_policy" ON events;
CREATE POLICY "events_admin_delete_policy" ON events
  FOR DELETE
  USING ((SELECT private.is_admin()));

-- =============================================
-- ANNOUNCEMENTS POLICIES
-- Public can read published; editors/admins can manage
-- =============================================

DROP POLICY IF EXISTS "announcements_public_read_policy" ON announcements;
CREATE POLICY "announcements_public_read_policy" ON announcements
  FOR SELECT
  USING (is_published = TRUE OR (SELECT private.is_editor_or_admin()));

DROP POLICY IF EXISTS "announcements_editor_insert_policy" ON announcements;
CREATE POLICY "announcements_editor_insert_policy" ON announcements
  FOR INSERT
  WITH CHECK ((SELECT private.is_editor_or_admin()));

DROP POLICY IF EXISTS "announcements_editor_update_policy" ON announcements;
CREATE POLICY "announcements_editor_update_policy" ON announcements
  FOR UPDATE
  USING ((SELECT private.is_editor_or_admin()));

DROP POLICY IF EXISTS "announcements_admin_delete_policy" ON announcements;
CREATE POLICY "announcements_admin_delete_policy" ON announcements
  FOR DELETE
  USING ((SELECT private.is_admin()));

-- =============================================
-- GALLERIES POLICIES
-- Public can read all galleries; editors/admins can manage
-- =============================================

DROP POLICY IF EXISTS "galleries_public_read_policy" ON galleries;
CREATE POLICY "galleries_public_read_policy" ON galleries
  FOR SELECT
  USING (TRUE);

DROP POLICY IF EXISTS "galleries_editor_insert_policy" ON galleries;
CREATE POLICY "galleries_editor_insert_policy" ON galleries
  FOR INSERT
  WITH CHECK ((SELECT private.is_editor_or_admin()));

DROP POLICY IF EXISTS "galleries_editor_update_policy" ON galleries;
CREATE POLICY "galleries_editor_update_policy" ON galleries
  FOR UPDATE
  USING ((SELECT private.is_editor_or_admin()));

DROP POLICY IF EXISTS "galleries_admin_delete_policy" ON galleries;
CREATE POLICY "galleries_admin_delete_policy" ON galleries
  FOR DELETE
  USING ((SELECT private.is_admin()));

-- =============================================
-- PHOTOS POLICIES
-- Public can read all photos; editors/admins can manage
-- =============================================

DROP POLICY IF EXISTS "photos_public_read_policy" ON photos;
CREATE POLICY "photos_public_read_policy" ON photos
  FOR SELECT
  USING (TRUE);

DROP POLICY IF EXISTS "photos_editor_insert_policy" ON photos;
CREATE POLICY "photos_editor_insert_policy" ON photos
  FOR INSERT
  WITH CHECK ((SELECT private.is_editor_or_admin()));

DROP POLICY IF EXISTS "photos_editor_delete_policy" ON photos;
CREATE POLICY "photos_editor_delete_policy" ON photos
  FOR DELETE
  USING ((SELECT private.is_editor_or_admin()));

-- =============================================
-- SETTINGS POLICIES
-- Public can read; only admins can update
-- =============================================

DROP POLICY IF EXISTS "settings_public_read_policy" ON settings;
CREATE POLICY "settings_public_read_policy" ON settings
  FOR SELECT
  USING (TRUE);

DROP POLICY IF EXISTS "settings_admin_update_policy" ON settings;
CREATE POLICY "settings_admin_update_policy" ON settings
  FOR UPDATE
  USING ((SELECT private.is_admin()));

DROP POLICY IF EXISTS "settings_admin_insert_policy" ON settings;
CREATE POLICY "settings_admin_insert_policy" ON settings
  FOR INSERT
  WITH CHECK ((SELECT private.is_admin()));

-- =============================================
-- PAGE SECTIONS POLICIES
-- Public can read; admins can manage
-- =============================================

DROP POLICY IF EXISTS "page_sections_public_read_policy" ON page_sections;
CREATE POLICY "page_sections_public_read_policy" ON page_sections
  FOR SELECT
  USING (TRUE);

DROP POLICY IF EXISTS "page_sections_admin_update_policy" ON page_sections;
CREATE POLICY "page_sections_admin_update_policy" ON page_sections
  FOR UPDATE
  USING ((SELECT private.is_admin()));

DROP POLICY IF EXISTS "page_sections_admin_insert_policy" ON page_sections;
CREATE POLICY "page_sections_admin_insert_policy" ON page_sections
  FOR INSERT
  WITH CHECK ((SELECT private.is_admin()));

-- =============================================
-- STORAGE BUCKETS & POLICIES
-- =============================================

INSERT INTO storage.buckets (id, name, public)
VALUES
  ('events', 'events', true),
  ('galleries', 'galleries', true),
  ('photos', 'photos', true),
  ('settings', 'settings', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Events images are publicly accessible" ON storage.objects;
CREATE POLICY "Events images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'events');

DROP POLICY IF EXISTS "Authenticated users can upload event images" ON storage.objects;
CREATE POLICY "Authenticated users can upload event images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'events'
    AND (SELECT private.is_editor_or_admin())
  );

DROP POLICY IF EXISTS "Event images can be deleted by admins" ON storage.objects;
CREATE POLICY "Event images can be deleted by admins" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'events'
    AND (SELECT private.is_admin())
  );

DROP POLICY IF EXISTS "Gallery images are publicly accessible" ON storage.objects;
CREATE POLICY "Gallery images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'galleries');

DROP POLICY IF EXISTS "Authenticated users can upload gallery images" ON storage.objects;
CREATE POLICY "Authenticated users can upload gallery images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'galleries'
    AND (SELECT private.is_editor_or_admin())
  );

DROP POLICY IF EXISTS "Gallery images can be deleted by admins" ON storage.objects;
CREATE POLICY "Gallery images can be deleted by admins" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'galleries'
    AND (SELECT private.is_admin())
  );

DROP POLICY IF EXISTS "Photo images are publicly accessible" ON storage.objects;
CREATE POLICY "Photo images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'photos');

DROP POLICY IF EXISTS "Authenticated users can upload photos" ON storage.objects;
CREATE POLICY "Authenticated users can upload photos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'photos'
    AND (SELECT private.is_editor_or_admin())
  );

DROP POLICY IF EXISTS "Photo images can be deleted by editors and admins" ON storage.objects;
CREATE POLICY "Photo images can be deleted by editors and admins" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'photos'
    AND (SELECT private.is_editor_or_admin())
  );

DROP POLICY IF EXISTS "Settings images are publicly accessible" ON storage.objects;
CREATE POLICY "Settings images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'settings');

DROP POLICY IF EXISTS "Authenticated users can upload settings images" ON storage.objects;
CREATE POLICY "Authenticated users can upload settings images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'settings'
    AND (SELECT private.is_editor_or_admin())
  );

DROP POLICY IF EXISTS "Settings images can be deleted by admins" ON storage.objects;
CREATE POLICY "Settings images can be deleted by admins" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'settings'
    AND (SELECT private.is_admin())
  );

-- =============================================
-- FUNCTIONS
-- =============================================

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update updated_at trigger (idempotent)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS update_events_updated_at ON events;
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_announcements_updated_at ON announcements;
CREATE TRIGGER update_announcements_updated_at
  BEFORE UPDATE ON announcements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_galleries_updated_at ON galleries;
CREATE TRIGGER update_galleries_updated_at
  BEFORE UPDATE ON galleries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_settings_updated_at ON settings;
CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_page_sections_updated_at ON page_sections;
CREATE TRIGGER update_page_sections_updated_at
  BEFORE UPDATE ON page_sections
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- INITIAL DATA (singleton settings row)
-- =============================================

INSERT INTO settings (id, hero_title, hero_subtitle, hero_image, hero_images, welcome_text, contact_phone, contact_email, address)
VALUES (
  '00000000-0000-0000-0000-000000000001'::uuid,
  'El Redil Joven',
  'Conectados en fe, unidos en propósito',
  'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1600',
  '["https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1600","https://images.unsplash.com/photo-1527532398782-1c1eb4a10e9f?w=1600","https://images.unsplash.com/photo-1539635278303-d4002c07eae3?w=1600"]'::jsonb,
  'Un lugar para crecer, conectar y vivir la fe juntos. Sé parte de lo que Dios está haciendo en nuestra juventud.',
  '+1 234 567 890',
  'contacto@elrediljoven.com',
  'Calle Principal #123, Ciudad'
)
ON CONFLICT (id) DO NOTHING;

-- =============================================
-- PAGE SECTIONS INITIAL DATA
-- =============================================

INSERT INTO page_sections (page, section_key, title, subtitle, body, cta_label, cta_url) VALUES
-- HOME
('home', 'hero', 'Actividades Destacadas', 'No te pierdas nuestras próximas actividades', NULL, 'Ver todas las actividades', '/actividades'),
('home', 'devocional', 'Haz tu devocional con nosotros', 'Cada día ofrece una nueva reflexión para fortalecer tu relación con Dios.', NULL, 'Ver devocionales', '/devocional'),
('home', 'community_title', 'Nuestra Comunidad', 'Lo que representa El Redil Joven', NULL, NULL, NULL),
('home', 'announcements_title', 'Anuncios Importantes', 'Mantente informado de lo que está pasando', NULL, 'Ver todos los anuncios', '/anuncios'),
-- ABOUT
('about', 'hero', 'Sobre', 'Nosotros', NULL, NULL, NULL),
('about', 'welcome_title', 'Bienvenido a El Redil Joven', NULL, NULL, 'Contáctanos', '/contacto'),
('about', 'values_title', 'Nuestros Valores', 'Lo que nos define como comunidad', NULL, NULL, NULL),
('about', 'stats_title', NULL, NULL, NULL, NULL, NULL),
('about', 'cta_title', '¿Quieres ser parte?', NULL, 'Nos encantaría conocerte. Visítanos cualquier domingo o contáctanos para más información sobre cómo puedes involucrarte en El Redil Joven.', 'Ver programa', '/programa'),
-- CONTACT
('contact', 'hero', 'Contáctanos', '¿Tienes preguntas o quieres saber más? Estamos aquí para ayudarte', NULL, NULL, NULL),
('contact', 'form_title', 'Envíanos un mensaje', NULL, NULL, NULL, NULL),
('contact', 'info_title', 'Información de contacto', NULL, NULL, NULL, NULL),
-- GALLERY
('gallery', 'hero', 'Galería de Fotos', 'Revive los momentos especiales de nuestra comunidad', NULL, NULL, NULL),
-- PROGRAM
('program', 'hero', 'Próximos Encuentros', 'Explora nuestra programación mensual diseñada para conectar, crecer y celebrar juntos.', NULL, NULL, NULL),
('activities', 'hero', 'Nuestras Actividades', 'Cada encuentro es una oportunidad para crecer en fe y comunidad', NULL, NULL, NULL),
('announcements', 'hero', 'Anuncios', 'Mantente informado de lo que está pasando en nuestra comunidad', NULL, NULL, NULL)
ON CONFLICT (page, section_key) DO NOTHING;

-- =============================================
-- NOTES
-- =============================================

-- To use this setup:
-- 1. Create a new Supabase project at https://supabase.com
-- 2. Copy this SQL and run it in the Supabase SQL Editor
-- 3. Update your .env file with the Supabase URL and anon key:
--    VITE_SUPABASE_URL=https://your-project.supabase.co
--    VITE_SUPABASE_ANON_KEY=your-anon-key
-- 4. Create your first admin user through Supabase Auth dashboard
-- 5. Update the user's role to 'admin' in the profiles table:
--    UPDATE profiles SET role = 'admin' WHERE email = 'your-admin@email.com';
