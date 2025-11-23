import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Code, Key, Copy, Eye, EyeOff } from "lucide-react";

export function EnvironmentKeys() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-medium flex items-center gap-2">
                        <Code className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                        Environment & API Keys
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Manage API keys and webhook endpoints.
                    </p>
                </div>
                <Button variant="default">
                    Generate New Key
                </Button>
            </div>

            <div className="space-y-6">
                {/* API Keys */}
                <div>
                    <h3 className="text-sm font-bold mb-3">Active API Keys</h3>
                    <Card className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Key className="w-4 h-4 text-muted-foreground" />
                                <span className="font-mono text-sm font-bold">Production Key 1</span>
                            </div>
                            <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100">Active</span>
                        </div>
                        <div className="flex items-center gap-2 bg-muted/50 p-2 rounded border border-border mb-2">
                            <code className="text-xs flex-1 font-mono">sk_live_51Mz...92xY</code>
                            <Button variant="ghost" size="icon" className="h-6 w-6"><Eye className="w-3 h-3" /></Button>
                            <Button variant="ghost" size="icon" className="h-6 w-6"><Copy className="w-3 h-3" /></Button>
                        </div>
                        <p className="text-xs text-muted-foreground">Created on Oct 1, 2025 • Last used today</p>
                    </Card>
                </div>

                {/* Webhooks */}
                <div>
                    <h3 className="text-sm font-bold mb-3">Webhook Endpoints</h3>
                    <Card className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="font-bold text-sm">Inbound Form Handler</span>
                            <Button variant="outline" size="sm" className="h-7 text-xs">Test</Button>
                        </div>
                        <div className="flex items-center gap-2 bg-muted/50 p-2 rounded border border-border mb-2">
                            <code className="text-xs flex-1 font-mono">https://api.crafta.com/v1/hooks/form-inbound</code>
                            <Button variant="ghost" size="icon" className="h-6 w-6"><Copy className="w-3 h-3" /></Button>
                        </div>
                        <div className="flex gap-2">
                            <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">form.submit</span>
                            <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">lead.create</span>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
