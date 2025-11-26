"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { IntakeItem } from "./IntakeItem";
import { Button } from "@/components/ui/Button";
import { Inbox } from "lucide-react";

export function IntakeQueue() {
    const queryClient = useQueryClient();

    const { data: items, isLoading } = useQuery({
        queryKey: ["intake-queue"],
        queryFn: async () => {
            const res = await fetch("/api/convert?status=quarantined");
            return res.json();
        }
    });

    const updateMutation = useMutation({
        mutationFn: async ({ id, status }: { id: string; status: string }) => {
            await fetch(`/api/convert/${id}`, {
                method: "PATCH",
                body: JSON.stringify({ status }),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["intake-queue"] });
        },
    });

    if (isLoading) {
        return <div className="p-8 text-center text-muted-foreground">Loading intake queue...</div>;
    }

    if (!items || items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[400px] text-center p-8 border rounded-lg border-dashed">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Inbox className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-lg">Queue Empty</h3>
                <p className="text-muted-foreground max-w-sm mt-2">
                    No pending items to review.
                </p>
                <Button className="mt-4" variant="outline" onClick={() => queryClient.invalidateQueries({ queryKey: ["intake-queue"] })}>
                    Refresh
                </Button>
            </div>
        );
    }

    if (!Array.isArray(items)) {
        return <div className="p-8 text-center text-red-500">Error loading intake queue.</div>;
    }

    return (
        <div className="space-y-4 max-w-3xl mx-auto">
            {items.map((item: any) => (
                <IntakeItem
                    key={item.id}
                    item={item}
                    onApprove={(id) => updateMutation.mutate({ id, status: "approved" })}
                    onReject={(id) => updateMutation.mutate({ id, status: "rejected" })}
                />
            ))}
        </div>
    );
}
