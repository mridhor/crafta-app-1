-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
declare
  org_id uuid;
begin
  -- For now, we'll create a new organization for every new user (or assign to a default one)
  -- In a real app, this might be handled by an invite flow.
  -- Here we create a "Personal Org" for the user.
  insert into public.organizations (name, slug)
  values (new.raw_user_meta_data->>'full_name' || '''s Org', lower(regexp_replace(new.email, '[^a-zA-Z0-9]', '', 'g')))
  returning id into org_id;

  insert into public.profiles (id, organization_id, full_name, role, avatar_url)
  values (
    new.id,
    org_id,
    new.raw_user_meta_data->>'full_name',
    'owner',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update search vector on Entities
create or replace function public.entities_search_vector_update()
returns trigger as $$
begin
  new.search_vector := 
    setweight(to_tsvector('english', coalesce(new.data->>'name', '')), 'A') ||
    setweight(to_tsvector('english', coalesce(new.data->>'description', '')), 'B') ||
    setweight(to_tsvector('english', coalesce(new.data->>'email', '')), 'A');
  return new;
end;
$$ language plpgsql;

-- Trigger for entity updates
create trigger entities_search_vector_trigger
  before insert or update on public.entities
  for each row execute procedure public.entities_search_vector_update();

-- Function to log entity changes to Audit Log
create or replace function public.log_entity_changes()
returns trigger as $$
begin
  if (TG_OP = 'INSERT') then
    insert into public.audit_logs (organization_id, actor_id, action, target_resource, details)
    values (new.organization_id, auth.uid(), 'create', 'entity', jsonb_build_object('id', new.id, 'type', new.type));
  elsif (TG_OP = 'UPDATE') then
    insert into public.audit_logs (organization_id, actor_id, action, target_resource, details)
    values (new.organization_id, auth.uid(), 'update', 'entity', jsonb_build_object('id', new.id, 'changes', new.data));
  end if;
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for audit logging
create trigger audit_entity_changes
  after insert or update on public.entities
  for each row execute procedure public.log_entity_changes();
