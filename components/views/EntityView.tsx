"use client";

import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { supabase } from "@/lib/supabase";
import {
    Building2,
    Users,
    Search,
    Plus,
    MoreHorizontal,
    Mail,
    Phone,
    MapPin,
    Globe,
    History
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useView } from "@/components/providers/ViewContext";

// Mock Data for Entities (Fallback)
const initialEntities = [
    { id: 1, name: "Acme Corp", type: "Company", industry: "Manufacturing", location: "San Francisco, CA", status: "Active" },
    { id: 2, name: "Stark Industries", type: "Company", industry: "Technology", location: "New York, NY", status: "Active" },
    { id: 3, name: "Wayne Enterprises", type: "Company", industry: "Conglomerate", location: "Gotham City", status: "Active" },
    { id: 4, name: "Cyberdyne Systems", type: "Company", industry: "Defense", location: "Los Angeles, CA", status: "Risk" },
];

export function EntityView() { // Renamed to match file export if needed, but file is EntityDetailView.tsx? No, file list said EntityDetailView.tsx but previous edit was EntityView.tsx. Let's check file list again.
    // Wait, the file list showed EntityDetailView.tsx. I should check the file content or just write to EntityDetailView.tsx if that's what it is.
    // Actually, let's stick to the file list name.
    const { setActiveView, setViewParams } = useView();
    const [activeTab, setActiveTab] = useState("companies"); // companies, contacts
    const [entities, setEntities] = useState<any[]>(initialEntities);
    const [loading, setLoading] = useState(false);

    // Fetch entities from Supabase
    useEffect(() => {
        const fetchEntities = async () => {
            setLoading(true);
            if (activeTab === 'companies') {
                const { data, error } = await supabase.from('companies').select('*');
                if (data) {
                    setEntities(data.map((c: any) => ({
                        id: c.id,
                        name: c.name,
                        type: "Company",
                        industry: c.industry || "Unknown",
                        location: c.metadata?.location || "Unknown",
                        status: "Active" // Placeholder
                    })));
                }
            } else {
                const { data, error } = await supabase.from('contacts').select('*');
                if (data) {
                    setEntities(data.map((c: any) => ({
                        id: c.id,
                        name: c.name,
                        type: "Contact",
                        industry: c.title || "Unknown",
                        location: c.email || "Unknown",
                        status: "Active"
                    })));
                }
            }
            setLoading(false);
        };

        fetchEntities();
    }, [activeTab]);

    const sidebar = (
        <div className="p-4 space-y-6">
            <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Directory</h3>
                <nav className="space-y-1">
                    <Button
                        variant="ghost"
                        className={cn("w-full justify-start text-sm", activeTab === "companies" && "bg-secondary font-medium")}
                        onClick={() => setActiveTab("companies")}
                    >
                        <Building2 className="w-4 h-4 mr-3 text-blue-500" />
                        Companies
                    </Button>
                    <Button
                        variant="ghost"
                        className={cn("w-full justify-start text-sm", activeTab === "contacts" && "bg-secondary font-medium")}
                        onClick={() => setActiveTab("contacts")}
                    >
                        <Users className="w-4 h-4 mr-3 text-purple-500" />
                        Contacts
                    </Button>
                </nav>
            </div>

            <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Lists</h3>
                <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span>Target Accounts</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-orange-500" />
                        <span>Churn Risk</span>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <AppLayout leftSidebar={sidebar}>
            <div className="p-6 max-w-5xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Entities</h1>
                        <p className="text-muted-foreground">Manage your companies and contacts.</p>
                    </div>
                    <div className="flex gap-2">
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search entities..."
                                className="w-full h-9 pl-9 pr-4 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Add {activeTab === 'companies' ? 'Company' : 'Contact'}
                        </Button>
                    </div>
                </div>

                <Card className="overflow-hidden">
                    <div className="bg-muted/50 px-6 py-3 border-b border-border flex text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        <div className="flex-1">Name</div>
                        <div className="w-40">{activeTab === 'companies' ? 'Industry' : 'Title'}</div>
                        <div className="w-40">{activeTab === 'companies' ? 'Location' : 'Email'}</div>
                        <div className="w-24">Status</div>
                        <div className="w-10"></div>
                    </div>

                    <div className="divide-y divide-border">
                        {loading ? (
                            <div className="text-center py-12 text-muted-foreground">Loading entities...</div>
                        ) : entities.map((entity) => (
                            <div
                                key={entity.id}
                                className="px-6 py-4 flex items-center hover:bg-muted/20 transition-colors group cursor-pointer"
                                onClick={() => {
                                    setViewParams({ id: entity.id });
                                    setActiveView("entity-detail");
                                }}
                            >
                                <div className="flex-1 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center text-xs font-bold">
                                        {entity.name.substring(0, 2).toUpperCase()}
                                    </div>
                                    <div>
                                        <div className="font-medium">{entity.name}</div>
                                        <div className="text-xs text-muted-foreground">{entity.type}</div>
                                    </div>
                                </div>
                                <div className="w-40 text-sm">{entity.industry}</div>
                                <div className="w-40 text-sm text-muted-foreground">{entity.location}</div>
                                <div className="w-24">
                                    <span className={cn(
                                        "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                                        entity.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                    )}>
                                        {entity.status}
                                    </span>
                                </div>
                                <div className="w-10 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}
