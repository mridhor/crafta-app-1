import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Users, ExternalLink, Copy } from "lucide-react";

export function PartnerWorkspace() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-medium flex items-center gap-2">
                        <Users className="w-5 h-5 text-indigo-600" />
                        Partner Workspace
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage multiple client environments and shared templates.
                    </p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                    Add Client
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Client List */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold">Managed Clients</h3>
                    <Card className="p-4 flex items-center justify-between">
                        <div>
                            <h4 className="font-bold text-sm">Acme Corp</h4>
                            <p className="text-xs text-muted-foreground">Plan: Enterprise • Users: 12</p>
                        </div>
                        <Button variant="outline" size="sm">Access <ExternalLink className="w-3 h-3 ml-1" /></Button>
                    </Card>
                    <Card className="p-4 flex items-center justify-between">
                        <div>
                            <h4 className="font-bold text-sm">Stark Industries</h4>
                            <p className="text-xs text-muted-foreground">Plan: Growth • Users: 5</p>
                        </div>
                        <Button variant="outline" size="sm">Access <ExternalLink className="w-3 h-3 ml-1" /></Button>
                    </Card>
                </div>

                {/* Templates */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold">Shared Templates</h3>
                    <Card className="p-4">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-sm">SaaS B2B Routing</h4>
                            <Button variant="ghost" size="icon" className="h-6 w-6"><Copy className="w-3 h-3" /></Button>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">Standard routing logic for B2B SaaS companies with Enterprise/MM split.</p>
                        <div className="flex gap-2">
                            <span className="px-2 py-0.5 bg-muted rounded text-[10px] font-medium">Routing</span>
                            <span className="px-2 py-0.5 bg-muted rounded text-[10px] font-medium">v1.2</span>
                        </div>
                    </Card>
                    <Card className="p-4">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-sm">Strict Governance Pack</h4>
                            <Button variant="ghost" size="icon" className="h-6 w-6"><Copy className="w-3 h-3" /></Button>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">High-security validation rules for regulated industries.</p>
                        <div className="flex gap-2">
                            <span className="px-2 py-0.5 bg-muted rounded text-[10px] font-medium">Governance</span>
                            <span className="px-2 py-0.5 bg-muted rounded text-[10px] font-medium">v2.0</span>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
