"use client";

import { PageLayout } from "@/components/layout/PageLayout";
import { Filter, TrendingUp, AlertTriangle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const stages = ["Lead", "Discovery", "Proposal", "Negotiation", "Closed Won"];
const timeWindows = [
    { label: "0-3 Days", id: "0-3" },
    { label: "4-7 Days", id: "4-7" },
    { label: "8-14 Days", id: "8-14" },
    { label: "15+ Days", id: "15+" },
];

// Mock Data: [Stage Index][Time Window Index] -> Cell Data
const heatmapData = [
    // Lead
    [
        { count: 12, velocity: "High", risk: "low" },
        { count: 5, velocity: "Medium", risk: "low" },
        { count: 2, velocity: "Low", risk: "medium" },
        { count: 1, velocity: "Stalled", risk: "high" },
    ],
    // Discovery
    [
        { count: 8, velocity: "High", risk: "low" },
        { count: 6, velocity: "Medium", risk: "low" },
        { count: 4, velocity: "Low", risk: "medium" },
        { count: 3, velocity: "Stalled", risk: "high" },
    ],
    // Proposal
    [
        { count: 4, velocity: "High", risk: "low" },
        { count: 3, velocity: "Medium", risk: "medium" },
        { count: 5, velocity: "Low", risk: "high" },
        { count: 8, velocity: "Stalled", risk: "critical" },
    ],
    // Negotiation
    [
        { count: 2, velocity: "High", risk: "low" },
        { count: 2, velocity: "Medium", risk: "medium" },
        { count: 1, velocity: "Low", risk: "high" },
        { count: 4, velocity: "Stalled", risk: "critical" },
    ],
    // Closed Won (Usually doesn't decay, but for completeness)
    [
        { count: 15, velocity: "-", risk: "low" },
        { count: 0, velocity: "-", risk: "low" },
        { count: 0, velocity: "-", risk: "low" },
        { count: 0, velocity: "-", risk: "low" },
    ],
];

export default function PipelinePage() {
    return (
        <PageLayout
            sidebar={
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 flex items-center justify-between">
                            Filters
                            <Filter className="w-3 h-3" />
                        </h3>
                        <div className="space-y-3">
                            <div className="space-y-1">
                                <label className="text-xs text-gray-500">Pipeline</label>
                                <select className="w-full text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded px-2 py-1.5">
                                    <option>Enterprise Sales</option>
                                    <option>SMB Sales</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-gray-500">Owner</label>
                                <select className="w-full text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded px-2 py-1.5">
                                    <option>All Owners</option>
                                    <option>Me</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-gray-500">Region</label>
                                <select className="w-full text-sm bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded px-2 py-1.5">
                                    <option>All Regions</option>
                                    <option>North America</option>
                                    <option>EMEA</option>
                                    <option>APAC</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            }
        >
            <div className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                            <TrendingUp className="w-6 h-6 text-blue-600" />
                            Pipeline Overview
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Temporal heatmap of deal velocity and stagnation.
                        </p>
                    </div>
                </div>

                {/* Heatmap */}
                <div className="flex-1 overflow-auto">
                    <div className="min-w-[800px]">
                        {/* Header Row (Stages) */}
                        <div className="flex border-b border-gray-200 dark:border-gray-800">
                            <div className="w-32 flex-shrink-0 p-4 font-medium text-gray-500 text-sm bg-gray-50 dark:bg-gray-950/50">
                                Time in Stage
                            </div>
                            {stages.map((stage) => (
                                <div key={stage} className="flex-1 p-4 font-medium text-gray-900 dark:text-gray-100 text-center bg-gray-50 dark:bg-gray-950/50">
                                    {stage}
                                </div>
                            ))}
                        </div>

                        {/* Rows (Time Windows) */}
                        {timeWindows.map((window, windowIndex) => (
                            <div key={window.id} className="flex border-b border-gray-100 dark:border-gray-800/50">
                                <div className="w-32 flex-shrink-0 p-4 font-medium text-gray-700 dark:text-gray-300 text-sm flex items-center bg-gray-50/50 dark:bg-gray-950/30">
                                    {window.label}
                                </div>
                                {stages.map((stage, stageIndex) => {
                                    const cell = heatmapData[stageIndex][windowIndex];
                                    return (
                                        <div key={`${stage}-${window.id}`} className="flex-1 p-2 border-l border-gray-100 dark:border-gray-800/50">
                                            <div
                                                className={cn(
                                                    "h-full rounded-lg p-3 flex flex-col justify-between transition-all hover:scale-[1.02] cursor-pointer border",
                                                    cell.risk === "low" ? "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800" :
                                                        cell.risk === "medium" ? "bg-yellow-50 dark:bg-yellow-900/10 border-yellow-100 dark:border-yellow-900/30" :
                                                            cell.risk === "high" ? "bg-orange-50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-900/30" :
                                                                "bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30"
                                                )}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">{cell.count}</span>
                                                    {cell.risk !== "low" && (
                                                        <AlertTriangle className={cn(
                                                            "w-4 h-4",
                                                            cell.risk === "critical" ? "text-red-500" : "text-orange-500"
                                                        )} />
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-2">
                                                    <Clock className="w-3 h-3" />
                                                    <span>{cell.velocity} Velocity</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PageLayout>
    );
}
