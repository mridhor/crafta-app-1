"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function IntegrationsSettings() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Integrations</h3>
                <p className="text-sm text-muted-foreground">
                    Connect your tools to Crafta.
                </p>
            </div>

            <div className="grid gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="space-y-1">
                            <CardTitle className="text-base">HubSpot</CardTitle>
                            <CardDescription>Sync contacts and deals.</CardDescription>
                        </div>
                        <Badge variant="outline">Connected</Badge>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" size="sm" className="w-full mt-2">Configure</Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="space-y-1">
                            <CardTitle className="text-base">Salesforce</CardTitle>
                            <CardDescription>Enterprise CRM sync.</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">Connect</Button>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <div className="space-y-1">
                            <CardTitle className="text-base">Slack</CardTitle>
                            <CardDescription>Get notifications in Slack.</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">Connect</Button>
                    </CardHeader>
                </Card>
            </div>
        </div>
    );
}
