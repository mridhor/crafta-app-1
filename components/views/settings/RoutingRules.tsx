import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { GitBranch, Plus, Trash2, GripVertical, ArrowRight } from "lucide-react";

export function RoutingRules() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-medium flex items-center gap-2">
                        <GitBranch className="w-5 h-5 text-purple-600" />
                        Routing Rules
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Define how inbound leads or updates get distributed to reps, teams, or workflows.
                    </p>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Plus className="w-4 h-4 mr-2" /> Add Rule
                </Button>
            </div>

            <div className="space-y-4">
                {/* Rule 1 */}
                <Card className="p-4 border-l-4 border-l-purple-500">
                    <div className="flex items-start gap-4">
                        <div className="mt-2 text-muted-foreground cursor-move"><GripVertical className="w-4 h-4" /></div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-medium text-sm">Enterprise North America</h3>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-bold uppercase">Active</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6"><Trash2 className="w-3 h-3 text-muted-foreground" /></Button>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-sm bg-muted/30 p-3 rounded-md">
                                <div className="flex items-center gap-2">
                                    <span className="font-mono text-xs bg-background border px-1.5 py-0.5 rounded">company.size</span>
                                    <span className="text-muted-foreground">></span>
                                    <span className="font-bold">1000</span>
                                </div>
                                <span className="text-xs font-bold text-muted-foreground uppercase">AND</span>
                                <div className="flex items-center gap-2">
                                    <span className="font-mono text-xs bg-background border px-1.5 py-0.5 rounded">contact.region</span>
                                    <span className="text-muted-foreground">=</span>
                                    <span className="font-bold">"NA"</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-muted-foreground mx-2" />
                                <div className="flex items-center gap-2">
                                    <span className="text-muted-foreground">Assign to:</span>
                                    <span className="font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-100">Enterprise Team</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Rule 2 */}
                <Card className="p-4 border-l-4 border-l-blue-500">
                    <div className="flex items-start gap-4">
                        <div className="mt-2 text-muted-foreground cursor-move"><GripVertical className="w-4 h-4" /></div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-medium text-sm">Mid-Market General</h3>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-[10px] font-bold uppercase">Active</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6"><Trash2 className="w-3 h-3 text-muted-foreground" /></Button>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-sm bg-muted/30 p-3 rounded-md">
                                <div className="flex items-center gap-2">
                                    <span className="font-mono text-xs bg-background border px-1.5 py-0.5 rounded">deal.value</span>
                                    <span className="text-muted-foreground">BETWEEN</span>
                                    <span className="font-bold">10k - 50k</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-muted-foreground mx-2" />
                                <div className="flex items-center gap-2">
                                    <span className="text-muted-foreground">Round Robin:</span>
                                    <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">MM Reps</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Rule 3 */}
                <Card className="p-4 border-l-4 border-l-gray-300">
                    <div className="flex items-start gap-4">
                        <div className="mt-2 text-muted-foreground cursor-move"><GripVertical className="w-4 h-4" /></div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-medium text-sm">Fallback / Unqualified</h3>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px] font-bold uppercase">Default</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 text-sm bg-muted/30 p-3 rounded-md">
                                <span className="italic text-muted-foreground">All other records</span>
                                <ArrowRight className="w-4 h-4 text-muted-foreground mx-2" />
                                <div className="flex items-center gap-2">
                                    <span className="text-muted-foreground">Send to:</span>
                                    <span className="font-bold text-gray-700 bg-gray-50 px-2 py-0.5 rounded border border-gray-200">SDR Queue</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
