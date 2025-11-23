export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            workspaces: {
                Row: {
                    id: string
                    name: string
                    settings: Json | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    settings?: Json | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    settings?: Json | null
                    created_at?: string
                    updated_at?: string
                }
            }
            users: {
                Row: {
                    id: string
                    workspace_id: string
                    auth_user_id: string
                    email: string
                    name: string | null
                    role: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    workspace_id: string
                    auth_user_id: string
                    email: string
                    name?: string | null
                    role?: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    workspace_id?: string
                    auth_user_id?: string
                    email?: string
                    name?: string | null
                    role?: string
                    created_at?: string
                }
            }
            companies: {
                Row: {
                    id: string
                    workspace_id: string
                    name: string
                    domain: string | null
                    industry: string | null
                    metadata: Json | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    workspace_id: string
                    name: string
                    domain?: string | null
                    industry?: string | null
                    metadata?: Json | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    workspace_id?: string
                    name?: string
                    domain?: string | null
                    industry?: string | null
                    metadata?: Json | null
                    created_at?: string
                    updated_at?: string
                }
            }
            contacts: {
                Row: {
                    id: string
                    workspace_id: string
                    company_id: string | null
                    name: string
                    email: string
                    title: string | null
                    metadata: Json | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    workspace_id: string
                    company_id?: string | null
                    name: string
                    email: string
                    title?: string | null
                    metadata?: Json | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    workspace_id?: string
                    company_id?: string | null
                    name?: string
                    email?: string
                    title?: string | null
                    metadata?: Json | null
                    created_at?: string
                    updated_at?: string
                }
            }
            deals: {
                Row: {
                    id: string
                    workspace_id: string
                    company_id: string
                    name: string
                    value: number
                    stage: string
                    probability: number | null
                    owner_id: string | null
                    metadata: Json | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    workspace_id: string
                    company_id: string
                    name: string
                    value: number
                    stage: string
                    probability?: number | null
                    owner_id?: string | null
                    metadata?: Json | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    workspace_id?: string
                    company_id?: string
                    name?: string
                    value?: number
                    stage?: string
                    probability?: number | null
                    owner_id?: string | null
                    metadata?: Json | null
                    created_at?: string
                    updated_at?: string
                }
            }
            actions: {
                Row: {
                    id: string
                    workspace_id: string
                    deal_id: string | null
                    action_type: string
                    status: string
                    scheduled_at: string | null
                    completed_at: string | null
                    params: Json | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    workspace_id: string
                    deal_id?: string | null
                    action_type: string
                    status?: string
                    scheduled_at?: string | null
                    completed_at?: string | null
                    params?: Json | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    workspace_id?: string
                    deal_id?: string | null
                    action_type?: string
                    status?: string
                    scheduled_at?: string | null
                    completed_at?: string | null
                    params?: Json | null
                    created_at?: string
                }
            }
            inbound_leads_raw: {
                Row: {
                    id: string
                    workspace_id: string
                    source: string
                    payload: Json
                    status: string
                    idempotency_key: string | null
                    received_at: string
                    processed_at: string | null
                }
                Insert: {
                    id?: string
                    workspace_id: string
                    source: string
                    payload: Json
                    status?: string
                    idempotency_key?: string | null
                    received_at?: string
                    processed_at?: string | null
                }
                Update: {
                    id?: string
                    workspace_id?: string
                    source?: string
                    payload?: Json
                    status?: string
                    idempotency_key?: string | null
                    received_at?: string
                    processed_at?: string | null
                }
            }
            validations: {
                Row: {
                    id: string
                    workspace_id: string
                    inbound_lead_id: string
                    rule_name: string
                    status: string
                    details: Json | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    workspace_id: string
                    inbound_lead_id: string
                    rule_name: string
                    status: string
                    details?: Json | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    workspace_id?: string
                    inbound_lead_id?: string
                    rule_name?: string
                    status?: string
                    details?: Json | null
                    created_at?: string
                }
            }
        }
        Views: Record<string, never>
        Functions: Record<string, never>
        Enums: Record<string, never>
    }
}
