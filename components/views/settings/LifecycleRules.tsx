import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Activity, Clock, AlertCircle, ArrowRight } from "lucide-react";

export function LifecycleRules() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-medium flex items-center gap-2">
                        <Activity className="w-5 h-5 text-green-600" />
                        Lifecycle Rules
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Define standardized lifecycle stages, time expectations, and risk thresholds.
                    </p>
                </div>
                <Button variant="outline">
                    Edit Stages
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Stage 1 */}
                <Card className="p-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-sm">Discovery</h3>
                        <span className="text-xs font-mono text-muted-foreground">Stage 1</span>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> Max Time</span>
                            <span className="font-medium">5 Days</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Stale Alert</span>
                            <span className="font-medium text-orange-600">After 3 Days</span>
                        </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border">
                        <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Exit Criteria</p>
                        <ul className="text-xs space-y-1 list-disc list-inside text-foreground">
                            <li>Budget Confirmed</li>
                            <li>Decision Maker Identified</li>
                        </ul>
                    </div>
                </Card>

                {/* Stage 2 */}
                <Card className="p-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-sm">Proposal</h3>
                        <span className="text-xs font-mono text-muted-foreground">Stage 2</span>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> Max Time</span>
                            <span className="font-medium">7 Days</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Stale Alert</span>
                            <span className="font-medium text-orange-600">After 4 Days</span>
                        </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border">
                        <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Exit Criteria</p>
                        <ul className="text-xs space-y-1 list-disc list-inside text-foreground">
                            <li>Proposal Sent</li>
                            <li>Pricing Approved</li>
                        </ul>
                    </div>
                </Card>

                {/* Stage 3 */}
                <Card className="p-4 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-purple-500" />
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="font-bold text-sm">Negotiation</h3>
                        <span className="text-xs font-mono text-muted-foreground">Stage 3</span>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> Max Time</span>
                            <span className="font-medium">10 Days</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Stale Alert</span>
                            <span className="font-medium text-orange-600">After 5 Days</span>
                        </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-border">
                        <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Exit Criteria</p>
                        <ul className="text-xs space-y-1 list-disc list-inside text-foreground">
                            <li>Contract Signed</li>
                            <li>Legal Approved</li>
                        </ul>
                    </div>
                </Card>
            </div>

            <Card className="p-4 bg-muted/30">
                <h3 className="text-sm font-bold mb-2">Transition Rules</h3>
                <div className="space-y-2">
                    <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <span>Backward movement requires <strong>Manager Approval</strong></span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span>Skipping stages is <strong>Allowed</strong> with reason code</span>
                    </div>
                </div>
            </Card>
        </div>
    );
}
