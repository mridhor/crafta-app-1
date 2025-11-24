"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useView } from "@/components/providers/ViewContext";
import { supabase } from "@/lib/supabase";
import {
    ArrowLeft,
    Mail,
    Phone,
    Calendar,
    CheckCircle2,
    AlertCircle,
    MoreHorizontal,
    Plus,
    FileText,
    Paperclip
} from "lucide-react";
import { cn } from "@/lib/utils";

export function EntityDetailView() {
    const { setActiveView, viewParams } = useView();
    const [entity, setEntity] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    // Fetch entity details
    useEffect(() => {
        const fetchEntity = async () => {
            if (!viewParams?.id) return;
            setLoading(true);
            // Fetch from companies or contacts based on type (simplified for now)
            const { data, error } = await supabase
                .from('companies')
                .select('*')
                .eq('id', viewParams.id)
                .single();

            if (data) {
                setEntity(data);
            } else {
                // Fallback mock data if not found (or for development)
                setEntity({
                    id: viewParams.id,
                    name: "Acme Corp Expansion",
                    company: "Acme Corp",
                    contact: "John Doe",
                    value: "$50,000",
                    stage: "Negotiation",
                    risk: "High Risk",
                    riskReason: "Stalled in Negotiation. Competitor \"Globex\" mentioned in emails."
                });
            }
            setLoading(false);
        };

        fetchEntity();
    }, [viewParams]);

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

                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Entity Navigation</h3>
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
                            <div className="text-sm font-medium">Acme Corp</div>
                            <div className="text-xs text-muted-foreground">Company</div>
                        </div>
                    </Card>
                    <Card className="p-3 flex items-center gap-3 hover:bg-muted/50 cursor-pointer transition-colors">
                        <div className="w-8 h-8 rounded bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">
                            JD
                        </div>
                        <div>
                            <div className="text-sm font-medium">John Doe</div>
                            <div className="text-xs text-muted-foreground">Contact</div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );

    if (!entity) return <div className="p-8 text-center">Loading...</div>;

    return (
        <AppLayout leftSidebar={sidebar}>
            <div className="p-6 max-w-5xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{entity.name}</h1>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {entity.company}</span>
                            <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> {entity.contact}</span>
                            <span className="font-semibold text-foreground">{entity.value}</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">Edit</Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Move Stage</Button>
                    </div>
                </div>

                {/* Progress Bar */}
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

                <div className="grid grid-cols-3 gap-6">
                    {/* Main Content - Timeline */}
                    <div className="col-span-2 space-y-6">
                        <div className="flex items-center gap-2 font-semibold">
                            <Calendar className="w-4 h-4" />
                            Activity Timeline
                        </div>

                        {/* AI Summary */}
                        <Card className="bg-blue-50/50 border-blue-100 p-4">
                            <div className="flex gap-3">
                                <div className="mt-1 w-2 h-2 rounded-full bg-blue-500" />
                                <div>
                                    <h3 className="text-sm font-semibold text-blue-900 mb-1">AI Summary</h3>
                                    <p className="text-sm text-blue-800 leading-relaxed">
                                        Deal velocity has slowed in Negotiation. Last interaction was 3 days ago. Client expressed concern about implementation time in the last call.
                                    </p>
                                </div>
                            </div>
                        </Card>

                        {/* Timeline Items */}
                        <div className="space-y-4 relative pl-4 border-l border-border ml-2">
                            {/* Item 1 */}
                            <Card className="p-4 ml-4 relative">
                                <div className="absolute -left-[25px] top-4 w-3 h-3 rounded-full border-2 border-border bg-background" />
                                <div className="flex justify-between items-start mb-1">
                                    <div className="flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-muted-foreground" />
                                        <span className="font-medium text-sm">Email sent to John Doe</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">Re: Proposal for Q4</p>
                                <div className="text-xs text-muted-foreground">by Me</div>
                            </Card>

                            {/* Item 2 */}
                            <Card className="p-4 ml-4 relative">
                                <div className="absolute -left-[25px] top-4 w-3 h-3 rounded-full border-2 border-border bg-background" />
                                <div className="flex justify-between items-start mb-1">
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-muted-foreground" />
                                        <span className="font-medium text-sm">Call logged with Jane Smith</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">Yesterday</span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">Discussed pricing tiers. Client is concerned about implementation time.</p>
                                <div className="text-xs text-muted-foreground">by Me</div>
                            </Card>

                            {/* Item 3 */}
                            <Card className="p-4 ml-4 relative">
                                <div className="absolute -left-[25px] top-4 w-3 h-3 rounded-full border-2 border-green-500 bg-background" />
                                <div className="flex justify-between items-start mb-1">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                                        <span className="font-medium text-sm text-green-700">Stage changed to Negotiation</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">2 days ago</span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">Moved from Proposal</p>
                                <div className="text-xs text-muted-foreground">by System</div>
                            </Card>

                            {/* Item 4 */}
                            <Card className="p-4 ml-4 relative border-l-4 border-l-red-500">
                                <div className="absolute -left-[25px] top-4 w-3 h-3 rounded-full border-2 border-red-500 bg-background" />
                                <div className="flex justify-between items-start mb-1">
                                    <div className="flex items-center gap-2">
                                        <AlertCircle className="w-4 h-4 text-red-600" />
                                        <span className="font-medium text-sm text-red-700">Stage Drift Alert</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">3 days ago</span>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">Deal has been in Negotiation for 5 days (avg: 3 days)</p>
                                <div className="text-xs text-muted-foreground">by System</div>
                            </Card>
                        </div>
                    </div>

                    {/* Right Column - Risk & Next Steps */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-semibold mb-3">Risk Assessment</h3>
                            <Card className="p-4 bg-orange-50 border-orange-200">
                                <div className="flex items-center gap-2 mb-2 text-orange-800 font-semibold text-sm">
                                    <AlertCircle className="w-4 h-4" />
                                    {entity.risk}
                                </div>
                                <p className="text-xs text-orange-700 mb-3 leading-relaxed">
                                    {entity.riskReason}
                                </p>
                                <div className="h-1.5 bg-orange-200 rounded-full overflow-hidden">
                                    <div className="w-3/4 h-full bg-orange-500" />
                                </div>
                            </Card>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-3">Suggested Next Steps</h3>
                            <div className="space-y-2">
                                <Button variant="outline" className="w-full justify-start text-xs h-auto py-2 whitespace-normal text-left">
                                    <Mail className="w-3 h-3 mr-2 shrink-0" />
                                    Send case study on fast implementation
                                </Button>
                                <Button variant="outline" className="w-full justify-start text-xs h-auto py-2 whitespace-normal text-left">
                                    <Phone className="w-3 h-3 mr-2 shrink-0" />
                                    Schedule technical review with CTO
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
