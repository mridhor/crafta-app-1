import OpenAI from "openai";

export async function generateInsight(prompt: string) {
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
        console.warn("OPENAI_API_KEY is not set.");
        return "AI insights are currently unavailable.";
    }

    const openai = new OpenAI({ apiKey });

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are an expert revenue operations analyst. Provide concise, actionable insights." },
                { role: "user", content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 150,
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("OpenAI Error:", error);
        return "Unable to generate insights at this time.";
    }
}
