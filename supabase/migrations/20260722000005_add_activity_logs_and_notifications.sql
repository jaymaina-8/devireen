-- 20260722000005_add_activity_logs_and_notifications.sql

-- ACTIVITY LOGS TABLE
create table public.activity_logs (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete set null,
    action text not null, -- e.g., 'created', 'updated', 'deleted', 'blocked', 'approved'
    entity_type text not null, -- e.g., 'product', 'quote', 'order', 'customer', 'testimonial'
    entity_id uuid, -- UUID of the entity being acted upon (nullable in case of global actions or hard deletes)
    details jsonb default '{}'::jsonb, -- Additional context (e.g., changes made)
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Activity Logs
alter table public.activity_logs enable row level security;
create policy "Admins can view activity logs" on public.activity_logs for select using (true);
create policy "Admins can insert activity logs" on public.activity_logs for insert with check (true);


-- NOTIFICATIONS TABLE
create table public.notifications (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade, -- The recipient
    title text not null,
    message text not null,
    link text, -- Internal path, e.g., '/dashboard/quotes/123'
    is_read boolean not null default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Notifications
alter table public.notifications enable row level security;
create policy "Users can view their own notifications" on public.notifications for select using (auth.uid() = user_id);
create policy "System can insert notifications" on public.notifications for insert with check (true);
create policy "Users can update their own notifications" on public.notifications for update using (auth.uid() = user_id);
create policy "Users can delete their own notifications" on public.notifications for delete using (auth.uid() = user_id);
