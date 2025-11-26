# n8n Webhook Setup Guide

To enable automation workflows in Crafta, you need to configure n8n webhooks.

## Prerequisites

- An n8n instance (cloud or self-hosted)
- `N8N_WEBHOOK_DEAL_WON` and `N8N_WEBHOOK_NEW_LEAD` environment variables set in `.env.local`

## Workflows to Create

### 1. Deal Won Workflow

**Trigger:** Webhook (POST)
**URL:** Copy from n8n and set as `N8N_WEBHOOK_DEAL_WON`

**Steps:**
1.  **Webhook Node:** Receive deal data (id, name, value, owner).
2.  **Slack/Email Node:** Send a notification to the team.
3.  **Database Node (Optional):** Update external systems (e.g., ERP).

### 2. New Lead Workflow

**Trigger:** Webhook (POST)
**URL:** Copy from n8n and set as `N8N_WEBHOOK_NEW_LEAD`

**Steps:**
1.  **Webhook Node:** Receive lead data.
2.  **AI Agent Node:** Enrich lead data using Clearbit or similar.
3.  **Supabase Node:** Update the lead record in Crafta with enriched data.

## Testing

You can test the triggers by creating a new deal or lead in the Crafta UI. Check the browser console or server logs for "Triggering n8n webhook" messages.
