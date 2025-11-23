-- Rhythm Tasks
create table public.rhythm_tasks (
    id uuid primary key default uuid_generate_v4(),
    organization_id uuid references public.organizations(id) not null,
    entity_id uuid references public.entities(id) on delete cascade,
    assignee_id uuid references public.profiles(id),
    title text not null,
    type text check (type in ('call', 'email', 'meeting', 'escalate', 'review', 'other')),
    urgency text check (urgency in ('low', 'medium', 'high', 'critical')) default 'medium',
    status text check (status in ('pending', 'completed', 'skipped')) default 'pending',
    due_at timestamp with time zone,
    completed_at timestamp with time zone,
    ai_context text, -- Generated insight/reasoning
    decay_score float default 0, -- Calculated metric for sorting
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Activities (Timeline)
create table public.activities (
    id uuid primary key default uuid_generate_v4(),
    organization_id uuid references public.organizations(id) not null,
    entity_id uuid references public.entities(id) on delete cascade,
    actor_id uuid references public.profiles(id), -- Nullable for system actions
    type text not null, -- 'note', 'email', 'call', 'stage_change', 'system_alert'
    content jsonb not null default '{}'::jsonb,
    occurred_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Pipeline Snapshots (Analytics)
create table public.pipeline_snapshots (
    id uuid primary key default uuid_generate_v4(),
    organization_id uuid references public.organizations(id) not null,
    entity_id uuid references public.entities(id) on delete cascade,
    stage text not null,
    days_in_stage integer default 0,
    snapshot_date date default CURRENT_DATE,
    value numeric,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Indexes
create index rhythm_tasks_assignee_idx on public.rhythm_tasks(assignee_id);
create index rhythm_tasks_status_idx on public.rhythm_tasks(status);
create index activities_entity_idx on public.activities(entity_id);
create index activities_occurred_at_idx on public.activities(occurred_at desc);

-- RLS Policies
alter table public.rhythm_tasks enable row level security;
alter table public.activities enable row level security;
alter table public.pipeline_snapshots enable row level security;

create policy "View tasks in org"
    on public.rhythm_tasks for select
    using (organization_id = (select organization_id from public.profiles where id = auth.uid()));

create policy "Update assigned tasks"
    on public.rhythm_tasks for update
    using (organization_id = (select organization_id from public.profiles where id = auth.uid()));

create policy "View activities in org"
    on public.activities for select
    using (organization_id = (select organization_id from public.profiles where id = auth.uid()));

create policy "Insert activities in org"
    on public.activities for insert
    with check (organization_id = (select organization_id from public.profiles where id = auth.uid()));
