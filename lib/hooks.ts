import { useState, useEffect } from 'react';
import { supabase, Tables } from './supabase';

// Custom hook for fetching deals with company information
export function useDealsWithCompany(workspaceId: string) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data: deals, error: err } = await supabase
                    .from('deals')
                    .select(`
            *,
            company:companies(id, name, domain, industry)
          `)
                    .eq('workspace_id', workspaceId);

                if (err) throw err;
                setData(deals || []);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        if (workspaceId) {
            fetchData();
        }
    }, [workspaceId]);

    return { data, loading, error };
}

// Custom hook for fetching actions with deal information
export function useActionsWithDeal(workspaceId: string) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data: actions, error: err } = await supabase
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

                if (err) throw err;
                setData(actions || []);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        if (workspaceId) {
            fetchData();
        }
    }, [workspaceId]);

    return { data, loading, error };
}

// Custom hook for fetching companies with counts
export function useCompaniesWithCounts(workspaceId: string) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data: companies, error: err } = await supabase
                    .from('companies')
                    .select('*')
                    .eq('workspace_id', workspaceId);

                if (err) throw err;
                setData(companies || []);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        if (workspaceId) {
            fetchData();
        }
    }, [workspaceId]);

    return { data, loading, error };
}

// Custom hook for fetching inbound leads with validations
export function useInboundLeadsWithValidations(workspaceId: string, status: string = 'pending') {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data: leads, error: err } = await supabase
                    .from('inbound_leads_raw')
                    .select(`
            *,
            validations(id, rule_name, status, details)
          `)
                    .eq('workspace_id', workspaceId)
                    .eq('status', status)
                    .order('received_at', { ascending: false });

                if (err) throw err;
                setData(leads || []);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        if (workspaceId) {
            fetchData();
        }
    }, [workspaceId, status]);

    return { data, loading, error };
}
