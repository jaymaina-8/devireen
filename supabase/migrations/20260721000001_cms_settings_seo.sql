-- Create settings table
CREATE TABLE IF NOT EXISTS public.settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name VARCHAR NOT NULL,
    logo_url VARCHAR,
    favicon_url VARCHAR,
    phone_numbers JSONB,
    whatsapp_number VARCHAR,
    email VARCHAR,
    physical_address TEXT,
    branches JSONB,
    business_hours JSONB,
    google_maps_url VARCHAR,
    social_media_links JSONB,
    footer_content TEXT,
    default_seo_title VARCHAR,
    default_seo_description TEXT,
    default_og_image VARCHAR,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by UUID REFERENCES auth.users(id)
);

-- Ensure only one settings row exists
CREATE UNIQUE INDEX IF NOT EXISTS settings_single_row ON public.settings((true));

-- Create seo_metadata table
CREATE TABLE IF NOT EXISTS public.seo_metadata (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    entity_type VARCHAR NOT NULL, -- e.g., 'PAGE', 'PRODUCT', 'CATEGORY'
    entity_id UUID, -- Optional: Links to a specific product or category
    slug VARCHAR, -- Used for static pages like '/about'
    page_title VARCHAR NOT NULL,
    meta_description TEXT,
    og_title VARCHAR,
    og_description TEXT,
    og_image VARCHAR,
    canonical_url VARCHAR,
    robots_settings VARCHAR DEFAULT 'index, follow',
    keywords TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_seo_metadata_entity ON public.seo_metadata(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_seo_metadata_slug ON public.seo_metadata(slug);

-- Enable RLS
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_metadata ENABLE ROW LEVEL SECURITY;

-- Policies for settings
CREATE POLICY "Allow public read-only access to settings" 
ON public.settings FOR SELECT USING (true);

CREATE POLICY "Allow authenticated full access to settings" 
ON public.settings FOR ALL USING (auth.role() = 'authenticated');

-- Policies for seo_metadata
CREATE POLICY "Allow public read-only access to seo_metadata" 
ON public.seo_metadata FOR SELECT USING (true);

CREATE POLICY "Allow authenticated full access to seo_metadata" 
ON public.seo_metadata FOR ALL USING (auth.role() = 'authenticated');

-- Trigger to update updated_at for settings
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_settings_updated_at
BEFORE UPDATE ON public.settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_seo_metadata_updated_at
BEFORE UPDATE ON public.seo_metadata
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
