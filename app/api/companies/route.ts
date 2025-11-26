import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search");
    const sort = searchParams.get("sort") || "name";
    const order = searchParams.get("order") || "asc";

    let query = supabase
        .from("companies")
        .select("*");

    if (search) {
        query = query.ilike("name", `%${search}%`);
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
        .from("companies")
        .insert(body)
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
