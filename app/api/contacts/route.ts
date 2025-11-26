import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    const companyId = searchParams.get("companyId");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "last_name";
    const order = searchParams.get("order") || "asc";

    let query = supabase
        .from("contacts")
        .select(`
            *,
            company:companies(name)
        `);

    if (companyId) query = query.eq("company_id", companyId);
    if (search) {
        query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%`);
    }

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
        .from("contacts")
        .insert(body)
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
