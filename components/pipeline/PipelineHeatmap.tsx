"use client";

import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";
import { AlertTriangle, TrendingUp } from "lucide-react";

interface HeatmapBucket {
    timeBucket: string;
    dealCount: number;
    totalValue: number;
    dealIds: string[];
}

interface StageData {
    stage: string;
    buckets: HeatmapBucket[];
    totalValue: number;
}

export function PipelineHeatmap() {
    const { data: heatmap, isLoading } = useQuery<StageData[]>({
        queryKey: ["pipeline-heatmap"],
        queryFn: async () => {
            const res = await fetch("/api/pipeline/heatmap");
            return res.json();
        }
    });

    if (isLoading) {
        return <div className="p-8 text-center text-muted-foreground">Loading heatmap...</div>;
    }

    const timeLabels = ["0-3 Days", "4-7 Days", "8-14 Days", "15+ Days"];

    if (!Array.isArray(heatmap)) {
        return <div className="p-8 text-center text-red-500">Error loading heatmap data.</div>;
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-5 gap-4">
                {heatmap.map((stage) => (
                    <div key={stage.stage} className="space-y-2">
                        <div className="text-sm font-medium uppercase text-muted-foreground text-center">
                            {stage.stage.replace("_", " ")}
                        </div>
                        <div className="text-xs text-center font-bold">
                            {formatCurrency(stage.totalValue)}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-5 gap-4 h-[500px]">
                {heatmap?.map((stage) => (
                    <div key={stage.stage} className="flex flex-col gap-2 h-full">
                        {stage.buckets.map((bucket, index) => {
                            // Calculate intensity based on deal count (mock logic)
                            const intensity = Math.min(bucket.dealCount * 10, 100);
                            const isHighRisk = bucket.timeBucket === "15+";

                            return (
                                <div
                                    key={bucket.timeBucket}
                                    className={`
                                        flex-1 rounded-md border p-2 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-[1.02]
                                        ${isHighRisk && bucket.dealCount > 0 ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-900" : "bg-card border-border hover:border-primary/50"}
                                    `}
                                >
                                    <div className="text-xs text-muted-foreground mb-1">{timeLabels[index]}</div>
                                    <div className="text-2xl font-bold">{bucket.dealCount}</div>
                                    <div className="text-xs text-muted-foreground">{formatCurrency(bucket.totalValue)}</div>
                                    {isHighRisk && bucket.dealCount > 0 && (
                                        <div className="mt-2 flex items-center gap-1 text-xs text-destructive font-medium">
                                            <AlertTriangle className="w-3 h-3" />
                                            Stalled
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}
