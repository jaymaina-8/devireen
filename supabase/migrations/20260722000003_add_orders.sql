-- Orders Enum
create type public.order_status as enum ('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED', 'REFUNDED');
create type public.payment_status as enum ('UNPAID', 'PARTIAL', 'PAID', 'REFUNDED');

-- Orders Table
create table public.orders (
  id uuid primary key default uuid_generate_v4(),
  quote_id uuid references public.quotes(id) on delete set null,
  customer_id uuid references public.customers(id) on delete restrict,
  status order_status not null default 'PENDING',
  payment_status payment_status not null default 'UNPAID',
  total_amount numeric(12, 2) not null default 0,
  shipping_address text,
  billing_address text,
  notes text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  deleted_at timestamptz
);
create trigger handle_orders_updated_at before update on public.orders for each row execute procedure public.handle_updated_at();

-- Order Items
create table public.order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete restrict not null,
  quantity integer not null default 1,
  unit_price numeric(10, 2) not null,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);
create trigger handle_order_items_updated_at before update on public.order_items for each row execute procedure public.handle_updated_at();

-- RLS Configuration
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
