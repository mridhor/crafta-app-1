import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = await createClient();

    // Get the user's workspace first
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
        .from("workspaces")
        .select("settings")
        .eq("id", userData.workspace_id)
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data.settings?.branding || {});
}

export async function PATCH(request: Request) {
    const supabase = await createClient();
    const body = await request.json();

    // Get the user's workspace first
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

    // First get existing settings to merge
    const { data: workspace } = await supabase
        .from("workspaces")
        .select("settings")
        .eq("id", userData.workspace_id)
        .single();

    const currentSettings = workspace?.settings || {};
    const newSettings = {
        ...currentSettings,
        branding: {
            ...currentSettings.branding,
            ...body
        }
    };

    const { data, error } = await supabase
        .from("workspaces")
        .update({ settings: newSettings })
        .eq("id", userData.workspace_id)
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data.settings?.branding);
}
