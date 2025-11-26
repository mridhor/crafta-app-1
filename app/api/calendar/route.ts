import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    const start = searchParams.get("start");
    const end = searchParams.get("end");
    const ownerId = searchParams.get("ownerId");

    let query = supabase
        .from("calendar_events")
        .select(`
            *,
            deal:deals(name, value),
            contact:contacts(first_name, last_name)
        `);

    if (ownerId) query = query.eq("owner_id", ownerId);
    if (start) query = query.gte("start_time", start);
    if (end) query = query.lte("end_time", end);

    query = query.order("start_time", { ascending: true });

    const { data, error } = await query;

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function POST(request: Request) {
    const supabase = await createClient();
    const body = await request.json();

    const { data, error } = await supabase
        .from("calendar_events")
        .insert(body)
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
