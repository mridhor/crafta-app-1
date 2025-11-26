import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    // Filters
    const ownerId = searchParams.get("ownerId");
    const region = searchParams.get("region");
    const productId = searchParams.get("productId");

    // Fetch deals
    let query = supabase
        .from("deals")
        .select("id, stage, days_in_stage, value");

    if (ownerId) query = query.eq("owner_id", ownerId);
    // Note: Region and Product filters would require joining with other tables or metadata fields
    // For MVP, we'll assume they might be in metadata or related tables not yet fully defined

    const { data: deals, error } = await query;

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Process data into heatmap buckets
    const stages = ["lead", "discovery", "proposal", "negotiation", "closed_won"];
    const timeBuckets = ["0-3", "4-7", "8-14", "15+"];

    const heatmap = stages.map(stage => {
        const stageDeals = deals.filter(d => d.stage === stage);

        return {
            stage,
            buckets: timeBuckets.map(bucket => {
                let bucketDeals = [];
                if (bucket === "0-3") {
                    bucketDeals = stageDeals.filter(d => d.days_in_stage <= 3);
                } else if (bucket === "4-7") {
                    bucketDeals = stageDeals.filter(d => d.days_in_stage >= 4 && d.days_in_stage <= 7);
                } else if (bucket === "8-14") {
                    bucketDeals = stageDeals.filter(d => d.days_in_stage >= 8 && d.days_in_stage <= 14);
                } else {
                    bucketDeals = stageDeals.filter(d => d.days_in_stage >= 15);
                }

                return {
                    timeBucket: bucket,
                    dealCount: bucketDeals.length,
                    totalValue: bucketDeals.reduce((sum, d) => sum + (d.value || 0), 0),
                    dealIds: bucketDeals.map(d => d.id)
                };
            }),
            totalValue: stageDeals.reduce((sum, d) => sum + (d.value || 0), 0)
        };
    });

    return NextResponse.json(heatmap);
}
