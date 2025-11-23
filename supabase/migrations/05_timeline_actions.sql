-- Deal Events (Timeline)
create table public.deal_events (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid references public.workspaces(id),
    deal_id uuid references public.deals(id) on delete cascade,
    actor_id uuid references public.users(id),
    actor_type text default 'user',
    event_type text not null,
    payload jsonb,
    created_at timestamptz default now()
);

create index idx_dealevents_deal on public.deal_events(deal_id);
create index idx_dealevents_workspace on public.deal_events(workspace_id);

-- Actions (Tasks)
create table public.actions (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid references public.workspaces(id),
    deal_id uuid references public.deals(id),
    action_type text,
    status text default 'pending',
    params jsonb,
    scheduled_at timestamptz,
    executed_at timestamptz,
    created_at timestamptz default now()
);

-- RLS Policies
alter table public.deal_events enable row level security;
alter table public.actions enable row level security;

create policy "View deal events in workspace"
    on public.deal_events for select
    using (workspace_id in (select workspace_id from public.users where email = auth.jwt() ->> 'email'));

create policy "View actions in workspace"
    on public.actions for select
    using (workspace_id in (select workspace_id from public.users where email = auth.jwt() ->> 'email'));
