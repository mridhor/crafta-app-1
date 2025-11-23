import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Mail, Phone, CheckCircle, AlertCircle, User, Building, Calendar, FileText, ArrowUpRight, TrendingUp } from "lucide-react";

export function EntityDetailView() {
    const sidebar = (
        <div className="p-4 space-y-6">
            <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Entity Navigation</h3>
                <div className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start text-sm bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
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
                </div>
            </div>

            <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Related Records</h3>
                <div className="space-y-2">
                    <Card className="p-3 flex items-center gap-3 cursor-pointer hover:bg-muted/50">
                        <div className="w-8 h-8 rounded bg-purple-100 text-purple-600 flex items-center justify-center text-xs font-bold">AC</div>
                        <div>
                            <div className="text-sm font-medium">Acme Corp</div>
                            <div className="text-xs text-muted-foreground">Company</div>
                        </div>
                    </Card>
                    <Card className="p-3 flex items-center gap-3 cursor-pointer hover:bg-muted/50">
                        <div className="w-8 h-8 rounded bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold">JD</div>
                        <div>
                            <div className="text-sm font-medium">John Doe</div>
                            <div className="text-xs text-muted-foreground">Contact</div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );

    return (
        <AppLayout leftSidebar={sidebar}>
            <div className="flex h-full">
                <div className="flex-1 p-8 overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold">Acme Corp Expansion</h1>
                            <div className="flex items-center gap-3 mt-1">
                                <span className="text-sm text-muted-foreground flex items-center gap-1"><Building className="w-3 h-3" /> Acme Corp</span>
                                <span className="text-sm text-muted-foreground flex items-center gap-1"><User className="w-3 h-3" /> John Doe</span>
                                <span className="text-sm font-medium">$50,000</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline">Edit</Button>
                            <Button variant="default" className="bg-blue-600 hover:bg-blue-700">Move Stage</Button>
                        </div>
                    </div>

                    {/* Stage Progress Bar */}
                    <div className="mb-8">
                        <div className="flex items-center gap-1 mb-2">
                            <div className="h-2 flex-1 bg-green-500 rounded-full"></div>
                            <div className="h-2 flex-1 bg-green-500 rounded-full"></div>
                            <div className="h-2 flex-1 bg-green-500 rounded-full"></div>
                            <div className="h-2 flex-1 bg-blue-600 rounded-full relative">
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-white border-2 border-blue-600 rounded-full" />
                            </div>
                            <div className="h-2 flex-1 bg-gray-200 dark:bg-gray-800 rounded-full"></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground px-1">
                            <span>Lead</span>
                            <span>Discovery</span>
                            <span>Proposal</span>
                            <span className="text-blue-600 font-bold">Negotiation</span>
                            <span>Closed</span>
                        </div>
                    </div>

                    {/* Activity Timeline */}
                    <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Activity Timeline
                    </h3>
                    <div className="space-y-6 relative pl-4 border-l border-border ml-2">

                        {/* AI Summary of Timeline */}
                        <div className="relative pl-6">
                            <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-blue-100 dark:ring-blue-900/30"></div>
                            <Card className="p-4 bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-900">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2 font-bold text-sm text-blue-700 dark:text-blue-300">
                                        <TrendingUp className="w-4 h-4" /> AI Summary
                                    </div>
                                </div>
                                <p className="text-sm text-foreground">
                                    Deal velocity has slowed in Negotiation. Last interaction was 3 days ago. Client expressed concern about implementation time in the last call.
                                </p>
                            </Card>
                        </div>

                        {/* Item 1 */}
                        <div className="relative pl-6">
                            <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-gray-400 bg-background"></div>
                            <Card className="p-4">
                                <div className="flex justify-between items-start mb-1">
                                    <div className="flex items-center gap-2 font-medium text-sm">
                                        <Mail className="w-4 h-4 text-muted-foreground" />
                                        Email sent to John Doe
                                    </div>
                                    <span className="text-xs text-muted-foreground">2 hours ago</span>
                                </div>
                                <p className="text-sm text-foreground mb-1">Re: Proposal for Q4</p>
                                <p className="text-xs text-muted-foreground">by Me</p>
                            </Card>
                        </div>

                        {/* Item 2 */}
                        <div className="relative pl-6">
                            <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-gray-400 bg-background"></div>
                            <Card className="p-4">
                                <div className="flex justify-between items-start mb-1">
                                    <div className="flex items-center gap-2 font-medium text-sm">
                                        <Phone className="w-4 h-4 text-muted-foreground" />
                                        Call logged with Jane Smith
                                    </div>
                                    <span className="text-xs text-muted-foreground">Yesterday</span>
                                </div>
                                <p className="text-sm text-foreground mb-1">Discussed pricing tiers. Client is concerned about implementation time.</p>
                                <p className="text-xs text-muted-foreground">by Me</p>
                            </Card>
                        </div>

                        {/* Item 3 */}
                        <div className="relative pl-6">
                            <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-green-500 bg-background"></div>
                            <Card className="p-4">
                                <div className="flex justify-between items-start mb-1">
                                    <div className="flex items-center gap-2 font-medium text-sm text-green-700">
                                        <CheckCircle className="w-4 h-4" />
                                        Stage changed to Negotiation
                                    </div>
                                    <span className="text-xs text-muted-foreground">2 days ago</span>
                                </div>
                                <p className="text-sm text-foreground mb-1">Moved from Proposal</p>
                                <p className="text-xs text-muted-foreground">by System</p>
                            </Card>
                        </div>

                        {/* Item 4 */}
                        <div className="relative pl-6">
                            <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-red-500 bg-background"></div>
                            <Card className="p-4 border-l-4 border-l-red-500">
                                <div className="flex justify-between items-start mb-1">
                                    <div className="flex items-center gap-2 font-medium text-sm text-red-600">
                                        <AlertCircle className="w-4 h-4" />
                                        Stage Drift Alert
                                    </div>
                                    <span className="text-xs text-muted-foreground">3 days ago</span>
                                </div>
                                <p className="text-sm text-foreground mb-1">Deal has been in Negotiation for 5 days (avg: 3 days)</p>
                                <p className="text-xs text-muted-foreground">by System</p>
                            </Card>
                        </div>

                        {/* Item 5 */}
                        <div className="relative pl-6">
                            <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-gray-300 bg-background"></div>
                            <div className="text-xs text-muted-foreground py-2">
                                Created on Nov 10, 2025 by System (Inbound)
                            </div>
                        </div>

                    </div>
                </div>

                {/* Right Panel - Specific to Entity */}
                <div className="w-80 border-l border-border bg-background p-4 hidden xl:block">
                    <h3 className="text-sm font-bold mb-4">Risk Assessment</h3>

                    <Card className="p-4 mb-4 border-orange-200 bg-orange-50 dark:bg-orange-900/10">
                        <div className="flex items-center gap-2 mb-2 text-orange-700 dark:text-orange-300 font-medium text-sm">
                            <AlertCircle className="w-4 h-4" /> High Risk
                        </div>
                        <p className="text-xs text-orange-800 dark:text-orange-200 mb-2">
                            Stalled in Negotiation. Competitor "Globex" mentioned in emails.
                        </p>
                        <div className="w-full h-1.5 bg-orange-200 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-500 w-[75%]" />
                        </div>
                    </Card>

                    <h3 className="text-sm font-bold mb-4 mt-6">Suggested Next Steps</h3>
                    <div className="space-y-3">
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
        </AppLayout>
    );
}
