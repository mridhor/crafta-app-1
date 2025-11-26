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
    History,
    DollarSign,
    Briefcase,
    AlertTriangle,
    ArrowUpDown,
    Filter,
    CheckSquare,
    Trash2,
    Tag,
    UserPlus,
    ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useView } from "@/components/providers/ViewContext";

// Mock Data for Entities (Expanded for 5.1)
const mockDeals = [
    { id: 101, name: "Acme Expansion", company: "Acme Corp", owner: "Sarah J.", stage: "Negotiation", value: 50000, lastInteraction: "2h ago", risk: "High", updatedAt: "Today", crioIssue: false },
    { id: 102, name: "Stark Contract", company: "Stark Ind", owner: "Tony S.", stage: "Discovery", value: 120000, lastInteraction: "1d ago", risk: "Low", updatedAt: "Yesterday", crioIssue: true },
    { id: 103, name: "Wayne Security", company: "Wayne Ent", owner: "Bruce W.", stage: "Proposal", value: 75000, lastInteraction: "3d ago", risk: "Medium", updatedAt: "3 days ago", crioIssue: false },
    { id: 104, name: "Cyberdyne AI", company: "Cyberdyne", owner: "Sarah C.", stage: "Closed Won", value: 200000, lastInteraction: "1w ago", risk: "Low", updatedAt: "1 week ago", crioIssue: false },
];

const mockCompanies = [
    { id: 1, name: "Acme Corp", industry: "Manufacturing", location: "San Francisco, CA", status: "Active", owner: "Sarah J.", risk: "Low" },
    { id: 2, name: "Stark Industries", industry: "Technology", location: "New York, NY", status: "Active", owner: "Tony S.", risk: "Low" },
    { id: 3, name: "Wayne Enterprises", industry: "Conglomerate", location: "Gotham City", status: "Active", owner: "Bruce W.", risk: "Medium" },
    { id: 4, name: "Cyberdyne Systems", industry: "Defense", location: "Los Angeles, CA", status: "Risk", owner: "Sarah C.", risk: "High" },
];

const mockContacts = [
    { id: 201, name: "John Doe", title: "CTO", company: "Acme Corp", email: "john@acme.com", lastInteraction: "2h ago", status: "Warm" },
    { id: 202, name: "Pepper Potts", title: "CEO", company: "Stark Ind", email: "pepper@stark.com", lastInteraction: "1d ago", status: "Hot" },
    { id: 203, name: "Lucius Fox", title: "VP Tech", company: "Wayne Ent", email: "l.fox@wayne.com", lastInteraction: "3d ago", status: "Alumni" },
];

type SortConfig = {
    key: string;
    direction: 'asc' | 'desc';
};

