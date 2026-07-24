-- Testimonials Table
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  customer_name varchar(255) not null,
  company varchar(255),
  position varchar(255),
  photo_url text,
  rating integer not null default 5 check (rating >= 1 and rating <= 5),
  review text not null,
  is_featured boolean not null default false,
  is_published boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

-- Index for ordering and filtering
create index if not exists idx_testimonials_published_order on public.testimonials (is_published, display_order, created_at desc);

-- RLS Configuration
alter table public.testimonials enable row level security;

-- Policies
create policy "Allow public read access to published testimonials"
  on public.testimonials for select
  using (is_published = true and deleted_at is null);

create policy "Allow authenticated full access to testimonials"
  on public.testimonials for all
  using (auth.role() = 'authenticated');

-- Updated at trigger
create trigger handle_testimonials_updated_at
  before update on public.testimonials
  for each row execute procedure public.handle_updated_at();
