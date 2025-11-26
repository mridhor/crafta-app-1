export async function triggerN8nWebhook(webhookUrl: string, payload: any) {
    if (!webhookUrl) {
        console.warn("n8n Webhook URL is missing");
        return;
    }

    try {
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            console.error("Failed to trigger n8n webhook:", response.statusText);
        }
    } catch (error) {
        console.error("Error triggering n8n webhook:", error);
    }
}

// Example usage triggers
export const WORKFLOW_TRIGGERS = {
    DEAL_WON: process.env.N8N_WEBHOOK_DEAL_WON,
    NEW_LEAD: process.env.N8N_WEBHOOK_NEW_LEAD,
};