export function EntityView() {
    const { setActiveView, setViewParams } = useView();
    const [activeTab, setActiveTab] = useState<"deals" | "companies" | "contacts">("deals");
    const [entities, setEntities] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'updatedAt', direction: 'desc' });

    // Filters
    const [filterOwner, setFilterOwner] = useState<string>("all");
    const [filterStage, setFilterStage] = useState<string>("all");
    const [filterRisk, setFilterRisk] = useState<string>("all");

    // Fetch entities (Mock + Supabase structure)
    useEffect(() => {
        const fetchEntities = async () => {
            setLoading(true);
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 300));

            let data: any[] = [];
            if (activeTab === 'deals') {
                data = [...mockDeals];
            } else if (activeTab === 'companies') {
                data = [...mockCompanies];
            } else {
                data = [...mockContacts];
            }

            // Apply Filters (Mock logic)
            if (filterOwner !== "all") {
                data = data.filter(item => item.owner === filterOwner);
            }
            if (activeTab === 'deals' && filterStage !== "all") {
                data = data.filter(item => item.stage === filterStage);
            }
            if (filterRisk !== "all") {
                // specific logic for risk mapping if needed, simplified here
                data = data.filter(item => item.risk === filterRisk || item.status === (filterRisk === 'High' ? 'Risk' : 'Active'));
            }

            // Apply Sorting
            data.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });

            setEntities(data);
            setLoading(false);
        };

        fetchEntities();
    }, [activeTab, filterOwner, filterStage, filterRisk, sortConfig]);

    const handleSort = (key: string) => {
        setSortConfig(current => ({
            key,
            direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === entities.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(entities.map(e => e.id));
        }
    };

    const toggleSelect = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(i => i !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const sidebar = (
        <div className="p-4 space-y-6">
            <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Views</h3>
                <nav className="space-y-1">
                    <Button
                        variant="ghost"
                        className={cn("w-full justify-start text-sm", activeTab === "deals" && "bg-secondary font-medium")}
                        onClick={() => setActiveTab("deals")}
                    >
                        <DollarSign className="w-4 h-4 mr-3 text-muted-foreground" />
                        Deals
                    </Button>
                    <Button
                        variant="ghost"
                        className={cn("w-full justify-start text-sm", activeTab === "companies" && "bg-secondary font-medium")}
                        onClick={() => setActiveTab("companies")}
                    >
                        <Building2 className="w-4 h-4 mr-3 text-muted-foreground" />
                        Companies
                    </Button>
                    <Button
                        variant="ghost"
                        className={cn("w-full justify-start text-sm", activeTab === "contacts" && "bg-secondary font-medium")}
                        onClick={() => setActiveTab("contacts")}
                    >
                        <Users className="w-4 h-4 mr-3 text-muted-foreground" />
                        Contacts
                    </Button>
                </nav>
            </div>

            <div>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Filters</h3>
                <div className="space-y-3">
                    <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">Owner</label>
                        <select
                            className="w-full h-8 bg-background border border-border rounded text-xs px-2"
                            value={filterOwner}
                            onChange={(e) => setFilterOwner(e.target.value)}
                        >
                            <option value="all">All Owners</option>
                            <option value="Sarah J.">Sarah J.</option>
                            <option value="Tony S.">Tony S.</option>
                        </select>
                    </div>
                    {activeTab === 'deals' && (
                        <div className="space-y-1">
                            <label className="text-xs text-muted-foreground">Stage</label>
                            <select
                                className="w-full h-8 bg-background border border-border rounded text-xs px-2"
                                value={filterStage}
                                onChange={(e) => setFilterStage(e.target.value)}
                            >
                                <option value="all">All Stages</option>
                                <option value="Discovery">Discovery</option>
                                <option value="Proposal">Proposal</option>
                                <option value="Negotiation">Negotiation</option>
                            </select>
                        </div>
                    )}
                    <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">Risk</label>
                        <select
                            className="w-full h-8 bg-background border border-border rounded text-xs px-2"
                            value={filterRisk}
                            onChange={(e) => setFilterRisk(e.target.value)}
                        >
                            <option value="all">All Risks</option>
                            <option value="High">High Risk</option>
                            <option value="Medium">Medium Risk</option>
                            <option value="Low">Low Risk</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <AppLayout leftSidebar={sidebar}>
            <div className="p-6 max-w-6xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight capitalize">{activeTab}</h1>
                        <p className="text-muted-foreground">Manage your {activeTab} pipeline and records.</p>
                    </div>
                    <div className="flex gap-2">
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder={`Search ${activeTab}...`}
                                className="w-full h-9 pl-9 pr-4 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            Add {activeTab.slice(0, -1)} // Remove 's'
                        </Button>
                    </div>
                </div>

                {/* Quick Actions Bar (Visible when items selected) */}
                {selectedIds.length > 0 && (
                    <div className="bg-primary/5 border border-primary/10 rounded-lg p-2 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                        <span className="text-sm font-medium px-2">{selectedIds.length} selected</span>
                        <div className="h-4 w-px bg-border mx-2" />
                        <Button variant="ghost" size="sm" className="h-8 text-xs">
                            <UserPlus className="w-3.5 h-3.5 mr-2" />
                            Assign
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 text-xs">
                            <ArrowRight className="w-3.5 h-3.5 mr-2" />
                            Move Stage
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 text-xs">
                            <Tag className="w-3.5 h-3.5 mr-2" />
                            Add Tag
                        </Button>
                        <div className="flex-1" />
                        <Button variant="ghost" size="sm" className="h-8 text-xs text-red-600 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="w-3.5 h-3.5 mr-2" />
                            Delete
                        </Button>
                    </div>
                )}

                <Card className="overflow-hidden border-border shadow-sm">
                    {/* Table Header */}
                    <div className="bg-muted/50 px-6 py-3 border-b border-border flex items-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        <div className="w-10 flex items-center justify-center">
                            <input
                                type="checkbox"
                                className="rounded border-gray-300"
                                checked={selectedIds.length === entities.length && entities.length > 0}
                                onChange={toggleSelectAll}
                            />
                        </div>

                        {activeTab === 'deals' && (
                            <>
                                <div className="flex-1 cursor-pointer hover:text-foreground flex items-center gap-1" onClick={() => handleSort('name')}>
                                    Deal Name <ArrowUpDown className="w-3 h-3" />
                                </div>
                                <div className="w-32 cursor-pointer hover:text-foreground" onClick={() => handleSort('company')}>Company</div>
                                <div className="w-24 cursor-pointer hover:text-foreground" onClick={() => handleSort('owner')}>Owner</div>
                                <div className="w-28 cursor-pointer hover:text-foreground" onClick={() => handleSort('stage')}>Stage</div>
                                <div className="w-24 text-right cursor-pointer hover:text-foreground pr-4" onClick={() => handleSort('value')}>Value</div>
                                <div className="w-24 cursor-pointer hover:text-foreground" onClick={() => handleSort('lastInteraction')}>Last Int.</div>
                                <div className="w-20 cursor-pointer hover:text-foreground" onClick={() => handleSort('risk')}>Risk</div>
                            </>
                        )}

                        {activeTab === 'companies' && (
                            <>
                                <div className="flex-1 cursor-pointer hover:text-foreground" onClick={() => handleSort('name')}>Company Name</div>
                                <div className="w-32 cursor-pointer hover:text-foreground" onClick={() => handleSort('industry')}>Industry</div>
                                <div className="w-32 cursor-pointer hover:text-foreground" onClick={() => handleSort('location')}>Location</div>
                                <div className="w-24 cursor-pointer hover:text-foreground" onClick={() => handleSort('owner')}>Owner</div>
                                <div className="w-24 cursor-pointer hover:text-foreground" onClick={() => handleSort('status')}>Status</div>
                            </>
                        )}

                        {activeTab === 'contacts' && (
                            <>
                                <div className="flex-1 cursor-pointer hover:text-foreground" onClick={() => handleSort('name')}>Name</div>
                                <div className="w-32 cursor-pointer hover:text-foreground" onClick={() => handleSort('title')}>Role</div>
                                <div className="w-32 cursor-pointer hover:text-foreground" onClick={() => handleSort('company')}>Company</div>
                                <div className="w-40 cursor-pointer hover:text-foreground" onClick={() => handleSort('email')}>Email</div>
                                <div className="w-24 cursor-pointer hover:text-foreground" onClick={() => handleSort('status')}>Tags</div>
                            </>
                        )}

                        <div className="w-10"></div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-border bg-card">
                        {loading ? (
                            <div className="text-center py-12 text-muted-foreground">Loading...</div>
                        ) : entities.length === 0 ? (
                            <div className="text-center py-12 text-muted-foreground">No entities found matching your filters.</div>
                        ) : entities.map((entity) => (
                            <div
                                key={entity.id}
                                className={cn(
                                    "px-6 py-3 flex items-center hover:bg-muted/30 transition-colors group cursor-pointer text-sm",
                                    selectedIds.includes(entity.id) && "bg-primary/5"
                                )}
                                onClick={() => {
                                    setViewParams({ id: entity.id, type: activeTab.slice(0, -1) }); // Pass type
                                    setActiveView("entity-detail");
                                }}
                            >
                                <div className="w-10 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300"
                                        checked={selectedIds.includes(entity.id)}
                                        onChange={() => toggleSelect(entity.id)}
                                    />
                                </div>

                                {activeTab === 'deals' && (
                                    <>
                                        <div className="flex-1 font-medium flex items-center gap-2">
                                            {entity.name}
                                            {entity.crioIssue && (
                                                <div className="text-amber-500" title="CRIO Mapping Issue">
                                                    <AlertTriangle className="w-3.5 h-3.5" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="w-32 text-muted-foreground truncate">{entity.company}</div>
                                        <div className="w-24 text-muted-foreground text-xs">{entity.owner}</div>
                                        <div className="w-28">
                                            <span className="px-2 py-0.5 rounded-full bg-secondary text-[10px] font-medium border border-border">
                                                {entity.stage}
                                            </span>
                                        </div>
                                        <div className="w-24 text-right font-medium pr-4">
                                            ${entity.value.toLocaleString()}
                                        </div>
                                        <div className="w-24 text-muted-foreground text-xs">{entity.lastInteraction}</div>
                                        <div className="w-20">
                                            <span className={cn(
                                                "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                                                entity.risk === "High" ? "bg-red-100 text-red-700" :
                                                    entity.risk === "Medium" ? "bg-orange-100 text-orange-700" :
                                                        "bg-green-100 text-green-700"
                                            )}>
                                                {entity.risk}
                                            </span>
                                        </div>
                                    </>
                                )}

                                {activeTab === 'companies' && (
                                    <>
                                        <div className="flex-1 font-medium flex items-center gap-2">
                                            <div className="w-6 h-6 rounded bg-secondary flex items-center justify-center text-[10px] font-bold">
                                                {entity.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            {entity.name}
                                        </div>
                                        <div className="w-32 text-muted-foreground text-xs">{entity.industry}</div>
                                        <div className="w-32 text-muted-foreground text-xs">{entity.location}</div>
                                        <div className="w-24 text-muted-foreground text-xs">{entity.owner}</div>
                                        <div className="w-24">
                                            <span className={cn(
                                                "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                                                entity.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                            )}>
                                                {entity.status}
                                            </span>
                                        </div>
                                    </>
                                )}

                                {activeTab === 'contacts' && (
                                    <>
                                        <div className="flex-1 font-medium flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-[10px] font-bold">
                                                {entity.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            {entity.name}
                                        </div>
                                        <div className="w-32 text-muted-foreground text-xs">{entity.title}</div>
                                        <div className="w-32 text-muted-foreground text-xs">{entity.company}</div>
                                        <div className="w-40 text-muted-foreground text-xs truncate">{entity.email}</div>
                                        <div className="w-24">
                                            <span className="px-2 py-0.5 rounded bg-secondary text-foreground text-[10px] font-medium border border-border">
                                                {entity.status}
                                            </span>
                                        </div>
                                    </>
                                )}

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
