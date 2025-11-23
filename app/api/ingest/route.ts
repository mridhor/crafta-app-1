import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Missing or invalid API key' }, { status: 401 });
        }

        const apiKey = authHeader.split(' ')[1];

        // Validate API Key
        const { data: keyData, error: keyError } = await supabase
            .from('api_keys')
            .select('workspace_id')
            .eq('key_secret', apiKey)
            .eq('active', true)
            .single();

        if (keyError || !keyData) {
            return NextResponse.json({ error: 'Invalid API key' }, { status: 403 });
        }

        const body = await request.json();
        const { source, payload, idempotency_key } = body;

        if (!source || !payload || !idempotency_key) {
            return NextResponse.json({ error: 'Missing required fields: source, payload, idempotency_key' }, { status: 400 });
        }

        // Insert into Inbound Leads Raw
        const { data, error } = await supabase
            .from('inbound_leads_raw')
            .insert({
                workspace_id: keyData.workspace_id,
                source,
                payload,
                idempotency_key,
                status: 'received'
            })
            .select()
            .single();

        if (error) {
            // Handle idempotency violation gracefully
            if (error.code === '23505') { // Unique violation
                return NextResponse.json({ message: 'Already received', status: 'ignored' }, { status: 200 });
            }
            throw error;
        }

        // TODO: Enqueue job to BullMQ here
        // await ingestionQueue.add('process-lead', { leadId: data.id });

        return NextResponse.json({
            success: true,
            id: data.id,
            status: 'received'
        });

    } catch (error: any) {
        console.error('Ingestion Error:', error);
        return NextResponse.json({ error: 'Internal Server Error', details: error.message }, { status: 500 });
    }
}
