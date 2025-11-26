"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Users, ExternalLink, Copy } from "lucide-react";

export function PartnerSettings() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-medium flex items-center gap-2">
                        <Users className="w-5 h-5 text-indigo-600" />
                        Partner Workspace
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Manage multiple client environments and shared templates.
                    </p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                    Add Client
                </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                    <h4 className="text-sm font-medium">Managed Clients</h4>

                    <Card>
                        <CardContent className="p-4 flex items-center justify-between">
                            <div>
                                <div className="font-medium">Acme Corp</div>
                                <div className="text-xs text-muted-foreground mt-0.5">Plan: Enterprise • Users: 12</div>
                            </div>
                            <Button variant="outline" size="sm" className="h-8">
                                Access <ExternalLink className="w-3 h-3 ml-2" />
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4 flex items-center justify-between">
                            <div>
                                <div className="font-medium">Stark Industries</div>
                                <div className="text-xs text-muted-foreground mt-0.5">Plan: Growth • Users: 5</div>
                            </div>
                            <Button variant="outline" size="sm" className="h-8">
                                Access <ExternalLink className="w-3 h-3 ml-2" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-4">
                    <h4 className="text-sm font-medium">Shared Templates</h4>

                    <Card>
                        <CardContent className="p-4 space-y-3">
                            <div className="flex items-start justify-between">
                                <div className="font-medium">SaaS B2B Routing</div>
                                <Copy className="w-3 h-3 text-muted-foreground cursor-pointer" />
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Standard routing logic for B2B SaaS companies with Enterprise/MM split.
                            </p>
                            <div className="flex gap-2">
                                <Badge variant="secondary" className="text-[10px]">Routing</Badge>
                                <Badge variant="secondary" className="text-[10px]">v1.2</Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4 space-y-3">
                            <div className="flex items-start justify-between">
                                <div className="font-medium">Strict Governance Pack</div>
                                <Copy className="w-3 h-3 text-muted-foreground cursor-pointer" />
                            </div>
                            <p className="text-xs text-muted-foreground">
                                High-security validation rules for regulated industries.
                            </p>
                            <div className="flex gap-2">
                                <Badge variant="secondary" className="text-[10px]">Governance</Badge>
                                <Badge variant="secondary" className="text-[10px]">v2.0</Badge>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
