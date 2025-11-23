-- Revenue Graph Nodes
create table public.revenue_graph_nodes (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid references public.workspaces(id),
    node_type text,
    node_key text,
    properties jsonb,
    created_at timestamptz default now()
);

create index idx_graph_node_type on public.revenue_graph_nodes(node_type);

-- Revenue Graph Edges
create table public.revenue_graph_edges (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid references public.workspaces(id),
    src_node uuid references public.revenue_graph_nodes(id),
    dst_node uuid references public.revenue_graph_nodes(id),
    edge_type text,
    weight numeric default 1,
    properties jsonb,
    created_at timestamptz default now()
);

create index idx_graph_edge on public.revenue_graph_edges(src_node, dst_node);

-- Jobs
create table public.jobs (
    id uuid primary key default gen_random_uuid(),
    workspace_id uuid references public.workspaces(id),
    job_type text,
    status text,
    payload jsonb,
    result jsonb,
    created_at timestamptz default now(),
    started_at timestamptz,
    finished_at timestamptz
);

-- RLS Policies
alter table public.revenue_graph_nodes enable row level security;
alter table public.revenue_graph_edges enable row level security;
alter table public.jobs enable row level security;

create policy "View graph nodes in workspace"
    on public.revenue_graph_nodes for select
    using (workspace_id in (select workspace_id from public.users where email = auth.jwt() ->> 'email'));

create policy "View graph edges in workspace"
    on public.revenue_graph_edges for select
    using (workspace_id in (select workspace_id from public.users where email = auth.jwt() ->> 'email'));
