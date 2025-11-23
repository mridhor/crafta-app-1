import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Database, ArrowRight, Check, AlertTriangle } from "lucide-react";

export function CrioMapping() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-medium flex items-center gap-2">
                        <Database className="w-5 h-5 text-blue-600" />
                        CRIO Schema Mapping
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Central schema map that harmonizes all entities across CRM, forms, and APIs.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">Download Schema</Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">Auto-Map Fields</Button>
                </div>
            </div>

            <Card className="p-0 overflow-hidden border-border">
                <div className="bg-muted/50 px-6 py-3 border-b border-border flex text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <div className="flex-1">Source Field</div>
                    <div className="w-8 flex justify-center"></div>
                    <div className="flex-1">CRIO Field</div>
                    <div className="w-32">Status</div>
                    <div className="w-24">Action</div>
                </div>

                <div className="divide-y divide-border">
                    {/* Row 1 */}
                    <div className="px-6 py-4 flex items-center hover:bg-muted/20">
                        <div className="flex-1 font-mono text-sm">hubspot.deal_amount</div>
                        <div className="w-8 flex justify-center text-muted-foreground"><ArrowRight className="w-4 h-4" /></div>
                        <div className="flex-1 font-mono text-sm text-blue-600">deal.value</div>
                        <div className="w-32 flex items-center gap-1.5 text-green-600 text-xs font-medium">
                            <Check className="w-3 h-3" /> Mapped
                        </div>
                        <div className="w-24"><Button variant="ghost" size="sm" className="h-7 text-xs">Edit</Button></div>
                    </div>

                    {/* Row 2 */}
                    <div className="px-6 py-4 flex items-center hover:bg-muted/20">
                        <div className="flex-1 font-mono text-sm">salesforce.CloseDate</div>
                        <div className="w-8 flex justify-center text-muted-foreground"><ArrowRight className="w-4 h-4" /></div>
                        <div className="flex-1 font-mono text-sm text-blue-600">deal.close_date_est</div>
                        <div className="w-32 flex items-center gap-1.5 text-green-600 text-xs font-medium">
                            <Check className="w-3 h-3" /> Mapped
                        </div>
                        <div className="w-24"><Button variant="ghost" size="sm" className="h-7 text-xs">Edit</Button></div>
                    </div>

                    {/* Row 3 */}
                    <div className="px-6 py-4 flex items-center hover:bg-muted/20 bg-orange-50/30 dark:bg-orange-900/10">
                        <div className="flex-1 font-mono text-sm">webform.custom_q3</div>
                        <div className="w-8 flex justify-center text-muted-foreground"><ArrowRight className="w-4 h-4" /></div>
                        <div className="flex-1 font-mono text-sm text-muted-foreground italic">Unmapped</div>
                        <div className="w-32 flex items-center gap-1.5 text-orange-600 text-xs font-medium">
                            <AlertTriangle className="w-3 h-3" /> Missing
                        </div>
                        <div className="w-24"><Button variant="outline" size="sm" className="h-7 text-xs">Map Now</Button></div>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-2 gap-6">
                <Card className="p-4">
                    <h3 className="text-sm font-semibold mb-2">AI Mapping Suggestions</h3>
                    <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-100 dark:border-blue-900">
                            <div className="mt-0.5 text-blue-600"><Database className="w-4 h-4" /></div>
                            <div>
                                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Map {"\"contact_phone\" to \"contact.phone\""}</p>
                                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">Confidence: 98% based on data patterns.</p>
                                <div className="flex gap-2 mt-2">
                                    <Button size="sm" className="h-6 text-xs bg-blue-600 text-white hover:bg-blue-700">Accept</Button>
                                    <Button size="sm" variant="ghost" className="h-6 text-xs hover:bg-blue-100 dark:hover:bg-blue-800">Ignore</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <Card className="p-4">
                    <h3 className="text-sm font-semibold mb-2">Schema Health</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-muted-foreground">Mapped Fields</span>
                                <span className="font-medium">42/45</span>
                            </div>
                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 w-[93%]" />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-muted-foreground">Data Type Conflicts</span>
                                <span className="font-medium text-orange-600">1 Detected</span>
                            </div>
                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                <div className="h-full bg-orange-500 w-[10%]" />
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
