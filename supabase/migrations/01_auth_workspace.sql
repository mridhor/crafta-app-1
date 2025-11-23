-- Enable necessary extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pg_cron";
create extension if not exists "vector";

-- Workspaces
create table public.workspaces (
    id uuid primary key default gen_random_uuid(),
    name text not null,
    plan text not null default 'trial',
    settings jsonb default '{}'::jsonb,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Users (Linked to Auth)
create table public.users (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid references public.workspaces(id) on delete cascade,
    email text not null unique,
    full_name text,
    role text not null default 'rep',
    metadata jsonb default '{}'::jsonb,
    created_at timestamptz default now(),
    last_seen timestamptz
);

create index idx_users_workspace on public.users(workspace_id);

-- API Keys
create table public.api_keys (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid references public.workspaces(id) on delete cascade,
    key_name text,
    key_secret text,
    active boolean default true,
    created_at timestamptz default now(),
    last_used timestamptz
);

-- RLS Policies
alter table public.workspaces enable row level security;
alter table public.users enable row level security;
alter table public.api_keys enable row level security;

-- Workspace: Users can view their own workspace
create policy "Users can view their own workspace"
    on public.workspaces for select
    using (id in (select workspace_id from public.users where email = auth.jwt() ->> 'email')); -- Simplified auth check for now

-- Users: Users can view users in their workspace
create policy "Users can view users in their workspace"
    on public.users for select
    using (workspace_id in (select workspace_id from public.users where email = auth.jwt() ->> 'email'));
