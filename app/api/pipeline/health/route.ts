import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = await createClient();

    // Calculate velocity change (mock logic for MVP)
    // In a real app, this would compare current velocity vs previous period
    const velocityChange = 12; // +12%
    const velocityDirection = "up";

    // Count stalled deals
    const { count: stalledDealsCount, error } = await supabase
        .from("deals")
        .select("*", { count: "exact", head: true })
        .eq("velocity_status", "stalled");

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Calculate stalled value
    const { data: stalledDeals } = await supabase
        .from("deals")
        .select("value")
        .eq("velocity_status", "stalled");

    const stalledDealsValue = stalledDeals?.reduce((sum, d) => sum + (d.value || 0), 0) || 0;

    // Owner consistency (mock)
    const ownerConsistency = [
        { userId: "1", userName: "Sarah Jenkins", score: 98 },
        { userId: "2", userName: "Mike Ross", score: 85 },
        { userId: "3", userName: "Jessica Pearson", score: 72 },
    ];

    return NextResponse.json({
        velocityChange,
        velocityDirection,
        stalledDealsCount,
        stalledDealsValue,
        ownerConsistency
    });
}
