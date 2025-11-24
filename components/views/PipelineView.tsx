"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PipelineDrilldown } from "@/components/views/PipelineDrilldown";
import { PipelineHealthSidebar } from "@/components/views/PipelineHealthSidebar";
import { supabase } from "@/lib/supabase";
import {
    BarChart3,
    TrendingUp,
    AlertTriangle,
    Filter,
    ArrowRight,
    DollarSign,
    Layers,
    Calendar,
    MoreHorizontal
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
            lastInteraction: "2 days ago", // Placeholder
            decayRisk: "low" as const, // Placeholder
            probability: 50 // Placeholder
        }));
    };

    return (
        <AppLayout leftSidebar={<PipelineHealthSidebar />}>
            <div className="min-h-screen bg-slate-50/50 p-6">
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Pipeline Overview</h1>
                            <p className="text-slate-500 mt-1 text-lg">Temporal heatmap of deal velocity and stagnation.</p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" size="sm" className="h-9 rounded-lg border-slate-200 text-slate-600 hover:bg-white hover:text-slate-900 shadow-sm">
                                <Filter className="w-4 h-4 mr-2" />
                                Filter
                            </Button>
                            <Button className="h-9 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-200">
                                <Layers className="w-4 h-4 mr-2" />
                                Forecast View
                            </Button>
                        </div>
                    </div>

                    {/* Heatmap Card */}
                    <Card className="p-8 rounded-2xl shadow-sm border-slate-100 bg-white">
                        <div className="grid grid-cols-6 gap-6 mb-6 text-sm font-medium text-slate-400 border-b border-slate-100 pb-4">
                            <div className="col-span-2 pl-2">Stage</div>
                            <div className="text-center">0-3 Days</div>
                            <div className="text-center">4-7 Days</div>
                            <div className="text-center">8-14 Days</div>
                            <div className="text-center">15+ Days</div>
                        </div>

                        <div className="space-y-3">
                            {loading ? (
                                <div className="text-center py-12 text-slate-400">Loading pipeline...</div>
                            ) : heatmapData.map((row) => (
                                <div key={row.stage} className="grid grid-cols-6 gap-6 items-center py-4 hover:bg-slate-50/80 rounded-xl transition-all duration-200 px-2 group">
                                    <div className="col-span-2">
                                        <div className="font-semibold text-slate-800 text-lg">{row.stage}</div>
                                        <div className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                                            <DollarSign className="w-3.5 h-3.5" />
                                            {row.value}
                                        </div>
                                    </div>

                                    {/* Heatmap Cells */}
                                    <div
                                        className={cn(
                                            "h-12 rounded-xl flex items-center justify-center font-semibold cursor-pointer transition-all duration-200 relative overflow-hidden",
                                            row.days0_3 === 0
                                                ? "bg-slate-50 text-slate-300"
                                                : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:shadow-sm hover:-translate-y-0.5",
                                            row.days0_3 > 5 && "bg-indigo-100 text-indigo-700 shadow-sm shadow-indigo-100"
                                        )}
                                        title={`${row.days0_3} deals in ${row.stage} (0-3 days)`}
                                        onClick={() => handleCellClick(row.stage, "0-3 Days", row.days0_3)}
                                    >
                                        {row.days0_3 || "-"}
                                    </div>

                                    <div
                                        className={cn(
                                            "h-12 rounded-xl flex items-center justify-center font-semibold cursor-pointer transition-all duration-200 relative overflow-hidden",
                                            row.days4_7 === 0
                                                ? "bg-slate-50 text-slate-300"
                                                : "bg-violet-50 text-violet-600 hover:bg-violet-100 hover:shadow-sm hover:-translate-y-0.5",
                                            row.days4_7 > 3 && "bg-violet-100 text-violet-700 shadow-sm shadow-violet-100"
                                        )}
                                        title={`${row.days4_7} deals in ${row.stage} (4-7 days)`}
                                        onClick={() => handleCellClick(row.stage, "4-7 Days", row.days4_7)}
                                    >
                                        {row.days4_7 || "-"}
                                    </div>

                                    <div
                                        className={cn(
                                            "h-12 rounded-xl flex items-center justify-center font-semibold cursor-pointer transition-all duration-200 relative overflow-hidden",
                                            row.days8_14 === 0
                                                ? "bg-slate-50 text-slate-300"
                                                : "bg-amber-50 text-amber-600 hover:bg-amber-100 hover:shadow-sm hover:-translate-y-0.5",
                                            row.days8_14 > 2 && "bg-amber-100 text-amber-700 shadow-sm shadow-amber-100"
                                        )}
                                        title={`${row.days8_14} deals in ${row.stage} (8-14 days)`}
                                        onClick={() => handleCellClick(row.stage, "8-14 Days", row.days8_14)}
                                    >
                                        {row.days8_14 || "-"}
                                    </div>

                                    <div
                                        className={cn(
                                            "h-12 rounded-xl flex items-center justify-center font-semibold cursor-pointer transition-all duration-200 relative overflow-hidden",
                                            row.days15plus === 0
                                                ? "bg-slate-50 text-slate-300"
                                                : "bg-rose-50 text-rose-600 hover:bg-rose-100 hover:shadow-sm hover:-translate-y-0.5",
                                            row.days15plus > 0 && "bg-rose-100 text-rose-700 shadow-sm shadow-rose-100"
                                        )}
                                        title={`${row.days15plus} deals in ${row.stage} (15+ days)`}
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
                        deals={getFilteredDeals()}
                        onClose={() => setSelectedCell(null)}
                    />
                )}
            </div>
        </AppLayout>
    );
}
