-- Create the lead_logs table for auditing governance decisions

CREATE TABLE IF NOT EXISTS lead_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    
    -- Entity Identification
    entity_type VARCHAR(50) NOT NULL, -- 'Lead', 'Contact', 'Deal', 'Task'
    entity_id VARCHAR(255) NOT NULL, -- CRM ID or Internal ID
    
    -- Governance Info
    rule_id VARCHAR(100), -- e.g., 'RULE-001'
    decision VARCHAR(50) NOT NULL, -- 'APPROVED', 'BLOCKED', 'QUARANTINED', 'SHADOW_MODE', 'ENRICHED'
    rationale TEXT, -- Human-readable explanation
    
    -- Technical Details
    idempotency_key VARCHAR(255), -- Hash of the payload to prevent duplicate processing
    payload JSONB, -- The full data payload at the time of processing
    execution_time_ms INTEGER, -- How long the decision took
    
    -- Metadata
    source_system VARCHAR(100), -- 'HubSpot', 'Salesforce', 'Webhook'
    actor VARCHAR(100) DEFAULT 'System' -- 'System' or User ID if manual override
);

-- Create indexes for common queries
CREATE INDEX idx_lead_logs_entity_id ON lead_logs(entity_id);
CREATE INDEX idx_lead_logs_timestamp ON lead_logs(timestamp);
CREATE INDEX idx_lead_logs_decision ON lead_logs(decision);
CREATE INDEX idx_lead_logs_idempotency_key ON lead_logs(idempotency_key);

-- Comment on table
COMMENT ON TABLE lead_logs IS 'Audit log for all governance decisions made by the Revenue Governor engine.';
