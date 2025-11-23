-- Companies
create table public.companies (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid references public.workspaces(id) on delete cascade,
    external_ids jsonb default '{}'::jsonb,
    name text,
    domain text,
    industry text,
    size integer,
    metadata jsonb default '{}'::jsonb,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    deleted_at timestamptz
);

create index idx_companies_domain on public.companies(domain);

-- Contacts
create table public.contacts (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid references public.workspaces(id) on delete cascade,
    company_id uuid references public.companies(id) on delete set null,
    external_ids jsonb default '{}'::jsonb,
    email text,
    phone text,
    name text,
    title text,
    metadata jsonb default '{}'::jsonb,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    deleted_at timestamptz
);

create index idx_contacts_email on public.contacts(email);

-- Deals
create table public.deals (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid references public.workspaces(id) on delete cascade,
    company_id uuid references public.companies(id),
    owner_id uuid references public.users(id),
    external_id text,
    name text,
    value numeric,
    currency text,
    stage text,
    close_date date,
    metadata jsonb default '{}'::jsonb,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    deleted_at timestamptz
);

create index idx_deals_owner on public.deals(owner_id);
create index idx_deals_stage on public.deals(stage);

-- RLS Policies
alter table public.companies enable row level security;
alter table public.contacts enable row level security;
alter table public.deals enable row level security;

create policy "View companies in workspace"
    on public.companies for select
    using (workspace_id in (select workspace_id from public.users where email = auth.jwt() ->> 'email'));

create policy "View contacts in workspace"
    on public.contacts for select
    using (workspace_id in (select workspace_id from public.users where email = auth.jwt() ->> 'email'));

create policy "View deals in workspace"
    on public.deals for select
    using (workspace_id in (select workspace_id from public.users where email = auth.jwt() ->> 'email'));
