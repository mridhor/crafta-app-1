-- Workspaces (multi-tenant)
CREATE TABLE workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  workspace_id UUID REFERENCES workspaces(id),
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'member', -- 'admin', 'member', 'viewer'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Companies
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) NOT NULL,
  name TEXT NOT NULL,
  domain TEXT,
  industry TEXT,
  employee_count INTEGER,
  annual_revenue BIGINT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contacts
CREATE TABLE contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) NOT NULL,
  company_id UUID REFERENCES companies(id),
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  title TEXT,
  phone TEXT,
  linkedin_url TEXT,
  is_champion BOOLEAN DEFAULT FALSE,
  is_economic_buyer BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Deals
CREATE TABLE deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) NOT NULL,
  company_id UUID REFERENCES companies(id),
  primary_contact_id UUID REFERENCES contacts(id),
  owner_id UUID REFERENCES users(id),
  name TEXT NOT NULL,
  value DECIMAL(12, 2),
  stage TEXT NOT NULL DEFAULT 'lead', -- 'lead', 'discovery', 'proposal', 'negotiation', 'closed_won', 'closed_lost'
  probability INTEGER DEFAULT 0,
  expected_close_date DATE,
  actual_close_date DATE,
  risk_level TEXT DEFAULT 'low', -- 'low', 'medium', 'high'
  velocity_status TEXT DEFAULT 'on_track', -- 'on_track', 'slowing_down', 'stalled', 'accelerating'
  days_in_stage INTEGER DEFAULT 0,
  next_action TEXT,
  next_action_date DATE,
  lost_reason TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  stage_changed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Deal Activities (Timeline)
CREATE TABLE deal_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID REFERENCES deals(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  activity_type TEXT NOT NULL, -- 'stage_change', 'email', 'call', 'meeting', 'note', 'task', 'ai_insight'
  title TEXT NOT NULL,
  description TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rhythm Items (Daily Workflow Queue)
CREATE TABLE rhythm_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) NOT NULL,
  user_id UUID REFERENCES users(id),
  deal_id UUID REFERENCES deals(id),
  contact_id UUID REFERENCES contacts(id),
  company_id UUID REFERENCES companies(id),
  title TEXT NOT NULL,
  description TEXT,
  item_type TEXT NOT NULL, -- 'follow_up', 'review', 'call', 'email', 'task', 'meeting', 'escalation'
  priority TEXT DEFAULT 'medium', -- 'urgent', 'high', 'medium', 'low'
  status TEXT DEFAULT 'pending', -- 'pending', 'in_progress', 'completed', 'snoozed', 'dismissed'
  due_date TIMESTAMPTZ,
  ai_suggestion TEXT,
  ai_confidence DECIMAL(3, 2),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Calendar Events
CREATE TABLE calendar_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) NOT NULL,
  user_id UUID REFERENCES users(id),
  deal_id UUID REFERENCES deals(id),
  contact_id UUID REFERENCES contacts(id),
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT DEFAULT 'meeting', -- 'meeting', 'call', 'demo', 'internal', 'focus_time', 'task'
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  location TEXT,
  meeting_url TEXT,
  attendees JSONB DEFAULT '[]',
  is_recurring BOOLEAN DEFAULT FALSE,
  recurrence_rule TEXT,
  status TEXT DEFAULT 'confirmed', -- 'confirmed', 'tentative', 'cancelled'
  has_conflict BOOLEAN DEFAULT FALSE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Convert Intake Queue (Data Validation)
CREATE TABLE intake_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) NOT NULL,
  source TEXT NOT NULL, -- 'webform', 'hubspot', 'salesforce', 'api', 'csv_import'
  status TEXT DEFAULT 'quarantined', -- 'quarantined', 'warning', 'rejected', 'approved'
  raw_data JSONB NOT NULL,
  validated_data JSONB,
  email TEXT,
  company_name TEXT,
  issues JSONB DEFAULT '[]',
  confidence_score DECIMAL(3, 2),
  matched_company_id UUID REFERENCES companies(id),
  matched_contact_id UUID REFERENCES contacts(id),
  reviewed_by UUID REFERENCES users(id),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Entity Relationships (for Canvas Graph)
CREATE TABLE entity_relationships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) NOT NULL,
  source_type TEXT NOT NULL, -- 'company', 'contact', 'deal', 'activity'
  source_id UUID NOT NULL,
  target_type TEXT NOT NULL,
  target_id UUID NOT NULL,
  relationship_type TEXT NOT NULL, -- 'works_at', 'owns_deal', 'participated_in', 'related_to'
  strength DECIMAL(3, 2) DEFAULT 1.0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Insights Cache
CREATE TABLE ai_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  insight_type TEXT NOT NULL, -- 'risk_alert', 'recommendation', 'pattern', 'prediction'
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  confidence DECIMAL(3, 2),
  actions JSONB DEFAULT '[]',
  is_active BOOLEAN DEFAULT TRUE,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_deals_workspace ON deals(workspace_id);
CREATE INDEX idx_deals_stage ON deals(stage);
CREATE INDEX idx_deals_owner ON deals(owner_id);
CREATE INDEX idx_deals_risk ON deals(risk_level);
CREATE INDEX idx_rhythm_items_user ON rhythm_items(user_id, status);
CREATE INDEX idx_rhythm_items_due ON rhythm_items(due_date);
CREATE INDEX idx_calendar_events_user ON calendar_events(user_id, start_time);
CREATE INDEX idx_intake_records_status ON intake_records(status);
CREATE INDEX idx_entity_relationships_source ON entity_relationships(source_type, source_id);
CREATE INDEX idx_entity_relationships_target ON entity_relationships(target_type, target_id);
