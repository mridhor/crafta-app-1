"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export function WorkspaceSettings() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Workspace</h3>
                <p className="text-sm text-muted-foreground">
                    Manage your workspace settings.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>General</CardTitle>
                    <CardDescription>
                        Update your workspace details.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="ws-name">Workspace Name</Label>
                        <Input id="ws-name" defaultValue="Acme Corp" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="ws-slug">Workspace Slug</Label>
                        <Input id="ws-slug" defaultValue="acme-corp" disabled />
                    </div>
                    <Button>Save Changes</Button>
                </CardContent>
            </Card>
        </div>
    );
}
