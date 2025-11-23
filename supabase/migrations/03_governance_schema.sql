-- Audit Logs
create table public.audit_logs (
    id uuid primary key default uuid_generate_v4(),
    organization_id uuid references public.organizations(id) not null,
    actor_id uuid references public.profiles(id),
    action text not null,
    target_resource text not null,
    details jsonb default '{}'::jsonb,
    ip_address text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Intake Queue (Convert Module)
create table public.intake_queue (
    id uuid primary key default uuid_generate_v4(),
    organization_id uuid references public.organizations(id) not null,
    source text not null,
    payload jsonb not null,
    status text check (status in ('quarantined', 'warning', 'approved', 'rejected')) default 'quarantined',
    validation_errors jsonb default '[]'::jsonb,
    confidence_score float,
    processed_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Settings
create table public.settings (
    organization_id uuid primary key references public.organizations(id),
    config jsonb not null default '{}'::jsonb, -- Stores routing, SLA, branding, etc.
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies
alter table public.audit_logs enable row level security;
alter table public.intake_queue enable row level security;
alter table public.settings enable row level security;

-- Audit Logs: Read-only, mostly for admins (policy can be refined)
create policy "View audit logs in org"
    on public.audit_logs for select
    using (organization_id = (select organization_id from public.profiles where id = auth.uid()));

-- Intake Queue: View/Update in org
create policy "View intake queue in org"
    on public.intake_queue for select
    using (organization_id = (select organization_id from public.profiles where id = auth.uid()));

create policy "Update intake queue in org"
    on public.intake_queue for update
    using (organization_id = (select organization_id from public.profiles where id = auth.uid()));

-- Settings: View in org, Update by Admin only
create policy "View settings in org"
    on public.settings for select
    using (organization_id = (select organization_id from public.profiles where id = auth.uid()));

create policy "Update settings in org"
    on public.settings for update
    using (organization_id = (select organization_id from public.profiles where id = auth.uid()) 
           and exists (select 1 from public.profiles where id = auth.uid() and role in ('owner', 'admin')));
