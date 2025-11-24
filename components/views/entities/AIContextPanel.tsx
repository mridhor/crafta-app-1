"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Bot, Sparkles, AlertTriangle, ArrowRight, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIContextPanelProps {
    entityType: 'contact' | 'company' | 'deal';
    insights: {
        summary: string;
        riskLevel?: 'Low' | 'Medium' | 'High';
        riskReason?: string;
        nextSteps: string[];
        sentiment?: string;
    };
}

export function AIContextPanel({ entityType, insights }: AIContextPanelProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 font-semibold text-purple-700">
                <Sparkles className="w-4 h-4" />
                AI Context
            </div>

            {/* Summary Card */}
            <Card className="p-4 bg-purple-50/50 border-purple-100">
                <div className="flex gap-3">
                    <div className="mt-1 w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-purple-900 mb-1">
                            {entityType === 'contact' ? 'Relationship Insight' :
                                entityType === 'company' ? 'Account Health' : 'Deal Velocity'}
                        </h3>
                        <p className="text-sm text-purple-800 leading-relaxed">
                            {insights.summary}
                        </p>
                    </div>
                </div>
            </Card>

            {/* Risk Section */}
            {insights.riskLevel && insights.riskLevel !== 'Low' && (
                <Card className="p-4 bg-orange-50 border-orange-200">
                    <div className="flex items-center gap-2 mb-2 text-orange-800 font-semibold text-sm">
                        <AlertTriangle className="w-4 h-4" />
                        {insights.riskLevel} Risk Detected
                    </div>
                    <p className="text-xs text-orange-700 mb-3 leading-relaxed">
                        {insights.riskReason}
                    </p>
                </Card>
            )}

            {/* Next Steps */}
            <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Recommended Actions</h3>
                <div className="space-y-2">
                    {insights.nextSteps.map((step, index) => (
                        <Button
                            key={index}
                            variant="outline"
                            className="w-full justify-start text-xs h-auto py-2.5 whitespace-normal text-left group hover:border-purple-200 hover:bg-purple-50/30"
                        >
                            <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center mr-3 shrink-0 group-hover:bg-purple-100 transition-colors">
                                <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-purple-600" />
                            </div>
                            {step}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}
