-- Seed Roles
insert into public.roles (id, name, description) values
  ('d8888888-8888-8888-8888-888888888888', 'ADMIN', 'Super admin'),
  ('d8888888-8888-8888-8888-888888888889', 'SALES', 'Sales representative');

-- Seed Categories
insert into public.categories (id, name, slug, description) values
  ('c1111111-1111-1111-1111-111111111111', 'Office Supplies', 'office-supplies', 'Basic supplies for everyday use'),
  ('c1111111-1111-1111-1111-111111111112', 'Stationery', 'stationery', 'Pens, paper, notebooks, etc.'),
  ('c1111111-1111-1111-1111-111111111113', 'Equipment', 'equipment', 'Printers, scanners, and heavy machinery');

-- Seed Brands
insert into public.brands (id, name, slug) values
  ('b1111111-1111-1111-1111-111111111111', 'HP', 'hp'),
  ('b1111111-1111-1111-1111-111111111112', 'Kasuku', 'kasuku');

-- Seed Products
insert into public.products (id, slug, sku, name, category_id, brand_id, price) values
  ('p1111111-1111-1111-1111-111111111111', 'hp-laserjet-pro', 'HP-LJP-01', 'HP LaserJet Pro MFP', 'c1111111-1111-1111-1111-111111111113', 'b1111111-1111-1111-1111-111111111111', 25000),
  ('p1111111-1111-1111-1111-111111111112', 'kasuku-a4-notebook', 'KSK-A4-200', 'Kasuku A4 200 Pages', 'c1111111-1111-1111-1111-111111111112', 'b1111111-1111-1111-1111-111111111112', 150);
