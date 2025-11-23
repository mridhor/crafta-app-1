-- Integrations
create table public.integrations (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid references public.workspaces(id) on delete cascade,
    provider text not null,
    config jsonb,
    status text not null default 'disconnected',
    last_sync timestamptz,
    created_at timestamptz default now()
);

-- Webhook Endpoints
create table public.webhook_endpoints (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid references public.workspaces(id) on delete cascade,
    url text not null,
    events text[] not null default array['form.submit', 'lead.create'],
    active boolean default true,
    created_at timestamptz default now()
);

-- RLS Policies
alter table public.integrations enable row level security;
alter table public.webhook_endpoints enable row level security;

create policy "View integrations in workspace"
    on public.integrations for select
    using (workspace_id in (select workspace_id from public.users where email = auth.jwt() ->> 'email'));

create policy "View webhooks in workspace"
    on public.webhook_endpoints for select
    using (workspace_id in (select workspace_id from public.users where email = auth.jwt() ->> 'email'));
