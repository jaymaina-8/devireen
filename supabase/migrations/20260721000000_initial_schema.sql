-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Custom Enums
create type public.stock_status as enum ('IN_STOCK', 'OUT_OF_STOCK', 'PRE_ORDER', 'DISCONTINUED');
create type public.quote_status as enum ('DRAFT', 'PENDING', 'REVIEWING', 'APPROVED', 'REJECTED', 'FULFILLED');

-- Function to update modified timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- 1. PROFILES
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  first_name text,
  last_name text,
  phone text,
  avatar_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);
create trigger handle_profiles_updated_at before update on public.profiles for each row execute procedure public.handle_updated_at();

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

-- 2. ROLES & USER_ROLES
create table public.roles (
  id uuid primary key default uuid_generate_v4(),
  name text unique not null,
  description text,
  created_at timestamptz default now() not null
);

create table public.user_roles (
  user_id uuid references public.profiles(id) on delete cascade not null,
  role_id uuid references public.roles(id) on delete cascade not null,
  created_at timestamptz default now() not null,
  primary key (user_id, role_id)
);

-- 3. CUSTOMERS
create table public.customers (
  id uuid primary key default uuid_generate_v4(),
  type text not null check (type in ('RETAIL', 'BUSINESS')),
  company_name text,
  kra_pin text,
  contact_email text,
  contact_phone text,
  profile_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  deleted_at timestamptz
);
create trigger handle_customers_updated_at before update on public.customers for each row execute procedure public.handle_updated_at();

-- 4. CATEGORIES
create table public.categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  description text,
  parent_id uuid references public.categories(id) on delete restrict,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  deleted_at timestamptz
);
create trigger handle_categories_updated_at before update on public.categories for each row execute procedure public.handle_updated_at();

-- 5. BRANDS
create table public.brands (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  logo_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  deleted_at timestamptz
);
create trigger handle_brands_updated_at before update on public.brands for each row execute procedure public.handle_updated_at();

-- 6. PRODUCTS
create table public.products (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  sku text unique not null,
  name text not null,
  description text,
  category_id uuid references public.categories(id) on delete restrict not null,
  brand_id uuid references public.brands(id) on delete restrict,
  price numeric(10, 2) not null default 0,
  sale_price numeric(10, 2),
  stock_status stock_status not null default 'IN_STOCK',
  attributes jsonb default '{}'::jsonb not null,
  seo_title text,
  seo_description text,
  is_active boolean not null default true,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  deleted_at timestamptz
);
create trigger handle_products_updated_at before update on public.products for each row execute procedure public.handle_updated_at();

-- Full text search index on products
alter table public.products add column fts tsvector generated always as (setweight(to_tsvector('english', coalesce(name, '')), 'A') || setweight(to_tsvector('english', coalesce(description, '')), 'B') || setweight(to_tsvector('english', coalesce(sku, '')), 'C')) stored;
create index products_fts_idx on public.products using gin (fts);

-- 7. PRODUCT IMAGES
create table public.product_images (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references public.products(id) on delete cascade not null,
  url text not null,
  alt_text text,
  is_primary boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz default now() not null
);

-- 8. QUOTES
create table public.quotes (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid references public.customers(id) on delete restrict,
  session_id text, -- for anonymous users
  status quote_status not null default 'DRAFT',
  notes text,
  total_amount numeric(12, 2) not null default 0,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  deleted_at timestamptz
);
create trigger handle_quotes_updated_at before update on public.quotes for each row execute procedure public.handle_updated_at();

-- 9. QUOTE ITEMS
create table public.quote_items (
  id uuid primary key default uuid_generate_v4(),
  quote_id uuid references public.quotes(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete restrict not null,
  quantity integer not null default 1,
  unit_price numeric(10, 2) not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);
create trigger handle_quote_items_updated_at before update on public.quote_items for each row execute procedure public.handle_updated_at();

-- RLS Configuration
alter table public.profiles enable row level security;
alter table public.roles enable row level security;
alter table public.user_roles enable row level security;
alter table public.customers enable row level security;
alter table public.categories enable row level security;
alter table public.brands enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.quotes enable row level security;
alter table public.quote_items enable row level security;

-- Public read access for catalog
create policy "Public catalog read" on public.categories for select using (deleted_at is null);
create policy "Public catalog read" on public.brands for select using (deleted_at is null);
create policy "Public catalog read" on public.products for select using (is_active = true and deleted_at is null);
create policy "Public catalog read" on public.product_images for select using (true);

-- Quotes access:
create policy "Allow read on own quotes" on public.quotes for select using (
  (auth.uid() is not null and customer_id in (select id from public.customers where profile_id = auth.uid()))
  or (session_id is not null)
);
create policy "Allow insert on quotes" on public.quotes for insert with check (true);
create policy "Allow update on own quotes" on public.quotes for update using (
  (auth.uid() is not null and customer_id in (select id from public.customers where profile_id = auth.uid()))
  or (session_id is not null)
);

create policy "Allow read on own quote items" on public.quote_items for select using (
  quote_id in (select id from public.quotes where (auth.uid() is not null and customer_id in (select id from public.customers where profile_id = auth.uid())) or (session_id is not null))
);
create policy "Allow insert on quote items" on public.quote_items for insert with check (true);
create policy "Allow update on own quote items" on public.quote_items for update using (
  quote_id in (select id from public.quotes where (auth.uid() is not null and customer_id in (select id from public.customers where profile_id = auth.uid())) or (session_id is not null))
);
