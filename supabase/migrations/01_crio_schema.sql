-- Entity Definitions (Metadata)
create table public.entity_definitions (
    id uuid primary key default uuid_generate_v4(),
    organization_id uuid references public.organizations(id) not null,
    name text not null, -- e.g., 'deal', 'contact', 'company'
    schema jsonb not null default '{}'::jsonb, -- JSON Schema for validation
    version integer default 1,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    unique(organization_id, name)
);

-- Entities (Core Object)
create table public.entities (
    id uuid primary key default uuid_generate_v4(),
    organization_id uuid references public.organizations(id) not null,
    definition_id uuid references public.entity_definitions(id) not null,
    type text not null, -- Cached from definition for easier querying
    data jsonb not null default '{}'::jsonb,
    created_by uuid references public.profiles(id),
    owner_id uuid references public.profiles(id),
    stage text, -- Standardized stage field
    status text check (status in ('active', 'archived', 'deleted')) default 'active',
    search_vector tsvector,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Relationships (Graph)
create table public.relationships (
    id uuid primary key default uuid_generate_v4(),
    organization_id uuid references public.organizations(id) not null,
    from_entity_id uuid references public.entities(id) on delete cascade not null,
    to_entity_id uuid references public.entities(id) on delete cascade not null,
    type text not null, -- e.g., 'works_for', 'associated_with'
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes
create index entities_search_idx on public.entities using gin(search_vector);
create index entities_data_gin_idx on public.entities using gin(data);
create index relationships_from_idx on public.relationships(from_entity_id);
create index relationships_to_idx on public.relationships(to_entity_id);

-- RLS Policies
alter table public.entity_definitions enable row level security;
alter table public.entities enable row level security;
alter table public.relationships enable row level security;

-- Definitions: Read-only for most, Admin write
create policy "View definitions in org"
    on public.entity_definitions for select
    using (organization_id = (select organization_id from public.profiles where id = auth.uid()));

-- Entities: View all in org, Edit assigned or if Admin
create policy "View entities in org"
    on public.entities for select
    using (organization_id = (select organization_id from public.profiles where id = auth.uid()));

create policy "Create entities in org"
    on public.entities for insert
    with check (organization_id = (select organization_id from public.profiles where id = auth.uid()));

create policy "Update entities in org"
    on public.entities for update
    using (organization_id = (select organization_id from public.profiles where id = auth.uid()));

-- Relationships: View all in org
create policy "View relationships in org"
    on public.relationships for select
    using (organization_id = (select organization_id from public.profiles where id = auth.uid()));
