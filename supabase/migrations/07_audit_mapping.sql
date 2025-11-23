-- Audit Log
create table public.audit_log (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid references public.workspaces(id),
    actor_id uuid,
    actor_type text,
    action text,
    entity_type text,
    entity_id uuid,
    payload jsonb,
    created_at timestamptz default now()
);

create index idx_audit_entity on public.audit_log(entity_type, entity_id);
create index idx_audit_workspace on public.audit_log(workspace_id);

-- Schema Mappings
create table public.schema_mappings (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid references public.workspaces(id),
    source_field text,
    target_field text,
    transform jsonb,
    confidence numeric,
    last_seen timestamptz,
    created_at timestamptz default now()
);

-- Templates
create table public.templates (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid references public.workspaces(id),
    name text,
    template_type text,
    body jsonb,
    version integer default 1,
    created_at timestamptz default now()
);

-- RLS Policies
alter table public.audit_log enable row level security;
alter table public.schema_mappings enable row level security;
alter table public.templates enable row level security;

create policy "View audit log in workspace"
    on public.audit_log for select
    using (workspace_id in (select workspace_id from public.users where email = auth.jwt() ->> 'email'));

create policy "View mappings in workspace"
    on public.schema_mappings for select
    using (workspace_id in (select workspace_id from public.users where email = auth.jwt() ->> 'email'));
