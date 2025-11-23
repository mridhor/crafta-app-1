import { supabase, Tables } from '@/lib/supabase';

// Type-safe query helpers
export async function fetchDealsWithCompany(workspaceId: string) {
    const { data, error } = await supabase
        .from('deals')
        .select(`
      *,
      company:companies(id, name, domain, industry)
    `)
        .eq('workspace_id', workspaceId);

    return { data, error };
}

export async function fetchActionsWithDeal(workspaceId: string) {
    const { data, error } = await supabase
        .from('actions')
        .select(`
      *,
      deal:deals(
        id,
        name,
        value,
        stage,
        company:companies(id, name)
      )
    `)
        .eq('workspace_id', workspaceId)
        .eq('status', 'pending');

    return { data, error };
}

export async function fetchCompaniesWithCounts(workspaceId: string) {
    const { data, error } = await supabase
        .from('companies')
        .select(`
      *,
      contacts:contacts(count),
      deals:deals(count)
    `)
        .eq('workspace_id', workspaceId);

    return { data, error };
}

export async function fetchInboundLeadsWithValidations(workspaceId: string, status: string) {
    const { data, error } = await supabase
        .from('inbound_leads_raw')
        .select(`
      *,
      validations(id, rule_name, status, details)
    `)
        .eq('workspace_id', workspaceId)
        .eq('status', status)
        .order('received_at', { ascending: false });

    return { data, error };
}

// Helper types for joined queries
export type DealWithCompany = Tables<'deals'> & {
    company: Tables<'companies'>;
};

export type ActionWithDeal = Tables<'actions'> & {
    deal: Tables<'deals'> & {
        company: Tables<'companies'>;
    };
};

export type CompanyWithCounts = Tables<'companies'> & {
    contacts: { count: number }[];
    deals: { count: number }[];
};

export type InboundLeadWithValidations = Tables<'inbound_leads_raw'> & {
    validations: Tables<'validations'>[];
};
