"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { RhythmItem } from "./RhythmItem";
import { Button } from "@/components/ui/Button";
import { RefreshCw } from "lucide-react";

export function RhythmStack() {
    const queryClient = useQueryClient();

    const { data: items, isLoading } = useQuery({
        queryKey: ["rhythm-items"],
        queryFn: async () => {
            const res = await fetch("/api/rhythm");
            return res.json();
        }
    });

    const completeMutation = useMutation({
        mutationFn: async (id: string) => {
            await fetch(`/api/rhythm/${id}`, {
                method: "PATCH",
                body: JSON.stringify({ status: "completed" }),
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["rhythm-items"] });
        },
    });

    if (isLoading) {
        return <div className="p-8 text-center text-muted-foreground">Loading rhythm stack...</div>;
    }

    if (!items || items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[400px] text-center p-8 border rounded-lg border-dashed">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                    <RefreshCw className="w-6 h-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium text-lg">All caught up!</h3>
                <p className="text-muted-foreground max-w-sm mt-2">
                    You&apos;ve cleared your rhythm stack. Great job! Check back later for new actions.
                </p>
                <Button className="mt-4" variant="outline" onClick={() => queryClient.invalidateQueries({ queryKey: ["rhythm-items"] })}>
                    Refresh
                </Button>
            </div>
        );
    }

    if (!Array.isArray(items)) {
        return <div className="p-8 text-center text-red-500">Error loading rhythm items.</div>;
    }

    return (
        <div className="space-y-4 max-w-3xl mx-auto">
            {items.map((item: any) => (
                <RhythmItem
                    key={item.id}
                    item={item}
                    onComplete={(id) => completeMutation.mutate(id)}
                />
            ))}
        </div>
    );
}
