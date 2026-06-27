-- ─────────────────────────────────────────
--  Tivra — Supabase Schema
-- ─────────────────────────────────────────

-- Admins whitelist
create table if not exists public.admins (
  id         uuid primary key default gen_random_uuid(),
  email      text unique not null,
  created_at timestamptz default now()
);

-- Seed the two whitelisted admins
insert into public.admins (email) values
  ('priyanshirana78@gmail.com'),
  ('dhiraj503@gmail.com')
on conflict (email) do nothing;

-- Client projects board
create type public.project_status as enum (
  'lead',
  'in_progress',
  'review',
  'delivered'
);

create type public.project_type as enum (
  'Landing Page',
  'E-Commerce',
  'Portfolio',
  'Blog',
  'Booking Site',
  'Other'
);

create table if not exists public.clients (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  company       text not null default '',
  project_type  public.project_type not null default 'Landing Page',
  status        public.project_status not null default 'lead',
  assigned_dev  text not null default '',
  next_action   text not null default '',
  notes         text not null default '',
  created_at    timestamptz default now()
);

-- ─── Row Level Security ───────────────────
alter table public.admins enable row level security;
alter table public.clients enable row level security;

-- Only authenticated users whose email is in admins can access clients
create policy "Admins can read clients"
  on public.clients for select
  using (
    auth.email() in (select email from public.admins)
  );

create policy "Admins can insert clients"
  on public.clients for insert
  with check (
    auth.email() in (select email from public.admins)
  );

create policy "Admins can update clients"
  on public.clients for update
  using (
    auth.email() in (select email from public.admins)
  );

create policy "Admins can delete clients"
  on public.clients for delete
  using (
    auth.email() in (select email from public.admins)
  );

-- Any authenticated user can read the admins whitelist
-- (safe: only our admin emails are Supabase Auth users)
create policy "Authenticated users can read admins"
  on public.admins for select
  using (auth.role() = 'authenticated');
