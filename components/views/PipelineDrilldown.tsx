"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { X, ArrowRight, AlertTriangle, MoreHorizontal, User, Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface Deal {
    id: string;
    name: string;
    company: string;
    value: string;
    owner: string;
    timeInStage: string;
    lastInteraction: string;
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
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/20 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-2xl bg-slate-50 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">

                {/* Header */}
                <div className="p-6 border-b border-slate-200 bg-white flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 rounded-md text-xs font-bold uppercase tracking-wider border border-indigo-100">{stage}</span>
                            <span className="text-slate-300">•</span>
                            <span className="text-sm font-medium text-slate-500">{timeframe} in stage</span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{deals.length} Deals Found</h2>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900">
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {deals.map((deal) => (
                        <Card key={deal.id} className="p-5 hover:shadow-md transition-all duration-200 border border-slate-200 hover:border-indigo-300 bg-white rounded-xl group">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-lg text-slate-900 leading-tight">{deal.name}</h3>
                                    <p className="text-sm text-slate-500 font-medium mt-1">{deal.company}</p>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold text-lg text-slate-900">{deal.value}</div>
                                    <div className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full inline-block mt-1">{deal.probability}% Prob.</div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-slate-50 mt-2">
                                <div className="flex items-center gap-5 text-sm">
                                    <div className="flex items-center gap-2 text-slate-500" title="Owner">
                                        <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                                            {deal.owner.charAt(0)}
                                        </div>
                                        <span className="text-xs font-medium">{deal.owner}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-slate-500" title="Last Interaction">
                                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                                        <span className="text-xs font-medium">{deal.lastInteraction}</span>
                                    </div>
                                    <div className={cn(
                                        "flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border",
                                        deal.decayRisk === "high" ? "bg-rose-50 text-rose-700 border-rose-100" :
                                            deal.decayRisk === "medium" ? "bg-amber-50 text-amber-700 border-amber-100" :
                                                "bg-emerald-50 text-emerald-700 border-emerald-100"
                                    )}>
                                        {deal.decayRisk === "high" && <AlertTriangle className="w-3 h-3" />}
                                        {deal.timeInStage}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <Button variant="ghost" size="sm" className="h-8 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100">
                                        View Details
                                    </Button>
                                    <Button size="sm" className="h-8 text-xs bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm shadow-indigo-200">
                                        Nudge Owner <ArrowRight className="w-3 h-3 ml-1" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-slate-200 bg-white flex justify-between items-center">
                    <span className="text-xs font-medium text-slate-400">Showing {deals.length} of {deals.length}</span>
                    <Button variant="outline" size="sm" className="text-xs h-8 border-slate-200 text-slate-600">Export List</Button>
                </div>
            </div>
        </div>
    );
}
