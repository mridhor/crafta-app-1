-- Raw Ingestion Staging Table
create table public.inbound_leads_raw (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid references public.workspaces(id) on delete cascade,
    source text,
    payload jsonb,
    idempotency_key text,
    status text default 'received',
    received_at timestamptz default now(),
    processed_at timestamptz
);

create index idx_inbound_idempotency on public.inbound_leads_raw(idempotency_key);
create index idx_inbound_workspace on public.inbound_leads_raw(workspace_id);

-- RLS Policies
alter table public.inbound_leads_raw enable row level security;

create policy "View inbound leads in workspace"
    on public.inbound_leads_raw for select
    using (workspace_id in (select workspace_id from public.users where email = auth.jwt() ->> 'email'));
