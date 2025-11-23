import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Globe, RefreshCw, CheckCircle, AlertCircle, Power } from "lucide-react";

export function Integrations() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-medium flex items-center gap-2">
                        <Globe className="w-5 h-5 text-blue-500" />
                        Integrations
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Connect Crafta to external systems with minimal friction.
                    </p>
                </div>
                <Button variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" /> Refresh Status
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {/* HubSpot */}
                <Card className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#ff7a59] rounded-lg flex items-center justify-center text-white font-bold text-xl">HS</div>
                        <div>
                            <h3 className="font-bold text-sm">HubSpot CRM</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="flex items-center gap-1 text-xs text-green-600 font-medium"><CheckCircle className="w-3 h-3" /> Connected</span>
                                <span className="text-xs text-muted-foreground">• Last sync: 2 min ago</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm">Configure</Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">Disconnect</Button>
                    </div>
                </Card>

                {/* Salesforce */}
                <Card className="p-5 flex items-center justify-between opacity-75">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#00a1e0] rounded-lg flex items-center justify-center text-white font-bold text-xl">SF</div>
                        <div>
                            <h3 className="font-bold text-sm">Salesforce</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="flex items-center gap-1 text-xs text-muted-foreground font-medium"><Power className="w-3 h-3" /> Disconnected</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700">Connect</Button>
                    </div>
                </Card>

                {/* Email */}
                <Card className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center text-white font-bold text-xl">@</div>
                        <div>
                            <h3 className="font-bold text-sm">Email Ingestion (IMAP/SMTP)</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="flex items-center gap-1 text-xs text-green-600 font-medium"><CheckCircle className="w-3 h-3" /> Active</span>
                                <span className="text-xs text-muted-foreground">• Monitoring 3 inboxes</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm">Manage Inboxes</Button>
                    </div>
                </Card>

                {/* Webhooks */}
                <Card className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">WH</div>
                        <div>
                            <h3 className="font-bold text-sm">Webhooks API</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="flex items-center gap-1 text-xs text-green-600 font-medium"><CheckCircle className="w-3 h-3" /> Active</span>
                                <span className="text-xs text-muted-foreground">• 12 endpoints configured</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" size="sm">View Endpoints</Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
