import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { FileText, Search, Filter, Download } from "lucide-react";

export function AuditLog() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-medium flex items-center gap-2">
                        <FileText className="w-5 h-5 text-gray-600" />
                        Audit Log
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                        Every action becomes traceable and explainable.
                    </p>
                </div>
                <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" /> Export CSV
                </Button>
            </div>

            <div className="flex gap-2 mb-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search by entity, user, or action..."
                        className="w-full h-9 pl-9 pr-4 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                </div>
                <Button variant="outline" className="h-9"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
            </div>

            <Card className="overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground font-medium">
                        <tr>
                            <th className="px-4 py-3">Timestamp</th>
                            <th className="px-4 py-3">Actor</th>
                            <th className="px-4 py-3">Action</th>
                            <th className="px-4 py-3">Entity</th>
                            <th className="px-4 py-3">Details</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        <tr>
                            <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">Oct 24, 10:42 AM</td>
                            <td className="px-4 py-3 font-medium flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">AI</div>
                                Auditor
                            </td>
                            <td className="px-4 py-3"><span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs font-bold">Quarantine</span></td>
                            <td className="px-4 py-3 text-blue-600">Lead: Acme Corp</td>
                            <td className="px-4 py-3 text-muted-foreground truncate max-w-xs">Missing required field: {"'Industry'"}</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">Oct 24, 10:30 AM</td>
                            <td className="px-4 py-3 font-medium flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-[10px] font-bold">JD</div>
                                Jane Doe
                            </td>
                            <td className="px-4 py-3"><span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-bold">Update</span></td>
                            <td className="px-4 py-3 text-blue-600">Deal: Project X</td>
                            <td className="px-4 py-3 text-muted-foreground truncate max-w-xs">Changed stage from Discovery to Proposal</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">Oct 24, 09:15 AM</td>
                            <td className="px-4 py-3 font-medium flex items-center gap-2">
                                <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-[10px] font-bold">SY</div>
                                System
                            </td>
                            <td className="px-4 py-3"><span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-bold">Sync</span></td>
                            <td className="px-4 py-3 text-blue-600">HubSpot</td>
                            <td className="px-4 py-3 text-muted-foreground truncate max-w-xs">Batch sync completed (150 records)</td>
                        </tr>
                    </tbody>
                </table>
            </Card>
        </div>
    );
}
