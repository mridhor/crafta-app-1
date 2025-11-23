"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { supabase } from "@/lib/supabase";
import {
    ShieldAlert,
    CheckCircle2,
    AlertTriangle,
    XCircle,
    Filter,
    ArrowRight,
    RefreshCw,
    FileJson,
    Wand2,
    Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data for Convert Hub (Fallback)
const initialItems = [
    { id: 1, source: "Webform", submitted: "2 min ago", status: "quarantined", issues: 2, confidence: 45, owner: "System", data: { name: "John Doe", email: "john@gmail.com", company: "Unknown" } },
    { id: 2, source: "HubSpot", submitted: "15 min ago", status: "warning", issues: 1, confidence: 88, owner: "System", data: { name: "Jane Smith", email: "jane@acme.com", company: "Acme Corp" } },
    { id: 3, source: "API", submitted: "1 hour ago", status: "rejected", issues: 3, confidence: 12, owner: "System", data: { name: "Spam Bot", email: "bot@spam.com", company: "N/A" } },
    { id: 4, source: "Salesforce", submitted: "2 hours ago", status: "approved", issues: 0, confidence: 99, owner: "System", data: { name: "Alice Wonder", email: "alice@wonder.com", company: "Wonder Inc" } },
];

export function ConvertView() {
    const [activeQueue, setActiveQueue] = useState("quarantine"); // quarantine, warning, rejected, approved
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [items, setItems] = useState<any[]>(initialItems);
    const [loading, setLoading] = useState(false);

    // Fetch from Supabase 'inbound_leads_raw'
    useEffect(() => {
        const fetchLeads = async () => {
            setLoading(true);
            // Map 'quarantine' queue to 'received' or specific status in DB
            let statusFilter = 'received';
            if (activeQueue === 'approved') statusFilter = 'processed';
            if (activeQueue === 'rejected') statusFilter = 'rejected';

            const { data, error } = await supabase
                .from('inbound_leads_raw')
                .select('*')
                .eq('status', statusFilter)
                .order('received_at', { ascending: false });

            if (data && data.length > 0) {
                const mappedItems = data.map((lead: any) => ({
                    id: lead.id,
                    source: lead.source || "Unknown",
                    submitted: new Date(lead.received_at).toLocaleTimeString(),
                    status: activeQueue === 'quarantine' ? 'quarantined' : activeQueue, // Map DB status to UI status
                    issues: 0, // Need validation logic to populate this
                    confidence: 0, // Need validation logic
                    owner: "System",
                    data: lead.payload
                }));
                setItems(mappedItems);
            }
            setLoading(false);
        };

        fetchLeads();
    }, [activeQueue]);

    const filteredItems = items; // Already filtered by query

    const handleAutoFix = (id: number) => {
        // Mock auto-fix logic
        setItems(items.map(item => item.id === id ? { ...item, status: "approved", issues: 0, confidence: 95 } : item));
        setSelectedItem(null);
    };

    const sidebar = (
        <div className="p-4 space-y-6">
            <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Intake Queues</h3>
                <nav className="space-y-1">
                    <Button
                        variant="ghost"
                        className={cn("w-full justify-start text-sm", activeQueue === "quarantine" && "bg-secondary font-medium")}
                        onClick={() => setActiveQueue("quarantine")}
                    >
                        <ShieldAlert className="w-4 h-4 mr-3 text-red-500" />
                        Quarantine
                        <span className="ml-auto text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">1</span>
                    </Button>
                    <Button
                        variant="ghost"
                        className={cn("w-full justify-start text-sm", activeQueue === "warning" && "bg-secondary font-medium")}
                        onClick={() => setActiveQueue("warning")}
                    >
                        <AlertTriangle className="w-4 h-4 mr-3 text-orange-500" />
                        Warnings
                        <span className="ml-auto text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">1</span>
                    </Button>
                    <Button
                        variant="ghost"
                        className={cn("w-full justify-start text-sm", activeQueue === "rejected" && "bg-secondary font-medium")}
                        onClick={() => setActiveQueue("rejected")}
                    >
                        <XCircle className="w-4 h-4 mr-3 text-gray-500" />
                        Rejected
                        <span className="ml-auto text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">1</span>
                    </Button>
                    <Button
                        variant="ghost"
                        className={cn("w-full justify-start text-sm", activeQueue === "approved" && "bg-secondary font-medium")}
                        onClick={() => setActiveQueue("approved")}
                    >
                        <CheckCircle2 className="w-4 h-4 mr-3 text-green-500" />
                        Approved
                        <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">1</span>
                    </Button>
                </nav>
            </div>

            <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Source Filter</h3>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                        <span>Webforms</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                        <span>HubSpot</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                        <span>API</span>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <AppLayout leftSidebar={sidebar}>
            <div className="flex h-full">
                {/* Main List Area */}
                <div className="flex-1 p-6 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Convert Intake Hub</h1>
                            <p className="text-muted-foreground">Data firewall and CRIO validation layer.</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Re-run Validation
                            </Button>
                        </div>
                    </div>

                    <Card className="flex-1 overflow-hidden flex flex-col">
                        <div className="bg-muted/50 px-6 py-3 border-b border-border flex text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            <div className="w-32">Source</div>
                            <div className="w-32">Submitted</div>
                            <div className="w-32">Status</div>
                            <div className="flex-1">Data Preview</div>
                            <div className="w-24 text-center">Issues</div>
                            <div className="w-24 text-center">Confidence</div>
                            <div className="w-24">Action</div>
                        </div>

                        <div className="divide-y divide-border overflow-y-auto">
                            {loading && items.length === 0 ? (
                                <div className="p-6 text-center text-muted-foreground">Loading leads...</div>
                            ) : filteredItems.map((item) => (
                                <div
                                    key={item.id}
                                    className={cn(
                                        "px-6 py-4 flex items-center hover:bg-muted/20 cursor-pointer transition-colors",
                                        selectedItem?.id === item.id ? "bg-blue-50 dark:bg-blue-900/10" : ""
                                    )}
                                    onClick={() => setSelectedItem(item)}
                                >
                                    <div className="w-32 font-medium text-sm">{item.source}</div>
                                    <div className="w-32 text-sm text-muted-foreground">{item.submitted}</div>
                                    <div className="w-32">
                                        <span className={cn(
                                            "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                                            item.status === "quarantined" ? "bg-red-100 text-red-700" :
                                                item.status === "warning" ? "bg-orange-100 text-orange-700" :
                                                    item.status === "rejected" ? "bg-gray-100 text-gray-700" :
                                                        "bg-green-100 text-green-700"
                                        )}>
                                            {item.status}
                                        </span>
                                    </div>
                                    <div className="flex-1 text-sm truncate pr-4">
                                        <span className="font-medium">{item.data.email}</span> • {item.data.company}
                                    </div>
                                    <div className="w-24 text-center">
                                        {item.issues > 0 ? (
                                            <span className="text-red-600 font-bold text-sm">{item.issues}</span>
                                        ) : (
                                            <span className="text-green-600 text-sm">-</span>
                                        )}
                                    </div>
                                    <div className="w-24 text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <span className={cn(
                                                "text-sm font-bold",
                                                item.confidence < 50 ? "text-red-600" :
                                                    item.confidence < 80 ? "text-orange-600" :
                                                        "text-green-600"
                                            )}>{item.confidence}%</span>
                                        </div>
                                    </div>
                                    <div className="w-24">
                                        <Button variant="ghost" size="sm" className="h-7 text-xs">Review</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Validation Detail Drawer */}
                {selectedItem && (
                    <div className="w-[450px] border-l border-border bg-background flex flex-col animate-in slide-in-from-right duration-300 shadow-xl z-20">
                        <div className="p-4 border-b border-border flex justify-between items-center bg-muted/10">
                            <h3 className="font-bold flex items-center gap-2">
                                <FileJson className="w-4 h-4 text-blue-500" />
                                Validation Detail
                            </h3>
                            <Button variant="ghost" size="icon" onClick={() => setSelectedItem(null)}>
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-6">
                            {/* Raw Input */}
                            <div>
                                <h4 className="text-xs font-bold text-muted-foreground uppercase mb-2">Raw Input</h4>
                                <div className="bg-muted p-3 rounded-md font-mono text-xs overflow-x-auto">
                                    <pre>{JSON.stringify(selectedItem.data, null, 2)}</pre>
                                </div>
                            </div>

                            {/* Issues List */}
                            {selectedItem.issues > 0 && (
                                <div>
                                    <h4 className="text-xs font-bold text-muted-foreground uppercase mb-2">Detected Issues</h4>
                                    <div className="space-y-2">
                                        <div className="p-3 bg-red-50 border border-red-100 rounded-md dark:bg-red-900/20 dark:border-red-900">
                                            <div className="flex gap-2">
                                                <ShieldAlert className="w-4 h-4 text-red-600 mt-0.5" />
                                                <div>
                                                    <p className="text-sm font-medium text-red-900 dark:text-red-100">Missing Mandatory Field</p>
                                                    <p className="text-xs text-red-700 dark:text-red-300 mt-1">Field 'Industry' is required for routing.</p>
                                                </div>
                                            </div>
                                        </div>
                                        {selectedItem.status === "quarantined" && (
                                            <div className="p-3 bg-orange-50 border border-orange-100 rounded-md dark:bg-orange-900/20 dark:border-orange-900">
                                                <div className="flex gap-2">
                                                    <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5" />
                                                    <div>
                                                        <p className="text-sm font-medium text-orange-900 dark:text-orange-100">Low Confidence Match</p>
                                                        <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">Possible duplicate of 'Johnathan Doe'.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Fix Suggestions */}
                            <div>
                                <h4 className="text-xs font-bold text-muted-foreground uppercase mb-2">AI Fix Suggestions</h4>
                                <div className="p-4 border border-blue-100 bg-blue-50/50 rounded-md dark:border-blue-900 dark:bg-blue-900/10">
                                    <div className="flex items-start gap-3">
                                        <Wand2 className="w-4 h-4 text-blue-600 mt-1" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">Enrich & Standardize</p>
                                            <ul className="mt-2 space-y-1 text-xs text-blue-800 dark:text-blue-200 list-disc list-inside">
                                                <li>Infer Industry: "Technology"</li>
                                                <li>Normalize Phone: "+1 (555) 123-4567"</li>
                                            </ul>
                                            <Button
                                                size="sm"
                                                className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white"
                                                onClick={() => handleAutoFix(selectedItem.id)}
                                            >
                                                Apply Fixes & Approve
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-border bg-muted/10 flex gap-2">
                            <Button variant="outline" className="flex-1 border-red-200 hover:bg-red-50 text-red-700">
                                <Trash2 className="w-4 h-4 mr-2" /> Reject
                            </Button>
                            <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white">
                                <CheckCircle2 className="w-4 h-4 mr-2" /> Approve
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
