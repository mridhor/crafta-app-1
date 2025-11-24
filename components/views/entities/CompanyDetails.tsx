"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
    ArrowLeft,
    Globe,
    MapPin,
    Users,
    Building2,
    MoreHorizontal,
    Plus,
    TrendingUp,
    DollarSign,
    Clock,
    ShieldAlert,
    Link as LinkIcon
} from "lucide-react";
import { useView } from "@/components/providers/ViewContext";
import { AIContextPanel } from "./AIContextPanel";

// Mock Data for Company
const mockCompany = {
    id: 1,
    name: "Acme Corp",
    domain: "acme.com",
    industry: "Manufacturing",
    region: "North America",
    size: "1,000 - 5,000",
    owner: "Sarah J.",
    hq: "San Francisco, CA",
    lifecycleStage: "Customer",
    metrics: {
        openDeals: 2,
        pipelineValue: 250000,
        riskScore: 15, // Low
        avgResponseTime: "4 hours"
    }
};

export function CompanyDetails() {
    const { setActiveView } = useView();
    const [company, setCompany] = useState(mockCompany);

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

                {/* Company Profile Card */}
                <div className="text-center mb-6">
                    <div className="w-20 h-20 rounded bg-secondary mx-auto mb-3 flex items-center justify-center text-2xl font-bold text-muted-foreground">
                        {company.name.substring(0, 2).toUpperCase()}
                    </div>
                    <h2 className="font-bold text-lg">{company.name}</h2>
                    <a href={`https://${company.domain}`} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline flex items-center justify-center gap-1 mt-1">
                        <Globe className="w-3 h-3" />
                        {company.domain}
                    </a>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                    <Button variant="outline" size="sm" className="h-9 text-xs">
                        <Plus className="w-3.5 h-3.5 mr-2" />
                        Add Deal
                    </Button>
                    <Button variant="outline" size="sm" className="h-9 text-xs">
                        <LinkIcon className="w-3.5 h-3.5 mr-2" />
                        Link Contact
                    </Button>
                </div>

                {/* Company Info */}
                <div className="space-y-4 text-sm">
                    <div className="flex items-center gap-3 text-muted-foreground">
                        <Building2 className="w-4 h-4 shrink-0" />
                        <span className="text-foreground">{company.industry}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                        <MapPin className="w-4 h-4 shrink-0" />
                        <span className="text-foreground">{company.hq}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                        <Users className="w-4 h-4 shrink-0" />
                        <span className="text-foreground">{company.size} employees</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                        <Globe className="w-4 h-4 shrink-0" />
                        <span className="text-foreground">{company.region}</span>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <AppLayout leftSidebar={sidebar}>
            <div className="p-6 max-w-6xl mx-auto space-y-8">
                {/* Metrics Section */}
                <div className="grid grid-cols-4 gap-4">
                    <Card className="p-4 flex flex-col justify-between">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Total Pipeline</div>
                        <div className="text-2xl font-bold flex items-center gap-2">
                            ${company.metrics.pipelineValue.toLocaleString()}
                            <TrendingUp className="w-4 h-4 text-green-500" />
                        </div>
                    </Card>
                    <Card className="p-4 flex flex-col justify-between">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Open Deals</div>
                        <div className="text-2xl font-bold">{company.metrics.openDeals}</div>
                    </Card>
                    <Card className="p-4 flex flex-col justify-between">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Risk Score</div>
                        <div className="text-2xl font-bold flex items-center gap-2 text-green-600">
                            {company.metrics.riskScore}
                            <span className="text-xs font-normal text-muted-foreground">/ 100</span>
                        </div>
                    </Card>
                    <Card className="p-4 flex flex-col justify-between">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Avg Response</div>
                        <div className="text-2xl font-bold">{company.metrics.avgResponseTime}</div>
                    </Card>
                </div>

                <div className="grid grid-cols-3 gap-6">
                    {/* Main Content: Linked Entities */}
                    <div className="col-span-2 space-y-6">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <DollarSign className="w-4 h-4" />
                                    Active Deals
                                </h3>
                                <Button variant="ghost" size="sm" className="text-xs">View All</Button>
                            </div>
                            <div className="space-y-3">
                                <Card className="p-4 flex items-center justify-between hover:bg-muted/30 cursor-pointer transition-colors">
                                    <div>
                                        <div className="font-medium">Acme Expansion</div>
                                        <div className="text-xs text-muted-foreground mt-1">Owner: Sarah J. • Last Activity: 2h ago</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium">$50,000</div>
                                        <div className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium inline-block mt-1">Negotiation</div>
                                    </div>
                                </Card>
                                <Card className="p-4 flex items-center justify-between hover:bg-muted/30 cursor-pointer transition-colors">
                                    <div>
                                        <div className="font-medium">Q1 Maintenance</div>
                                        <div className="text-xs text-muted-foreground mt-1">Owner: Sarah J. • Last Activity: 1w ago</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium">$200,000</div>
                                        <div className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium inline-block mt-1">Closed Won</div>
                                    </div>
                                </Card>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <Users className="w-4 h-4" />
                                    Key Contacts
                                </h3>
                                <Button variant="ghost" size="sm" className="text-xs">View All</Button>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <Card className="p-3 flex items-center gap-3 hover:bg-muted/30 cursor-pointer transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">JD</div>
                                    <div>
                                        <div className="text-sm font-medium">John Doe</div>
                                        <div className="text-xs text-muted-foreground">CTO</div>
                                    </div>
                                </Card>
                                <Card className="p-3 flex items-center gap-3 hover:bg-muted/30 cursor-pointer transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-xs font-bold">AS</div>
                                    <div>
                                        <div className="text-sm font-medium">Alice Smith</div>
                                        <div className="text-xs text-muted-foreground">VP Engineering</div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: AI Context */}
                    <div className="space-y-6">
                        <AIContextPanel
                            entityType="company"
                            insights={{
                                summary: "Account health is strong. Expansion deal is progressing well. Potential for cross-sell in Q2 based on hiring patterns.",
                                riskLevel: "Low",
                                nextSteps: [
                                    "Review Q2 roadmap for cross-sell opportunities",
                                    "Schedule quarterly business review",
                                    "Connect with new VP of Product"
                                ]
                            }}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
