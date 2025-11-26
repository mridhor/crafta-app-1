import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    const ownerId = searchParams.get("ownerId");
    const date = searchParams.get("date"); // For filtering by due date if needed

    let query = supabase
        .from("rhythm_items")
        .select(`
            *,
            deal:deals(name, value, company:companies(name)),
            contact:contacts(first_name, last_name)
        `);

    if (ownerId) query = query.eq("owner_id", ownerId);
    // if (date) query = query.eq("due_date", date); // Optional date filtering

    query = query.order("due_date", { ascending: true });

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
        .from("rhythm_items")
        .insert(body)
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
