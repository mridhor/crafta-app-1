import { Worker, Job } from 'bullmq';
import { supabase, Tables, Inserts } from '@/lib/supabase';

// This would typically run in a separate Node.js process
const connection = {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
};

interface IngestionJobData {
    leadId: string;
}

export const ingestionWorker = new Worker('ingestion-queue', async (job: Job<IngestionJobData>) => {
    console.log(`Processing lead ${job.data.leadId}`);

    try {
        // 1. Fetch Raw Lead
        const { data: lead, error } = await supabase
            .from('inbound_leads_raw')
            .select('*')
            .eq('id', job.data.leadId)
            .single();

        if (error || !lead) throw new Error(`Lead not found: ${error?.message}`);

        // 2. Normalize & Map (Mock Logic)
        const payload = lead.payload as Record<string, any>;
        const normalizedEntity = {
            name: payload.name || payload.company || 'Unknown',
            email: payload.email || '',
            // ... apply schema_mappings here
        };

        // 3. Run Governance Checks
        // const validationResult = await governanceEngine.evaluate(normalizedEntity);
        // if (validationResult.action === 'quarantine') { ... }

        // 4. Write to Canonical Entities (if approved)
        if (payload.type === 'contact') {
            const contactInsert: Inserts<'contacts'> = {
                workspace_id: lead.workspace_id,
                email: normalizedEntity.email,
                name: normalizedEntity.name,
                metadata: lead.payload
            };
            await supabase.from('contacts').insert(contactInsert);
        } else {
            const companyInsert: Inserts<'companies'> = {
                workspace_id: lead.workspace_id,
                name: normalizedEntity.name,
                metadata: lead.payload
            };
            await supabase.from('companies').insert(companyInsert);
        }

        // 5. Update Status
        const leadUpdate: Partial<Inserts<'inbound_leads_raw'>> = {
            status: 'processed',
            processed_at: new Date().toISOString()
        };
        await supabase
            .from('inbound_leads_raw')
            .update(leadUpdate)
            .eq('id', lead.id);

        console.log(`Lead ${lead.id} processed successfully`);

    } catch (err) {
        console.error(`Failed to process lead ${job.data.leadId}`, err);
        throw err;
    }
}, { connection });

console.log('Ingestion Worker Started');
