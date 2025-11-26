import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { generateInsight } from "@/lib/ai/openai";

export async function POST(request: Request) {
    const supabase = await createClient();
    const { entityId, type, context } = await request.json();

    if (!entityId || !type) {
        return NextResponse.json({ error: "Missing entityId or type" }, { status: 400 });
    }

    // Construct prompt based on type
    let prompt = "";
    if (type === "deal") {
        prompt = `Analyze the following deal context and provide 3 key risks and 1 next best action:\n\n${JSON.stringify(context)}`;
    } else if (type === "email") {
        prompt = `Draft a follow-up email for this context:\n\n${JSON.stringify(context)}`;
    } else {
        prompt = `Provide insights for:\n\n${JSON.stringify(context)}`;
    }

    const insight = await generateInsight(prompt);

    return NextResponse.json({ insight });
}
