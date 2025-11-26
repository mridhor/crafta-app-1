-- Create a dummy user in auth.users
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role)
VALUES 
    ('d0d8c19c-3b36-4421-8979-233d625516a3', 'demo@crafta.app', crypt('password123', gen_salt('bf')), now(), '{"provider":"email","providers":["email"]}', '{"full_name":"Demo User"}', now(), now(), 'authenticated')
ON CONFLICT (id) DO NOTHING;

-- Create an organization
INSERT INTO public.organizations (id, name, slug)
VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Acme Org', 'acme-org')
ON CONFLICT (id) DO NOTHING;

-- Create a workspace
INSERT INTO public.workspaces (id, name, slug, settings)
VALUES 
    ('b3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'Acme Corp', 'acme-corp', '{"currency":"USD"}')
ON CONFLICT (id) DO NOTHING;

-- Create a public user profile
INSERT INTO public.users (id, workspace_id, email, full_name, role, avatar_url)
VALUES 
    ('d0d8c19c-3b36-4421-8979-233d625516a3', 'b3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'demo@crafta.app', 'Demo User', 'admin', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix')
ON CONFLICT (id) DO NOTHING;

-- Create Companies
INSERT INTO public.companies (id, workspace_id, name, domain, industry, employee_count, annual_revenue, metadata)
VALUES
    ('c1111111-1111-1111-1111-111111111111', 'b3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'TechNova', 'technova.io', 'Technology', 500, 50000000, '{"tier": "strategic"}'),
    ('c2222222-2222-2222-2222-222222222222', 'b3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'GreenField Energy', 'greenfield.com', 'Energy', 1200, 150000000, '{"tier": "enterprise"}'),
    ('c3333333-3333-3333-3333-333333333333', 'b3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'BlueSky Logistics', 'bluesky.net', 'Logistics', 250, 20000000, '{"tier": "mid-market"}'),
    ('c4444444-4444-4444-4444-444444444444', 'b3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'Quantum Finance', 'quantum.finance', 'Finance', 80, 10000000, '{"tier": "startup"}'),
    ('c5555555-5555-5555-5555-555555555555', 'b3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'Nebula Health', 'nebulahealth.com', 'Healthcare', 3000, 500000000, '{"tier": "enterprise"}')
ON CONFLICT (id) DO NOTHING;

-- Create Contacts
INSERT INTO public.contacts (id, workspace_id, company_id, email, first_name, last_name, title, phone, is_champion, is_economic_buyer)
VALUES
    ('11111111-1111-1111-1111-111111111111', 'b3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'c1111111-1111-1111-1111-111111111111', 'sarah@technova.io', 'Sarah', 'Jenkins', 'CTO', '+1-555-0101', true, true),
    ('22222222-2222-2222-2222-222222222222', 'b3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'c1111111-1111-1111-1111-111111111111', 'mike@technova.io', 'Mike', 'Ross', 'VP Engineering', '+1-555-0102', false, false),
    ('33333333-3333-3333-3333-333333333333', 'b3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'c2222222-2222-2222-2222-222222222222', 'david@greenfield.com', 'David', 'Wallace', 'CFO', '+1-555-0103', false, true),
    ('44444444-4444-4444-4444-444444444444', 'b3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'c3333333-3333-3333-3333-333333333333', 'lisa@bluesky.net', 'Lisa', 'Cuddy', 'Operations Director', '+1-555-0104', true, false),
    ('55555555-5555-5555-5555-555555555555', 'b3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'c5555555-5555-5555-5555-555555555555', 'greg@nebulahealth.com', 'Greg', 'House', 'Head of Diagnostics', '+1-555-0105', true, false)
ON CONFLICT (id) DO NOTHING;

-- Create Deals
INSERT INTO public.deals (id, workspace_id, company_id, primary_contact_id, owner_id, name, value, stage, probability, expected_close_date, risk_level, velocity_status, days_in_stage)
VALUES
    ('d1111111-1111-1111-1111-111111111111', 'b3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'c1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'd0d8c19c-3b36-4421-8979-233d625516a3', 'TechNova Enterprise License', 150000, 'negotiation', 80, current_date + interval '15 days', 'low', 'on_track', 5),
    ('d2222222-2222-2222-2222-222222222222', 'b3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'c2222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', 'd0d8c19c-3b36-4421-8979-233d625516a3', 'GreenField Solar Project', 450000, 'proposal', 60, current_date + interval '45 days', 'medium', 'slowing_down', 12),
    ('d3333333-3333-3333-3333-333333333333', 'b3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'c3333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444', 'd0d8c19c-3b36-4421-8979-233d625516a3', 'BlueSky Fleet Management', 75000, 'discovery', 30, current_date + interval '60 days', 'low', 'accelerating', 2),
    ('d4444444-4444-4444-4444-444444444444', 'b3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'c4444444-4444-4444-4444-444444444444', null, 'd0d8c19c-3b36-4421-8979-233d625516a3', 'Quantum Seed Round', 2000000, 'lead', 10, current_date + interval '90 days', 'high', 'stalled', 25),
    ('d5555555-5555-5555-5555-555555555555', 'b3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'c5555555-5555-5555-5555-555555555555', '55555555-5555-5555-5555-555555555555', 'd0d8c19c-3b36-4421-8979-233d625516a3', 'Nebula Diagnostics Platform', 300000, 'closed_won', 100, current_date - interval '5 days', 'low', 'on_track', 0)
ON CONFLICT (id) DO NOTHING;

-- Create Rhythm Items
INSERT INTO public.rhythm_items (id, workspace_id, user_id, deal_id, contact_id, title, description, item_type, priority, status, due_date, ai_suggestion, ai_confidence)
VALUES
    ('22222222-1111-1111-1111-111111111111', 'b3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'd0d8c19c-3b36-4421-8979-233d625516a3', 'd1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Send contract for review', 'Sarah requested the final contract draft by EOD.', 'email', 'urgent', 'pending', now() + interval '2 hours', 'Draft sent to legal. Ready for review.', 0.95),
    ('22222222-2222-2222-2222-222222222222', 'b3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'd0d8c19c-3b36-4421-8979-233d625516a3', 'd2222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', 'Schedule technical deep dive', 'Need to address concerns about integration.', 'meeting', 'high', 'pending', now() + interval '1 day', 'Suggest times: Tue 2pm, Wed 10am.', 0.88),
    ('22222222-3333-3333-3333-333333333333', 'b3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'd0d8c19c-3b36-4421-8979-233d625516a3', 'd3333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444', 'Follow up on proposal', 'Proposal sent 3 days ago, no response.', 'call', 'medium', 'pending', now() + interval '2 days', 'Call script prepared based on last interaction.', 0.75)
ON CONFLICT (id) DO NOTHING;

-- Create Calendar Events
INSERT INTO public.calendar_events (id, workspace_id, user_id, deal_id, contact_id, title, description, event_type, start_time, end_time, status)
VALUES
    ('eeeeeeee-1111-1111-1111-111111111111', 'b3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'd0d8c19c-3b36-4421-8979-233d625516a3', 'd1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Contract Review with TechNova', 'Finalizing terms.', 'meeting', now() + interval '1 day 10 hours', now() + interval '1 day 11 hours', 'confirmed'),
    ('eeeeeeee-2222-2222-2222-222222222222', 'b3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'd0d8c19c-3b36-4421-8979-233d625516a3', 'd2222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', 'GreenField Sync', 'Weekly sync.', 'call', now() + interval '2 days 14 hours', now() + interval '2 days 14 hours 30 minutes', 'tentative')
ON CONFLICT (id) DO NOTHING;

-- Create Intake Queue Items
INSERT INTO public.intake_queue (id, organization_id, workspace_id, source, status, payload, confidence_score)
VALUES
    ('33333333-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'b3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'web_form', 'quarantined', '{"subject": "Enterprise Pricing Inquiry", "body": "Hi, we are interested in your enterprise plan. We have 500 seats.", "from_email": "alice@bigcorp.com", "company": "BigCorp"}', 0.92),
    ('33333333-2222-2222-2222-222222222222', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'b3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'email', 'quarantined', '{"subject": "Partnership Opportunity", "body": "Would love to discuss a partnership.", "from_email": "bob@partner.io", "company": "PartnerIO"}', 0.65),
    ('33333333-3333-3333-3333-333333333333', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'b3e3e3e3-3e3e-3e3e-3e3e-3e3e3e3e3e3e', 'chat', 'rejected', '{"message": "Can you help me with support?", "email": "support@customer.com"}', 0.20)
ON CONFLICT (id) DO NOTHING;

-- Create Deal Activities
INSERT INTO public.deal_activities (id, deal_id, user_id, activity_type, title, description, created_at)
VALUES
    ('a1111111-1111-1111-1111-111111111111', 'd1111111-1111-1111-1111-111111111111', 'd0d8c19c-3b36-4421-8979-233d625516a3', 'stage_change', 'Moved to Negotiation', 'Deal progressed after successful demo.', now() - interval '5 days'),
    ('a2222222-2222-2222-2222-222222222222', 'd1111111-1111-1111-1111-111111111111', 'd0d8c19c-3b36-4421-8979-233d625516a3', 'email', 'Sent Proposal', 'Attached the revised proposal.', now() - interval '7 days'),
    ('a3333333-3333-3333-3333-333333333333', 'd2222222-2222-2222-2222-222222222222', 'd0d8c19c-3b36-4421-8979-233d625516a3', 'call', 'Discovery Call', 'Discussed requirements and timeline.', now() - interval '10 days')
ON CONFLICT (id) DO NOTHING;
