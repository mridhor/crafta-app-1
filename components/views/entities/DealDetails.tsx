"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
    ArrowLeft,
    FileText,
    CheckCircle2,
    AlertCircle,
    Calendar,
    TrendingUp,
    Clock,
    AlertTriangle,
    MoreHorizontal,
    Plus,
    Paperclip
} from "lucide-react";
import { useView } from "@/components/providers/ViewContext";
import { EntityTimeline, TimelineEvent } from "./EntityTimeline";
import { AIContextPanel } from "./AIContextPanel";
import { cn } from "@/lib/utils";

// Mock Data for Deal
const mockDeal = {
    id: 101,
    name: "Acme Corp Expansion",
    company: "Acme Corp",
    contact: "John Doe",
    value: 50000,
    stage: "Negotiation",
    owner: "Sarah J.",
    createdDate: "Oct 15, 2024",
    nextAction: "Send Contract",
    risk: "High",
    riskReason: "Stalled in Negotiation. Competitor 'Globex' mentioned in emails.",
    velocity: "Slowing Down",
    daysInStage: 5,
    avgDaysInStage: 3
};

const mockEvents: TimelineEvent[] = [
    {
        id: "1",
        type: "stage_change",
        title: "Stage changed to Negotiation",
        description: "Moved from Proposal after verbal agreement on pricing.",
        date: "2 days ago",
        author: "System"
    },
    {
        id: "2",
        type: "email",
        title: "Email from John Doe",
        description: "Asking for clarification on SLA terms. Mentioned they are also talking to Globex.",
        date: "Yesterday",
        author: "John Doe"
    },
    {
        id: "3",
        type: "ai_insight",
        title: "Competitor Risk Detected",
        description: "Competitor 'Globex' identified in recent email. Suggest sending 'Competitive Battlecard' to John.",
        date: "Yesterday",
        author: "System"
    }
];

export function DealDetails() {
    const { setActiveView } = useView();
    const [deal, setDeal] = useState(mockDeal);

    const sidebar = (
        <div className="p-4 space-y-6">
            <div>
                <Button
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground mb-4 pl-0 hover:bg-transparent hover:text-foreground"
                    onClick={() => setActiveView("entities")}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Entities
                </Button>

                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Deal Navigation</h3>
                <nav className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start text-sm bg-secondary font-medium text-blue-600">
                        Timeline
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm text-muted-foreground">
                        Required Actions
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm text-muted-foreground">
                        Notes
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm text-muted-foreground">
                        Attachments
                    </Button>
                </nav>
            </div>

            <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Related Records</h3>
                <div className="space-y-2">
                    <Card className="p-3 flex items-center gap-3 hover:bg-muted/50 cursor-pointer transition-colors">
                        <div className="w-8 h-8 rounded bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold">
                            AC
                        </div>
                        <div>
                            <div className="text-sm font-medium">{deal.company}</div>
                            <div className="text-xs text-muted-foreground">Company</div>
                        </div>
                    </Card>
                    <Card className="p-3 flex items-center gap-3 hover:bg-muted/50 cursor-pointer transition-colors">
                        <div className="w-8 h-8 rounded bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">
                            JD
                        </div>
                        <div>
                            <div className="text-sm font-medium">{deal.contact}</div>
                            <div className="text-xs text-muted-foreground">Contact</div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );

    return (
        <AppLayout leftSidebar={sidebar}>
            <div className="p-6 max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl font-bold tracking-tight">{deal.name}</h1>
                            {deal.risk === "High" && (
                                <span className="px-2 py-0.5 rounded text-xs font-bold uppercase bg-red-100 text-red-700 flex items-center gap-1">
                                    <AlertTriangle className="w-3 h-3" /> High Risk
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {deal.company}</span>
                            <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> {deal.contact}</span>
                            <span className="font-semibold text-foreground">${deal.value.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">Edit</Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Move Stage</Button>
                    </div>
                </div>

                {/* Progress Bar (Stage) */}
                <div className="space-y-2">
                    <div className="flex h-2 overflow-hidden rounded-full bg-secondary">
                        <div className="w-1/4 bg-green-500" />
                        <div className="w-1/4 bg-green-500" />
                        <div className="w-1/4 bg-green-500" />
                        <div className="w-1/4 bg-blue-500 relative">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-2 border-blue-500 rounded-full shadow-sm" />
                        </div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground px-1">
                        <span>Lead</span>
                        <span>Discovery</span>
                        <span>Proposal</span>
                        <span className="font-medium text-blue-600">Negotiation</span>
                        <span>Closed</span>
                    </div>
                </div>

                {/* Key Metrics Section */}
                <div className="grid grid-cols-4 gap-4">
                    <Card className="p-4">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Velocity</div>
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-orange-500" />
                            <span className="font-bold">{deal.velocity}</span>
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Time in Stage</div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="font-bold">{deal.daysInStage} days</span>
                            <span className="text-xs text-muted-foreground">(Avg: {deal.avgDaysInStage})</span>
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Next Action</div>
                        <div className="font-bold text-sm truncate" title={deal.nextAction}>{deal.nextAction}</div>
                    </Card>
                    <Card className="p-4">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Owner</div>
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold">
                                {deal.owner.substring(0, 2).toUpperCase()}
                            </div>
                            <span className="font-bold text-sm">{deal.owner}</span>
                        </div>
                    </Card>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {/* Main Content - Timeline */}
                    <div className="col-span-2 space-y-6">
                        <EntityTimeline
                            events={mockEvents}
                            onExplain={(id) => console.log("Explain event", id)}
                        />
                    </div>

                    {/* Right Column - AI Context */}
                    <div className="space-y-6">
                        <AIContextPanel
                            entityType="deal"
                            insights={{
                                summary: "Deal is at risk due to competitor presence. However, we have a strong champion in John Doe. Focus on differentiation.",
                                riskLevel: "High",
                                riskReason: deal.riskReason,
                                nextSteps: [
                                    "Send Competitive Battlecard vs Globex",
                                    "Schedule executive alignment call",
                                    "Offer implementation guarantee"
                                ]
                            }}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
