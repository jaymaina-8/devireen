-- 20260722000006_add_product_short_desc_and_seed_categories.sql

-- Add short_description to products
alter table public.products add column short_description text;

-- Add display_order and image_url to categories if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='categories' AND column_name='display_order') THEN
        ALTER TABLE public.categories ADD COLUMN display_order integer default 0;
    END IF;
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='categories' AND column_name='image_url') THEN
        ALTER TABLE public.categories ADD COLUMN image_url text;
    END IF;
END $$;

-- Seed default categories
insert into public.categories (name, slug, description, display_order, is_active)
values 
  ('Office Supplies', 'office-supplies', 'Essential supplies for daily office operations', 10, true),
  ('Paper Products', 'paper-products', 'Printer paper, notebooks, and writing pads', 20, true),
  ('Filing & Storage', 'filing-storage', 'Folders, binders, and storage boxes', 30, true),
  ('Office Equipment', 'office-equipment', 'Printers, shredders, and laminators', 40, true),
  ('Printer Supplies', 'printer-supplies', 'Ink, toner, and printer accessories', 50, true),
  ('School Supplies', 'school-supplies', 'Back to school essentials and educational materials', 60, true),
  ('Desk Accessories', 'desk-accessories', 'Organizers, staplers, and hole punches', 70, true),
  ('Cleaning & Hygiene', 'cleaning-hygiene', 'Janitorial supplies and personal hygiene products', 80, true),
  ('Electronics & Accessories', 'electronics-accessories', 'Keyboards, mice, and computer peripherals', 90, true),
  ('Furniture', 'furniture', 'Chairs, desks, and office storage solutions', 100, true)
on conflict (slug) do nothing;
