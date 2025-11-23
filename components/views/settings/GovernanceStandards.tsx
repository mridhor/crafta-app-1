import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Lock, ShieldAlert, Plus, Trash2 } from "lucide-react";

export function GovernanceStandards() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-medium flex items-center gap-2">
                        <Lock className="w-5 h-5 text-red-600" />
                        Governance Standards
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Define non-negotiable rules for data hygiene and safety.
                    </p>
                </div>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                    <Plus className="w-4 h-4 mr-2" /> Add Rule
                </Button>
            </div>

            <div className="space-y-4">
                {/* Rule 1 */}
                <Card className="p-4 border-l-4 border-l-red-500">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-sm flex items-center gap-2">
                                <ShieldAlert className="w-4 h-4 text-red-500" />
                                Mandatory Enrichment
                            </h3>
                            <p className="text-sm mt-1">Company must have <strong>Industry</strong> + <strong>Size</strong> before routing.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-[10px] font-bold uppercase">Strict Block</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6"><Trash2 className="w-3 h-3 text-muted-foreground" /></Button>
                        </div>
                    </div>
                </Card>

                {/* Rule 2 */}
                <Card className="p-4 border-l-4 border-l-orange-500">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-sm flex items-center gap-2">
                                <ShieldAlert className="w-4 h-4 text-orange-500" />
                                Email Domain Validation
                            </h3>
                            <p className="text-sm mt-1">Reject leads with <strong>@gmail.com</strong> or <strong>@yahoo.com</strong> addresses.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-[10px] font-bold uppercase">Quarantine</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6"><Trash2 className="w-3 h-3 text-muted-foreground" /></Button>
                        </div>
                    </div>
                </Card>

                {/* Rule 3 */}
                <Card className="p-4 border-l-4 border-l-blue-500">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-sm flex items-center gap-2">
                                <ShieldAlert className="w-4 h-4 text-blue-500" />
                                Duplicate Check
                            </h3>
                            <p className="text-sm mt-1">Flag if <strong>Email</strong> or <strong>Phone</strong> matches existing record.</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[10px] font-bold uppercase">Merge Suggestion</span>
                            <Button variant="ghost" size="icon" className="h-6 w-6"><Trash2 className="w-3 h-3 text-muted-foreground" /></Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
