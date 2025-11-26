import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("api_keys")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function POST(request: Request) {
    const supabase = await createClient();
    const body = await request.json(); // { name: "Production Key" }

    // Generate a dummy key for now
    const keySecret = `sk_live_${Math.random().toString(36).substring(2, 15)}`;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: userData } = await supabase
        .from("users")
        .select("workspace_id")
        .eq("email", user.email)
        .single();

    if (!userData?.workspace_id) {
        return NextResponse.json({ error: "No workspace found" }, { status: 404 });
    }

    const { data, error } = await supabase
        .from("api_keys")
        .insert({
            workspace_id: userData.workspace_id,
            key_name: body.name,
            key_secret: keySecret,
            active: true
        })
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}
