import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const supabase = await createClient();

    // Fetch all entities
    const { data: companies } = await supabase.from("companies").select("id, name");
    const { data: contacts } = await supabase.from("contacts").select("id, first_name, last_name, company_id");
    const { data: deals } = await supabase.from("deals").select("id, name, company_id, owner_id");
    const { data: users } = await supabase.from("users").select("id, full_name, avatar_url");

    // Transform to nodes and edges
    const nodes = [
        ...(companies?.map(c => ({
            id: `company-${c.id}`,
            type: 'company',
            position: { x: Math.random() * 500, y: Math.random() * 500 },
            data: { label: c.name }
        })) || []),
        ...(contacts?.map(c => ({
            id: `contact-${c.id}`,
            type: 'contact',
            position: { x: Math.random() * 500, y: Math.random() * 500 },
            data: { label: `${c.first_name} ${c.last_name}` }
        })) || []),
        ...(deals?.map(d => ({
            id: `deal-${d.id}`,
            type: 'deal',
            position: { x: Math.random() * 500, y: Math.random() * 500 },
            data: { label: d.name }
        })) || []),
        ...(users?.map(u => ({
            id: `user-${u.id}`,
            type: 'user',
            position: { x: Math.random() * 500, y: Math.random() * 500 },
            data: { label: u.full_name, avatar: u.avatar_url }
        })) || [])
    ];

    const edges = [
        ...(contacts?.filter(c => c.company_id).map(c => ({
            id: `e-contact-${c.id}-company-${c.company_id}`,
            source: `contact-${c.id}`,
            target: `company-${c.company_id}`,
            animated: true
        })) || []),
        ...(deals?.filter(d => d.company_id).map(d => ({
            id: `e-deal-${d.id}-company-${d.company_id}`,
            source: `deal-${d.id}`,
            target: `company-${d.company_id}`,
            animated: true
        })) || []),
        ...(deals?.filter(d => d.owner_id).map(d => ({
            id: `e-deal-${d.id}-user-${d.owner_id}`,
            source: `user-${d.owner_id}`,
            target: `deal-${d.id}`,
            animated: true
        })) || [])
    ];

    return NextResponse.json({ nodes, edges });
}
