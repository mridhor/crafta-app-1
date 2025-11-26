import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    // Filters
    const ownerId = searchParams.get("ownerId");
    const stage = searchParams.get("stage");
    const riskLevel = searchParams.get("riskLevel");
    const sort = searchParams.get("sort") || "created_at";
    const order = searchParams.get("order") || "desc";

    let query = supabase
        .from("deals")
        .select(`
            *,
            company:companies(name, domain),
            primary_contact:contacts(first_name, last_name, email),
            owner:users(full_name, avatar_url)
        `);

    if (ownerId) query = query.eq("owner_id", ownerId);
    if (stage) query = query.eq("stage", stage);
    if (riskLevel) query = query.eq("risk_level", riskLevel);

    query = query.order(sort, { ascending: order === "asc" });

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
        .from("deals")
        .insert(body)
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
