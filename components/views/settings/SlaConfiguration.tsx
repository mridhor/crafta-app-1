import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Clock, Bell, AlertTriangle } from "lucide-react";

export function SlaConfiguration() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-medium flex items-center gap-2">
                        <Clock className="w-5 h-5 text-orange-600" />
                        SLA Configuration
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Guarantee response speed and follow-up rhythm with strict time thresholds.
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                {/* SLA 1 */}
                <Card className="p-5">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h3 className="font-bold text-sm">Inbound Lead Response</h3>
                            <p className="text-xs text-muted-foreground">Time to first action for new web leads</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-bold uppercase">Active</span>
                            <Button variant="outline" size="sm" className="h-7 text-xs">Edit</Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="p-3 bg-muted/30 rounded-md text-center">
                            <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Target</div>
                            <div className="text-lg font-bold text-green-600">15 min</div>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-md text-center">
                            <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Warning</div>
                            <div className="text-lg font-bold text-orange-500">30 min</div>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-md text-center">
                            <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Breach</div>
                            <div className="text-lg font-bold text-red-600">60 min</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground border-t border-border pt-3">
                        <div className="flex items-center gap-1">
                            <Bell className="w-3 h-3" /> Notify Manager on Breach
                        </div>
                        <div className="flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> Re-route on Breach
                        </div>
                    </div>
                </Card>

                {/* SLA 2 */}
                <Card className="p-5">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h3 className="font-bold text-sm">Ongoing Deal Cadence</h3>
                            <p className="text-xs text-muted-foreground">Maximum gap between activities for active deals</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-bold uppercase">Active</span>
                            <Button variant="outline" size="sm" className="h-7 text-xs">Edit</Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="p-3 bg-muted/30 rounded-md text-center">
                            <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Target</div>
                            <div className="text-lg font-bold text-green-600">3 Days</div>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-md text-center">
                            <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Warning</div>
                            <div className="text-lg font-bold text-orange-500">5 Days</div>
                        </div>
                        <div className="p-3 bg-muted/30 rounded-md text-center">
                            <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Breach</div>
                            <div className="text-lg font-bold text-red-600">7 Days</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground border-t border-border pt-3">
                        <div className="flex items-center gap-1">
                            <Bell className="w-3 h-3" /> Notify Rep on Warning
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
