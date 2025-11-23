"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PipelineDrilldown } from "@/components/views/PipelineDrilldown";
import { Filter, TrendingUp, AlertTriangle, ArrowRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data
const pipelineStages = ["Lead", "Discovery", "Proposal", "Negotiation", "Closed"];
const timeBuckets = ["0-3 Days", "4-7 Days", "8-14 Days", "15+ Days"];

// Mock Heatmap Data (Count, Value, Risk Level)
const heatmapData: Record<string, Record<string, { count: number; value: string; risk: "low" | "medium" | "high" }>> = {
    "Lead": {
        "0-3 Days": { count: 12, value: "$120k", risk: "low" },
        "4-7 Days": { count: 5, value: "$50k", risk: "medium" },
        "8-14 Days": { count: 2, value: "$20k", risk: "high" },
        "15+ Days": { count: 1, value: "$10k", risk: "high" },
    },
    "Discovery": {
        "0-3 Days": { count: 8, value: "$240k", risk: "low" },
        "4-7 Days": { count: 6, value: "$180k", risk: "low" },
        "8-14 Days": { count: 4, value: "$120k", risk: "medium" },
        "15+ Days": { count: 3, value: "$90k", risk: "high" },
    },
    "Proposal": {
        "0-3 Days": { count: 5, value: "$500k", risk: "low" },
        "4-7 Days": { count: 4, value: "$400k", risk: "medium" },
        "8-14 Days": { count: 3, value: "$300k", risk: "high" },
        "15+ Days": { count: 2, value: "$200k", risk: "high" },
    },
    "Negotiation": {
        "0-3 Days": { count: 3, value: "$450k", risk: "low" },
        "4-7 Days": { count: 2, value: "$300k", risk: "medium" },
        "8-14 Days": { count: 1, value: "$150k", risk: "high" },
        "15+ Days": { count: 1, value: "$150k", risk: "high" },
    },
    "Closed": {
        "0-3 Days": { count: 15, value: "$1.2M", risk: "low" },
        "4-7 Days": { count: 0, value: "$0", risk: "low" },
        "8-14 Days": { count: 0, value: "$0", risk: "low" },
        "15+ Days": { count: 0, value: "$0", risk: "low" },
    },
};

export function PipelineView() {
    const [selectedCell, setSelectedCell] = useState<{ stage: string; timeframe: string } | null>(null);

    const handleCellClick = (stage: string, timeframe: string) => {
        if (heatmapData[stage][timeframe].count > 0) {
            setSelectedCell({ stage, timeframe });
        }
    };

    const sidebar = (
        <div className="p-4 space-y-6">
            <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Pipeline Filters</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <span>Owner</span>
                        <span className="text-muted-foreground">All Team</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span>Region</span>
                        <span className="text-muted-foreground">North America</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span>Product</span>
                        <span className="text-muted-foreground">All</span>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Metrics</h3>
                <div className="space-y-4">
                    <div>
                        <div className="text-sm text-muted-foreground mb-1">Total Pipeline Value</div>
                        <div className="text-2xl font-bold">$4.2M</div>
                        <div className="text-xs text-green-600 flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" /> +12% vs last month
                        </div>
                    </div>
                    <div>
                        <div className="text-sm text-muted-foreground mb-1">Win Rate Prediction</div>
                        <div className="text-2xl font-bold">24%</div>
                        <div className="text-xs text-muted-foreground">Based on current velocity</div>
                    </div>
                </div>
            </div>
        </div>
    );

    const rightPanel = (
        <div className="h-full flex flex-col">
            <div className="p-4 border-b border-border">
                <h3 className="font-semibold flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-purple-500" />
                    Pipeline Intelligence
                </h3>
            </div>
            <div className="p-4 flex-1 overflow-y-auto space-y-6">
                <div className="space-y-2">
                    <h4 className="text-xs font-bold text-muted-foreground uppercase">Drift Detected</h4>
                    <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-md border border-orange-100 dark:border-orange-900">
                        <p className="text-xs text-orange-800 dark:text-orange-200">
                            <strong>Stagnation Risk:</strong> 5 deals in "Proposal" have not moved in 15+ days. This is 2x the average for this stage.
                        </p>
                        <Button size="sm" variant="outline" className="mt-2 w-full h-7 text-xs border-orange-200 hover:bg-orange-100 dark:border-orange-800 dark:hover:bg-orange-900/40">
                            View Stalled Deals
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <AppLayout leftSidebar={sidebar} rightPanel={rightPanel}>
            <div className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Pipeline Overview</h1>
                        <p className="text-muted-foreground">Temporal heatmap of deal velocity and risk.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Filter className="w-4 h-4 mr-2" />
                            Filter
                        </Button>
                    </div>
                </div>

                {/* Heatmap Grid */}
                <div className="flex-1 overflow-auto">
                    <div className="min-w-[800px]">
                        {/* Header Row */}
                        <div className="grid grid-cols-5 gap-4 mb-4">
                            <div className="col-span-1"></div> {/* Spacer for row labels */}
                            {timeBuckets.map((bucket) => (
                                <div key={bucket} className="text-sm font-semibold text-center text-muted-foreground uppercase tracking-wider">
                                    {bucket}
                                </div>
                            ))}
                        </div>

                        {/* Rows */}
                        <div className="space-y-4">
                            {pipelineStages.map((stage) => (
                                <div key={stage} className="grid grid-cols-5 gap-4 items-center">
                                    {/* Row Label */}
                                    <div className="font-semibold text-sm">{stage}</div>

                                    {/* Cells */}
                                    {timeBuckets.map((bucket) => {
                                        const data = heatmapData[stage][bucket];
                                        return (
                                            <div
                                                key={`${stage}-${bucket}`}
                                                onClick={() => handleCellClick(stage, bucket)}
                                                className={cn(
                                                    "h-24 rounded-lg border border-transparent transition-all cursor-pointer p-3 flex flex-col justify-between relative group",
                                                    data.count === 0 ? "bg-muted/20 border-border border-dashed" :
                                                        data.risk === "high" ? "bg-red-50 border-red-100 hover:border-red-300 dark:bg-red-900/20 dark:border-red-900" :
                                                            data.risk === "medium" ? "bg-orange-50 border-orange-100 hover:border-orange-300 dark:bg-orange-900/20 dark:border-orange-900" :
                                                                "bg-green-50 border-green-100 hover:border-green-300 dark:bg-green-900/20 dark:border-green-900"
                                                )}
                                            >
                                                {data.count > 0 ? (
                                                    <>
                                                        <div className="flex justify-between items-start">
                                                            <span className="text-2xl font-bold">{data.count}</span>
                                                            {data.risk === "high" && <AlertTriangle className="w-4 h-4 text-red-500" />}
                                                        </div>
                                                        <div className="text-xs font-medium text-muted-foreground">
                                                            {data.value}
                                                        </div>
                                                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                                                            <span className="text-xs font-bold bg-white dark:bg-black px-2 py-1 rounded shadow-sm">View List</span>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <span className="text-muted-foreground/30 text-xs text-center mt-8">-</span>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Drilldown Modal */}
            {selectedCell && (
                <PipelineDrilldown
                    stage={selectedCell.stage}
                    timeframe={selectedCell.timeframe}
                    deals={[
                        // Mock deals for the drilldown
                        { id: "1", name: "Acme Corp Expansion", company: "Acme Corp", value: "$120,000", owner: "Sarah Connor", timeInStage: "12 days", decayRisk: "high", probability: 60 },
                        { id: "2", name: "Stark Industries Pilot", company: "Stark Industries", value: "$50,000", owner: "Tony Stark", timeInStage: "5 days", decayRisk: "medium", probability: 40 },
                        { id: "3", name: "Wayne Ent Contract", company: "Wayne Enterprises", value: "$300,000", owner: "Bruce Wayne", timeInStage: "2 days", decayRisk: "low", probability: 80 },
                    ]}
                    onClose={() => setSelectedCell(null)}
                />
            )}
        </AppLayout>
    );
}
