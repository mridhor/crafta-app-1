-- Enable necessary extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pg_cron";
create extension if not exists "vector";

-- Organizations Table
create table public.organizations (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    slug text unique not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Profiles Table (Extends Supabase Auth)
create table public.profiles (
    id uuid primary key references auth.users(id) on delete cascade,
    organization_id uuid references public.organizations(id),
    role text check (role in ('owner', 'admin', 'rep', 'analyst')) default 'rep',
    full_name text,
    avatar_url text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies for Organizations
alter table public.organizations enable row level security;

create policy "Users can view their own organization"
    on public.organizations for select
    using (id in (select organization_id from public.profiles where profiles.id = auth.uid()));

-- RLS Policies for Profiles
alter table public.profiles enable row level security;

create policy "Users can view profiles in their organization"
    on public.profiles for select
    using (organization_id in (select organization_id from public.profiles where profiles.id = auth.uid()));

create policy "Users can update their own profile"
    on public.profiles for update
    using (id = auth.uid());
