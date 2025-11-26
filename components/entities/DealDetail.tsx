"use client";

import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ActivityTimeline } from "@/components/entities/ActivityTimeline";
import { formatCurrency, formatTimeAgo } from "@/lib/utils";
import { AlertTriangle, ArrowLeft, Clock, TrendingUp, Calendar } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface DealDetailProps {
    id: string;
}

export function DealDetail({ id }: DealDetailProps) {
    const [activeTab, setActiveTab] = useState("timeline");

    const { data: deal, isLoading } = useQuery({
        queryKey: ["deal", id],
        queryFn: async () => {
            const res = await fetch(`/api/deals/${id}`);
            return res.json();
        }
    });

    if (isLoading) {
        return <div className="p-8 text-center text-muted-foreground">Loading deal details...</div>;
    }

    if (!deal) {
        return <div className="p-8 text-center text-muted-foreground">Deal not found</div>;
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 border-b border-border pb-6">
                <Link href="/entities" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
                    <ArrowLeft className="w-4 h-4" /> Back to Entities
                </Link>

                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-3xl font-bold tracking-tight">{deal.name}</h1>
                            {deal.risk_level === "high" && (
                                <Badge variant="destructive" className="uppercase">High Risk</Badge>
                            )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                                {deal.company?.name}
                            </span>
                            <span>•</span>
                            <span>{formatCurrency(deal.value)}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline">Edit Deal</Button>
                        <Button>Move Stage</Button>
                    </div>
                </div>

                {/* Stage Progress */}
                <div className="w-full bg-muted rounded-full h-2 mt-2 overflow-hidden">
                    <div
                        className="bg-primary h-full rounded-full transition-all duration-500"
                        style={{ width: `${deal.probability}%` }}
                    />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground uppercase font-medium">
                    <span>Lead</span>
                    <span>Discovery</span>
                    <span>Proposal</span>
                    <span>Negotiation</span>
                    <span>Closed</span>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6">
                {/* Main Content */}
                <div className="col-span-8 space-y-6">
                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4">
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xs font-medium text-muted-foreground uppercase">Velocity</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-green-500" />
                                    <span className="font-bold">{deal.velocity_status?.replace("_", " ")}</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xs font-medium text-muted-foreground uppercase">Time in Stage</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-muted-foreground" />
                                    <span className="font-bold">{deal.days_in_stage} days</span>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xs font-medium text-muted-foreground uppercase">Next Action</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-muted-foreground" />
                                    <span className="font-bold truncate">{deal.next_action || "No action set"}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-border">
                        <div className="flex gap-6">
                            {["timeline", "actions", "notes", "attachments"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`pb-3 text-sm font-medium border-b-2 transition-colors capitalize ${activeTab === tab
                                            ? "border-primary text-foreground"
                                            : "border-transparent text-muted-foreground hover:text-foreground"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div className="min-h-[300px]">
                        {activeTab === "timeline" && <ActivityTimeline dealId={id} activities={deal.activities} />}
                        {activeTab === "actions" && <div className="text-muted-foreground text-sm">Required actions coming soon...</div>}
                        {activeTab === "notes" && <div className="text-muted-foreground text-sm">Notes coming soon...</div>}
                        {activeTab === "attachments" && <div className="text-muted-foreground text-sm">Attachments coming soon...</div>}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="col-span-4 space-y-6">
                    {/* Owner */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Owner</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src={deal.owner?.avatar_url} />
                                    <AvatarFallback>{deal.owner?.full_name?.charAt(0) || "U"}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-medium text-sm">{deal.owner?.full_name || "Unassigned"}</div>
                                    <div className="text-xs text-muted-foreground">{deal.owner?.email}</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Related Company */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Company</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {deal.company ? (
                                <div>
                                    <div className="font-medium text-sm">{deal.company.name}</div>
                                    <div className="text-xs text-muted-foreground">{deal.company.domain}</div>
                                </div>
                            ) : (
                                <div className="text-sm text-muted-foreground">No company linked</div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Related Contact */}
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Primary Contact</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {deal.primary_contact ? (
                                <div>
                                    <div className="font-medium text-sm">{deal.primary_contact.first_name} {deal.primary_contact.last_name}</div>
                                    <div className="text-xs text-muted-foreground">{deal.primary_contact.email}</div>
                                </div>
                            ) : (
                                <div className="text-sm text-muted-foreground">No contact linked</div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
