"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { X, ArrowRight, AlertTriangle, MoreHorizontal, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Deal {
    id: string;
    name: string;
    company: string;
    value: string;
    owner: string;
    timeInStage: string;
    decayRisk: "high" | "medium" | "low";
    probability: number;
}

interface PipelineDrilldownProps {
    stage: string;
    timeframe: string;
    deals: Deal[];
    onClose: () => void;
}

export function PipelineDrilldown({ stage, timeframe, deals = [], onClose }: PipelineDrilldownProps) {
    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/20 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-2xl bg-background h-full shadow-2xl border-l border-border flex flex-col animate-in slide-in-from-right duration-300">

                {/* Header */}
                <div className="p-6 border-b border-border flex items-center justify-between bg-muted/10">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-bold uppercase tracking-wider">{stage}</span>
                            <span className="text-muted-foreground text-sm">•</span>
                            <span className="text-sm font-medium text-muted-foreground">{timeframe} in stage</span>
                        </div>
                        <h2 className="text-xl font-bold">{deals.length} Deals Found</h2>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-muted">
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {deals.map((deal) => (
                        <Card key={deal.id} className="p-4 hover:shadow-md transition-all border-l-4 border-l-transparent hover:border-l-blue-500 group">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <h3 className="font-semibold text-base">{deal.name}</h3>
                                    <p className="text-sm text-muted-foreground">{deal.company}</p>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-base">{deal.value}</div>
                                    <div className="text-xs text-muted-foreground">{deal.probability}% Prob.</div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-1.5 text-muted-foreground">
                                        <User className="w-3.5 h-3.5" />
                                        {deal.owner}
                                    </div>
                                    <div className={cn(
                                        "flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium",
                                        deal.decayRisk === "high" ? "bg-red-100 text-red-700" :
                                            deal.decayRisk === "medium" ? "bg-orange-100 text-orange-700" :
                                                "bg-green-100 text-green-700"
                                    )}>
                                        {deal.decayRisk === "high" && <AlertTriangle className="w-3 h-3" />}
                                        {deal.timeInStage}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                                        View
                                    </Button>
                                    <Button size="sm" className="h-7 text-xs bg-blue-600 text-white hover:bg-blue-700">
                                        Action <ArrowRight className="w-3 h-3 ml-1" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-border bg-muted/10 flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Showing {deals.length} of {deals.length}</span>
                    <Button variant="outline" size="sm">Export List</Button>
                </div>
            </div>
        </div>
    );
}
