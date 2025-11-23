-- Validations
create table public.validations (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid references public.workspaces(id),
    source_table text,
    source_id uuid,
    validator_name text,
    status text, -- ready, warning, failed, auto-fixed
    details jsonb,
    confidence numeric,
    created_at timestamptz default now()
);

create index idx_validations_source on public.validations(source_table, source_id);
create index idx_validations_status on public.validations(status);

-- Validation Issues
create table public.validation_issues (
    id uuid primary key default gen_random_uuid(),
    validation_id uuid references public.validations(id),
    issue_code text,
    message text,
    suggested_fix jsonb,
    created_at timestamptz default now()
);

-- Governance Rules
create table public.governance_rules (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid references public.workspaces(id),
    name text,
    rule_json jsonb,
    action text, -- strict_block, quarantine, merge_suggestion, auto_fix
    active boolean default true,
    created_at timestamptz default now()
);

-- RLS Policies
alter table public.validations enable row level security;
alter table public.validation_issues enable row level security;
alter table public.governance_rules enable row level security;

create policy "View validations in workspace"
    on public.validations for select
    using (workspace_id in (select workspace_id from public.users where email = auth.jwt() ->> 'email'));

create policy "View governance rules in workspace"
    on public.governance_rules for select
    using (workspace_id in (select workspace_id from public.users where email = auth.jwt() ->> 'email'));
