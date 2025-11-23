"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PipelineDrilldown } from "@/components/views/PipelineDrilldown";
import { supabase } from "@/lib/supabase";
import {
    TrendingUp,
    AlertTriangle,
    Filter,
    DollarSign,
    Layers
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data for Pipeline Heatmap (Fallback)
const initialHeatmapData = [
    { stage: "Discovery", days0_3: 5, days4_7: 2, days8_14: 1, days15plus: 0, value: "$120k" },
    { stage: "Proposal", days0_3: 3, days4_7: 4, days8_14: 2, days15plus: 1, value: "$350k" },
    { stage: "Negotiation", days0_3: 2, days4_7: 1, days8_14: 3, days15plus: 2, value: "$500k" },
    { stage: "Closing", days0_3: 4, days4_7: 0, days8_14: 0, days15plus: 1, value: "$200k" },
];

export function PipelineView() {
    const [heatmapData, setHeatmapData] = useState<any[]>(initialHeatmapData);
    const [allDeals, setAllDeals] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedCell, setSelectedCell] = useState<{ stage: string, ageRange: string } | null>(null);

    // Fetch deals from Supabase and aggregate
    useEffect(() => {
        const fetchPipeline = async () => {
            setLoading(true);
            const { data: deals, error } = await supabase
                .from('deals')
                .select('*');

            if (deals && deals.length > 0) {
                setAllDeals(deals);
                // Aggregate deals into heatmap buckets
                const stages = ["Discovery", "Proposal", "Negotiation", "Closing"];
                const newHeatmap = stages.map(stage => {
                    const stageDeals = deals.filter((d: any) => d.stage === stage);
                    const totalValue = stageDeals.reduce((sum: number, d: any) => sum + (Number(d.value) || 0), 0);

                    // Calculate age buckets (mock logic for created_at diff)
                    const now = new Date();
                    const getAge = (d: any) => Math.floor((now.getTime() - new Date(d.created_at).getTime()) / (1000 * 60 * 60 * 24));

                    return {
                        stage,
                        days0_3: stageDeals.filter((d: any) => getAge(d) <= 3).length,
                        days4_7: stageDeals.filter((d: any) => getAge(d) > 3 && getAge(d) <= 7).length,
                        days8_14: stageDeals.filter((d: any) => getAge(d) > 7 && getAge(d) <= 14).length,
                        days15plus: stageDeals.filter((d: any) => getAge(d) > 14).length,
                        value: `$${(totalValue / 1000).toFixed(0)}k`
                    };
                });
                setHeatmapData(newHeatmap);
            }
            setLoading(false);
        };

        fetchPipeline();
    }, []);

    const handleCellClick = (stage: string, ageRange: string, count: number) => {
        if (count > 0) {
            setSelectedCell({ stage, ageRange });
        }
    };

    const getFilteredDeals = () => {
        if (!selectedCell) return [];
        const now = new Date();
        const getAge = (d: any) => Math.floor((now.getTime() - new Date(d.created_at).getTime()) / (1000 * 60 * 60 * 24));

        return allDeals.filter(d => {
            if (d.stage !== selectedCell.stage) return false;
            const age = getAge(d);
            if (selectedCell.ageRange === "0-3 Days") return age <= 3;
            if (selectedCell.ageRange === "4-7 Days") return age > 3 && age <= 7;
            if (selectedCell.ageRange === "8-14 Days") return age > 7 && age <= 14;
            if (selectedCell.ageRange === "15+ Days") return age > 14;
            return false;
        }).map(d => ({
            id: d.id,
            name: d.name,
            company: "Unknown Company", // Need join or separate fetch
            value: `$${d.value}`,
            owner: "Me", // Placeholder
            timeInStage: "3 days", // Placeholder
            decayRisk: "low", // Placeholder
            probability: 50 // Placeholder
        }));
    };

    const sidebar = (
        <div className="p-4 space-y-6">
            <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Pipeline Health</h3>
                <div className="space-y-4">
                    <div className="p-3 bg-green-50 border border-green-100 rounded-md dark:bg-green-900/20 dark:border-green-900">
                        <div className="flex items-center gap-2 mb-1">
                            <TrendingUp className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-green-900 dark:text-green-100">Velocity Up</span>
                        </div>
                        <p className="text-xs text-green-700 dark:text-green-300">
                            Deals moving 15% faster than last quarter.
                        </p>
                    </div>
                    <div className="p-3 bg-orange-50 border border-orange-100 rounded-md dark:bg-orange-900/20 dark:border-orange-900">
                        <div className="flex items-center gap-2 mb-1">
                            <AlertTriangle className="w-4 h-4 text-orange-600" />
                            <span className="text-sm font-medium text-orange-900 dark:text-orange-100">Stalled Deals</span>
                        </div>
                        <p className="text-xs text-orange-700 dark:text-orange-300">
                            4 deals in Negotiation for {'>'} 14 days.
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Filters</h3>
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <span>Owner</span>
                        <span className="text-muted-foreground">All</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span>Region</span>
                        <span className="text-muted-foreground">North America</span>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <AppLayout leftSidebar={sidebar}>
            <div className="p-6 max-w-5xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Pipeline Overview</h1>
                        <p className="text-muted-foreground">Temporal heatmap of deal velocity and stagnation.</p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Filter className="w-4 h-4 mr-2" />
                            Filter
                        </Button>
                        <Button>
                            <Layers className="w-4 h-4 mr-2" />
                            Forecast View
                        </Button>
                    </div>
                </div>

                {/* Heatmap Card */}
                <Card className="p-6">
                    <div className="grid grid-cols-6 gap-4 mb-4 text-sm font-medium text-muted-foreground border-b border-border pb-2">
                        <div className="col-span-2">Stage</div>
                        <div className="text-center">0-3 Days</div>
                        <div className="text-center">4-7 Days</div>
                        <div className="text-center">8-14 Days</div>
                        <div className="text-center">15+ Days</div>
                    </div>

                    <div className="space-y-2">
                        {loading ? (
                            <div className="text-center py-12 text-muted-foreground">Loading pipeline...</div>
                        ) : heatmapData.map((row) => (
                            <div key={row.stage} className="grid grid-cols-6 gap-4 items-center py-3 hover:bg-muted/30 rounded-md transition-colors px-2">
                                <div className="col-span-2">
                                    <div className="font-semibold">{row.stage}</div>
                                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                                        <DollarSign className="w-3 h-3" />
                                        {row.value}
                                    </div>
                                </div>

                                {/* Heatmap Cells */}
                                <div
                                    className={cn(
                                        "h-10 rounded-md flex items-center justify-center font-medium cursor-pointer transition-all hover:ring-2 hover:ring-ring hover:ring-offset-1",
                                        row.days0_3 === 0 ? "bg-muted/20 text-muted-foreground" : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
                                        row.days0_3 > 5 && "bg-blue-200 text-blue-800 dark:bg-blue-800/50"
                                    )}
                                    onClick={() => handleCellClick(row.stage, "0-3 Days", row.days0_3)}
                                >
                                    {row.days0_3 || "-"}
                                </div>

                                <div
                                    className={cn(
                                        "h-10 rounded-md flex items-center justify-center font-medium cursor-pointer transition-all hover:ring-2 hover:ring-ring hover:ring-offset-1",
                                        row.days4_7 === 0 ? "bg-muted/20 text-muted-foreground" : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
                                        row.days4_7 > 3 && "bg-green-200 text-green-800 dark:bg-green-800/50"
                                    )}
                                    onClick={() => handleCellClick(row.stage, "4-7 Days", row.days4_7)}
                                >
                                    {row.days4_7 || "-"}
                                </div>

                                <div
                                    className={cn(
                                        "h-10 rounded-md flex items-center justify-center font-medium cursor-pointer transition-all hover:ring-2 hover:ring-ring hover:ring-offset-1",
                                        row.days8_14 === 0 ? "bg-muted/20 text-muted-foreground" : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
                                        row.days8_14 > 2 && "bg-orange-200 text-orange-800 dark:bg-orange-800/50"
                                    )}
                                    onClick={() => handleCellClick(row.stage, "8-14 Days", row.days8_14)}
                                >
                                    {row.days8_14 || "-"}
                                </div>

                                <div
                                    className={cn(
                                        "h-10 rounded-md flex items-center justify-center font-medium cursor-pointer transition-all hover:ring-2 hover:ring-ring hover:ring-offset-1",
                                        row.days15plus === 0 ? "bg-muted/20 text-muted-foreground" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
                                        row.days15plus > 0 && "bg-red-200 text-red-800 dark:bg-red-800/50"
                                    )}
                                    onClick={() => handleCellClick(row.stage, "15+ Days", row.days15plus)}
                                >
                                    {row.days15plus || "-"}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Drilldown Modal */}
            {selectedCell && (
                <PipelineDrilldown
                    stage={selectedCell.stage}
                    timeframe={selectedCell.ageRange}
                    deals={getFilteredDeals() as any}
                    onClose={() => setSelectedCell(null)}
                />
            )}
        </AppLayout>
    );
}
