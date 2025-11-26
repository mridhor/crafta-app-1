-- Governance Rules Table
create table public.governance_rules (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid references public.workspaces(id) on delete cascade,
    name text not null,
    description text,
    rule_type text not null, -- 'enrichment', 'validation', 'duplicate_check'
    parameters jsonb default '{}'::jsonb,
    enforcement_level text default 'warning', -- 'strict_block', 'quarantine', 'warning', 'merge_suggestion'
    is_active boolean default true,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- RLS Policies
alter table public.governance_rules enable row level security;

create policy "Users can view governance rules in their workspace"
    on public.governance_rules for select
    using (workspace_id = public.get_user_workspace_id());

create policy "Users can manage governance rules in their workspace"
    on public.governance_rules for all
    using (workspace_id = public.get_user_workspace_id());
